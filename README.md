# RxJS Observable Matchers

> Custom RxJS Observable matchers for Jest and Jasmine

[![NPM version](http://img.shields.io/npm/v/@dirkluijk/observable-matchers.svg?style=flat-square)](https://www.npmjs.com/package/@dirkluijk/observable-matchers)
[![NPM downloads](http://img.shields.io/npm/dm/@dirkluijk/observable-matchers.svg?style=flat-square)](https://www.npmjs.com/package/@dirkluijk/observable-matchers)
[![Build status](https://img.shields.io/travis/dirkluijk/observable-matchers.svg?style=flat-square)](https://travis-ci.org/dirkluijk/observable-matchers)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

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

## Installation 🌩

##### npm

```
npm install @dirkluijk/observable-matchers --save-dev
```

##### yarn

```
yarn add @dirkluijk/observable-matchers --dev
```

## API 📝

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

## Usage 🕹

### Jest

Include the following in your `package.json`:

```json
"unmockedModulePathPatterns": ["@dirkluijk/observable-matchers"]
```

And the following at the top of your test suite:

```js
import ObservableMatchers from '@dirkluijk/observable-matchers';
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/dirkluijk"><img src="https://avatars2.githubusercontent.com/u/2102973?v=4" width="100px;" alt="Dirk Luijk"/><br /><sub><b>Dirk Luijk</b></sub></a><br /><a href="https://github.com/dirkluijk/@dirkluijk/observable-matchers/commits?author=dirkluijk" title="Code">💻</a> <a href="https://github.com/dirkluijk/@dirkluijk/observable-matchers/commits?author=dirkluijk" title="Documentation">📖</a></td>
    <td align="center"><a href="https://craftsmen.nl/"><img src="https://avatars0.githubusercontent.com/u/16564855?v=4" width="100px;" alt="Daan Scheerens"/><br /><sub><b>Daan Scheerens</b></sub></a><br /><a href="#ideas-dscheerens" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
