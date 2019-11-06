import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import article from '../../posts/20191104_demo/article.md';

class MdPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentDidMount() {}

  render() {
    return (
      <ReactMarkdown
        source={article}
        escapeHtml={false}
        renderers={{
          code: CodeBlock
        }}
      />
    );
  }
}
export default MdPreview;
