<template>
  <h1>App</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    async function getMenuFromAPI() {
      await store.dispatch('menu/fetchMenu')
    }

    onMounted(getMenuFromAPI)
  },
})
</script>

<style lang="scss">
h1 {
  font-size: 50px;
}
</style>
