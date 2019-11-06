import * as React from 'react';
import './index.scss';
// import MdPreview from '../noteEditor/markdownPreview';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentDidMount() {}

  render() {
    return <div className="card">{/* <MdPreview></MdPreview> */}</div>;
  }
}
export default Card;
