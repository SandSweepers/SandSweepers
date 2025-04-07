import React from 'react';
import { Navbar } from "./Components/NavComponent/Nav.jsx";
import { Main } from './Components/MainComponent/Main.jsx';
import { Router } from './Components/RouterComponent/Router.jsx';
import './styles/style.scss';

function App() {
  return (
    <>
      <Main>
        <Router />
      </Main>
      <Navbar />
    </>
  );
}

export default App;