### 【译】You Might Not Need Redux 你也许不需要 Redux

2019 年 06 月 06 日

原文： <https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367>

作者：[Dan Abramov](https://medium.com/@dan_abramov?source=follow_footer--------------------------follow_footer-) Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.

人们经常选择使用 Redux 而非是需要它。“如果不使用的话，万一我们的 app 不能扩展怎么办？”，随后，开发者们对代码中引入的 Redux 感到不满。”为什么我开发一个简单的功能要涉及三个文件？“ 到底为什么！

人们抱怨 Redux，React ，函数式编程，不变性，以及很多事情带来的困扰，我是可以理解的。很自然的去将 Redux 和 不需要“样板代码”来更新状态的方法去做对比，并得出结论，Redux 是复杂的。某种程度来说，是这样的，设计上来讲也是。

Redux 提供一种折中方案，它要求你：

- 用简单对象和数组来描述应用状态
- 用简单对象来描述应用中的变更
- 用纯函数来描述处理变更的逻辑

对于构建一个 app 这些限制都不是必须的，无论是否使用 React。实际上这些都是强约束，所以你在采用它之前需要仔细认真思考，即便只是用了一部分。

是否有好的理由来使用它呢？

这些限制吸引着我是因为它帮助我构建一个这样的 app：

- 将状态持久储存在本地，并根据它启动
- 预先把状态存至服务器，使用 html 发送至客户端，并根据它启动
- 序列化用户操作，连同状态快照一起自动的生成 bug 日志，使得产品开发者可以复现错误
- 通过网络的 action 对象实现协同环境，并不需要代码编写的巨大改变
- 保持一个撤销历史或实现改变，并不需要代码编写的巨大改变
- 游走于开发环境中的状态历史，以及当代码改变时，根据操作历史重新计算当前状态，a la TDD
- 为开发工具提供完整的检查和控制能力，使产品开发者可以为其 app 定制化工具
- 提供可选的 UI，当需要重用大量的业务逻辑时

如果你要开发的是一个可扩展终端、一个 JS 调试器、或者一些 web 应用，也许值得一用，或者至少值得思考一些它的想法（they are [not](https://github.com/evancz/elm-architecture-tutorial) [new](https://github.com/omcljs/om), by the way!）

然而，如果你仅仅是想学习 React，请不要把 Redux 作为你的首选。

取而代之你可以学习 React 哲学( [think in React](https://facebook.github.io/react/docs/thinking-in-react.html) ) 。当你真的需要它的时候再回来学习，或者你现在就像尝试一下一些新的东西。但请谨慎对待，就像你对待任何强限制性工具一样。

如果你对 “Redux 方式” 感到有压力，也许是在告诉你，你和你的团队使用它过于严肃了。它仅仅是你工具箱中的一员，一次更大胆的尝试。

最后，不要忘记你可以从 Redux 中学习它的思想而非应用它，例如，思考一个 使用本地状态的 React 组件：

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = { value: 0 };

  increment = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
```

这种使用方式很好，严格来说，它需要重复使用。

本地 state 很合适。

Redux 的方式在于间接的解耦，从 “发生了什么” 到 “它是怎样变化的” 。

它总是一种好的方式吗？ 不，他是一种折中方案。

例如，我们可以从组件中抽象出一个 reducer ：

```jsx
import React, { Component } from 'react';

const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

class Counter extends Component {
  state = counter(undefined, {});

  dispatch(action) {
    this.setState(prevState => counter(prevState, action));
  }

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };

  render() {
    return (
      <div>
        {this.state.value}
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
```

请注意！我们刚刚使用了 Redux 却没有执行 `npm install` ，哇哦~

状态组件是否也可以使用呢？ 也许不行。除非你有计划并从这种间接方式中获益。按照我们这个时代的说法，计划是关键。

Having a plan is, in the parlance of our times, the 🔑.

[Redux library](http://redux.js.org/) 本身只是一系列辅助，帮助 reducers 得到单一的全局存储对象。你可以按照你喜欢的方式，或多或少的去使用 Redux。

但如果你付出了努力，要确保你收获了回报。

But if you trade something off, make sure you get something in return.☺

### 翻译常用词汇记录

frown at 不满（皱眉）
an approach 一种方法
plain objects 简单对象
strong constraints 严格约束

boot up 启动(计算机)
snapshot 简介，快照
mutation 转变
inspection 检查
business logic 业务逻辑

terminal 终端，终点站
approach it with caution 谨慎对待
It’s a tradeoff 折中方案
extract 提取
stateful components 有状态组件
you can use as much 尽可能多的
