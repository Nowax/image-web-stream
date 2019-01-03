import React from 'react';

import { withAuthorization } from '../Session';

const DashboardPage = () => (
  <div>
    <h1>Dashboard Page</h1>
    <p>The Dashboard Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardPage);