import * as React from 'react';
import './index.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="card">
        <div className="card-title">SDYZ</div>
      </div>
    );
  }
}
export default Card;
