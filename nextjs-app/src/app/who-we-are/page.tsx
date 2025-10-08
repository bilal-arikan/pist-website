'use client';

import React from 'react';
import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';

export default function WhoWeArePage() {
  return (
    <Layout>
      <main className="main-wrapper">
        {/* Hero Section */}
        <AnimatedSection className="hero_wrap">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section_header">
                <div className="text-align-center margin-bottom margin-medium">
                  <div className="align-center max-width-large">
                    <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                      <h1>Yaratıcı topluluğumuzla <em>tanışın</em></h1>
                    </div>
                    <div className="margin-top margin-small">
                      <p data-animate="fade-in" className="text-size-large">
                        PİST Stüdyo, İstanbul&apos;un kalbi Beyoğlu&apos;nda yaratıcı profesyonellerin 
                        buluşma noktası olarak kuruldu. Hikayemizi keşfedin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Story Section */}
        <section className="section_about-story">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section">
                <div className="w-layout-grid about-story_grid">
                  <div className="about-story_content">
                    <div className="margin-bottom margin-medium">
                      <div data-animate="fade-in" className="text-rich-text w-richtext">
                        <h2>Hikayemiz</h2>
                        <p>
                          PİST Stüdyo, İstanbul&apos;da yaratıcı endüstrilerin hızla geliştiği bir dönemde, bu alandaki
                          profesyonellerin ihtiyaçlarını karşılamak amacıyla doğdu. Müzik yapımcıları, DJ&apos;ler,
                          podcaster&apos;lar, fotoğrafçılar ve diğer yaratıcı profesyoneller için tasarlanmış modern stüdyo
                          alanlarımız, sadece teknik altyapı sunmakla kalmıyor, aynı zamanda bir topluluk oluşturuyor.
                        </p>
                        <p>
                          Vizyonumuz, İstanbul&apos;u yaratıcı endüstrilerin merkezi haline getirmek ve yerel yeteneklerin
                          küresel sahneye çıkmasına destek olmaktır. Her gün, stüdyolarımızda yeni projeler hayat buluyor,
                          işbirlikleri doğuyor ve yaratıcı sınırlar zorlanıyor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section_mission">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section">
                <div className="w-layout-grid mission_grid">
                  <div className="mission_item">
                    <div className="mission_icon">
                      <div className="icon-embed w-embed">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div data-animate="fade-in" className="text-rich-text w-richtext">
                      <h3>Topluluk Oluşturmak</h3>
                      <p>
                        Farklı disiplinlerden yaratıcı profesyonelleri bir araya getirerek, işbirliği ve networking
                        fırsatları yaratıyoruz.
                      </p>
                    </div>
                  </div>
                  <div className="mission_item">
                    <div className="mission_icon">
                      <div className="icon-embed w-embed">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div data-animate="fade-in" className="text-rich-text w-richtext">
                      <h3>Büyümeyi Hızlandırmak</h3>
                      <p>
                        Eğitim programları, mentörlük ve networking etkinlikleri ile yaratıcı kariyerlerin gelişimini
                        destekliyoruz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section_cta">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section">
                <div className="text-align-center">
                  <div className="margin-bottom margin-medium">
                    <div data-animate="fade-in" className="text-rich-text w-richtext">
                      <h2>Topluluğumuza katılın</h2>
                      <p>
                        PİST Stüdyo&apos;da yaratıcı yolculuğunuza başlayın. Projelerinizi hayata geçirin, yeni bağlantılar
                        kurun ve İstanbul&apos;un yaratıcı topluluğunun bir parçası olun.
                      </p>
                    </div>
                  </div>
                  <div className="button-group is-centered">
                    <div data-wf--button-primary-typeform--variant="base" className="button_wrap">
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true" 
                        target="_blank" 
                        className="button"
                      >
                        <div className="button_container">
                          <div className="button_text">Hemen Başvur</div>
                          <div className="button_text_absolute">Hemen Başvur</div>
                        </div>
                      </a>
                    </div>
                    <a href="/studios" className="button is-secondary w-inline-block">
                      <div className="button_container">
                        <div className="button_text">Stüdyolarımızı Keşfedin</div>
                        <div className="button_text_absolute">Stüdyolarımızı Keşfedin</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}