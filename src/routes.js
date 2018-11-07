import React, { Fragment } from 'react';
import { Route } from 'react-router';

import Home from './pages/home/Home';
import View from './pages/view/View';

export const Routes = () => {
  return (
    <Fragment>
      <Route path={'/'} exact component={Home} />
      <Route path={'/:id/view'} component={View} />
    </Fragment>
  );
};
