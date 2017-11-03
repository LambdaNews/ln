<template>
  <li v-if="comment" class="comment">
    <div class="comhead">
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
      <div class="text reply" style="font-size:10px">
        <a>reply</a>
      </div>
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
  padding 1px
  position relative
  max-width 1215px
  .comhead, .toggle
    font-size 10px
    margin 5px 0 5px 0
  .comhead
    color #828282
    a
      color #828282
      text-decoration none
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
