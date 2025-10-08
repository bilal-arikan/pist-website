'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection: React.FC = () => {
  useEffect(() => {
    // Parallax slider functionality
    const initParallaxSlider = () => {
      if (typeof window !== 'undefined' && window.Flickity) {
        const parallaxSliderCarousel = ".parallax-slider_component";
        const parallaxSliderSlides = ".parallax-slider_slide";
        const parallaxSliderParallaxPercentage = 49;
        
        const parallaxSliderFlkty = new window.Flickity(parallaxSliderCarousel, {
          contain: true,
          freeScroll: false,
          percentPosition: true,
          pageDots: false,
          cellSelector: parallaxSliderSlides,
          cellAlign: "left",
          resize: true,
          selectedAttraction: 0.04,
          friction: 0.5,
          dragThreshold: 0.5,
        });

        parallaxSliderFlkty.on("scroll", function (progress: number) {
          setParallaxSliderImagePositions();
          const progressFill = document.querySelector(".parallax-slider_progress_fill") as HTMLElement;
          if (progressFill) {
            progressFill.style.width = `${progress * 100}%`;
          }
        });

        function setParallaxSliderImagePositions() {
          const slides = document.querySelectorAll(parallaxSliderSlides);
          const carousel = document.querySelector(parallaxSliderCarousel) as HTMLElement;
          
          if (!carousel) return;
          
          slides.forEach((slide) => {
            const targetElement = slide as HTMLElement;
            const elementOffset = targetElement.offsetLeft + targetElement.offsetWidth - carousel.offsetLeft;
            const parentWidth = carousel.offsetWidth + targetElement.offsetWidth;
            let myProgress = elementOffset / parentWidth;
            let slideProgress = parallaxSliderParallaxPercentage * myProgress;
            
            if (slideProgress > parallaxSliderParallaxPercentage) {
              slideProgress = parallaxSliderParallaxPercentage;
            } else if (slideProgress < 0) {
              slideProgress = 0;
            }
            
            const image = targetElement.querySelector(".image") as HTMLElement;
            if (image) {
              image.style.transform = `translateX(-${slideProgress}%)`;
            }
          });
        }

        setParallaxSliderImagePositions();
      }
    };

    // Load Flickity if not already loaded
    if (!window.Flickity) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js';
      script.onload = initParallaxSlider;
      document.head.appendChild(script);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/flickity@2/dist/flickity.min.css';
      document.head.appendChild(link);
    } else {
      initParallaxSlider();
    }
  }, []);

  return (
    <section className="about_wrap overflow-hidden">
      <div className="padding-global relative">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="padding-section">
            <div className="text-align-center">
              <div className="text-align-center margin-bottom margin-medium">
                <div className="align-center max-width-large">
                  <div className="margin-bottom margin-small">
                    <div data-animate="fade-in" className="upheading is-pink">
                      <div>PİST</div>
                    </div>
                  </div>
                  <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                    <h2>Yaratıcılığınızı <em>arşa çıkaran stüdyo</em></h2>
                  </div>
                </div>
              </div>
              <div className="align-center max-width-xlarge">
                <div data-animate="fade-in" className="text-rich-text_page text-size-large w-richtext">
                  <p><strong>Biz Kimiz?</strong><br />
                  Yaratıcı ve samimi ekibimizle, müzik ve prodüksiyon tutkumuzu sizlerle paylaşıyoruz.</p>
                  <p><strong>Ne Yapıyoruz?</strong><br />
                  Müzik ve video prodüksiyonları, eğitimler ve etkinliklerle yaratıcılığınızı destekliyoruz.</p>
                  <p><strong>Neden PİST?</strong><br />
                  Çünkü burası sadece bir stüdyo değil, hedeflerinize ulaşmanızı sağlayan bir pist. Her detay sizin için düşünüldü.</p>
                </div>
              </div>
              <div className="margin-top margin-medium">
                <div data-animate="fade-in" className="button-group is-centered">
                  <div data-wf--button-primary-typeform--variant="base" className="button_wrap">
                    <Link href="/services" className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940 w-inline-block">
                      <div className="button_container">
                        <div className="button_text">Hizmetleri Keşfet</div>
                        <div className="button_text_absolute">Hizmetleri Keşfet</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div data-animate="fade-in" className="margin-top margin-xxlarge">
              <div>
                <style jsx>{`
                  .flickity-viewport {
                    width: 100%;
                    overflow: visible !important;
                  }
                  .flickity-button {
                    display: none;
                  }
                  .flickity-viewport {
                    outline: none;
                  }
                `}</style>
                
                <div className="parallax-slider_component">
                  <div className="parallax-slider_slide">
                    <Image 
                      alt="PİST Stüdyo 1"
                      src="/images/about-studio-1.jpg"
                      width={940}
                      height={600}
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                      className="image"
                    />
                  </div>
                  <div className="parallax-slider_slide">
                    <Image 
                      alt="PİST Stüdyo 2"
                      src="/images/about-studio-2.jpg"
                      width={940}
                      height={600}
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                      className="image"
                    />
                  </div>
                  <div className="parallax-slider_slide">
                    <Image 
                      alt="PİST Stüdyo 3"
                      src="/images/studio3.jpeg"
                      width={940}
                      height={600}
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                      className="image"
                    />
                  </div>
                  <div className="parallax-slider_slide">
                    <Image 
                      alt="PİST Stüdyo 4"
                      src="/images/studio4.jpg"
                      width={940}
                      height={600}
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                      className="image"
                    />
                  </div>
                  <div className="parallax-slider_slide">
                    <Image 
                      alt="PİST Stüdyo 5"
                      src="/images/studio5.jpg"
                      width={940}
                      height={600}
                      sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                      className="image"
                    />
                  </div>
                </div>
                <div className="margin-top margin-medium">
                  <div className="parallax-slider_progress_wrap">
                    <div className="parallax-slider_progress_fill"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;