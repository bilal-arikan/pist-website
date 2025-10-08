'use client'

import Layout from '@/components/Layout'
import AnimatedSection from '@/components/AnimatedSection'
import { ResponsiveContainer, ResponsiveText } from '@/components/ResponsiveContainer'
import StructuredData, { organizationData, localBusinessData } from '@/components/StructuredData'
import { useTextAnimation } from '@/hooks/useGSAP'
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const texts = [
    'müzisyen',
    'prodüktör', 
    'ses teknisyeni',
    'DJ',
    'podcaster',
    'fotoğrafçı',
    'video editörü',
    'yaratıcı'
  ]

  const textRef = useTextAnimation(texts, 3000)

  return (
    <Layout>
      <StructuredData data={organizationData} />
      <StructuredData data={localBusinessData} />
      <section className="home-hero_wrap">
        {/* Background Video */}
        <div 
          data-poster-url="/videos/pist_homepage_video-poster.jpg"
          data-video-urls="/videos/pist_homepage_video.mp4,/videos/pist_homepage_video.webm" 
          data-autoplay="true"
          data-loop="true" 
          data-wf-ignore="true" 
          className="bg-video_element w-background-video w-background-video-atom"
        >
          <video 
            id="homepage-video" 
            autoPlay 
            loop
            style={{backgroundImage: 'url("/videos/pist_homepage_video-poster.jpg")'}} 
            muted 
            playsInline
            data-wf-ignore="true" 
            data-object-fit="cover"
          >
            <source src="/videos/pist_homepage_video.mp4" data-wf-ignore="true" />
            <source src="/videos/pist_homepage_video.webm" data-wf-ignore="true" />
          </video>
        </div>

        {/* Background Overlay */}
        <div className="g_bg-overlay_element"></div>

        {/* Hero Content */}
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="home-hero_layout">
              <div className="padding-section is-top-bottom">
                {/* Members Upheading */}
                <div className="margin-bottom margin-small">
                  <div className="button-group is-centered">
                    <div className="members-upheading_element">
                      <Image 
                        src="/images/avatar4.jpg" 
                        alt="Üye avatarı" 
                        width={40} 
                        height={40}
                        className="members-upheading_image" 
                      />
                      <Image 
                        src="/images/avatar1.jpg" 
                        alt="Üye avatarı" 
                        width={40} 
                        height={40}
                        className="members-upheading_image is-moved" 
                      />
                      <Image 
                        src="/images/avatar3.jpg" 
                        alt="Üye avatarı" 
                        width={40} 
                        height={40}
                        className="members-upheading_image is-moved" 
                      />
                      <div className="margin-left margin-xsmall">
                        <div className="text-size-small_mobile">İstanbul&apos;un yaratıcı merkezi</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Heading */}
                <ResponsiveContainer
                  className="heading-style-h1_display"
                  mobileClassName="mobile-hero-title"
                >
                  PİST: Türkiye&apos;de ilk paylaşımlı stüdyo
                </ResponsiveContainer>

                {/* Dynamic Text Change */}
                <div ref={textRef as any} className="text-change_wrap">
                  müzisyen
                </div>

                {/* Description */}
                <div className="margin-top margin-xsmall">
                  <div className="align-center max-width-medium">
                    <ResponsiveText
                      mobileSize="large"
                      tabletSize="large"
                      desktopSize="large"
                      className="hero-description"
                    >
                      <p>
                        Projelerin ve hayallerin yükselişe geçmesi için buradayız. Her başarılı yolculuk, sağlam bir PİST&apos;te başlar.
                      </p>
                    </ResponsiveText>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="margin-top margin-large">
                  <div className="button-group is-2-buttons">
                    <div data-wf--button-primary-typeform--variant="fullsize" className="button_wrap">
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true" 
                        id="apply-open"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940"
                      >
                        <div className="button_container">
                          <div className="button_text">İletişime Geç</div>
                          <div className="button_text_absolute">İletişime Geç</div>
                        </div>
                      </a>
                    </div>
                    <Link 
                      href="/location-pist" 
                      className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940 w-inline-block"
                    >
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
    </Layout>
  );
}
