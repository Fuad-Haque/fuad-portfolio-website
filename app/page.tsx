"use client";

import { useState, useEffect } from 'react';
import Cursor from '../components/Cursor';
import Spotlight from '../components/Spotlight';
import StatusBar from '../components/StatusBar';
import CommandPalette from '../components/CommandPalette';
import Window from '../components/Window';

export default function Home() {
  const [zIndexMap, setZIndexMap] = useState({
    'w-hero': 50,
    'w-projects': 51,
    'w-term': 52,
    'w-contact': 53,
  });
  const [maxZIndex, setMaxZIndex] = useState(54);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleWindowFocus = (windowId: string) => {
    const newZIndex = maxZIndex + 1;
    setZIndexMap(prev => ({
      ...prev,
      [windowId]: newZIndex,
    }));
    setMaxZIndex(newZIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Cursor />
      <Spotlight />
      
      {/* Desktop Canvas */}
      <div id="desk">
        {/* Hero Window */}
        <Window
          id="w-hero"
          title="fuad_haque  profile.md"
          defaultX={55}
          defaultY={55}
          defaultW={560}
          defaultH={370}
          zIndex={zIndexMap['w-hero']}
          onFocus={handleWindowFocus}
          isActive={zIndexMap['w-hero'] === maxZIndex}
          animationDelay={0.08}
        >
          <div className="h-index">// ENGINEER · SYLHET, BD · 01</div>
          <h1 className="h-name">
            Fuad<br />
            <em>Haque</em>
          </h1>
          <div className="h-title">Python Backend Engineer · FastAPI · Railway</div>
          <p className="h-bio">
            Building production-grade backend systems at the intersection of
            statistical depth and AI engineering. Currently shipping FastAPI services
            and moving toward RAG systems at scale.
          </p>
          <div className="h-links">
            <a
              href="https://cal.com/fuad-haque"
              className="hl cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </a>
            <a
              href="https://github.com/Fuad-Haque"
              className="hl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:fuadhaque.dev@gmail.com" className="hl">
              Email
            </a>
          </div>
        </Window>

        {/* Projects Window */}
        <Window
          id="w-projects"
          title="dossiers  /projects"
          defaultX={670}
          defaultY={75}
          defaultW={510}
          defaultH={490}
          zIndex={zIndexMap['w-projects']}
          onFocus={handleWindowFocus}
          isActive={zIndexMap['w-projects'] === maxZIndex}
          animationDelay={0.18}
        >
          <div className="sec-lbl">// Case Studies  3 Deployed</div>

          <div className="proj">
            <div className="pmeta">
              <span className="pnum">01 / 03</span>
              <span className="pstatus"> LIVE</span>
            </div>
            <div className="pname">URL Shortener API</div>
            <p className="pdesc">
              Production-grade shortening service with analytics, custom aliases, and full Swagger documentation. Persistent storage. Deployed on Railway.
            </p>
            <div className="ptags">
              <span className="tag">FASTAPI</span>
              <span className="tag">PYTHON</span>
              <span className="tag">RAILWAY</span>
              <span className="tag">PYDANTIC V2</span>
              <span className="tag">JWT AUTH</span>
            </div>
            <div className="plinks">
              <a
                href="https://web-production-5bd50.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="plink"
              >
                Live Docs
              </a>
              <a
                href="https://github.com/Fuad-Haque/url-shortener-api"
                target="_blank"
                rel="noopener noreferrer"
                className="plink"
              >
                Source
              </a>
            </div>
          </div>

          <div className="proj">
            <div className="pmeta">
              <span className="pnum">02 / 03</span>
              <span className="pstatus"> LIVE</span>
            </div>
            <div className="pname">Webhook Handler</div>
            <p className="pdesc">
              Event-driven webhook processing system. Validates, routes, and handles payloads from external services. Built for reliability and extensibility.
            </p>
            <div className="ptags">
              <span className="tag">FASTAPI</span>
              <span className="tag">ASYNC</span>
              <span className="tag">RAILWAY</span>
              <span className="tag">PYDANTIC</span>
              <span className="tag">PYTHON</span>
            </div>
            <div className="plinks">
              <a
                href="https://webhook-handler-production-99e2.up.railway.app/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="plink"
              >
                Live Docs
              </a>
              <a
                href="https://github.com/Fuad-Haque/webhook-handler"
                target="_blank"
                rel="noopener noreferrer"
                className="plink"
              >
                Source
              </a>
            </div>
          </div>

          <div className="proj">
            <div className="pmeta">
              <span className="pnum">03 / 03</span>
              <span className="pstatus"> LIVE</span>
            </div>
            <div className="pname">Task Automation API</div>
            <p className="pdesc">
              Automated task scheduling and lifecycle management. Handles creation, status tracking, and execution pipelines with clean REST architecture.
            </p>
            <div className="ptags">
              <span className="tag">FASTAPI</span>
              <span className="tag">RENDER</span>
              <span className="tag">BCRYPT</span>
              <span className="tag">JOSE JWT</span>
              <span className="tag">UVICORN</span>
            </div>
            <div className="plinks">
              <a
                href="https://task-automation-api-i90w.onrender.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="plink"
              >
                Live Docs
              </a>
              <a
                href="https://github.com/Fuad-Haque/task-automation-api"
                target="_blank"
                rel="noopener noreferrer"
                className="plink"
              >
                Source
              </a>
            </div>
          </div>
        </Window>

        {/* Terminal Window */}
        <Window
          id="w-term"
          title="zsh  ~"
          defaultX={1235}
          defaultY={55}
          defaultW={330}
          defaultH={198}
          zIndex={zIndexMap['w-term']}
          onFocus={handleWindowFocus}
          isActive={zIndexMap['w-term'] === maxZIndex}
          animationDelay={0.12}
        >
          <div className="tb" style={{ padding: '15px 18px' }}>
            <div className="tl">
              <span className="tp">fuad@dev</span>
              <span className="ts">:~$</span>
              &nbsp;<span className="tc">whoami</span>
            </div>
            <div className="to">backend engineer · freelancer · builder</div>
            <div className="tl" style={{ marginTop: '5px' }}>
              <span className="tp">fuad@dev</span>
              <span className="ts">:~$</span>
              &nbsp;<span className="tc">uptime</span>
            </div>
            <div className="to">available for hire · open to projects</div>
            <div className="tl" style={{ marginTop: '5px' }}>
              <span className="tp">fuad@dev</span>
              <span className="ts">:~$</span>
              &nbsp;<span className="tc">git log --oneline -3</span>
            </div>
            <div className="to ok"> 3 projects deployed · actively building</div>
            <div className="tl" style={{ marginTop: '5px' }}>
              <span className="tp">fuad@dev</span>
              <span className="ts">:~$</span>
              &nbsp;<span className="tcur"></span>
            </div>
          </div>
        </Window>

        {/* Contact Window */}
        <Window
          id="w-contact"
          title="contact.json"
          defaultX={670}
          defaultY={620}
          defaultW={350}
          defaultH={210}
          zIndex={zIndexMap['w-contact']}
          onFocus={handleWindowFocus}
          isActive={zIndexMap['w-contact'] === maxZIndex}
          animationDelay={0.33}
        >
          <ul className="clist">
            <li className="ci">
              <span className="cl">Email</span>
              <a href="mailto:fuadhaque.dev@gmail.com" className="cv">
                fuadhaque.dev@gmail.com
              </a>
            </li>
            <li className="ci">
              <span className="cl">GitHub</span>
              <a
                href="https://github.com/Fuad-Haque"
                target="_blank"
                rel="noopener noreferrer"
                className="cv"
              >
                github.com/Fuad-Haque
              </a>
            </li>
            <li className="ci">
              <span className="cl">Cal.com</span>
              <a
                href="https://cal.com/fuad-haque"
                target="_blank"
                rel="noopener noreferrer"
                className="cv"
              >
                cal.com/fuad-haque
              </a>
            </li>
            <li className="ci">
              <span className="cl">Location</span>
              <span className="cv" style={{ cursor: 'default' }}>
                Sylhet, Bangladesh
              </span>
            </li>
          </ul>
        </Window>
      </div>

      {/* Noise Grain Overlay */}
      <div id="noise" />

      {/* Status Bar */}
      <StatusBar />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onFocus={handleWindowFocus}
      />
    </>
  );
}
