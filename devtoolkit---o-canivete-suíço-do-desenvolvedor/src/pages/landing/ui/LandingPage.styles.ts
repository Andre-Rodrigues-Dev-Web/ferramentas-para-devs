import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/ui/Button";

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(99, 102, 241, 0.4); }
  100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
`;

export const backgroundMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0d0d0d;
  color: #fff;
  overflow-x: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.15),
      transparent 70%
    );
    top: -100px;
    left: -100px;
    filter: blur(80px);
    z-index: 0;
    animation: ${float} 8s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.15),
      transparent 70%
    );
    bottom: 0;
    right: 0;
    filter: blur(100px);
    z-index: 0;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
`;

export const HeroSection = styled.header`
  padding: 8rem 0 6rem;
  text-align: center;
  position: relative;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    padding: 10rem 0 8rem;
  }
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  span.dot {
    width: 6px;
    height: 6px;
    background-color: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 8px #22c55e;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    font-size: 5.5rem;
  }

  .gradient-text {
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${backgroundMove} 5s ease infinite;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  max-width: 40rem;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.slate[600]};
  }
`;

export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, minmax(250px, auto));
  }
`;

export const BentoCard = styled.div<{ $span?: number }>`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ $span }) =>
    $span &&
    css`
      @media (min-width: ${({ theme }) => theme.screens.md}) {
        grid-column: span ${$span};
      }
    `}

  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);

    .icon-bg {
      transform: scale(1.2) rotate(10deg);
      opacity: 0.2;
    }
  }
`;

export const CardIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2),
    rgba(139, 92, 246, 0.2)
  );
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #f8fafc;
`;

export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 1rem;
  line-height: 1.5;
`;

export const DecorativeBgIcon = styled.div`
  position: absolute;
  right: -20px;
  bottom: -20px;
  opacity: 0.05;
  transition: all 0.4s ease;
  z-index: 0;

  svg {
    width: 200px;
    height: 200px;
  }
`;

export const Footer = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(2, 6, 23, 0.5);
  backdrop-filter: blur(10px);
  padding: 3rem 0;
  margin-top: auto;
`;

export const LiquidHeader = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  max-width: none;
  padding: 1rem 2rem;

  background: rgba(3, 7, 18, 0.8);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.2),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;

  &:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
`;

export const NavBrand = styled.div`
  font-weight: 700;
  color: #fff;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const MenuButton = styled(Button)`
  border-radius: 9999px;
  background: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;
  font-size: 0.875rem;
  padding: 0.5rem 1.25rem;

  &:hover {
    background: rgba(37, 99, 235, 0.3);
    border-color: rgba(59, 130, 246, 0.5);
    color: #fff;
  }
`;

export const StatsSection = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 3rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    gap: 6rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  position: relative;

  h4 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${({ theme }) => theme.colors.slate[400]};
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
  }
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.slate[400]};
  max-width: 600px;
  margin: -0.5rem auto 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export const GridSection = styled.section`
  margin-bottom: 4rem;
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  perspective: 1000px;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TestimonialCard = styled.div`
  background: rgba(30, 41, 59, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 1.5rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.03),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  .quote-icon {
    color: ${({ theme }) => theme.colors.primary[500]};
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  p {
    color: ${({ theme }) => theme.colors.slate[300]};
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    div {
      h5 {
        color: #fff;
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.1rem;
      }
      span {
        color: ${({ theme }) => theme.colors.slate[500]};
        font-size: 0.75rem;
        display: block;
      }
    }
  }
`;

export const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FAQItem = styled.div<{ $isOpen?: boolean }>`
  background: rgba(30, 41, 59, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      background: rgba(30, 41, 59, 0.4);
      border-color: rgba(255, 255, 255, 0.08);
    `}

  button {
    width: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    font-weight: 600;
    text-align: left;
    font-size: 1.1rem;

    &:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    svg {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
      color: ${({ theme }) => theme.colors.slate[400]};
    }
  }

  .content {
    padding: 0 1.5rem;
    max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    p {
      padding-bottom: 1.5rem;
      color: ${({ theme }) => theme.colors.slate[400]};
      line-height: 1.6;
    }
  }
`;

export const CTASection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.1) 0%,
    rgba(124, 58, 237, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2.5rem;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;

  box-shadow: inset 0 0 50px rgba(59, 130, 246, 0.05);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 200px;
    background: radial-gradient(
      ellipse at center,
      rgba(59, 130, 246, 0.3),
      transparent 70%
    );
    filter: blur(60px);
    pointer-events: none;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: #fff;
    position: relative;
    z-index: 1;

    @media (min-width: ${({ theme }) => theme.screens.md}) {
      font-size: 3.5rem;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.slate[300]};
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto 3rem;
    position: relative;
    z-index: 1;
    line-height: 1.6;
  }

  .cta-buttons {
    position: relative;
    z-index: 1;
  }
`;
