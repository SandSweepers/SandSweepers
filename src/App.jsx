import React from 'react';
import { Navbar } from "./Components/NavComponent/Nav.jsx";
import { Main } from './Components/MainComponent/Main.jsx'
import { AppRouter } from "./Components/RouterComponent/Router";
import './styles/style.scss';

function App() {
  return (
    <>
      <Main>
        <AppRouter />
      </Main>
      <Navbar />
    </>
  );
}

export default App;