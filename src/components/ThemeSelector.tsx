"use client";

import React from 'react';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes = [
    { id: 'sepia', name: 'Sepia', color: 'bg-amber-700', icon: '📷' },
    { id: 'monochrome', name: 'Monochrome', color: 'bg-gray-900', icon: '🎞️' },
    { id: 'vintage', name: 'Vintage', color: 'bg-amber-500', icon: '🕰️' },
    { id: 'classic', name: 'Classic', color: 'bg-blue-600', icon: '📸' },
  ];

  return (
    <div className="theme-selector mb-6">
      <div className="flex flex-wrap gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`vintage-theme-option transition-all ${
              currentTheme === theme.id ? 'selected-theme' : ''
            }`}
            title={theme.name}
            aria-label={`Select ${theme.name} theme`}
          >
            <div className={`theme-color-sample ${theme.color} flex items-center justify-center`}>
              <span className="theme-icon text-xl">{theme.icon}</span>
            </div>
            <span className="theme-name font-caveat">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
