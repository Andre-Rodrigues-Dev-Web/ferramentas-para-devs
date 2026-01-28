import styled from "styled-components";
import { BentoGrid } from "../../landing/ui/LandingPage.styles";

export const PageHeader = styled.div`
  padding: 8rem 0 4rem;
  text-align: center;
`;

export const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #60a5fa;
`;

export const FeatureGrid = styled(BentoGrid)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
