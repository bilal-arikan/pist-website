'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  useEffect(() => {
    // Text animation script
    const texts = document.querySelectorAll('.text-change_text');
    let currentIndex = 0;
    const height = 1.125; // Height of the text in em
    const transitionDuration = 600; // 0.5 seconds for the transition
    const visibilityDuration = 1200; // 1.2 seconds for each text being visible

    function animateText() {
      currentIndex++;
      // If we reach the last element (which is the same as the first), reset after animation
      if (currentIndex === texts.length) {
        texts.forEach(text => {
          (text as HTMLElement).style.transition = 'none'; // Disable transition for instant reset
          (text as HTMLElement).style.transform = 'translateY(0)';
        });
        currentIndex = 1; // Reset to the first text (index 1)
        // Wait a tiny bit before applying the transition again
        setTimeout(() => {
          texts.forEach((text, index) => {
            (text as HTMLElement).style.transition = `transform ${transitionDuration}ms ease-in-out`;
            (text as HTMLElement).style.transform = `translateY(-${height * currentIndex}em)`;
          });
        }, 50);
      } else {
        texts.forEach((text, index) => {
          (text as HTMLElement).style.transition = `transform ${transitionDuration}ms ease-in-out`;
          (text as HTMLElement).style.transform = `translateY(-${height * currentIndex}em)`;
        });
      }
    }

    // Set interval to change the text every 1.2 + 0.5 seconds (visibility + transition)
    const interval = setInterval(animateText, visibilityDuration + transitionDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home-hero_wrap">
      <div 
        data-poster-url="/videos/pist_homepage_video-poster.jpg"
        data-video-urls="/videos/pist_homepage_video.mp4,/videos/pist_homepage_video.webm" 
        data-autoplay="true"
        data-loop="true" 
        data-wf-ignore="true" 
        className="bg-video_element w-background-video w-background-video-atom"
      >
        <video 
          id="644eedef-6a4e-ebbf-7383-e99aeefa71ec-video" 
          autoPlay 
          loop
          style={{ backgroundImage: 'url("/videos/pist_homepage_video-poster.jpg")' }} 
          muted 
          playsInline
          data-wf-ignore="true" 
          data-object-fit="cover"
        >
          <source src="/videos/pist_homepage_video.mp4" data-wf-ignore="true" />
          <source src="/videos/pist_homepage_video.webm" data-wf-ignore="true" />
        </video>
      </div>
      
      <div className="g_bg-overlay_element"></div>
      
      <div className="padding-global">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="home-hero_layout">
            <div className="padding-section is-top-bottom">
              <div className="margin-bottom margin-small">
                <div className="button-group is-centered">
                  <div className="members-upheading_element">
                    <Image src="/images/avatar4.jpg" alt="" className="members-upheading_image" width={40} height={40} />
                    <Image src="/images/avatar1.jpg" alt="" className="members-upheading_image is-moved" width={40} height={40} />
                    <Image src="/images/avatar3.jpg" alt="" className="members-upheading_image is-moved" width={40} height={40} />
                    <div className="margin-left margin-xsmall">
                      <div className="text-size-small_mobile">İstanbul'un yaratıcı merkezi</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="heading-style-h1_display">PİST: Türkiye'de ilk paylaşımlı stüdyo</div>
              
              <div className="text-change_wrap">
                <div className="text-change_text">müzik yapımcıları</div>
                <div className="text-change_text">DJ'ler</div>
                <div className="text-change_text">podcaster'lar</div>
                <div className="text-change_text">fotoğrafçılar</div>
                <div className="text-change_text">video yapımcıları</div>
                <div className="text-change_text">yaratıcı ekipler</div>
                <div className="text-change_text">sanatçılar</div>
                <div className="text-change_text">müzik yapımcıları</div>
              </div>
              
              <div className="margin-top margin-xsmall">
                <div className="align-center max-width-medium">
                  <p className="text-size-xlarge">
                    Projelerin ve hayallerin yükselişe geçmesi için buradayız. Her başarılı yolculuk, sağlam bir PİST'te başlar.
                  </p>
                </div>
              </div>
              
              <div className="margin-top margin-large">
                <div className="button-group is-2-buttons">
                  <div data-wf--button-primary-typeform--variant="fullsize" className="button_wrap">
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true" 
                      id="apply-open"
                      className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940"
                    >
                      <div className="button_container">
                        <div className="button_text">İletişime Geç</div>
                        <div className="button_text_absolute">İletişime Geç</div>
                      </div>
                    </a>
                  </div>
                  
                  <Link href="/location-pist" className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940 w-inline-block">
                    <div className="button_container">
                      <div className="button_text">Stüdyoyu Gez</div>
                      <div className="button_text_absolute">Stüdyoyu Gez</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;