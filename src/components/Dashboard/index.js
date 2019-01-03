import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

class DashboardPageBase extends React.Component {
  state = {
    fileName: null,
    imageUrl: null
  };

  componentDidMount() {
    this.props.firebase.getLatestImage().then( doc => {
      this.setState({ fileName: doc.fileName,
        imageUrl: doc.imageUrl})
    })
  }

  render() {
    const { fileName, imageUrl } = this.state;

    return (
      <div>
      <h1>Dashboard Page</h1>
      {!!fileName && fileName }<br/>
      {!!imageUrl && <img src={imageUrl} alt="Uploaded reasource"></img>}<br/>
      <p>The Dashboard Page is accessible by every signed in user.</p>
      <button onClick={this.props.firebase.getLatestImage}>button</button>
    </div>
    );
  }
}

const condition = authUser => !!authUser;

const DashboardPage = compose(
  withAuthorization(condition),
  withFirebase,
)(DashboardPageBase);

export default withAuthorization(condition)(DashboardPage);