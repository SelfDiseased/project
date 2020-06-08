import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { MainPage } from './components/MainPage/index';
import { ArtsListPage } from './components/ArtsListPage/index';
import { NotFound } from './components/NotFound/index';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from '../src/theme/index';
import { N } from './components/Navbar/index';
import { ArtPage } from './components/ArtPage/index';
import { AboutPage } from './components/AboutPage/index';
import useGlobalCss from './theme/globalCss';
import { SearchContextProvider } from './context/searchContext';
import { CalendarForm } from './components/CalendarForm/index';
import CalendarPage from './components/CalendarPage/index';
import FooterPage from './components/Footer/index';

function App() {
  useGlobalCss();

  return (
    <MuiThemeProvider theme={theme} >
    <SearchContextProvider>
      <Router>
        <N />
          <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/arts" exact component={ArtsListPage} />
              <Route path="/category/:category">
                <ArtsListPage />
              </Route>
              <Route path="/art/:id" >
                <ArtPage />
              </Route>
              <Route path='/about' exact component={AboutPage} />
              <Route path='/calendarForm' exact component={CalendarForm} />
              <Route path='/calendar/:code' component={CalendarPage} />

              <Route component={NotFound} />
          </Switch>
          <FooterPage />
      </Router>
      </SearchContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
