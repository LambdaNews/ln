# vue-hackernews-2.0

HackerNews clone built with Vue 2.0 + vue-router + vuex.

<p align="center">
  <a href="https://vue-hn.now.sh" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/499550/17546273/5aabc5fc-5eaf-11e6-8d6a-ad00937e8bd6.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features. In real apps, you should always measure and optimize based on your actual app constraints.

- Client Side Rendering
  - Vue + vue-router + vuex working together
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Progressive Web App
  - App manifest
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views
  - Real-time list updates with FLIP Animation

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Build Setup

**Requires Node.js 7 and yarn+**

``` bash
# install dependencies
yarn

# serve in dev mode, with hot reload at localhost:1234
yarn dev --open

# build for production
yarn bundle

# deploy to web
yarn deploy
```

## License

MIT
