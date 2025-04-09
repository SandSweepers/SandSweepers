import React from 'react';
import { Navbar } from "./Components/NavComponent/Nav.jsx";
import { Main } from './Components/MainComponent/Main.jsx'
import { AppRouter } from "./Components/RouterComponent/Router";

=======
import { Router } from './Components/RouterComponent/Router.jsx';
import './styles/style.scss';
evelop
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