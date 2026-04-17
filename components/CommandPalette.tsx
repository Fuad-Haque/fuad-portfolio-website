"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onFocus: (window: string) => void;
}

interface PaletteItem {
  id: string;
  action: string;
  title: string;
  description: string;
  shortcut?: string;
  section: string;
}

const paletteItems: PaletteItem[] = [
  {
    id: 'hero',
    action: 'hero',
    title: 'Focus Hero',
    description: 'Main introduction',
    shortcut: 'H',
    section: 'Navigation',
  },
  {
    id: 'projects',
    action: 'projects',
    title: 'View Projects',
    description: '3 deployed dossiers',
    shortcut: 'P',
    section: 'Navigation',
  },
  {
    id: 'contact',
    action: 'contact',
    title: 'Contact',
    description: 'Email · GitHub · Cal.com',
    shortcut: 'C',
    section: 'Navigation',
  },
  {
    id: 'call',
    action: 'call',
    title: 'Book a Call',
    description: 'cal.com/fuad-haque',
    shortcut: 'Enter',
    section: 'Actions',
  },
  {
    id: 'github',
    action: 'gh',
    title: 'Open GitHub',
    description: 'github.com/Fuad-Haque',
    section: 'Actions',
  },
  {
    id: 'email',
    action: 'email',
    title: 'Send Email',
    description: 'fuadhaque.dev@gmail.com',
    section: 'Actions',
  },
];

const icons: Record<string, string> = {
  hero: ' ',
  projects: ' ',
  contact: ' ',
  call: ' ',
  github: ' ',
  email: ' ',
};

export default function CommandPalette({ isOpen, onClose, onFocus }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = paletteItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, PaletteItem[]>);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchQuery('');
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => {
          const newIndex = prev + 1;
          return newIndex >= filteredItems.length ? 0 : newIndex;
        });
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => {
          const newIndex = prev - 1;
          return newIndex < 0 ? filteredItems.length - 1 : newIndex;
        });
        return;
      }

      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        executeAction(filteredItems[selectedIndex].action);
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  const executeAction = (action: string) => {
    const winMap: Record<string, string> = {
      hero: 'w-hero',
      projects: 'w-projects',
      contact: 'w-contact',
    };

    if (winMap[action]) {
      onFocus(winMap[action]);
      onClose();
      return;
    }

    if (action === 'call') {
      window.open('https://cal.com/fuad-haque', '_blank', 'noopener noreferrer');
      onClose();
      return;
    }

    if (action === 'gh') {
      window.open('https://github.com/Fuad-Haque', '_blank', 'noopener noreferrer');
      onClose();
      return;
    }

    if (action === 'email') {
      window.location.href = 'mailto:fuadhaque.dev@gmail.com';
      onClose();
      return;
    }
  };

  const handleItemClick = (action: string) => {
    executeAction(action);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="pal-bg"
          className="open"
          onClick={onClose}
        >
          <motion.div
            id="pal"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div id="pin-wrap">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                id="pin"
                type="text"
                placeholder="Type a command or navigate"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {Object.entries(groupedItems).map(([section, items]) => (
              <div key={section}>
                <div className="psect">{section}</div>
                {items.map((item, index) => {
                  const globalIndex = filteredItems.indexOf(item);
                  return (
                    <div
                      key={item.id}
                      className={`pi ${globalIndex === selectedIndex ? 'sel' : ''}`}
                      onClick={() => handleItemClick(item.action)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <div className="pil">
                        <span className="pic">{icons[item.action]}</span>
                        <div>
                          <div className="pit">{item.title}</div>
                          <div className="pis">{item.description}</div>
                        </div>
                      </div>
                      {item.shortcut && (
                        <span className="pk">{item.shortcut}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div id="pfoot">
              <span>   navigate</span>
              <span>   select</span>
              <span>esc   close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
