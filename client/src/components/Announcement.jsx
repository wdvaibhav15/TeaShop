import React, { useState, useEffect } from 'react';
import { Moon, Sun, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const Announcement = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  

  

  return (
    <div className="sticky top-0 z-50 h-8 w-full bg-emerald-900 text-stone-200 text-xs px-4 flex items-center border-b border-emerald-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
          <div className="flex items-center gap-2 truncate">
          <span>🌿 Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center gap-2 truncate">
          <span>🌿 Free shipping on orders over $50</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium ml-auto">
          {/* Theme Toggle */}
          
            <button
            onClick={toggleTheme}
            className="p-1 px-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition-colors flex items-center gap-1"
            aria-label="Toggle dark mode"
            type="button"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          

          {/* Administrator / User Toggle Button */}
          <button
            type="button"
            
            className="p-1 px-2 rounded-full hover:bg-emerald-800 text-emerald-200 transition-colors flex items-center gap-1"
          >
            
              <span className="flex items-center gap-1"><User className="w-4 h-4" />Customer</span>
            
            
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcement;