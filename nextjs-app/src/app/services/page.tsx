'use client';

import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage() {
  useEffect(() => {
    // PDF viewer initialization would go here
    // For now, we'll add a placeholder
  }, []);

  const services = [
    {
      title: "Müzik Prodüksiyonu",
      description: "Besteleme, kayıt, düzenleme ve miks-mastering aşamalarında uçtan uca prodüksiyon desteği.",
      image: "/images/pist_djs_hero_1.avif",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="48" height="48" fill="currentColor" className="service_icon">
          <path d="M470.38 1.51A32 32 0 0 1 512 32V352a160 160 0 1 1-320 0V80H96a32 32 0 0 0-32 32V448a32 32 0 0 0 64 0V352h64v96a128 128 0 1 0 256 0V64h-96V32a32 32 0 0 1 32-32z"/>
        </svg>
      )
    },
    {
      title: "Video Prodüksiyonu",
      description: "Müzik videoları, reklam filmleri ve yaratıcı video içerikler için profesyonel çekim ve post-prodüksiyon hizmetleri.",
      image: "/images/pist_content-creators_header_3.avif",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="48" height="48" fill="currentColor" className="service_icon">
          <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/>
        </svg>
      )
    },
    {
      title: "Yaratıcı Danışmanlık",
      description: "Yaratıcı projelerinizi geliştirmek için uzman danışmanlık hizmetleri. Strateji geliştirme, marka konumlandırma ve kariyer rehberliği.",
      image: "/images/pist_business_header_6.jpg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="48" height="48" fill="currentColor" className="service_icon">
          <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
        </svg>
      )
    },
    {
      title: "Alan Kiralama",
      description: "Profesyonel stüdyo alanlarımızı projeleriniz için kiralayabilirsiniz. Esnek saatler ve uygun fiyatlarla.",
      image: "/images/pist_studio_space.jpg",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="48" height="48" fill="currentColor" className="service_icon">
          <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32.1-14-32.1-32c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
        </svg>
      )
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <AnimatedSection className="hero_wrap">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="padding-section_header">
              <div className="text-align-center margin-bottom margin-medium">
                <div className="align-center max-width-large">
                  <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                    <h1>Yaratıcı projeleriniz için <em>profesyonel hizmetler</em></h1>
                  </div>
                  <div className="margin-top margin-small">
                    <p data-animate="fade-in" className="text-size-large">
                      Müzik prodüksiyonundan video çekimine, yaratıcı danışmanlıktan stüdyo kiralamaya kadar 
                      tüm ihtiyaçlarınız için profesyonel çözümler sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* PDF Viewer Section */}
      <AnimatedSection className="section_pdf_viewer">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="padding-section_large">
              <div className="text-align-center margin-bottom margin-medium">
                <div className="align-center max-width-large">
                  <div className="text-rich-text_page w-richtext" data-animate="fade-in">
                    <h2>Hizmet Broşürümüz</h2>
                    <p className="text-size-regular">Aşağıda yer alan broşürümüzü sayfa sayfa kaydırarak görüntüleyebilirsiniz.</p>
                  </div>
                </div>
              </div>
              <div id="pdf-viewer" className="pdf_viewer" aria-label="PDF görüntüleyici" data-animate="fade-in">
                <div className="pdf_message">PDF yükleniyor…</div>
              </div>

              {/* Contact CTA under PDF viewer */}
              <div className="text-align-center margin-top margin-medium" data-animate="fade-in" style={{marginTop: '20px'}}>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true" 
                  className="button apply-open-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="button_container">
                    <div className="button_text">İletişime Geç</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Services Section */}
      <AnimatedSection className="section_services">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="padding-section_large">
              <div className="services_grid">
                {services.map((service, index) => (
                  <div key={index} className="service_card" data-animate="fade-in">
                    <div className="service_image_wrap">
                      <Image 
                        src={service.image} 
                        alt={service.title} 
                        width={400}
                        height={300}
                        className="service_image" 
                        loading="lazy"
                      />
                    </div>
                    <div className="service_icon_wrap">
                      {service.icon}
                    </div>
                    <div className="service_content">
                      <h3 className="service_title">{service.title}</h3>
                      <p className="service_description">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection className="section_contact_cta">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="padding-section_large">
              <div className="text-align-center">
                <div className="align-center max-width-medium">
                  <h2 className="heading-style-h2" data-animate="fade-in">
                    Projelerinizi hayata geçirmeye hazır mısınız?
                  </h2>
                  <div className="margin-top margin-small">
                    <p className="text-size-large" data-animate="fade-in">
                      Hizmetlerimiz hakkında detaylı bilgi almak ve projelerinizi görüşmek için bizimle iletişime geçin.
                    </p>
                  </div>
                  <div className="margin-top margin-medium">
                    <div className="button-group is-centered" data-animate="fade-in">
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true"
                        className="button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="button_container">
                          <div className="button_text">İletişime Geç</div>
                          <div className="button_text_absolute">İletişime Geç</div>
                        </div>
                      </a>
                      <Link href="/contact" className="button w-inline-block">
                        <div className="button_container">
                          <div className="button_text">İletişim Bilgileri</div>
                          <div className="button_text_absolute">İletişim Bilgileri</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </Layout>
  );
}