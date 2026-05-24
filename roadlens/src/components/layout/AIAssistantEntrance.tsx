import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './AIAssistantEntrance.css';

// Trail configuration for organic lagged springs
const trailConfig = [
  { id: 1, scale: 0.82, opacity: 0.20, stiffness: 35, damping: 14 },
  { id: 2, scale: 0.65, opacity: 0.12, stiffness: 22, damping: 11 },
  { id: 3, scale: 0.48, opacity: 0.05, stiffness: 12, damping: 8 }
];

export const AIAssistantEntrance: React.FC = () => {
  // Stages:
  // 0: Loading delay
  // 1: Cinematic Focus overlay active
  // 2: AI Activation (Starts bottom-right)
  // 3: Professional Entrance (Rises upward & sweeps center-right)
  // 4: Center Welcome Display (Card on left, Orb floats on right)
  // 5: Minimizing (Fly back to bottom-right, scale down)
  // 6: Permanent Floating Mode (Interactive draggable launcher)
  // 7: Click Interaction & Page Exit Transition
  const [stage, setStage] = useState<number>(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  // Drag vs Click detection variables
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Helper to calculate the top-right position of the card container
  const getCardTopRightPos = () => {
    const screenWidth = window.innerWidth;
    const orbWidth = 68;
    
    // Right edge of the centered max-1600px container with 2rem (32px) padding
    let cardRight = screenWidth - 32;
    if (screenWidth > 1664) {
      cardRight = (screenWidth + 1600) / 2;
    }
    
    // Inset by 36px from the right edge, and 36px down from the card top (which starts at 132px)
    const targetX = cardRight - 36 - orbWidth;
    const targetY = 132 + 36;
    
    return { x: targetX, y: targetY };
  };

  // Initial setup: check completion state in session storage
  useEffect(() => {
    const completed = sessionStorage.getItem('ai-intro-completed') === 'true';
    const targetPos = getCardTopRightPos();

    if (completed) {
      // Start in top-right corner of the hero card instantly
      setOrbPos(targetPos);
      setStage(6);
    } else {
      // Start in bottom-right corner as a drone robot
      setPosition({ x: window.innerWidth - 130, y: window.innerHeight - 130 });
      setStage(1);

      // Timeline sequence:
      // 1. Activation at bottom-right (Stage 2)
      const t1 = setTimeout(() => {
        setStage(2);
      }, 800);

      // 2. Rise smoothly to center-right (Stage 3)
      const t2 = setTimeout(() => {
        setStage(3);
        setPosition({
          x: window.innerWidth * 0.72 - 60,
          y: window.innerHeight * 0.5 - 60
        });
      }, 2000);

      // 3. Reveal welcome display (Stage 4)
      const t3 = setTimeout(() => {
        setStage(4);
      }, 4200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, []);

  // Minimization sequence (Stage 5)
  const handleInitialize = () => {
    setStage(5);

    const targetPos = getCardTopRightPos();
    // Offset for the 120px scale element flying to the same center
    const trX = targetPos.x - 26;
    const trY = targetPos.y - 26;

    setPosition({ x: trX, y: trY });

    setTimeout(() => {
      // Store intro completion state in sessionStorage
      sessionStorage.setItem('ai-intro-completed', 'true');
      setOrbPos(targetPos);
      setStage(6);
    }, 1500);
  };

  // Drag vs Click logic: threshold distance check
  const handleDragStart = (_event: any, info: any) => {
    isDragging.current = false;
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDrag = (_event: any, info: any) => {
    const distance = Math.hypot(info.point.x - dragStartPos.current.x, info.point.y - dragStartPos.current.y);
    if (distance > 5) {
      isDragging.current = true;
    }
  };

  // Snaps to left or right screen edge depending on closest side distance
  const handleDragEnd = (_event: any, info: any) => {
    const snapMargin = 24;
    const orbWidth = 68;
    const screenWidth = window.innerWidth;

    const finalX = orbPos.x + info.offset.x;
    const finalY = orbPos.y + info.offset.y;

    let targetX = snapMargin;
    if (finalX + orbWidth / 2 > screenWidth / 2) {
      targetX = screenWidth - orbWidth - snapMargin;
    }

    const targetY = Math.max(snapMargin, Math.min(window.innerHeight - orbWidth - snapMargin, finalY));

    setOrbPos({ x: targetX, y: targetY });
  };

  // Redirect to chatbot workspace (Stage 7)
  const handleOrbClick = () => {
    if (isDragging.current) {
      // Discard action if user was dragging
      return;
    }

    setIsClicked(true);

    // Smooth compression state triggers first, followed by full screen exit transition
    setTimeout(() => {
      setStage(7);
      setTimeout(() => {
        window.location.href = '/ai/index.html';
      }, 1600);
    }, 450);
  };

  // Custom SVG Morphing Drone / Orb Core
  const renderEnergyCore = (isStandby: boolean = false, isCoreClicked: boolean = false) => {
    const isMini = isStandby || stage >= 5;
    return (
      <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="energyCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#e0f2fe" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nucleusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#bae6fd" />
            <stop offset="80%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.15)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0.35)" />
          </linearGradient>
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          <filter id="holographicGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Light Aura */}
        <circle cx="60" cy="60" r="52" fill="url(#energyCoreGlow)" opacity={isMini ? 0.35 : 0.6} style={{ transition: 'opacity 0.8s ease' }} />

        {/* Glassmorphic Base Plate */}
        <circle cx="60" cy="60" r="54" fill="rgba(15, 23, 42, 0.12)" stroke="url(#glassBorder)" strokeWidth="1" className="glass-base-plate" />

        {/* Click Ripple Effect */}
        {isCoreClicked && (
          <circle cx="60" cy="60" r="10" stroke="#38bdf8" strokeWidth="2.5" className="click-ripple-pulse" />
        )}

        {/* Rotating Outer Ring Layer 1 (Slow Clockwise, Dasharray) */}
        <circle cx="60" cy="60" r="50" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" strokeDasharray="10 15 2 2" className="holo-ring-outer" />

        {/* Rotating Middle Ring Layer 2 (Counter-Clockwise, Long Dashes) */}
        <circle cx="60" cy="60" r="44" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.25" strokeDasharray="40 30" className="holo-ring-middle" />

        {/* Rotating Inner Ring Layer 3 (Clockwise, Tech/Ticks) */}
        <circle cx="60" cy="60" r="36" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 6 12 6" className="holo-ring-inner" />

        {/* Neural Network Pulse Lines (Data flowing from core outwards) */}
        <g className="neural-lines" opacity={isMini ? 0.4 : 0.8}>
          <line x1="60" y1="60" x2="30" y2="40" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.75" strokeDasharray="4 4" className="pulse-path-1" />
          <line x1="60" y1="60" x2="85" y2="85" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.75" strokeDasharray="4 4" className="pulse-path-2" />
          <line x1="60" y1="60" x2="45" y2="85" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.75" strokeDasharray="4 4" className="pulse-path-3" />
          <line x1="60" y1="60" x2="80" y2="35" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.75" strokeDasharray="4 4" className="pulse-path-4" />

          <circle cx="30" cy="40" r="1.5" fill="#e0f2fe" className="neural-node" />
          <circle cx="85" cy="85" r="1.5" fill="#38bdf8" className="neural-node" />
          <circle cx="45" cy="85" r="1.5" fill="#e0f2fe" className="neural-node" />
          <circle cx="80" cy="35" r="1.5" fill="#38bdf8" className="neural-node" />
        </g>

        {/* Orbiting Neural Fragments/Particles */}
        <g className="orbiting-fragments" opacity={isMini ? 0.5 : 0.85}>
          <circle cx="22" cy="55" r="1.2" fill="#38bdf8" className="fragment-1" />
          <circle cx="98" cy="45" r="1.5" fill="#ffffff" className="fragment-2" />
          <rect x="42" y="22" width="2" height="2" fill="#e0f2fe" transform="rotate(45 43 23)" className="fragment-3" />
          <rect x="76" y="94" width="2" height="2" fill="#38bdf8" transform="rotate(45 77 95)" className="fragment-4" />
        </g>

        {/* Central Core (Nucleus) - Stylized Geometric Hexagonal Nexus */}
        <g className="core-nucleus" filter="url(#holographicGlow)">
          {/* Outer Hexagon */}
          <path d="M 60 45 L 73 52.5 L 73 67.5 L 60 75 L 47 67.5 L 47 52.5 Z" fill="url(#nucleusGlow)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" className="nucleus-hex-outer" />
          {/* Inner Hexagon */}
          <path d="M 60 49 L 69.5 54.5 L 69.5 65.5 L 60 71 L 50.5 65.5 L 50.5 54.5 Z" fill="rgba(15, 23, 42, 0.75)" stroke="#38bdf8" strokeWidth="1.25" className="nucleus-hex-inner" />
          {/* Core Center Node */}
          <circle cx="60" cy="60" r="4.5" fill="#ffffff" className="nucleus-center-node" />
        </g>

        {/* Upper Glass Lens reflection curve */}
        <path d="M 16 44 C 28 26, 92 26, 104 44 C 92 34, 28 34, 16 44 Z" fill="url(#glassReflection)" opacity="0.35" pointerEvents="none" />
      </svg>
    );
  };

  return (
    <>
      <AnimatePresence>
        {/* Stages 1 to 4: Cinematic dimmed & blurred background overlay */}
        {stage >= 1 && stage <= 4 && (
          <motion.div
            className="ai-cinematic-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Ambient background lights behind welcome container */}
      {stage === 4 && (
        <motion.div
          className="welcome-glow-accent"
          style={{ left: '15%', top: '35%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      )}

      {/* Lag Trail Nodes: Rendered behind the main core for Phase 3 motion streaks */}
      {stage >= 2 && stage <= 4 && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9991, pointerEvents: 'none' }}>
          {trailConfig.map((trail) => (
            <motion.div
              key={trail.id}
              style={{
                position: 'absolute',
                width: 120,
                height: 120,
                opacity: trail.opacity,
                scale: trail.scale,
                filter: 'blur(3px)',
              }}
              animate={{ x: position.x, y: position.y }}
              transition={{
                type: 'spring',
                stiffness: trail.stiffness,
                damping: trail.damping,
                mass: 1.1
              }}
            >
              {renderEnergyCore()}
            </motion.div>
          ))}
        </div>
      )}

      {/* Redesigned Morphing AI Core (Phases 2 to 7) */}
      {stage >= 2 && stage !== 7 && (
        <motion.div
          drag={stage === 6}
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{
            left: 24,
            right: window.innerWidth - 92,
            top: 24,
            bottom: window.innerHeight - 92
          }}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileHover={stage === 6 ? { scale: 1.05 } : undefined}
          whileTap={stage === 6 ? { scale: 0.95 } : undefined}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: stage === 6 ? 68 : 120,
            height: stage === 6 ? 68 : 120,
            zIndex: 9999,
            pointerEvents: stage === 6 ? 'auto' : 'none'
          }}
          animate={
            stage === 4
              ? {
                x: position.x,
                y: [position.y, position.y - 8, position.y],
                scale: 1.0,
                opacity: 1,
                transition: {
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }
              }
              : stage === 5
                ? {
                  x: getCardTopRightPos().x,
                  y: getCardTopRightPos().y,
                  scale: 0.57, // Shrink 120px wrapper dynamically down to ~68px
                  opacity: 1,
                  transition: {
                    duration: 1.4,
                    ease: [0.25, 1, 0.5, 1] // Apple ease-out
                  }
                }
                : stage === 6
                  ? {
                    x: orbPos.x,
                    y: orbPos.y,
                    scale: isClicked ? 0.85 : 1.0,
                    opacity: 1,
                    transition: isClicked
                      ? { type: 'spring', stiffness: 500, damping: 15 }
                      : undefined
                  }
                  : {
                    x: position.x,
                    y: position.y,
                    scale: stage === 2 ? [0.6, 1] : 1,
                    opacity: 1,
                  }
          }
          transition={
            stage === 3
              ? {
                type: 'spring',
                stiffness: 55,
                damping: 17,
                mass: 1.2
              }
              : stage === 6 && !isClicked
                ? {
                  type: 'spring',
                  stiffness: 220,
                  damping: 24
                }
                : undefined
          }
        >
          {stage === 6 ? (
            <div className="mini-orb-premium" onClick={handleOrbClick}>
              <div className="orb-backdrop-glow" />
              {renderEnergyCore(true, isClicked)}
              <span className="orb-tooltip-premium">
                <span className="tooltip-title">AI Powered Chatbot</span>
                <span className="tooltip-subtitle">Click to open AI workspace</span>
              </span>
            </div>
          ) : (
            renderEnergyCore(false, isClicked)
          )}
        </motion.div>
      )}

      {/* Phase 4: Center Welcome Interface */}
      <AnimatePresence>
        {stage === 4 && (
          <div className="ai-welcome-container-left">
            <motion.div
              className="ai-welcome-card-premium"
              initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ type: 'spring', stiffness: 90, damping: 20, duration: 0.8 }}
            >
              <div className="welcome-badge-premium">
                <span className="pulse-dot" />
                OPERATIONAL SYSTEM
              </div>
              <h2 className="welcome-title-premium">
                Welcome to <span>AI Powered Road Infrastructure Intelligence</span>
              </h2>
              <p className="welcome-subtitle-premium">
                RoadLens AI is now connected to the civic infrastructure monitoring network. Anomaly logs and real-time mapping dashboards are synchronized.
              </p>
              <button className="welcome-btn-premium" onClick={handleInitialize}>
                Initialize Console
                <ArrowRight size={15} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Phase 8: Click Transition & Page Exit */}
      {stage === 7 && (
        <div className="ai-exit-overlay active">
          <div className="exit-pulse-core">
            <div className="exit-pulse-ring" />
            <div className="exit-pulse-ring" style={{ animationDelay: '0.8s' }} />
            {renderEnergyCore(true, false)}
          </div>
          <div className="exit-loading-text">
            Connecting to RoadLens AI Workspace...
          </div>
        </div>
      )}
    </>
  );
};
