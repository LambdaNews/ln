import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type, url) {
  console.log(['createListView', type, url])
  return {
    name: `${type}-stories-view`,

    data () {
      return {show: false}
    },

    methods:{
      rerender(){
        this.show = false
        this.$nextTick(() => {
          this.show = true
          console.log('re-render start')
          this.$nextTick(() => {
            console.log('re-render end')
          })
        })
      }
    },

    asyncData ({ store }) {
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    beforeMount() {
      console.log(['createListView:beforeMount', this.$store]);
      return this.$store.dispatch('FETCH_LIST_DATA', { type }).then(
        () => {
          console.log('done')
          this.rerender()
        })
    },

    title: camelize(type),

    render (h) {
      return this.show ? h(ItemList, { props: { type, url: (url || type) }}) : null;
    }
  }
}
