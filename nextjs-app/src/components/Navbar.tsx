'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <div className="navbar_wrap" role="banner" style={{ backgroundColor: 'transparent' }}>
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
            
            {/* Overlay and mobile menu panel */}
            <div className="navbar_menu_overlay"></div>
            <div className="navbar_menu_panel">
              <nav role="navigation" className="navbar_menu">
                <div className="navbar_menu_content">
                  <div className="navbar_menu_items" lang="tr">
                    <Link href="/location-pist" className="navbar_link">
                      <div lang="en">Stüdyo</div>
                    </Link>
                    <Link href="/events" className="navbar_link">
                      <div>Etkinlikler</div>
                    </Link>
                    <Link href="/calendars" className="navbar_link">
                      <div>Takvim</div>
                    </Link>
                    <Link href="/services" className="navbar_link">
                      <div>Hizmetlerimiz</div>
                    </Link>
                    <Link href="/duyurular" className="navbar_link">
                      <div>Duyurular</div>
                    </Link>
                    <Link href="/who-we-are" className="navbar_link">
                      <div>Biz Kimiz</div>
                    </Link>
                    <Link href="/contact" className="navbar_link">
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

export default Navbar;