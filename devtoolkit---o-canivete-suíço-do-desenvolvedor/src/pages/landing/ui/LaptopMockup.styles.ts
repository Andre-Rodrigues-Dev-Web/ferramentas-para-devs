import styled, { keyframes, css } from "styled-components";

// Animation Keyframes
export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

// Container
export const LaptopContainer = styled.div`
  perspective: 2500px;
  width: 100%;
  max-width: 900px;
  margin: 3rem auto 8rem;
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
`;

// 3D Wrapper (Handles Rotation)
export const Laptop3D = styled.div`
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
`;

// Floating Animation Wrapper (Handles Y-axis move)
export const LaptopFloatingWrapper = styled.div`
  width: 100%;
  transform-style: preserve-3d;
  animation: ${float} 6s ease-in-out infinite;
`;

// --- Components Styles ---

export const Lid = styled.div<{ $isOpen: boolean }>`
  background:
    linear-gradient(135deg, #18181b 0%, #09090b 100%),
    // Zinc-950 base
    radial-gradient(
        circle at 10% 10%,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 20%
      ),
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.015) 0px,
      rgba(255, 255, 255, 0.015) 1px,
      transparent 1px,
      transparent 3px
    );
  background-blend-mode: overlay;
  border-radius: 1.5rem 1.5rem 0 0;
  border: 1px solid #27272a;
  width: 85%;
  margin: 0 auto;
  aspect-ratio: 16 / 10.2;
  padding: 0.6rem;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: bottom center;

  // Opening Animation
  transform: rotateX(${({ $isOpen }) => ($isOpen ? "0deg" : "-90deg")});
  transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1); // Smooth "Apple-like" easing

  box-shadow:
    inset 0 0 0 1px #000,
    0 25px 50px -12px rgba(0, 0, 0, 0.9);

  // Notch Container (Camera Housing)
  &::before {
    content: "";
    position: absolute;
    top: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 28px;
    background: #000;
    border-radius: 0 0 10px 10px;
    z-index: 100;

    // Notch Sensor Array & Glass Simulation
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 0 0 10px 10px;

      // Simulating the components under the glass:
      background-image:
        // 1. Glass Reflection (Top-Right Glare)
        linear-gradient(
          125deg,
          transparent 40%,
          rgba(255, 255, 255, 0.05) 45%,
          transparent 50%
        ),
        // 2. Main Camera Lens (Center) - Sharp Reflection
        radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.9) 1%,
            transparent 2%
          ),
        // Pinpoint highlight
        radial-gradient(circle at 50% 50%, rgba(20, 20, 50, 0.8) 6%, #000 12%),
        // Lens body
        radial-gradient(
            circle at 50% 50%,
            rgba(30, 30, 50, 0.4) 15%,
            transparent 20%
          ),
        // Aperture ring
        // 3. TrueDepth / IR Sensors (Side)
        radial-gradient(
            circle at 70% 50%,
            rgba(10, 10, 20, 0.8) 6%,
            transparent 12%
          );
    }

    // Active Status LED (Separate element for precise control)
    &::after {
      content: "";
      position: absolute;
      right: 28%; // Precisely placed to right of camera
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 2px;
      background: #10b981; // Green-500
      border-radius: 50%;
      box-shadow: 0 0 6px 1px rgba(16, 185, 129, 0.6); // Diffuse glow
      opacity: 0.9;
    }
  }

  // Rubber Display Gasket
  &::after {
    content: "";
    position: absolute;
    inset: 1px;
    border: 2px solid #09090b;
    border-radius: 1.4rem 1.4rem 0 0;
    pointer-events: none;
    z-index: 20;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 1);
  }
`;

export const Screen = styled.div`
  background: url("https://images.unsplash.com/photo-1621360841961-c67d73010777?q=80&w=2560&auto=format&fit=crop")
    center/cover no-repeat;
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.8); // Stronger vignette

  // Screen Gloss/Reflection (Complex curve)
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        105deg,
        rgba(255, 255, 255, 0.03) 20%,
        rgba(255, 255, 255, 0.01) 25%,
        rgba(255, 255, 255, 0) 30%,
        transparent 100%
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 0%, transparent 10%); // Top edge light catch
    pointer-events: none;
    z-index: 50;
    mix-blend-mode: overlay;
  }
`;

// --- MacOS UI ---

