
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icons } from '../constants';

interface Props {
  isDarkMode: boolean;
}

const BottomTabs: React.FC<Props> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'wheel', label: 'Wheel', icon: Icons.Wheel, path: '/wheel' },
    { id: 'settings', label: 'Settings', icon: Icons.Settings, path: '/settings' },
    { id: 'profile', label: 'Profile', icon: Icons.Profile, path: '/profile' },
  ];

  return (
    <nav className={`absolute bottom-0 left-0 right-0 h-[88px] ios-blur border-t flex justify-around items-start pt-3 safe-bottom z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#1c1c1e]/80 border-gray-800' : 'bg-white/80 border-gray-200'
    }`}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center justify-center w-20 transition-colors"
          >
            <tab.icon 
              size={26} 
              color={isActive ? '#007AFF' : (isDarkMode ? '#636366' : '#8E8E93')} 
            />
            <span 
              className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#007AFF]' : (isDarkMode ? 'text-[#636366]' : 'text-[#8E8E93]')}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomTabs;
