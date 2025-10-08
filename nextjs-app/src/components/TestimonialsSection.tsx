'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const TestimonialsSection: React.FC = () => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Swiper when component mounts
    if (typeof window !== 'undefined') {
      import('swiper/bundle').then((SwiperModule) => {
        const Swiper = SwiperModule.default;
        
        swiperRef.current = new Swiper('.testimonials-swiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
        });
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Ahmet Kaya',
      role: 'Müzik Prodüktörü',
      avatar: '/images/avatar1.jpg',
      content: 'PİST\'te çalışmak gerçekten harika bir deneyim. Profesyonel ekipmanlar ve yaratıcı atmosfer sayesinde projelerimi çok daha kaliteli bir şekilde tamamlayabiliyorum.',
      rating: 5
    },
    {
      id: 2,
      name: 'Elif Demir',
      role: 'Podcaster',
      avatar: '/images/avatar2.jpg',
      content: 'Podcast stüdyosu mükemmel ses kalitesi sunuyor. Teknik destek ekibi de her zaman yardımcı oluyor. Kesinlikle tavsiye ederim.',
      rating: 5
    },
    {
      id: 3,
      name: 'Murat Özkan',
      role: 'Fotoğrafçı',
      avatar: '/images/avatar3.jpg',
      content: 'Fotoğraf stüdyosundaki ışık sistemi ve ekipmanlar sayesinde müşterilerime çok daha profesyonel hizmet verebiliyorum.',
      rating: 5
    },
    {
      id: 4,
      name: 'Zeynep Yılmaz',
      role: 'Video Yapımcısı',
      avatar: '/images/avatar4.jpg',
      content: 'Video prodüksiyon stüdyosu tam bir hayal. 4K çekim imkanları ve post-prodüksiyon alanı ile işlerimi çok daha hızlı tamamlıyorum.',
      rating: 5
    },
    {
      id: 5,
      name: 'Can Arslan',
      role: 'DJ',
      avatar: '/images/avatar5.jpg',
      content: 'Müzik stüdyosundaki ekipmanlar endüstri standardında. Mixing ve mastering işlemlerimi burada yapıyorum ve sonuçlardan çok memnunum.',
      rating: 5
    }
  ];

  return (
    <section className="section_testimonials">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="testimonials_layout">
            <div className="padding-section is-top-bottom">
              <div className="margin-bottom margin-large">
                <div className="text-align-center">
                  <div className="margin-bottom margin-small">
                    <div className="text-size-small_mobile">Üyelerimizden</div>
                  </div>
                  
                  <h2 className="heading-style-h2">
                    PİST ailesinin deneyimleri
                  </h2>
                  
                  <div className="margin-top margin-small">
                    <div className="max-width-large">
                      <p className="text-size-large">
                        Yaratıcı projelerini PİST'te hayata geçiren üyelerimizin hikayelerini keşfedin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonials_slider-wrap">
                <div className="swiper testimonials-swiper">
                  <div className="swiper-wrapper">
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="swiper-slide">
                        <div className="testimonial_card">
                          <div className="testimonial_content">
                            <div className="testimonial_rating">
                              {[...Array(testimonial.rating)].map((_, index) => (
                                <span key={index} className="testimonial_star">★</span>
                              ))}
                            </div>
                            
                            <div className="margin-top margin-small margin-bottom margin-medium">
                              <p className="testimonial_text">"{testimonial.content}"</p>
                            </div>
                            
                            <div className="testimonial_author">
                              <div className="testimonial_avatar-wrap">
                                <Image 
                                  src={testimonial.avatar} 
                                  alt={testimonial.name}
                                  className="testimonial_avatar"
                                  width={50}
                                  height={50}
                                />
                              </div>
                              
                              <div className="testimonial_author-info">
                                <div className="testimonial_name">{testimonial.name}</div>
                                <div className="testimonial_role">{testimonial.role}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="swiper-pagination"></div>
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;