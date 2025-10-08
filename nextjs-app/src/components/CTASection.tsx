'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CTASection: React.FC = () => {
  return (
    <section className="section_cta">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="cta_layout">
            <div className="padding-section is-top-bottom">
              <div className="cta_background">
                <Image 
                  src="/images/cta-background.jpg" 
                  alt="PİST Stüdyo"
                  className="cta_background-image"
                  width={1200}
                  height={600}
                  loading="lazy"
                />
                <div className="cta_overlay"></div>
              </div>
              
              <div className="cta_content">
                <div className="text-align-center">
                  <div className="margin-bottom margin-small">
                    <div className="text-size-small_mobile text-color-white">Başlamaya Hazır mısın?</div>
                  </div>
                  
                  <div className="margin-bottom margin-medium">
                    <h2 className="heading-style-h2 text-color-white">
                      Yaratıcı projenizi bugün başlatın
                    </h2>
                  </div>
                  
                  <div className="margin-bottom margin-large">
                    <div className="max-width-large">
                      <p className="text-size-large text-color-white">
                        PİST'te yerinizi ayırtın ve profesyonel ekipmanlarla projelerinizi hayata geçirin. 
                        İlk rezervasyonunuzda %20 indirim fırsatını kaçırmayın.
                      </p>
                    </div>
                  </div>
                  
                  <div className="cta_buttons">
                    <div className="button-group is-2-buttons">
                      <div data-wf--button-primary-typeform--variant="fullsize" className="button_wrap">
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true" 
                          id="cta-apply-open"
                          className="button w-variant-2a327968-c7e4-f546-2f21-f1f69ae89940"
                        >
                          <div className="button_container">
                            <div className="button_text">Hemen Başvur</div>
                            <div className="button_text_absolute">Hemen Başvur</div>
                          </div>
                        </a>
                      </div>
                      
                      <Link href="/pricing" className="button w-variant-secondary w-inline-block">
                        <div className="button_container">
                          <div className="button_text">Fiyatları Gör</div>
                          <div className="button_text_absolute">Fiyatları Gör</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="margin-top margin-medium">
                    <div className="cta_features">
                      <div className="cta_feature">
                        <div className="cta_feature-icon">✓</div>
                        <div className="text-size-small text-color-white">24/7 Erişim</div>
                      </div>
                      
                      <div className="cta_feature">
                        <div className="cta_feature-icon">✓</div>
                        <div className="text-size-small text-color-white">Profesyonel Ekipman</div>
                      </div>
                      
                      <div className="cta_feature">
                        <div className="cta_feature-icon">✓</div>
                        <div className="text-size-small text-color-white">Teknik Destek</div>
                      </div>
                      
                      <div className="cta_feature">
                        <div className="cta_feature-icon">✓</div>
                        <div className="text-size-small text-color-white">Yaratıcı Topluluk</div>
                      </div>
                    </div>
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

export default CTASection;