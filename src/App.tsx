import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import {
  Examples,
  AdsrExample,
  GainProcessorExample,
  Landing,
  WavefoldingExample,
  Splash,
} from './views';

function App() {
  /**
   * Apps using the Web Audio API need to be interacted with before we are
   * allowed to start any audio contexts- therefore we must wrap the entire app
   * in a splash screen that is deactivated via a click.
   */
  const [activated, setActivated] = React.useState(false);

  return (
    <>
      <Splash visible={!activated} onClick={() => setActivated(true)} />
      {activated && (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='examples' element={<Examples />}>
              <Route path='gain' element={<GainProcessorExample />} />
              <Route path='wavefolding' element={<WavefoldingExample />} />
              <Route path='adsr' element={<AdsrExample />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
