<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <a :href="item.url">
          {{ item.title }}
        </a>
        <span v-if="item.url" class="host">
          ({{ item.url | host }})
        </span>
        <br>
        <span class="subtext">
          {{ item.score }} points by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
          {{ item.time | timeAgo }} ago | {{ item.descendants + ' comments' }}
        </span>
        <div :show="item.text" class="selftext">
          <span v-html="item.text">
          </span>
        </div>
      </div>
      <div class="item-view-comments">
        <span class="item-view-comments-header">
          <spinner :show="loading"></spinner>
        </span>
        <ul v-if="!loading" class="comment-children">
          <comment v-for="id in item.kids" :key="id" :id="id"></comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import Comment from '../components/Comment.vue'

export default {
  name: 'item-view',
  components: { Spinner, Comment },

  data: () => ({
    loading: true
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    },
  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData ({ store, route: { params: { id }}}) {
    console.log('asyncData')
    return store.dispatch('FETCH_ITEMS', { ids: [id] })
  },

  title () {
    return this.item && this.item.title || 'unknown-title'
  },

  // Fetch comments when mounted on the client
  beforeMount () {
    const id = this.$route.params.id
    if (id && !this.$store.state.items[id]) {
      console.log(['fetching', this.$route.params.id]);
      return this.$store.dispatch('FETCH_ITEMS', { ids: [id] }).then(() => this.fetchComments());
    } else {
      this.fetchComments()
    }
  },

  // refetch comments if item changed
  watch: {
    item: 'fetchComments'
  },

  methods: {
    fetchComments () {
      if (!this.item || !this.item.kids) {
        this.loading = false
        return
      }

      this.loading = true
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false
      })
    }
  }
}

// recursively fetch all descendent comments
function fetchComments (store, item) {
  if (item && item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids
    }).then(() => Promise.all(item.kids.map(id => {
      return fetchComments(store, store.state.items[id])
    })))
  }
}
</script>

<style lang="stylus">
.item-view-header
  //background-color #fff
  padding 1em 2em 1em
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .host, .meta, .meta a
    color #828282
  .meta a
    text-decoration underline

.item-view-comments
  color: black
  margin-top 10px
  padding 0 2em .5em

.item-view-comments-header
  margin 0
  font-size 1.1em
  padding 0
  .spinner
    position absolute
    margin -25px 15px 0

.comment-children
  list-style-type none
  padding 0
  margin 0

@media (max-width 600px)
  .item-view-header
    h1
      font-size 1.25em
</style>
