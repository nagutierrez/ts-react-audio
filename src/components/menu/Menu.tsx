import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../../styles';

interface Props {
  className?: string;
}

export const Menu: React.FC<Props> = (props: Props) => {
  return (
    <StyledMenu {...props}>
      <Link to='/examples/gain'>Gain</Link>
      <Link to='/examples/wavefolding'>Wavefolder</Link>
      <Link to='/examples/adsr'>ADSR</Link>
    </StyledMenu>
  );
};
Menu.displayName = 'Menu';

const StyledMenu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

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
