<template>
  <div id="app">
    <header class="header container">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="~public/y18.gif" alt="logo">
        </router-link>
        <router-link to="/top"><strong>Hacker News</strong></router-link>
        <router-link to="/new">New</router-link>
        <router-link to="/show">Show</router-link>
        <router-link to="/ask">Ask</router-link>
        <router-link to="/job">Jobs</router-link>
        <a class="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<style>
  body  { font-family:Verdana, Geneva, sans-serif; font-size:10pt; color:#828282; }
</style>

<style lang="stylus">
body
  padding-top 10px
  overflow-y scroll

a
  color #34495e
  text-decoration none

.header
  background-color #9abfed
  //position fixed
  width 85%
  z-index 999
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    padding 2px 5px
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0
  .github
    color #fff
    font-size .9em
    margin 0
    float right

.logo
  width 18px
  height 18px
  border 1px white solid
  display inline-block
  //vertical-align middle

.router-view
  background-color #f6f6ef
  width 85%
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
