'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-wrapper">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;