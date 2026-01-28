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
