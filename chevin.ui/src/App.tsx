import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useScreenSizeClass } from './utils/media-query';
import Content from './Content';
import './App.css';

function App() {

  useEffect(() => {

  }, []);

  return <Content />
}

export default function () {
  const screenSizeClass = useScreenSizeClass();

  return (
    <Router>
      <Switch>
        <Route path=''>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}