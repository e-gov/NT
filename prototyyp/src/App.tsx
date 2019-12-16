import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Theatre, ArenaSelector } from './components/Theatre';
import { CSEnduserUI } from './process/consentService/altUI/CSEnduserUI';
import { Ria } from './process/consentService/altUI/tara';
import { LanguageSelector } from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { Explainer } from './components/Explainer';



const Page = () => {
  const { t } = useTranslation(); // to force init of translations.
  const store = useStore();
  const theatre = store.getState().theatre;

  return (
    <div className="App">
      <Router basename=".">
        <Switch>
          <Route path="(.*)/ui/ria">
            <Ria />
          </Route>
          <Route path="(.*)/ui/csui">
            <CSEnduserUI />
          </Route>
          <Route path="/">
            <nav className="navbar navbar-light bg-light mb-4">
              <span className="navbar-brand">
                <img alt="logo" src={require('./static/assets/images/arena-logo.png')} width="30" />
              </span>
              <span>
                <ArenaSelector arenaNames={theatre.arenas.allNames} />
              </span>
              <div className="w-auto">
                <LanguageSelector />
                <Explainer arena={theatre.active} t={t} />
              </div>
            </nav>
            <div className="container-fluid">
              <Theatre />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}

export default App;
