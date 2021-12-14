import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

import {
  WavefoldingExample,
  GainProcessorExample,
  AdsrExample,
} from './components/examples';
import { Menu } from './components/menu';

function App() {
  return (
    <Router>
      <StyledApp>
        <Menu />
        <Switch>
          <Route path='/examples/gain'>
            <GainProcessorExample />
          </Route>
          <Route path='/examples/wavefolding'>
            <WavefoldingExample />
          </Route>
          <Route path='/examples/adsr'>
            <AdsrExample />
          </Route>
        </Switch>
      </StyledApp>
    </Router>
  );
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export default App;
