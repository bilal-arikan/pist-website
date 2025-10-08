'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Sesine Sağlık: Nefes, Beden ve Anlam Atölyesi',
      date: '11 Ekim 2025',
      description: 'Vokal, kelimeleri şarkıya dönüştürmekten daha fazlasıdır; o, ruhun bir ifadesidir. Bu atölyede, sesinizin en derin kaynaklarına inerek bir yolculuğa çıkacaksınız. Doğru nefesle sesinizi beslemeyi, bedeninizin sahnedeki duruşunu ve enerjisini en verimli şekilde kullanmayı ve söylediğiniz her sözün ardındaki anlamı dinleyiciye samimiyetle ulaştırmayı deneyimleyeceksiniz. Sesinizle kendi hikayenizi yazmak için bize katılın.',
      image: '/images/nefes-beden.png',
      href: '/nefes-atolyesi'
    },
    {
      id: 2,
      title: 'Böyleyken Böyle ve Elif Demirel & Doğaç Erinç Mini Konseri',
      date: '17 Ekim 2025',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '/images/boyleykenboyle-elifdogac-minikonser.png',
      href: '/boyleyken-elifdogar-minikonser'
    },
    {
      id: 3,
      title: 'Halloween Partisi',
      date: '25 Ekim 2025 · 20:30',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at nisl vitae arcu condimentum varius.',
      image: '/images/pist-haloween1.png',
      href: '/halloween-partisi'
    }
  ]

  const pastEvents = [
    {
      id: 1,
      title: 'Online Seminer 1',
      date: '21 Eylül 2025',
      description: 'Uzmanlarımızla çevrim içi buluşma: üretim alışkanlıkları, yaratıcılığı besleyen rutinler ve kariyer planlaması üzerine pratik öneriler.',
      image: '/images/online-seminer1.png',
      href: '/onli-seminer1'
    }
  ]

  return (
    <Layout>
      <main className="main-wrapper">
        {/* Hero Section */}
        <section className="hero_wrap">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section_header">
                <div className="text-align-center margin-bottom margin-medium">
                  <div className="align-center max-width-large">
                    <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                      <h1>Yaratıcı buluşmalar için <em>özel etkinlikler</em></h1>
                    </div>
                    <div className="margin-top margin-small">
                      <p data-animate="fade-in" className="text-size-large">
                        PİST Stüdyo&apos;nun özel etkinliklerine katılın.
                        Yaratıcılığınızı geliştirin, yeni bağlantılar kurun ve İstanbul&apos;un yaratıcı topluluğuyla buluşun.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="button-group is-centered">
                  <div data-wf--button-primary-typeform--variant="base" className="button_wrap">
                    <a href="#siradaki-baslik" className="button">
                      <div className="button_container">
                        <div className="button_text">Etkinliklere Göz At</div>
                        <div className="button_text_absolute">Etkinliklere Göz At</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section data-theme="light" className="events_wrap u_section_radius_top">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-small w-container">
              <div className="padding-section is-top">
                <div className="text-align-center margin-bottom margin-xxlarge">
                  <div className="align-center max-width-large">
                    <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                      <h2 id="siradaki-baslik">Yaklaşan etkinlikler <em>PİST&apos;te</em></h2>
                    </div>
                  </div>
                </div>
                <div className="w-dyn-list">
                  <div role="list" className="g_list w-dyn-items">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} role="listitem" className="w-dyn-item">
                        <a href={event.href} className="event-card_element w-inline-block">
                          <div className="event-card_image-wrap">
                            <Image 
                              src={event.image} 
                              alt={event.title} 
                              className="g_image_absolute"
                              width={400}
                              height={300}
                            />
                            <div className="g_card-tag_wrap"></div>
                          </div>
                          <div className="event-card_content_wrap">
                            <div className="relative">
                              <div className="text-style-muted">{event.date}</div>
                              <div className="margin-top margin-xxsmall">
                                <h3 className="heading-style-h5">{event.title}</h3>
                              </div>
                              <div className="margin-top margin-tiny">
                                <p>{event.description}</p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Events Section */}
        <section data-theme="light" className="events_wrap u_section_radius_top">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-small w-container">
              <div className="padding-section is-top">
                <div className="text-align-center margin-bottom margin-xxlarge">
                  <div className="align-center max-width-large">
                    <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                      <h2>Geçmiş Etkinlikler</h2>
                    </div>
                  </div>
                </div>
                <div className="w-dyn-list">
                  <div role="list" className="g_list w-dyn-items">
                    {pastEvents.map((event) => (
                      <div key={event.id} role="listitem" className="w-dyn-item">
                        <a href={event.href} className="event-card_element w-inline-block">
                          <div className="event-card_image-wrap">
                            <Image 
                              src={event.image} 
                              alt={event.title} 
                              className="g_image_absolute"
                              width={400}
                              height={300}
                            />
                            <div className="g_card-tag_wrap"></div>
                          </div>
                          <div className="event-card_content_wrap">
                            <div className="relative">
                              <div className="text-style-muted">{event.date}</div>
                              <div className="margin-top margin-xxsmall">
                                <h3 className="heading-style-h5">{event.title}</h3>
                              </div>
                              <div className="margin-top margin-tiny">
                                <p>{event.description}</p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        #siradaki-baslik {
          scroll-margin-top: 110px;
        }
        @media (min-width: 992px) {
          #siradaki-baslik {
            scroll-margin-top: 130px;
          }
        }
      `}</style>
    </Layout>
  )
}