import React from 'react';
import { compose } from 'recompose';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

class DashboardPageBase extends React.Component {
  state = {
    date: null,
    time: null,
    imageUrl: null,
  };

  componentDidMount() {
    this.props.firebase.getLatestImage().then( doc => {
      let imageName = doc.fileName.replace(/^image-/, '').replace(/--/, ' ').replace(/.jpg/, '')
      let date = imageName.split(" ")
      this.setState({ date: date[0],
        time: date[1].split('-').join(':'),
        imageUrl: doc.imageUrl})
    })
  }


  render() {
    const { date, time, imageUrl } = this.state;

    console.log(this.width)
    return (
      <div>
        <h1>Dashboard</h1>
        <h2>{!!date && date }</h2>
        <h2>{!!time && time }</h2>
        {!!imageUrl && <img src={imageUrl} alt="Uploaded reasource"></img>}<br/>
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