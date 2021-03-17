<template>
  <div id="menu" v-if="menu">
    <h1>Search</h1>
    <CustomInput v-model="inputValue" />
    <section v-for="categorie in menu.categories" :key="categorie.id">
      <h2>{{ categorie.name }}</h2>
      <Dish
        v-for="item in itemsInCategory(categorie.id)"
        :key="item.id"
        :name="item.name"
        :description="item.description"
        :discount-rate="item.discount_rate"
        :price="item.price"
        :photo="item.photo"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import CustomInput from '@/components/CustomInput.vue'
import Dish from '@/components/Dish.vue'
import IMenuAPI from '@/types/api/menu'
import { IFilterItems } from '@/types/store/menu'

export default defineComponent({
  name: 'Home',
  components: {
    CustomInput,
    Dish,
  },
  setup() {
    const state = reactive({
      inputValue: '',
    })
    const store = useStore()
    const menu = computed<IMenuAPI>(() => store.getters['menu/data'])
    const itemsInCategory = computed<IFilterItems>(
      () => store.getters['menu/itemsInCategory'],
    )
    setTimeout(() => {
      console.log(itemsInCategory.value('1'))
    }, 1000)

    return {
      ...toRefs(state),
      menu,
      itemsInCategory,
    }
  },
})
</script>

<style lang="scss" scoped>
#menu {
  padding: 0 25px 60px;
  margin-top: 28px;

  h1 {
    font-size: 26px;
    margin-bottom: 28px;
  }

  h2 {
    font-size: 26px;
    color: #071c4d;
    font-weight: 600;
    margin: 21px 0;
  }
}
</style>
