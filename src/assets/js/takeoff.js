/* ============================================================
   Pist Studio — kalkış sahnesi
   Scroll, hero bölümü boyunca kamerayı pistten Kármán çizgisine taşır.
   Hero bittiğinde kamera uzayda kalır; sayfanın geri kalanı
   yıldız alanının üzerinde akar.

   Saf Canvas 2D. Renkler gerçek havaalanı aydınlatma standardından:
   kenar amber · merkez beyaz · eşik yeşil · pist sonu kırmızı · taksi mavi
   ============================================================ */
(function () {
  var cv = document.getElementById('sky');
  if (!cv) return;
  var hero = document.getElementById('hero');
  if (!hero) return;

  var g = cv.getContext('2d', { alpha: false, desynchronized: true });
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0, H = 0, DPR = 1, VC = 0;
  var lights = [], stars = [], f = 900;
  var camY = 2, camZ = 0, pitch = 0, t = 0, ts = 0, tsPrev = 0, vel = 0, clock = 0;
  var CP = 1, SP = 0;

  /* gerçek pist ölçüleri (metre) */
  var RW_HALF = 22.5, RW_SPACE = 60, RW_LEN = 3000, TAXI_X = -98;

  var LAMPS = {
    amber: ['rgba(255,251,240,1)','rgba(255,232,178,0.95)','rgba(255,182,62,0.60)','rgba(255,140,10,0.22)','rgba(220,96,6,0.06)'],
    white: ['rgba(255,255,255,1)','rgba(238,243,255,0.92)','rgba(196,214,255,0.50)','rgba(150,175,235,0.17)','rgba(110,140,210,0.05)'],
    green: ['rgba(246,255,248,1)','rgba(198,255,214,0.94)','rgba(70,226,130,0.56)','rgba(20,180,90,0.20)','rgba(10,130,70,0.05)'],
    red:   ['rgba(255,244,240,1)','rgba(255,196,184,0.93)','rgba(255,80,58,0.56)','rgba(210,36,20,0.20)','rgba(150,20,12,0.05)'],
    blue:  ['rgba(244,250,255,1)','rgba(196,224,255,0.93)','rgba(74,150,255,0.55)','rgba(30,92,220,0.20)','rgba(16,50,150,0.05)']
  };
  var TINT = { amber:'#FFF6E2', white:'#FFFFFF', green:'#EAFFF0', red:'#FFEDE8', blue:'#EDF6FF' };

  var bloom = {}, glare, starSprite, grainCv, skyGrad, vigGrad;
  var Q = { tier: 0, stars: 2100, chroma: true, halation: true };

  function applyTier(n) {
    Q.tier = n;
    if (n <= 0)      { Q.stars = 2100; Q.chroma = true;  Q.halation = true; }
    else if (n === 1){ Q.stars = 1400; Q.chroma = true;  Q.halation = true; }
    else if (n === 2){ Q.stars = 900;  Q.chroma = false; Q.halation = true; }
    else             { Q.stars = 520;  Q.chroma = false; Q.halation = false; }
  }

  function radial(size, stops) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var x = c.getContext('2d');
    var gr = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gr.addColorStop(0.000, stops[0]);
    gr.addColorStop(0.035, stops[1]);
    gr.addColorStop(0.105, stops[2]);
    gr.addColorStop(0.260, stops[3]);
    gr.addColorStop(0.560, stops[4]);
    gr.addColorStop(1.000, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, size, size);
    return c;
  }

  function noiseTile(size) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var x = c.getContext('2d');
    var id = x.createImageData(size, size);
    for (var i = 0; i < id.data.length; i += 4) {
      var v = 80 + Math.random() * 175;
      id.data[i]     = v + (Math.random() * 26 - 13);
      id.data[i + 1] = v + (Math.random() * 26 - 13);
      id.data[i + 2] = v + (Math.random() * 26 - 13);
      id.data[i + 3] = 9 + Math.random() * 15;
    }
    x.putImageData(id, 0, 0);
    return c;
  }

  function makeSprites() {
    for (var k in LAMPS) bloom[k] = radial(256, LAMPS[k]);

    glare = document.createElement('canvas');
    glare.width = 320; glare.height = 32;
    var s = glare.getContext('2d');
    var sg = s.createLinearGradient(0, 0, 320, 0);
    sg.addColorStop(0.00, 'rgba(120,170,255,0)');
    sg.addColorStop(0.40, 'rgba(255,200,110,0.26)');
    sg.addColorStop(0.50, 'rgba(255,250,232,0.62)');
    sg.addColorStop(0.60, 'rgba(255,200,110,0.26)');
    sg.addColorStop(1.00, 'rgba(120,170,255,0)');
    s.fillStyle = sg;
    for (var y = 0; y < 32; y++) {
      s.globalAlpha = Math.pow(1 - Math.abs(y - 16) / 16, 3.2);
      s.fillRect(0, y, 320, 1);
    }

    starSprite = radial(64, ['rgba(255,255,255,0.95)','rgba(255,255,255,0.55)','rgba(226,234,255,0.20)','rgba(200,214,255,0.05)','rgba(190,205,255,0.012)']);

    var tile = noiseTile(96);
    var gw = Math.ceil(W / 2) + 48, gh = Math.ceil(H / 2) + 48;
    grainCv = document.createElement('canvas');
    grainCv.width = gw; grainCv.height = gh;
    var gx = grainCv.getContext('2d');
    gx.fillStyle = gx.createPattern(tile, 'repeat');
    gx.fillRect(0, 0, gw, gh);

    skyGrad = g.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, '#04030A');
    skyGrad.addColorStop(0.55, '#07040F');
    skyGrad.addColorStop(1, '#150819');

    vigGrad = g.createRadialGradient(W / 2, H * 0.52, Math.min(W, H) * 0.30, W / 2, H * 0.52, Math.max(W, H) * 0.78);
    vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vigGrad.addColorStop(0.62, 'rgba(4,2,10,0.22)');
    vigGrad.addColorStop(1, 'rgba(2,1,8,0.62)');
  }

  function push(x, y, z, kind, k, mid) {
    lights.push({ x: x, y: y, z: z, kind: kind, k: k, mid: !!mid, w: Math.random() * 6.283 });
  }

  function build() {
    W = window.innerWidth || document.documentElement.clientWidth || 1;
    H = window.innerHeight || document.documentElement.clientHeight || 1;
    DPR = Math.min(window.devicePixelRatio || 1, W < 760 ? 1.25 : 1.5);
    cv.width = Math.max(1, Math.round(W * DPR));
    cv.height = Math.max(1, Math.round(H * DPR));
    g.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (W < 760 && Q.tier < 2) applyTier(2);

    makeSprites();

    lights = [];
    for (var z = 30; z < RW_LEN; z += RW_SPACE)
      for (var sgn = -1; sgn <= 1; sgn += 2)
        push(sgn * RW_HALF, 0.35, z, 'amber', Math.random() < 0.035 ? 0.09 : 0.80 + Math.random() * 0.34);
    for (var z2 = 60; z2 < RW_LEN; z2 += RW_SPACE * 2) push(0, 0.08, z2, 'white', 0.30, true);
    for (var xa = -RW_HALF; xa <= RW_HALF + 0.1; xa += 5.6) push(xa, 0.3, 34, 'green', 0.72);
    for (var xb = -RW_HALF; xb <= RW_HALF + 0.1; xb += 5.6) push(xb, 0.3, RW_LEN, 'red', 0.62);
    for (var z3 = 120; z3 < 2400; z3 += 46) { push(TAXI_X, 0.25, z3, 'blue', 0.42); push(TAXI_X - 24, 0.25, z3, 'blue', 0.34); }

    stars = [];
    var TEMP = ['#FFF6EE','#FFFFFF','#DCE6FF','#FFE0B8','#FFC98F','#C9D6FF','#FFB08A'];
    for (var i = 0; i < 2100; i++) {
      var mw = Math.random() < 0.42;
      var th = Math.random() * 6.2832;
      var ph = mw ? Math.acos(2 * Math.random() - 1) * 0.16 + 1.24 + (Math.random() - 0.5) * 0.30
                  : Math.acos(2 * Math.random() - 1);
      var r = 380000 + Math.random() * 90000;
      var m = Math.pow(Math.random(), 3.1);
      if (mw) m *= 0.34;
      stars.push({
        x: r * Math.sin(ph) * Math.cos(th),
        y: Math.abs(r * Math.cos(ph)) * 0.9 + 40000,
        z: r * Math.sin(ph) * Math.sin(th),
        m: m, c: TEMP[(Math.random() * TEMP.length) | 0], w: Math.random() * 6.283
      });
    }
  }

  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function ss(a, b, x) { if (x <= a) return 0; if (x >= b) return 1; var u = (x - a) / (b - a); return u * u * (3 - 2 * u); }

  var px = 0, py = 0, psc = 0, pz = 0;
  function project(p) {
    var dy = p.y - camY, dz = p.z - camZ;
    var rz = dy * SP + dz * CP;
    if (rz <= 4) return false;
    var s = f / rz;
    px = W / 2 + p.x * s;
    py = VC - (dy * CP - dz * SP) * s;
    psc = s; pz = rz;
    return true;
  }

  function draw() {
    var e = ease(ts);
    camY = 2 * Math.pow(60000, e * e * 0.62 + e * 0.38);
    camZ = ts * 900;
    pitch = e * 0.44;
    f = Math.min(H, 940) * 1.06;
    CP = Math.cos(pitch); SP = Math.sin(pitch);

    var shake = reduce ? 0 : (Math.sin(clock * 0.7) * 0.9 + Math.sin(clock * 1.9 + 1.2) * 0.5) * (0.4 + vel * 26);
    VC = H * 0.58 + shake;
    var shakeX = reduce ? 0 : Math.sin(clock * 0.53 + 2.1) * 0.7;

    var alt = camY;
    var curve = ss(9000, 110000, alt);
    var groundVis = 1 - ss(1200, 14000, alt);
    var lightVis = 1 - ss(400, 4200, alt);
    var hazeVis = 1 - ss(2000, 30000, alt);
    var hy = VC + f * Math.tan(pitch);

    g.save();
    g.translate(shakeX, 0);
    g.fillStyle = skyGrad;
    g.fillRect(-4, 0, W + 8, H);

    /* yıldızlar */
    var starVis = 0.30 + ts * 0.70;
    var n = Math.min(Q.stars, stars.length);
    for (var i = 0; i < n; i++) {
      var s0 = stars[i];
      if (!project(s0)) continue;
      if (px < -30 || px > W + 30 || py < -30 || py > H + 30) continue;
      var tw = reduce ? 1 : (0.90 + Math.sin(clock * 1.6 + s0.w) * 0.10);
      var a = (0.07 + s0.m * 0.93) * starVis * tw;
      var ext = ss(-14, 190, hy - py);
      var extinction = 1 - hazeVis * (1 - ext) * 0.88;
      a *= extinction;
      if (a <= 0.012) continue;
      var rad = 0.32 + s0.m * 1.45;
      if (s0.m > 0.80) {
        var hb = rad * 13;
        g.globalAlpha = a * 0.55;
        g.drawImage(starSprite, px - hb / 2, py - hb / 2, hb, hb);
      }
      g.globalAlpha = a < 1 ? a : 1;
      g.fillStyle = extinction < 0.55 ? '#FFCFA0' : s0.c;
      if (rad < 1.0) g.fillRect(px, py, 1, 1);
      else { g.beginPath(); g.arc(px, py, rad, 0, 6.2832); g.fill(); }
    }
    g.globalAlpha = 1;

    /* yerküre kavisi + atmosfer limbi */
    if (curve > 0.01) {
      var Rarc = W * (26 - 24.4 * curve);
      var ccy = hy + (1 - curve) * 40 + Rarc;
      var th2 = Rarc * (0.055 + 0.028 * curve);
      var lg = g.createRadialGradient(W / 2, ccy, Rarc, W / 2, ccy, Rarc + th2);
      lg.addColorStop(0.00, 'rgba(255,166,60,' + (0.50 * curve) + ')');
      lg.addColorStop(0.13, 'rgba(255,120,30,' + (0.30 * curve) + ')');
      lg.addColorStop(0.34, 'rgba(150,50,120,' + (0.20 * curve) + ')');
      lg.addColorStop(0.62, 'rgba(60,40,140,' + (0.11 * curve) + ')');
      lg.addColorStop(1.00, 'rgba(20,15,60,0)');
      g.fillStyle = lg;
      g.beginPath(); g.arc(W / 2, ccy, Rarc + th2, 0, 6.2832); g.fill();
      g.globalAlpha = curve;
      g.fillStyle = '#08050E';
      g.beginPath(); g.arc(W / 2, ccy, Rarc, 0, 6.2832); g.fill();
      g.globalAlpha = 1;
    }

    /* zemin + ufuk sisi */
    if (groundVis > 0.01) {
      if (hy < H) {
        var gp = g.createLinearGradient(0, hy, 0, H);
        gp.addColorStop(0, 'rgba(16,11,22,' + (0.90 * groundVis) + ')');
        gp.addColorStop(0.35, 'rgba(11,7,16,' + (0.96 * groundVis) + ')');
        gp.addColorStop(1, 'rgba(6,4,10,' + (0.99 * groundVis) + ')');
        g.fillStyle = gp; g.fillRect(-4, hy, W + 8, H - hy);
      }
      if (hazeVis > 0.01 && hy > -100) {
        var hz = g.createLinearGradient(0, hy - 130, 0, hy + 14);
        hz.addColorStop(0, 'rgba(255,150,40,0)');
        hz.addColorStop(0.68, 'rgba(255,140,40,' + (0.055 * hazeVis) + ')');
        hz.addColorStop(1, 'rgba(255,170,70,' + (0.14 * hazeVis) + ')');
        g.fillStyle = hz; g.fillRect(-4, hy - 130, W + 8, 144);
      }
    }

    /* lambalar */
    if (lightVis > 0.01) {
      var stretch = reduce ? 1 : (1 + Math.min(2.6, vel * 190));
      for (var k = 0; k < lights.length; k++) {
        var L = lights[k];
        if (!project(L)) continue;
        if (px < -180 || px > W + 180 || py < -180 || py > H + 180) continue;

        var a2 = lightVis * Math.exp(-pz / 1750) * L.k *
                 (reduce ? 1 : (0.965 + Math.sin(clock * 2.3 + L.w) * 0.035));
        if (a2 <= 0.008) continue;

        var sp = bloom[L.kind];
        var core = Math.min(3.2, Math.max(0.45, psc * 0.55));
        var bw = Math.min(88, Math.max(6, psc * 8.2));

        if (Q.halation && a2 > 0.48 && !L.mid) {
          var hw = bw * 2.1;
          g.globalAlpha = Math.min(0.16, a2 * 0.045);
          g.drawImage(sp, px - hw / 2, py - (hw / 2) * stretch, hw, hw * stretch);
        }

        g.globalAlpha = Math.min(1, a2 * 0.58);
        g.drawImage(sp, px - bw / 2, py - (bw / 2) * stretch, bw, bw * stretch);

        if (Q.chroma && bw > 12) {
          var ca = Math.min(1.6, Math.abs(px - W / 2) / W * 3.2);
          if (ca > 0.35) {
            g.globalAlpha = Math.min(0.16, a2 * 0.10);
            g.drawImage(sp, px - bw / 2 + ca, py - (bw / 2) * stretch, bw, bw * stretch);
            g.drawImage(sp, px - bw / 2 - ca, py - (bw / 2) * stretch, bw, bw * stretch);
          }
        }

        if (!L.mid && psc > 1.9 && a2 > 0.38) {
          var gw2 = Math.min(180, bw * 1.9);
          g.globalAlpha = Math.min(0.34, a2 * 0.24);
          g.drawImage(glare, px - gw2 / 2, py - gw2 * 0.05, gw2, gw2 * 0.1);
        }

        g.globalAlpha = Math.min(1, a2 * 1.25);
        g.fillStyle = TINT[L.kind];
        g.beginPath(); g.arc(px, py, core, 0, 6.2832); g.fill();

        if (!L.mid && groundVis > 0.02 && psc > 0.5) {
          g.globalAlpha = Math.min(0.30, a2 * 0.15 * groundVis);
          g.drawImage(sp, px - bw * 0.26, py, bw * 0.52, bw * 1.6);
        }
      }
    }
    g.globalAlpha = 1;
    g.restore();

    g.fillStyle = vigGrad;
    g.fillRect(0, 0, W, H);

    if (grainCv) {
      g.globalAlpha = 0.06;
      g.drawImage(grainCv, -((clock * 31) % 48), -((clock * 47) % 48), grainCv.width * 2, grainCv.height * 2);
      g.globalAlpha = 1;
    }
  }

  /* --- scroll: yalnızca hero yüksekliği boyunca kamerayı sürer --- */
  function readScroll() {
    var span = hero.offsetHeight - window.innerHeight;
    t = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 1;
  }

  var altEl = document.getElementById('alt');
  var fillEl = document.getElementById('fill');
  function fmtAlt(m) {
    if (m < 1000) return Math.round(m) + ' m';
    if (m < 100000) return (m / 1000).toFixed(1) + ' km';
    return Math.round(m / 1000) + ' km';
  }

  var last = 0, avg = 16, frames = 0;
  function loop(now) {
    if (!last) last = now || 0;
    var dt = (now || 0) - last; last = now || 0;
    if (dt > 0 && dt < 200) avg = avg * 0.92 + dt * 0.08;
    clock += 0.016;

    var vw = window.innerWidth || document.documentElement.clientWidth || 0;
    if (vw > 1 && Math.abs(vw - W) > 1) { build(); readScroll(); }

    tsPrev = ts;
    ts += (t - ts) * (reduce ? 1 : 0.075);
    if (Math.abs(t - ts) < 0.0003) ts = t;
    vel = Math.abs(ts - tsPrev);

    draw();
    if (altEl) altEl.textContent = fmtAlt(camY);
    if (fillEl) fillEl.style.height = (ts * 100).toFixed(1) + '%';

    if (++frames > 90) {
      frames = 0;
      if (avg > 23 && Q.tier < 3) { applyTier(Q.tier + 1); avg = 16; }
    }
    requestAnimationFrame(loop);
  }

  build();
  readScroll();
  ts = t;
  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', function () { build(); readScroll(); });
  requestAnimationFrame(loop);
})();
