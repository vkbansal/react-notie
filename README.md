[![NPM version][npm-image]][npm-url]

# React Notie
React Notie is a simple notification suite inspired from [notie](https://github.com/jaredreich/notie) by @jaredreich, implemented in react from scratch.

## Installation

Using npm

```
npm install --save react-notie
```

Using yarn

```
yarn add react-notie
```

## Browser Support
- Edge >= 12
- FireFox >= 38
- Chrome >= 47
- Opera >= 34
- Safari >= 9

> Note: For other browsers like Safari < 9 and IE 11, you need to polyfill `Object.assign` and `Promise`.

## Usage

1. Render root of your app within `<NotieProvider />`.
2. use `withNotie` decorator/hoc with the component where you want to notie.
3. include `react-notie/css/react-notie.css`.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { NotieProvider } from 'react-notie';

const App = (
    <NotieProvider>
        <MyApp/>
    </NotieProvider>
)

ReactDOM.render(App, document.getElementById('root'));

// MyComponent.js
import React, { Component } from 'react';
import { withNotie } from 'react-notie';

class MyComponent extends Component {
    someAsyncAction = () => {
        fetch('/do-something').then(() => {
            this.props.notie.success('Thing Done!')
        });
    }

    render() {
        return (
            ......
        )
    }
}

export default withNotie(MyComponent);
```

## Contributors

[All Contributors](https://github.com/vkbansal/react-notie/graphs/contributors)

## Changelog

For Changelog, see [releases](https://github.com/vkbansal/react-notie/releases)

## License

[MIT](./LICENSE.md). Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)


[npm-url]: https://npmjs.org/package/react-notie
[npm-image]: http://img.shields.io/npm/v/react-notie.svg?style=flat-square
