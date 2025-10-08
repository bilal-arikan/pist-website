'use client';

import React from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getResponsiveClassName = () => {
    let classes = className;
    
    if (isMobile && mobileClassName) {
      classes += ` ${mobileClassName}`;
    } else if (isTablet && tabletClassName) {
      classes += ` ${tabletClassName}`;
    } else if (isDesktop && desktopClassName) {
      classes += ` ${desktopClassName}`;
    }
    
    return classes.trim();
  };

  return (
    <div className={getResponsiveClassName()}>
      {children}
    </div>
  );
};

interface ResponsiveTextProps {
  children: React.ReactNode;
  mobileSize?: 'small' | 'medium' | 'large';
  tabletSize?: 'small' | 'medium' | 'large';
  desktopSize?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  mobileSize = 'medium',
  tabletSize = 'medium',
  desktopSize = 'large',
  className = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getSizeClass = () => {
    if (isMobile) {
      return `text-size-${mobileSize}`;
    } else if (isTablet) {
      return `text-size-${tabletSize}`;
    } else {
      return `text-size-${desktopSize}`;
    }
  };

  return (
    <div className={`${getSizeClass()} ${className}`.trim()}>
      {children}
    </div>
  );
};