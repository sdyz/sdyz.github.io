import * as React from 'react';
import './home.scss';
import Nav from '../components/nav';
import Card from '../components/card';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <Nav></Nav>
        <div className="content-wrap">
          <Card></Card>
        </div>
      </div>
    );
  }
}
export default Home;
