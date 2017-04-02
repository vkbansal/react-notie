[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]

[![NPM](https://nodei.co/npm/react-notie.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-notie/)

# React Notie
Simple notification for React.

Inspired from [notie](https://github.com/jaredreich/notie) by [@jaredreich](https://github.com/jaredreich)

# Table of Contents
- [Installation](#installation)
- [Browser Support](#browser-support)
- [Usage](#usage)
- [API](#api)
- [Contributors](#contibutors)
- [Changelog](#changelog)
- [License](#license)

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
3. include `react-notie/css/notie.css`.

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

## API

[API docs](./docs/api.md)

## Contributors

[All Contributors](https://github.com/vkbansal/react-notie/graphs/contributors)

## Changelog

For Changelog, see [releases](https://github.com/vkbansal/react-notie/releases)

## License

[MIT](./LICENSE.md). Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)


[npm-url]: https://npmjs.org/package/react-notie
[npm-image]: http://img.shields.io/npm/v/react-notie.svg?style=flat-square

[travis-url]: https://travis-ci.org/vkbansal/react-notie
[travis-image]: http://img.shields.io/travis/vkbansal/react-notie/master.svg?style=flat-square

[deps-url]: https://david-dm.org/vkbansal/react-notie
[deps-image]: https://img.shields.io/david/vkbansal/react-notie.svg?style=flat-square

[dev-deps-url]: https://david-dm.org/vkbansal/react-notie
[dev-deps-image]: https://img.shields.io/david/dev/vkbansal/react-notie.svg?style=flat-square
