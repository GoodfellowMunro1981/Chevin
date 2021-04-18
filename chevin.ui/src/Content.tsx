import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './app-routes';


type ContentProps = {

}

const Content: React.FC<ContentProps> = props => {

  useEffect(() => {
  }, [])

  return (
    <Switch>
      {routes.map(({ path, component }) => (
        <Route
          exact
          key={path}
          path={path}
          component={component}
        />
      ))}
      <Redirect to={'/'} />
    </Switch>
  );
}

export default Content;