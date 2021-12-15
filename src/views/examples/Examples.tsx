import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { Menu } from '../../components/menu';

export const Examples: React.FC = () => {
  return (
    <StyledExamples>
      <Menu />
      <Outlet />
    </StyledExamples>
  );
};
Examples.displayName = 'Examples';

const StyledExamples = styled.div``;
