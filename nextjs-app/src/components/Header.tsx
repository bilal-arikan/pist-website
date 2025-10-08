'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useResponsive } from '@/hooks/useResponsive';

const Header: React.FC = () => {
  const { isMobile } = useResponsive();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div 
      className={`navbar_wrap ${isScrolled ? 'scrolled' : ''}`} 
      role="banner" 
      style={{ backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent' }}
    >
      <div className="navbar_bg_overlay"></div>
      <div className="padding-global">
        <div className="w-layout-blockcontainer navbar_container w-container">
          <div className="w-layout-grid navbar_layout">
            <div className="navbar_left_section">
              <Link href="/" className="navbar_logo_link">
                <Image 
                  src="/images/logo-main.png" 
                  alt="PİST Stüdyo Logo" 
                  className="navbar_logo_svg" 
                  width={200}
                  height={48}
                  priority
                />
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="navbar_menu_button"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Overlay and mobile menu panel */}
            <div 
              className={`navbar_menu_overlay ${isMenuOpen ? 'active' : ''}`}
              onClick={closeMenu}
            ></div>
            
            <div className={`navbar_menu_panel ${isMenuOpen ? 'active' : ''}`}>
              <nav role="navigation" className="navbar_menu">
                <div className="navbar_menu_content">
                  <div className="navbar_menu_items" lang="tr">
                    <Link href="/studio" className="navbar_link" onClick={closeMenu}>
                      <div>Stüdyo</div>
                    </Link>
                    <Link href="/events" className="navbar_link" onClick={closeMenu}>
                      <div>Etkinlikler</div>
                    </Link>
                    <Link href="/calendars" className="navbar_link" onClick={closeMenu}>
                      <div>Takvim</div>
                    </Link>
                    <Link href="/services" className="navbar_link" onClick={closeMenu}>
                      <div>Hizmetlerimiz</div>
                    </Link>
                    <Link href="/programs/music-career-coaching" className="navbar_link" onClick={closeMenu}>
                      <div>Programlar</div>
                    </Link>
                    <Link href="/announcements" className="navbar_link" onClick={closeMenu}>
                      <div>Duyurular</div>
                    </Link>
                    <Link href="/about" className="navbar_link" onClick={closeMenu}>
                      <div>Biz Kimiz</div>
                    </Link>
                    <Link href="/contact" className="navbar_link" onClick={closeMenu}>
                      <div>İletişim</div>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;