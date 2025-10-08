'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/pist.istanbul/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" fill="currentColor" className="socials_icon">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/piststudyo/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" fill="currentColor" className="socials_icon">
          <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@piststudyo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="100%" fill="currentColor" className="socials_icon">
          <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"></path>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@piststudyo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="100%" fill="currentColor" className="socials_icon">
          <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"></path>
        </svg>
      )
    }
  ];

  const footerNavigation = [
    {
      title: 'Katıl',
      links: [
        {
          name: 'Başvur',
          href: 'https://docs.google.com/forms/d/e/1FAIpQLSe8KbFNqbtA_p-4tk3E0kO6QqzVrdWQ0IFoDJtxOiZVZKQ-iw/viewform?embedded=true',
          external: true,
          isButton: true
        },
        {
          name: 'Üyelerimizle Tanış',
          href: '/who-we-are'
        }
      ]
    },
    {
      title: 'Rezervasyon',
      links: [
        {
          name: 'Stüdyolar',
          href: '/studios'
        },
        {
          name: 'Etkinlikler',
          href: '/events'
        },
        {
          name: 'Özel Etkinlikler',
          href: '/private-events'
        }
      ]
    },
    {
      title: 'Lokasyon',
      links: [
        {
          name: 'Maslak',
          href: '/location-pist'
        }
      ]
    },
    {
      title: 'Şirket',
      links: [
        {
          name: 'Biz Kimiz',
          href: '/who-we-are'
        },
        {
          name: 'İletişim',
          href: '/contact'
        },
        {
          name: 'Gizlilik Politikası',
          href: '/privacy-policy'
        },
        {
          name: 'Şartlar ve Koşullar',
          href: '/terms-conditions'
        }
      ]
    }
  ];

  return (
    <section data-theme="dark" className="footer_section">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="padding-vertical padding-large">
            <div className="footer_wrap">
              {/* Social Media Links */}
              <div className="socials_wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer_socials_link w-inline-block"
                  >
                    {social.icon}
                    <div className="sr-only">{social.name}</div>
                  </a>
                ))}
              </div>

              {/* Navigation Links */}
              <div className="w-layout-grid footer_navigation_wrap margin-bottom margin-large">
                {footerNavigation.map((section) => (
                  <div key={section.title} className="footer_nav_group_wrap">
                    <div className="footer_nav_group_heading">{section.title}</div>
                    <ul role="list" className="footer_link_list w-list-unstyled">
                      {section.links.map((link) => (
                        <li key={link.name} className="footer_link_item">
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`footer_link_element w-inline-block ${link.isButton ? 'is-button' : ''}`}
                            >
                              <div>{link.name}</div>
                            </a>
                          ) : (
                            <Link href={link.href} className="footer_link_element w-inline-block">
                              <div>{link.name}</div>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Image Placeholder */}
            <div className="footer_image_wrap"></div>
          </div>

          {/* Divider */}
          <div className="g_line-divider"></div>

          {/* Copyright */}
          <div className="padding-vertical padding-medium">
            <div className="footer_bottom_wrap">
              <div className="text-size-small text-style-muted">
                Telif Hakkı ©<span className="current-year">{currentYear}</span> PİST Stüdyo. Tüm hakları saklıdır.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;