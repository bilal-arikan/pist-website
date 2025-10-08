'use client';

import Layout from '@/components/Layout'

export default function ContactPage() {
  return (
    <Layout>
      <main className="main-wrapper">
        {/* Hero Section */}
        <section className="hero_wrap">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section_header hero_simple">
                <div className="text-align-center margin-bottom margin-medium">
                  <div className="align-center max-width-large">
                    <div data-animate="fade-in" className="text-rich-text_page w-richtext">
                      <h1>Bize <em>ulaşın</em></h1>
                    </div>
                    <div className="margin-top margin-small">
                      <p data-animate="fade-in" className="text-size-large">
                        Sorularınız, projeleriniz veya işbirliği teklifiniz için bize yazın. En kısa sürede dönüş yapıyoruz.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Contact Cards */}
                <div className="contact_cards">
                  <div className="contact_card">
                    <div className="text-weight-semibold">Telefon</div>
                    <div>+90 541 863 67 53</div>
                    <div className="margin-top margin-xsmall">
                      <a href="tel:+905418636753" className="button is-small w-inline-block">
                        <div className="button_text">Ara</div>
                      </a>
                    </div>
                  </div>
                  <div className="contact_card">
                    <div className="text-weight-semibold">WhatsApp</div>
                    <div>+90 541 863 67 53</div>
                    <div className="margin-top margin-xsmall">
                      <a href="https://wa.me/905418636753" target="_blank" className="button is-small w-inline-block">
                        <div className="button_text">Mesaj Gönder</div>
                      </a>
                    </div>
                  </div>
                  <div className="contact_card">
                    <div className="text-weight-semibold">E‑posta</div>
                    <div>info@piststudio.com</div>
                    <div className="margin-top margin-xsmall">
                      <a href="mailto:info@piststudio.com" className="button is-small w-inline-block">
                        <div className="button_text">E‑posta Yaz</div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="section_map">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="padding-section">
                <div className="text-align-center margin-bottom margin-medium">
                  <div className="align-center max-width-large">
                    <div data-animate="fade-in" className="text-rich-text w-richtext">
                      <h2 className="section-heading">
                        <span>Bize Ulaşın</span>
                      </h2>
                      <p>İstanbul Maslak&apos;tayız. Ulaşımı kolay konumda, bekleriz.</p>
                    </div>
                  </div>
                </div>
                <div className="map_embed w-embed">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17003.70125736068!2d29.005266945267834!3d41.11578966978047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81d6af3f4e79e1b1%3A0x4c43cbe3a06d62f5!2zUGlzdCBNw7x6aWsgWWFwxLFt!5e0!3m2!1str!2str!4v1754264231911!5m2!1str!2str" 
                    width="100%" 
                    height="450" 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0, borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .hero_simple {
          text-align: center;
          padding: 120px 0 40px;
        }
        .hero_simple p {
          max-width: 720px;
          margin: 12px auto 0;
        }
        .contact_cards {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-top: 24px;
        }
        @media (max-width: 991px) {
          .contact_cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 600px) {
          .contact_cards {
            grid-template-columns: 1fr;
          }
        }
        .contact_card {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 16px;
          background: #fff;
          color: #111;
        }
        [data-theme="dark"] .contact_card {
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.14);
        }
        .map_embed iframe {
          width: 100%;
          height: 380px;
          border: 0;
          border-radius: 12px;
        }
      `}</style>
    </Layout>
  )
}