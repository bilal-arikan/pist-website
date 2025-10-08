'use client'

import Layout from '@/components/Layout'
import AnimatedSection from '@/components/AnimatedSection'
import { ResponsiveContainer, ResponsiveText } from '@/components/ResponsiveContainer'
import StructuredData, { organizationData, localBusinessData } from '@/components/StructuredData'
import { useTextAnimation } from '@/hooks/useGSAP'
import Image from 'next/image';
import Link from 'next/link';

// Import all section components
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ExploreStudiosSection from '@/components/ExploreStudiosSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationData} />
      <StructuredData data={localBusinessData} />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Explore Studios Section */}
        <ExploreStudiosSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
