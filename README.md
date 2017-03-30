[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]

[![NPM](https://nodei.co/npm/react-notie.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-contextmenu/)

# React Notie
Simple notification for React.

Inspired from [notie](https://github.com/jaredreich/notie) by [@jaredreich](https://github.com/jaredreich)

# Table of Contents
- [Installation](#installation)
- [Browser Support](#browser-support)
- [Usage](#usage)
- [API](#api)
- [Advanced Usage](#advanced-usage)
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

The following methods are availble on `notie` prop.

### alert(props: Object)

Show an alert message.

**props.message: String**

The message to be shown

**props.level: String**

The type of alert-box to shown.

Must be one of:

-   `SUCCESS`
-   `WARN`
-   `INFO`
-   `ERROR`
-   `CONFIRM`

**props.ttl: Number**

The time (in ms) after which the alert-box disappears. Default is `5000` ms.

### success(message: String[, ttl: Number])

Convenience method for showing message with level set to  `SUCCESS`

**message: String**

The message to be shown

**ttl: Number**

The time (in ms) after which the alert-box disappears. Default is `5000` ms.

### warn(message: String[, ttl: Number])

Convenience method for showing message with level set to  `WARN`

**message: String**

The message to be shown

**ttl: Number**

The time (in ms) after which the alert-box disappears. Default is `5000` ms.

### error(message: String[, ttl: Number])

Convenience method for showing message with level set to  `ERROR`

**message: String**

The message to be shown

**ttl: Number**

The time (in ms) after which the alert-box disappears. Default is `5000` ms.

### info(message: String[, ttl: Number])

Convenience method for showing message with level set to  `INFO`

**message: String**

The message to be shown

**ttl: Number**

The time (in ms) after which the alert-box disappears. Default is `5000` ms.

### confirm(message: String[, settings: Object]): Promise

Show a confirmation message with Yes/No options. It returns a Promise, which will be resolved if 'Yes' is selected and will be rejected if 'No' is selected.

**message: String**

The message to be shown

**settings.yesBtnText: String**

Text to be shown for 'Yes' button. Default is 'Yes'.

**settings.noBtnText: String**

Text to be shown for 'No' button. Default is 'No'.

## Advanced Usage

coming soon

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
