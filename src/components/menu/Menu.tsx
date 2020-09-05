import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../styles';

export const Menu: React.FC = () => {
  return (
    <StyledMenu>
      <Link to={'/examples/gain'}>Gain</Link>
      <Link to='/examples/wavefolding'>Wavefolder</Link>
    </StyledMenu>
  );
};
Menu.displayName = 'Menu';

const StyledMenu = styled.nav`
  a {
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    background-color: ${Colors.buttonBackground};
    border: 1px solid ${Colors.buttonBorder};
    display: inline-block;

    text-decoration: none;
    color: ${Colors.textBlack};
  }
`;
