import * as React from 'react';
import './home.scss';
import Nav from '../components/nav';
import MdPreview from '../components/noteEditor/markdownPreview';

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="home">
        <div className="content-wrap">
          <MdPreview></MdPreview>
        </div>
      </div>
    );
  }
}
export default Article;
