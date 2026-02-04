import React, { useState, useEffect, useRef } from "react";
import {
  LaptopContainer,
  LaptopFloatingWrapper,
  Laptop3D,
  Lid,
  Screen,
  KeyboardDeck,
  Hinge,
  TopDeck,
  Speaker,
  Trackpad,
  FloorShadow,
  NotchOpen,
  LidBack,
  AppleLogo,
} from "./LaptopMockup.styles";
import { MacMenuBar } from "./components/MacMenuBar";
import { BrowserWindow } from "./components/BrowserWindow";
import { MacDock } from "./components/MacDock";
import { MacKeyboard } from "./components/MacKeyboard";

export const LaptopMockup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: -20, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle open state based on visibility
        setIsOpen(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% is visible (ensures user sees the opening)
        rootMargin: "0px", // Reset margin to rely purely on visibility percentage
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Parallax intensity
    const rotateX = -20 + y * 10; // Base -20deg, +/- 5deg
    const rotateY = x * 15; // +/- 7.5deg

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: -20, y: 0 }); // Reset on leave
  };

  return (
    <LaptopContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <FloorShadow />
      <LaptopFloatingWrapper>
        <Laptop3D
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <Lid $isOpen={isOpen}>
            <LidBack>
              <AppleLogo>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.8-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.55-.67.92-1.59.81-2.5-1.29.05-2.85.86-3.77 1.94-.48.56-.91 1.48-.79 2.37 1.44.11 2.91-.73 3.75-1.81z" />
                </svg>
              </AppleLogo>
            </LidBack>
            <Screen>
              <MacMenuBar />
              <BrowserWindow />
              <MacDock />
            </Screen>
          </Lid>

          <KeyboardDeck>
            {/* Ambient Occlusion at Hinge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40px",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div className="left-ports" />
            <div className="right-ports" />
            <Hinge />
            <TopDeck>
              <Speaker />
              <MacKeyboard />
              <Speaker />
            </TopDeck>
            <Trackpad />
            <NotchOpen />
          </KeyboardDeck>
        </Laptop3D>
      </LaptopFloatingWrapper>
    </LaptopContainer>
  );
};
