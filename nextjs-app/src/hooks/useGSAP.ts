'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP plugins'ı register et
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useGSAP = () => {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Fade-in ve scale-in animasyonları için elementleri seç
    const animatedElements = container.querySelectorAll('[data-animate="fade-in"], [data-animate="scale-in"]')

    if (animatedElements.length > 0) {
      // GSAP timeline oluştur
      gsap.fromTo(
        animatedElements,
        {
          opacity: 0,
          y: (i, el) => {
            return el.getAttribute('data-animate') === 'fade-in' ? '3rem' : '0rem'
          },
          scale: (i, el) => {
            return el.getAttribute('data-animate') === 'scale-in' ? 0.95 : 1
          }
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'expoScale(0.5,7,none)',
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: 'top 50%',
          }
        }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return containerRef
}

// Basit fade-in animasyonu için hook
export const useFadeIn = () => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return elementRef
}

// Text animasyonu için hook (ana sayfadaki değişen metinler için)
export const useTextAnimation = (texts: string[], interval: number = 3000) => {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!textRef.current || texts.length === 0) return

    let currentIndex = 0
    const element = textRef.current

    const animateText = () => {
      // Mevcut metni fade out yap
      gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          // Metni değiştir
          currentIndex = (currentIndex + 1) % texts.length
          element.textContent = texts[currentIndex]
          
          // Yeni metni fade in yap
          gsap.fromTo(element, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3 }
          )
        }
      })
    }

    // İlk metni ayarla
    element.textContent = texts[0]

    // Interval başlat
    const intervalId = setInterval(animateText, interval)

    return () => {
      clearInterval(intervalId)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [texts, interval])

  return textRef
}