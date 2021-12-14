import * as React from 'react';
import styled from 'styled-components';

enum Classes {
  Header = 'example-header',
  Content = 'example-content',
}

type Props = React.PropsWithChildren<{
  title: string;
  descriptor?: string;
  className?: string;
}>;

export const Example: React.FC<Props> = (props: Props) => {
  return (
    <StyledExample className={props.className}>
      <div className={Classes.Header}>
        <h1>{props.title}</h1>
        {props.descriptor && <p>{props.descriptor}</p>}
      </div>
      <div className={Classes.Content}>{props.children}</div>
    </StyledExample>
  );
};
Example.displayName = 'Example';

export const StyledExample = styled.section`
  background-color: teal;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  .${Classes.Header} {
    text-align: center;
  }

  .${Classes.Content} {
    text-align: center;
    display: flex;
    flex-direction: row;
  }
`;