export const MenuBar = styled.div`
  height: 28px; // Fits with notch
  background: rgba(0, 0, 0, 0.3); // Transparent blurred
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.7rem; // Reduced size for realism
  color: #fff;
  font-weight: 500;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 90;
  box-sizing: border-box;

  .left {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    padding-left: 0.5rem;

    // Apple Logo
    svg {
      font-size: 1.1rem;
    }

    .app-name {
      font-weight: 700;
    }
  }

  .right {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-right: 0.5rem;

    .icon-group {
      display: flex;
      gap: 0.35rem;
      align-items: center;
      font-size: 0.7rem; // Reduced to match menu bar
    }
  }
`;

export const DockContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.05); // Glassy dark
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  display: flex;
  gap: 0.4rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 90;
  align-items: flex-end;
  height: 2.8rem; // Smaller dock height
`;

export const AppIcon = styled.div<{
  $color: string;
  $bg?: string;
  $isOpen?: boolean;
}>`
  width: 2rem;
  height: 2rem;
  background: ${({ $bg }) => $bg || "linear-gradient(180deg, #fff, #e2e8f0)"};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  font-size: 1.1rem; // Smaller icon font size
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px) scale(1.15); // Adjusted hover
  }

  // Active dot
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
      }
    `}
`;

export const Divider = styled.div`
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 0.1rem;
  align-self: center;
`;

// --- Chrome Browser ---

export const BrowserContainer = styled.div`
  position: absolute;
  top: 3.5rem; // Below MenuBar
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 75%;
  background: #1e1e1e; // Dark Chrome Theme
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .traffic-lights {
    display: flex;
    gap: 0.5rem;
    padding-left: 0.2rem;

    div {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        opacity: 0;
        transition: opacity 0.2s;
        color: rgba(0, 0, 0, 0.6);
      }
    }

    &:hover div svg {
      opacity: 1;
    }

    .red {
      background: #ff5f56;
      border: 1px solid #e0443e;
    }
    .yellow {
      background: #ffbd2e;
      border: 1px solid #dea123;
    }
    .green {
      background: #27c93f;
      border: 1px solid #1aab29;
    }
  }
`;

// Dynamic Floor Shadow
export const FloorShadow = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%) rotateX(60deg);
  width: 90%;
  height: 50px;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: 1;
  animation: ${keyframes`
    0% { transform: translateX(-50%) rotateX(60deg) scale(0.9); opacity: 0.4; }
    50% { transform: translateX(-50%) rotateX(60deg) scale(1); opacity: 0.2; } // Fades as laptop goes up
    100% { transform: translateX(-50%) rotateX(60deg) scale(0.9); opacity: 0.4; }
  `} 6s ease-in-out infinite;
`;

export const BrowserHeader = styled.div`
  background: #2b2b2b;
  padding: 0.5rem 0.5rem 0;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0.3rem;
`;

export const Tab = styled.div<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#1e1e1e" : "transparent")};
  color: ${({ $active }) => ($active ? "#e2e8f0" : "#9ca3af")};
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;

  svg {
    color: ${({ $active }) => ($active ? "#3b82f6" : "currentColor")};
  }
`;

export const Toolbar = styled.div`
  background: #1e1e1e;
  padding: 0.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const UrlBar = styled.div`
  flex: 1;
  background: #0f0f0f;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  font-size: 0.7rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const PlatformPreview = styled.div`
  flex: 1;
  background: #0f172a;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  overflow: hidden;
`;

export const SidebarMock = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  margin-right: 0.5rem;
`;

export const GridMock = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
`;

export const CardMock = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: row; // Changed to row for icon + text
  align-items: center;
  gap: 0.8rem;

  .icon {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    display: flex; // Center icon
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  // No longer needed skeleton animations, but keeping component generic
`;

// --- Base / Keyboard Deck ---

