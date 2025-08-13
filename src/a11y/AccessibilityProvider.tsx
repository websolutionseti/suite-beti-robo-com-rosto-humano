import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  fontSize: number;
  contrast: 'normal' | 'high' | 'dark';
  reducedMotion: boolean;
  announcements: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateFontSize: (size: number) => void;
  updateContrast: (contrast: AccessibilitySettings['contrast']) => void;
  toggleReducedMotion: () => void;
  toggleAnnouncements: () => void;
  resetSettings: () => void;
  announce: (message: string) => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  contrast: 'normal',
  reducedMotion: false,
  announcements: true,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--base-font-size', `${settings.fontSize}px`);
    
    // Contrast
    root.setAttribute('data-contrast', settings.contrast);
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateFontSize = (size: number) => {
    setSettings(prev => ({ ...prev, fontSize: Math.max(12, Math.min(24, size)) }));
  };

  const updateContrast = (contrast: AccessibilitySettings['contrast']) => {
    setSettings(prev => ({ ...prev, contrast }));
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleAnnouncements = () => {
    setSettings(prev => ({ ...prev, announcements: !prev.announcements }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const announce = (message: string) => {
    if (!settings.announcements) return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const value = {
    settings,
    updateFontSize,
    updateContrast,
    toggleReducedMotion,
    toggleAnnouncements,
    resetSettings,
    announce,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};