"use client";

import React from 'react';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const themes = [
    { id: 'base', name: 'Base', color: 'bg-blue-500' },
    { id: 'monad', name: 'Monad', color: 'bg-purple-500' },
    { id: 'arbitrum', name: 'Arbitrum', color: 'bg-blue-400' },
    { id: 'coinbase', name: 'Coinbase', color: 'bg-blue-600' },
  ];

  return (
    <div className="theme-selector mb-6">
      <h3 className="text-lg font-medium mb-2">Select Theme</h3>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`${theme.color} w-12 h-12 rounded-full transition-transform ${
              selectedTheme === theme.id ? 'ring-2 ring-offset-2 ring-black scale-110' : ''
            }`}
            title={theme.name}
            aria-label={`Select ${theme.name} theme`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
