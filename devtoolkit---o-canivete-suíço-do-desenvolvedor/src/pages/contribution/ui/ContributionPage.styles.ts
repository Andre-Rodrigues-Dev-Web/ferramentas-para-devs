import styled from "styled-components";

export const PageHeader = styled.div`
  padding: 8rem 0 4rem;
  text-align: center;
`;

export const ContributionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 6rem;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2rem;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }
`;

export const StepList = styled.ol`
  list-style: none;
  counter-reset: steps;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StepItem = styled.li`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  &::before {
    counter-increment: steps;
    content: counter(steps);
    width: 2rem;
    height: 2rem;
    background: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
`;
