<template>
  <div class="news-view container">
    <transition :name="transition">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <div v-for="(item, index) in displayedItems" :key="item.id">
            <item :item="item" :rank="itemRank(item, index)">
            </item>
          </div>
        </transition-group>
      </div>
    </transition>
    <div class="news-list-nav">
      <router-link v-if="hasMore" :to="'/' + url + '/' + (page + 1)">More</router-link>
      <a v-else class="disabled">More</a>
      <span class="subtext"> &nbsp; {{ page }} / {{ maxPage }}</span>
    </div>
  </div>
</template>

<script>
import { watchList } from '../api'
import Item from '../components/Item.vue'

export default {
  name: 'item-list',

  components: {
    Item
  },

  props: {
    type: String,
    url: String
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    itemsPerPage () {
      const { itemsPerPage } = this.$store.state
      return itemsPerPage;
    },
    itemsCount () {
      const { lists } = this.$store.state
      return lists[this.type].length;
    },
    maxPage () {
      return Math.ceil(this.itemsCount / this.itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
    // watch the current list for realtime updates
    this.unwatchList = watchList(this.type, ids => {
      this.$store.commit('SET_LIST', { type: this.type, ids })
      this.$store.dispatch('ENSURE_ACTIVE_ITEMS').then(() => {
        this.displayedItems = this.$store.getters.activeItems
      })
    })
  },

  beforeDestroy () {
    this.unwatchList()
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    itemRank (item, index) {
      return (this.page - 1) * this.itemsPerPage + (index + 1)
    },
    loadItems (to = this.page, from = -1) {
      this.$bar.start()
      this.$store.dispatch('FETCH_LIST_DATA', {
        type: this.type
      }).then(() => {
        if (this.page < 0 || this.page > this.maxPage) {
          this.$router.replace(`/${this.url}/1`)
          return
        }
        this.transition = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right'
        this.displayedPage = to
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
      })
    }
  }
}
</script>

<style lang="stylus">
.news-view
  width 100%

.news-list-nav
  padding 20px

.news-list
  transition all .1s cubic-bezier(.55,0,.1,1)

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .1s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

</style>