export const KeyboardDeck = styled.div`
  background: #18181b; // Zinc-950
  width: 85%;
  margin: 0 auto;
  height: 280px;
  border-radius: 0 0 1.5rem 1.5rem;
  transform: rotateX(70deg);
  transform-origin: top center;
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  margin-top: -12px;
  transform-style: preserve-3d;
  background:
    linear-gradient(180deg, #202020 0%, #151515 100%),
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.015) 0px,
      rgba(255, 255, 255, 0.015) 1px,
      transparent 1px,
      transparent 3px
    );
  background-blend-mode: overlay;

  // Screen Light Spill Simulation
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 60px;
    background: linear-gradient(
      to bottom,
      rgba(59, 130, 246, 0.15),
      transparent
    ); // Subtle blue spill from default wallpaper
    filter: blur(20px);
    z-index: 10;
    pointer-events: none;
    opacity: 0.6;
  }

  // Front Lip Chamfer (High polish edge)
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  // Left Ports
  .left-ports {
    position: absolute;
    left: -3px;
    top: 40px;
    width: 3px;
    height: 80px;
    background: linear-gradient(
      to bottom,
      transparent 5%,
      #000 5%,
      #050505 6%,
      #000 14%,
      #1a1a1a 14%,
      #000 15%,
      // MagSafe
      transparent 15%,
      transparent 25%,
      #000 25%,
      #080808 27%,
      #000 43%,
      #1a1a1a 43%,
      #000 45%,
      // Thunderbolt 1
      transparent 45%,
      transparent 55%,
      #000 55%,
      #080808 57%,
      #000 73%,
      #1a1a1a 73%,
      #000 75%,
      // Thunderbolt 2
      transparent 75%
    );
    opacity: 0.9;
    transform: skewY(45deg);
    box-shadow: -1px 0 2px rgba(0, 0, 0, 0.8);
  }

  // Right Ports
  .right-ports {
    position: absolute;
    right: -3px;
    top: 40px;
    width: 3px;
    height: 80px;
    background: linear-gradient(
      to bottom,
      transparent 10%,
      #000 10%,
      #050505 12%,
      #000 28%,
      #1a1a1a 28%,
      #000 30%,
      // HDMI
      transparent 30%,
      transparent 40%,
      #000 40%,
      #080808 42%,
      #000 58%,
      #1a1a1a 58%,
      #000 60%,
      // Thunderbolt
      transparent 60%,
      transparent 70%,
      #000 70%,
      #050505 72%,
      #000 85%,
      #1a1a1a 85%,
      #000 87%,
      // SD Card
      transparent 87%
    );
    opacity: 0.9;
    transform: skewY(-45deg);
    box-shadow: 1px 0 2px rgba(0, 0, 0, 0.8);
  }
`;

// Hinge Mechanism
export const Hinge = styled.div`
  position: absolute;
  top: -10px;
  left: 10%;
  width: 80%;
  height: 12px;
  // High-contrast brushed metal effect
  background:
    linear-gradient(to bottom, #27272a, #09090b 40%, #000 100%),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      rgba(255, 255, 255, 0.08) 1px,
      transparent 3px
    );
  border-radius: 4px;
  transform: rotateX(-50deg);
  z-index: 5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.9);
`;

export const TopDeck = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1rem 0;
  height: 65%;
`;

export const Speaker = styled.div`
  width: 1.5rem;
  height: 80%;
  margin-top: 1rem;
  // Dynamic perforation depth
  background-image: radial-gradient(rgba(0, 0, 0, 0.9) 30%, transparent 40%);
  background-size: 2px 2px;
  opacity: 0.6;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 15%,
    black 85%,
    transparent
  );
`;

export const KeyboardWell = styled.div`
  flex: 1;
  background: #09090b; // Deep black
  border-radius: 0.5rem;
  padding: 0.3rem 0.5rem;
  margin: 0 0.5rem;
  // Subtle inner well reflection
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.8),
    0 1px 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const KeyRow = styled.div`
  display: flex;
  gap: 2px;
  flex: 1;
`;

export const Key = styled.div<{ $width?: number; $special?: boolean }>`
  background: ${({ $special }) => ($special ? "#18181b" : "#0f0f11")};
  flex: ${({ $width }) => $width || 1};
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;

  // Enhances Concave Key Simulation
  background-image: radial-gradient(
    circle at 50% 30%,
    rgba(255, 255, 255, 0.03),
    transparent 70%
  );

  text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);

  border-bottom: 2px solid #000;

  ${({ $special }) =>
    $special &&
    css`
      background: #0f0f11;
      // Touch ID Sensor Ring
      &::after {
        content: "";
        width: 1.2rem;
        height: 1.2rem;
        border: 2px solid #333; // Thicker, darker ring
        border-radius: 50%;
        box-shadow:
          inset 0 0 4px rgba(0, 0, 0, 0.8),
          0 0 1px rgba(255, 255, 255, 0.1); // Highlight on ring edge
        background: radial-gradient(
          circle at 30% 30%,
          rgba(255, 255, 255, 0.05),
          transparent
        ); // Sensor gloss
      }
    `}
`;

export const Trackpad = styled.div`
  width: 38%;
  height: 30%;
  margin: 1rem auto 0;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.01),
      transparent
    );
    border-radius: inherit;
  }
`;

export const NotchOpen = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15%;
  height: 6px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px 6px 0 0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
`;
