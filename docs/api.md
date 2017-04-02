# API

The module exports the following:
- `NotieProvider`
- `Notie`
- `withNotie`

**Example**

```jsx
import { NotieProvider, Notie, withNotie } from react-notie;
```

### `<NotieProvider />`

Makes `notie` available to components that are decorated using `withNotie()`. Normally you cannot use `withNotie()` without wrapping the root component in `<NotieProvider />`.

**Props**

| Prop     | Type         | Required? | Description                           |
| -------- | ------------ | --------- | ------------------------------------- |
| children | ReactElement | ✓         | The root of your component hierarachy |

The rest of the props are passed to `<Notie />` and can be used to set global settings. See [Notie](#notie-) for the possible settings.

**Example**

**normal usage**

```jsx
ReactDOM.render(
  <NotieProvider>
  	<MyRootComponent />
  </NotieProvider>
)
```

**custom global settings**

```jsx
ReactDOM.render(
  <NotieProvider ttl={2000} position='bottom'>
  	<MyRootComponent />
  </NotieProvider>
)
```



### `<Notie />`

The heart of the `react-notie`. This component is used to show the notifications. Normally, you should not use this component directly.

#### Props

| Prop     | Type   | Default | Description                              |
| -------- | ------ | ------- | ---------------------------------------- |
| ttl      | Number | `5000`  | Time to Live. The time (in ms) after which the notification is automatically dismissed. |
| position | String | `'top'` | The position, where the notifications must be shown. Must one of [ `'top'`, `'bottom'`] |



### `withNotie(ReactElement): ReactElement`

Its a higher-order function that when applied to a component, returns a new component, which has a `notie` object in it's props. It does not modify the component class passed to it.

The following methods are available on `notie` prop on the component decorated using `withNotie`.

#### alert(props: Object)

Show an alert message.

**arguments**

| Argument      | Type   | Required? | Default | Description                              |
| ------------- | ------ | --------- | ------- | ---------------------------------------- |
| props.message | String | ✓         |         | The message to be shown                  |
| props.level   | String | ✓         |         | The type of alert-box to shown. Must be one of [ `SUCCESS`, `WARN`, `INFO`, `ERROR`, `CONFIRM` ] |
| props.ttl     | Number |           | `5000`  | The time (in ms) after which the alert-box disappears |

#### success(message: String[, ttl: Number])

Convenience method for showing message with level set to  `SUCCESS`

**arguments**

| Argument | Type   | Required? | Default | Description                              |
| -------- | ------ | --------- | ------- | ---------------------------------------- |
| message  | String | ✓         |         | The message to be shown                  |
| ttl      | Number |           | `5000`  | The time (in ms) after which the alert-box disappears |

#### warn(message: String[, ttl: Number])

Convenience method for showing message with level set to  `WARN`

**arguments**

| Argument | Type   | Required? | Default | Description                              |
| -------- | ------ | --------- | ------- | ---------------------------------------- |
| message  | String | ✓         |         | The message to be shown                  |
| ttl      | Number |           | `5000`  | The time (in ms) after which the alert-box disappears |

#### error(message: String[, ttl: Number])

Convenience method for showing message with level set to  `ERROR`

**arguments**

| Argument | Type   | Required? | Default | Description                              |
| -------- | ------ | --------- | ------- | ---------------------------------------- |
| message  | String | ✓         |         | The message to be shown                  |
| ttl      | Number |           | `5000`  | The time (in ms) after which the alert-box disappears |

#### info(message: String[, ttl: Number])

Convenience method for showing message with level set to  `INFO`

**arguments**

| Argument | Type   | Required? | Default | Description                              |
| -------- | ------ | --------- | ------- | ---------------------------------------- |
| message  | String | ✓         |         | The message to be shown                  |
| ttl      | Number |           | `5000`  | The time (in ms) after which the alert-box disappears |

#### confirm(message: String[, settings: Object]): Promise

Show a confirmation message with Yes/No options. It returns a `Promise`, which will be resolved if 'Yes' is selected and will be rejected if 'No' is selected.

**arguments**

| Argument            | Type   | Required? | Default | Description                       |
| ------------------- | ------ | --------- | ------- | --------------------------------- |
| message             | String | ✓         |         | The message to be shown           |
| settings.yesBtnText | String |           | `'Yes'` | Text to be shown for 'Yes' button |
| settings.noBtnText  | String |           | `'No'`  | Text to be shown for 'No' button  |
