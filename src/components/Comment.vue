<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.by">{{ comment.by }}</router-link>
      {{ comment.time | timeAgo }} ago
      <span class="toggle" :class="{ open }">
        <a @click="open = !open">{{
          open
            ? '[-]'
            : '[+]'
          }}</a>
      </span>
    </div>
    <div v-show="open">
      <div class="text" v-html="comment.text"></div>
      <ul class="comment-children">
        <comment v-for="id in comment.kids" :key="id" :id="id"></comment>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  name: 'comment',
  props: ['id'],
  data () {
    return {
      open: true
    }
  },
  computed: {
    comment () {
      return this.$store.state.items[this.id]
    }
  },
  methods: {
    pluralize: n => n + (n === 1 ? ' reply' : ' replies')
  }
}
</script>

<style lang="stylus">
.comment-children
  .comment-children
    margin-left 1.5em

.comment
  position relative
  max-width 1215px
  p
    margin-top 8px
  .by, .toggle
    font-size 10px
    margin 1em 0
  .by
    color #828282
    a
      color #828282
      text-decoration underline
  .text
    font-size 12px
    overflow-wrap break-word
    a:hover
      color #ff6600
    pre
      white-space pre-wrap
  .toggle
    background-color #fffbf2
    padding .3em .5em
    border-radius 4px
    a
      color #828282
      cursor pointer
    &.open
      padding 0
      background-color transparent
      margin-bottom -0.5em
</style>
