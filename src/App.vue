<template>
  <div id="navbar">
    <font-awesome-icon
      icon="arrow-left"
      size="2x"
      :style="{ color: '#050505', cursor: 'pointer' }"
      @click="resetState"
    />
  </div>
  <router-view />
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

    async function resetState() {
      await store.dispatch('menu/reset')
      localStorage.setItem('@chatfood/basket', JSON.stringify([]))
    }

    function setLocalStorageBasket() {
      const basketExistsInLocalStore = localStorage.getItem('@chatfood/basket')
      if (!basketExistsInLocalStore) {
        localStorage.setItem('@chatfood/basket', JSON.stringify([]))
      }
    }

    onMounted(() => {
      getMenuFromAPI()
      setLocalStorageBasket()
    })

    return {
      resetState,
    }
  },
})
</script>

<style lang="scss">
#navbar {
  width: 100%;
  padding: 60px 25px 0;
}
</style>
