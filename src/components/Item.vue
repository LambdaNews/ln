<template>
  <li class="news-item">
    <div class="media">
      <div class="media-left has-text-centered rank">
        {{ rank }}.
      </div>
      <div class="media-content">
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
      </div>
    </div>
  </li>
</template>

<script>
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item', 'rank'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  }
}
</script>

<style lang="stylus">
.news-item
  padding-top 5px
  position relative
  .rank
    width 36px
    margin 0
</style>
