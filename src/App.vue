<template>
  <div id="hnmain" class="container">
    <nav class="level is-mobile pagetop">
      <div class="level-left">
        <router-link class="level-item" to="/" exact>

          <img class="logo" src="../public/y18.gif" alt="logo">
        </router-link>
        <router-link class="level-item" to="/news"><strong>Lambda News</strong></router-link>
        <div class="level-left">
          <router-link class="level-item" to="/new">new</router-link>
          <span class="bar">|</span><router-link class="level-item" to="/show">show</router-link>
          <span class="bar">|</span><router-link class="level-item" to="/ask">ask</router-link>
          <span class="bar">|</span><router-link class="level-item" to="/job">jobs</router-link>
        </div>
      </div>
      <div class="level-right">
        <a class="github level-item" href="https://github.com/LambdaNews/ln">
          Built with Vue.js + Parcel
        </a>
      </div>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<style>
  body  { font-family:Verdana, Geneva, sans-serif; font-size:10pt; color:#828282; }
  .pagetop { font-family:Verdana, Geneva, sans-serif; font-size: 10pt; color:#222222; }
  a:link    { color:#000000; text-decoration:none; }
  a:visited { color:#000000; text-decoration:none; }
  .item-title   { font-family:Verdana, Geneva, sans-serif; font-size: 10pt; color:#828282; }
</style>

<style lang="stylus">

  html
    -webkit-font-smoothing auto

  .level
    margin 0px !important

  .level-item
    margin-bottom 0 !important
    margin-top 0 !important
    margin-left 0.3em !important
    margin-right 0.3em !important

  a
    color #000000
    text-decoration none

  body
    padding 8px
    line-height normal

  #hnmain
    width 85%

  .pagetop
    background-color #9abfed
    padding 2px
    .logo
      width 18px
      height 18px
      border 1px white solid
      vertical-align text-bottom
    a
      transition color .1s ease
      display inline-block
      vertical-align middle
      &:hover
        color #fff
      &.router-link-active
        color #fff
    .github
      color #fff
      font-size .9em

  .subtext, .host
    font-size 7pt
    color #828282
    a
      color #828282
      &:hover
        color #ff6600
        text-decoration underline

  .text
    a
      text-decoration underline

  p
    margin-top 8px

  .selftext
    margin-top 10px
    p
      margin-top 13px
      margin-bottom 13px

  .reply
    margin-bottom 5px
    margin-top 5px

  .router-view
    background-color #f6f6ef
    position relative

  .fade-enter-active, .fade-leave-active
    transition all .1s ease

  .fade-enter, .fade-leave-active
    opacity 0
</style>

<style>
  @media only screen
  and (min-width : 300px)
  and (max-width : 750px)
  {
    body { padding: 0px; }
    #hnmain { width: 100%; }
  }
</style>
