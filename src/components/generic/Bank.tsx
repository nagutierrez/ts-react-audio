import * as React from 'react';
import styled from 'styled-components';

interface BankProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const Bank: React.FC<BankProps> = (props: BankProps) => {
  return (
    <StyledBank>
      <h1>{props.label}</h1>
      <div className={props.className}>{props.children}</div>
    </StyledBank>
  );
};

const StyledBank = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  color: #444;
  text-align: center;
  height: 261px;
  margin: 4px;

  > h1 {
    margin: 0;
    font-size: 20px;
    margin-bottom: 10px;
  }

  > div {
    margin: 0 10px;
    display: flex;
  }
`;
