import * as React from 'react';
import './index.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="nav">
        <div className="nav-head">SDYZ</div>
        <div className="nav-menu">
          <div className="menu-item">首页</div>
          <div className="menu-item">标签</div>
          <div className="menu-item">分类</div>
          <div className="menu-item">归档</div>
          <div className="menu-item">关于</div>
        </div>
      </div>
    );
  }
}
export default Nav;
