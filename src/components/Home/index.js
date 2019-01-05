import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session'
import { AuthUserContext } from '../Session'

const HomePage = () => (
  <AuthUserContext.Consumer> 
    { authUser => 
      <div>
        <h2 style={{paddingLeft: "15px"}}>Welcome on Image Web Stream Application</h2>
        {!!authUser && <p style={{paddingLeft: "15px"}}>Hello {authUser.email}. You can proceed {<Link to={ROUTES.DASHBOARD}>here</Link> }.</p> }
        {!authUser && <p style={{paddingLeft: "15px"}}>To proceed, please {<Link to={ROUTES.SIGN_IN}>Sign In</Link> }</p>}
      </div>
    }
  </AuthUserContext.Consumer>
);

export default withAuthentication(HomePage);