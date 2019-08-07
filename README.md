# RxJS Observable Matchers

> Custom RxJS Observable matchers for Jest and Jasmine

[![NPM version](http://img.shields.io/npm/v/@dirkluijk/observable-matchers.svg?style=flat-square)](https://www.npmjs.com/package/@dirkluijk/observable-matchers)
[![NPM downloads](http://img.shields.io/npm/dm/@dirkluijk/observable-matchers.svg?style=flat-square)](https://www.npmjs.com/package/@dirkluijk/observable-matchers)

## Overview

### What

A small set of test matchers for testing RxJS Observables, compatible with
all versions of [Jasmine](http://jasmine.github.io/) and
[Jest](http://facebook.github.io/jest/).

### Why

When testing simple RxJS observables, [RxJS Marble Testing]() may be too verbose.
This set of test matchers may provide a more simple API and reduce boilerplate code. 

### Limitations

The matchers provided in this package only support synchronous streams.

**Testing asynchronous Observables is not (yet) supported!**

## 🌩 Installation

##### npm

```
npm install @dirkluijk/observable-matchers --save-dev
```

##### yarn

```
yarn add @dirkluijk/observable-matchers --dev
```

## 📝 API

```typescript
import { of } from 'rxjs';
import { next, completed } from '@dirkluijk/observable-matchers';

const completed$ = of(10, 20, 30);

expect(completed$).toBeObservable([
    next(10),
    next(20),
    next(30),
    completed()
]);
expect(completed$).not.toBeEmpty();
expect(completed$).toBeCompleted();
expect(completed$).not.toBeFailed();
expect(completed$).toBeOfSize(3);
```

## 🕹 Usage

### Jest

Include the following in your `package.json`:

```json
"unmockedModulePathPatterns": ["@dirkluijk/observable-matchers"]
```

And the following at the top of your test suite:

```js
import ObservableMatchers from '@dirkluijk/observable-matchers';
```
