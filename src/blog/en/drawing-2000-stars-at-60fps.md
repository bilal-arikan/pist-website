---
title: "Drawing 2,000 stars at 60 fps on canvas"
slug: "drawing-2000-stars-at-60fps"
lang: en
date: 2026-09-22
category: "Engineering"
hue: "#9CE085"
excerpt: "Before reaching for WebGL we measured how far 2D canvas would go. Four changes cut frame time in half."
gorsel: "/assets/img/gorsel/yazi-canvas.svg"
readingTime: 11
---

The opening scene of our site is a takeoff animation: it starts on the ground and climbs as you scroll. The scene holds ~240 runway lights and 2,100 stars, all kept in 3D coordinates and projected with perspective.

The first version stuttered on desktop. Instead of jumping to WebGL, we first **measured how far 2D canvas would actually go**. Four changes were enough.

## 1. Hoisting trigonometry out of the loop

The biggest waste was the dumbest one. The projection function looked like this:

```js
function project(p){
  var cp = Math.cos(pitch), sp = Math.sin(pitch);
  // ...
}
```

`pitch` is constant for the whole frame. But the function is called for every point — that is **more than 2,300 `cos`/`sin` pairs per frame**. Computing the values once at the start of the frame and holding them at module level brought that down to 2.

## 2. `fillRect()` instead of `arc()` for small stars

This was the clearest win we measured. There are two ways to draw 2,100 stars:

```js
// 2.9 ms
ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();

// 0.9 ms
ctx.fillRect(x, y, 1, 1);
```

**2.9 ms → 0.9 ms.** Given that the 60 fps budget is 16.7 ms, star paths alone were eating a sixth of the frame. Most stars are one pixel anyway; drawing a circle buys you nothing visually.

We only use `arc()` where the radius is larger than one pixel.

## 3. Caching gradients

The sky and vignette gradients were being rebuilt every frame:

```js
// every frame — unnecessary
var sky = ctx.createLinearGradient(0, 0, 0, H);
sky.addColorStop(0, '#04030A');
```

These gradients depend only on the window size. We moved them into `build()` and cached them; they are now rebuilt only on resize.

The same logic applies to the light glows: instead of generating a radial gradient for every lamp, each of the five lamp types is **rendered to a sprite once** and stamped with `drawImage`, scaled as needed.

## 4. Capping pixel density

This was the real bottleneck, and the least obvious one.

On a retina display `devicePixelRatio` is 2. In a 1440×900 window the canvas becomes 2880×1800 = **5.2 million pixels**. And we were filling the full screen five times per frame: sky, ground, vignette, film grain, chroma noise. Two of those covered an area larger than the screen.

Roughly **28 million pixels per frame**.

Two changes:
- Cap `devicePixelRatio` at 1.5 (1.25 on mobile). It is not noticeable by eye, and the pixel count drops by 44%.
- Grain reduced to a single layer, pre-rendered at half resolution and scaled with `drawImage`. One draw call instead of a pattern fill.

Result: **~12 million pixels per frame.** Roughly half.

We also added `getContext('2d', { alpha: false })` — with a non-transparent canvas the compositing cost drops. The scene fills itself completely with sky anyway, so nothing is lost.

## Quality tiers

Even after optimising, it would be wrong to assume every device performs the same. The loop measures frame time and quietly steps down a tier if it exceeds 23 ms:

| Tier | Stars | Disabled |
|---|---|---|
| 0 | 2,100 | — |
| 1 | 1,400 | lens ghosts, dirt |
| 2 | 900 | + chromatic aberration |
| 3 | 520 | + halation |

Mobile starts directly at tier 2. The user notices nothing; the scene gets a little simpler, but it does not stutter.

## What we learned

**Measure before reaching for WebGL.** 2D canvas carries far more than we expected, and the complexity WebGL would have added would not have paid for itself in this scene.

**The bottleneck is usually not where you think.** We were blaming the star count; the real cost was in the pixel count of full-screen fills. Touching anything before measuring is wasted time.

**The cheapest optimisation is work you never do.** Putting a frame-constant computation inside a loop is the easiest mistake to find afterwards and the hardest to notice at the time.
