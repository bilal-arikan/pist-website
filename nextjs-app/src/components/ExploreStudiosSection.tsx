'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ExploreStudiosSection: React.FC = () => {
  const studios = [
    {
      id: 'music-production',
      title: 'Müzik Prodüksiyon',
      description: 'Profesyonel ses kayıt ve mixing ekipmanları ile müzik projelerinizi hayata geçirin.',
      image: '/images/studio-music.jpg',
      features: ['Pro Tools HD', 'Analog Mixing Console', 'Premium Microphones', 'Acoustic Treatment'],
      link: '/studios/music-production'
    },
    {
      id: 'podcast',
      title: 'Podcast Stüdyosu',
      description: 'Kristal berraklığında ses kalitesi ile podcast kayıtlarınızı gerçekleştirin.',
      image: '/images/studio-podcast.jpg',
      features: ['Multi-track Recording', 'Live Streaming Setup', 'Remote Interview Capability', 'Sound Isolation'],
      link: '/studios/podcast'
    },
    {
      id: 'photography',
      title: 'Fotoğraf Stüdyosu',
      description: 'Profesyonel ışık sistemi ve ekipmanlar ile çekimlerinizi yapın.',
      image: '/images/studio-photo.jpg',
      features: ['Professional Lighting', 'Backdrop Systems', 'High-end Cameras', 'Props & Accessories'],
      link: '/studios/photography'
    },
    {
      id: 'video-production',
      title: 'Video Prodüksiyon',
      description: '4K video çekim ve post-prodüksiyon imkanları ile projelerinizi tamamlayın.',
      image: '/images/studio-video.jpg',
      features: ['4K Cameras', 'Green Screen', 'Editing Suites', 'Color Grading'],
      link: '/studios/video-production'
    }
  ];

  return (
    <section className="section_explore-studios">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="explore-studios_layout">
            <div className="padding-section is-top-bottom">
              <div className="margin-bottom margin-large">
                <div className="text-align-center">
                  <div className="margin-bottom margin-small">
                    <div className="text-size-small_mobile">Stüdyolarımız</div>
                  </div>
                  
                  <h2 className="heading-style-h2">
                    İhtiyacınıza uygun stüdyoyu keşfedin
                  </h2>
                  
                  <div className="margin-top margin-small">
                    <div className="max-width-large">
                      <p className="text-size-large">
                        Her yaratıcı disiplin için özel olarak tasarlanmış, modern ekipmanlarla donatılmış stüdyolarımız.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="explore-studios_grid">
                {studios.map((studio) => (
                  <div key={studio.id} className="explore-studios_item">
                    <Link href={studio.link} className="explore-studios_link w-inline-block">
                      <div className="explore-studios_image-wrap">
                        <Image 
                          src={studio.image} 
                          alt={studio.title}
                          className="explore-studios_image"
                          width={400}
                          height={300}
                          loading="lazy"
                        />
                        
                        <div className="explore-studios_overlay">
                          <div className="explore-studios_overlay-content">
                            <div className="button_container">
                              <div className="button_text">Detayları Gör</div>
                              <div className="button_text_absolute">Detayları Gör</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="explore-studios_content">
                        <div className="margin-bottom margin-xsmall">
                          <h3 className="heading-style-h4">{studio.title}</h3>
                        </div>
                        
                        <div className="margin-bottom margin-small">
                          <p className="text-size-medium">{studio.description}</p>
                        </div>
                        
                        <div className="explore-studios_features">
                          {studio.features.map((feature, index) => (
                            <div key={index} className="explore-studios_feature">
                              <div className="explore-studios_feature-icon">✓</div>
                              <div className="text-size-small">{feature}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="margin-top margin-large">
                <div className="text-align-center">
                  <Link href="/studios" className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940 w-inline-block">
                    <div className="button_container">
                      <div className="button_text">Tüm Stüdyoları Gör</div>
                      <div className="button_text_absolute">Tüm Stüdyoları Gör</div>
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

export default ExploreStudiosSection;