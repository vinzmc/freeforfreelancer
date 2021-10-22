import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/form-styling.css';

/* import page */
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/HomePage';
import Dummy from './pages/Dummy';
import SearchPage from './pages/SearchPage';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>

        {/*  */}
        <Route exact path="/DummyPage">
          <Dummy />
        </Route>
        {/* HomePage */}
        <Route exact path="/HomePage">
          <Home />
        </Route>
        {/* register page */}
        <Route exact path="/RegisterPage">
          <RegisterPage />
        </Route>
        {/* Login page */}
        <Route exact path="/LoginPage">
          <LoginPage />
        </Route>
        {/* Search Page */}
        <Route exact path="/SearchPage">
          <SearchPage />
        </Route>
        {/* root */}
        <Route exact path="/">
          <Redirect to="/LoginPage" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
