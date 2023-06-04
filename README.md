# react-adaka
High-precision state management for React using [adaka](https://npmjs.com/package/adaka).

![license](https://img.shields.io/github/license/kofrasa/react-adaka)
[![version](https://img.shields.io/npm/v/react-adaka)](https://www.npmjs.org/package/react-adaka)
[![build](https://github.com/kofrasa/react-adaka/actions/workflows/node.js.yml/badge.svg)](https://github.com/kofrasa/react-adaka/actions/workflows/node.js.yml)
![issues](https://img.shields.io/github/issues/kofrasa/react-adaka)
[![codecov](https://img.shields.io/codecov/c/github/kofrasa/react-adaka)](https://codecov.io/gh/kofrasa/react-adaka)
[![npm downloads](https://img.shields.io/npm/dm/react-adaka)](https://www.npmjs.org/package/react-adaka)

## Install

`npm i react-adaka`

## Usage

Define your store and selector.
```ts
// store.ts
import { createStore, createSelectorHook } from "react-adaka"

// first create your store
export const store = createStore({
  status: "error",
  errors: [
    { type:"api", message: "unknown error" }
  ],
});

// create a selector hook. need only per store.
export const useSelector = createSelectorHook(store)
```

Now use the selector.
```ts
// component.ts
import { useSelector } from "./store"

// use the hook inside your React component.
function ShowErrorTypes() {
  // select the types of errors only when the status is in "error".
  const { errorTypes } = useSelector({ errorTypes: "$errors.type" }, { status: "error"})

  return errorTypes ? <div>Issues found: {errorTypes.join("\n")} </div> : <div/>
}

export default ShowErrorTypes
```
## License

MIT