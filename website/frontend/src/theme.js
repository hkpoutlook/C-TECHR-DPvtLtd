/**
 * Theme Configuration
 * C-TECH R&D - Blue Theme
 * Based on logo color #1E40AF
 */

export const theme = {
  colors: {
    // Primary Blue (Brand Color)
    primary: '#1E40AF',
    primaryDark: '#1E3A8A',
    primaryLight: '#3B82F6',
    primaryLighter: '#DBEAFE',
    primaryUltraLight: '#EFF6FF',

    // Neutral Colors
    white: '#FFFFFF',
    textDark: '#1F2937',
    textLight: '#6B7280',
    borderLight: '#E5E7EB',

    // Status Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  gradients: {
    headerFooter: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
    pageBackground: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)',
    ctaSection: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
  },

  shadows: {
    small: '0 2px 8px rgba(30, 64, 175, 0.1)',
    medium: '0 8px 16px rgba(30, 64, 175, 0.15)',
    large: '0 12px 24px rgba(30, 64, 175, 0.2)',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    
    h1: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    
    h2: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    
    h3: {
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    
    h4: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    
    body: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    
    small: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
    wide: '1400px',
  },

  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
};

export default theme;
