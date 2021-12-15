import * as React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

export const Landing: React.FC = () => {
  return (
    <StyledLanding>
      <Navigate to={'examples/adsr'} />
    </StyledLanding>
  );
};
Landing.displayName = 'Landing';

const StyledLanding = styled.div`
  width: 100vw;
  height: 100vh;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
