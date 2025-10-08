'use client'

import React, { ReactNode } from 'react'
import { useGSAP } from '@/hooks/useGSAP'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
}

export default function AnimatedSection({ 
  children, 
  className = ''
}: AnimatedSectionProps) {
  const containerRef = useGSAP()

  return (
    <section 
      ref={containerRef} 
      className={className}
    >
      {children}
    </section>
  )
}