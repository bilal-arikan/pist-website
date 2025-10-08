'use client'

import Script from 'next/script'

interface StructuredDataProps {
  data: object
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PIST",
  "description": "Profesyonel İçerik Stüdyosu ve Terapi - Müzik prodüksiyonu, podcast kayıtları, terapi hizmetleri ve yaratıcı atölyeler",
  "url": "https://pist-website.vercel.app",
  "logo": "https://pist-website.vercel.app/images/pist-logo2.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Turkish"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TR",
    "addressLocality": "İstanbul"
  },
  "sameAs": [
    "https://instagram.com/pist",
    "https://linkedin.com/company/pist"
  ]
}

export const localBusinessData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PIST",
  "description": "Profesyonel müzik stüdyosu, podcast kayıt hizmetleri ve terapi merkezi",
  "url": "https://pist-website.vercel.app",
  "telephone": "+90-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TR",
    "addressLocality": "İstanbul"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$$",
  "servedCuisine": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "PIST Hizmetleri",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Müzik Prodüksiyonu",
          "description": "Profesyonel müzik kayıt ve prodüksiyon hizmetleri"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Podcast Kayıtları",
          "description": "Yüksek kaliteli podcast kayıt ve düzenleme hizmetleri"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Terapi Hizmetleri",
          "description": "Profesyonel psikolojik danışmanlık ve terapi hizmetleri"
        }
      }
    ]
  }
}