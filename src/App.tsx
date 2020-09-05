import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  WavefoldingExample,
  GainProcessorExample,
} from './components/examples';

import './App.css';
import { Menu } from './components/menu';

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Switch>
          <Route path="/examples/gain">
            <GainProcessorExample />
          </Route>
          <Route path="/examples/wavefolding">
            <WavefoldingExample />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
