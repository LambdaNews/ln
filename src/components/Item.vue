<template>
  <li class="news-item">
    <span class="item-title">
      <template v-if="item.url">
        <a :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
        <span class="host"> ({{ item.url | host }})</span>
      </template>
      <template v-else>
        <router-link :to="'/item/' + item.id">{{ item.title }}</router-link>
      </template>
    </span>
    <br>
    <span class="subtext">
      <span class="score">{{ item.score }} points</span>
      <span v-if="item.type !== 'job'" class="by">
        by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
      </span>
      <span class="time">
        {{ item.time | timeAgo }} ago
      </span>
      <span v-if="item.type !== 'job'" class="comments-link">
        | <router-link :to="'/item/' + item.id">{{ item.descendants }} comments</router-link>
      </span>
    </span>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style>
  a:link    { color:#000000; text-decoration:none; }
  a:visited { color:#000000; text-decoration:none; }
  .item-title   { font-family:Verdana, Geneva, sans-serif; font-size: 10pt; color:#828282; }
</style>

<style lang="stylus">
.news-item
  padding-top 5px
  position relative
  .subtext, .host
    font-size 7pt
    color #828282
    a
      color #828282
      &:hover
        color #ff6600
</style>
