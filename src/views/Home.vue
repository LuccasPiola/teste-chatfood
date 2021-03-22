<template>
  <div class="menu" v-if="filteredItemsSeparatedByCategory.length">
    <h1>Search</h1>
    <CustomInput v-model="inputValue" data-test="input" />
    <section v-for="categorie in availableCategories" :key="categorie.id">
      <h2>{{ categorie.name }}</h2>
      <Dish
        v-for="item in filteredItemsSeparatedByCategory[categorie.id - 1]"
        :key="item.id"
        :dish="item"
      />
    </section>
    <h2 class="menu__no-items" v-if="!availableCategories.length">
      No results...
    </h2>
  </div>
  <div class="menu" v-if="apiHasError">
    <h1>Search</h1>
    <h2 class="menu__error">
      Error in API. <br />
      Click in the arrow.
    </h2>
  </div>
  <div class="menu" v-if="apiIsLoading">
    <h1>Search</h1>
    <h2 class="menu__loading">
      Loading API. <br />
      Please wait...
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'

import { IItem, ICategorie } from '@/types/store/menu'
import { IHomeState } from '@/types/views/Home'

import CustomInput from '@/components/CustomInput.vue'
import Dish from '@/components/Dish.vue'
import {
  getAvailableCategories,
  getItemsSeparatedByCategories,
} from '@/helpers/menu'

export default defineComponent({
  name: 'Home',
  components: {
    CustomInput,
    Dish,
  },
  setup() {
    const store = useStore()
    const categories = computed<ICategorie[]>(
      () => store.getters['menu/categories'],
    )
    const items = computed<IItem[]>(() => store.getters['menu/items'])
    const apiHasError = computed<boolean>(() => store.getters['menu/hasError'])
    const apiIsLoading = computed<boolean>(
      () => store.getters['menu/isLoading'],
    )

    const state = reactive<IHomeState>({
      inputValue: '',
      filteredItems: [],
    })

    const filteredItemsSeparatedByCategory = computed(() =>
      getItemsSeparatedByCategories({
        forThisCategories: categories.value,
        andItems: state.filteredItems,
      }),
    )

    const availableCategories = computed(() =>
      getAvailableCategories({
        forThisCategories: categories.value,
        andItems: state.filteredItems,
      }),
    )

    // The only reason for this watch is because the items variable value is asynchronous
    watch(
      () => items.value,
      newValue => {
        if (!state.filteredItems.length) state.filteredItems = newValue
      },
    )

    // This watches the input. This way, the user don't need to press enter to search
    watch(
      () => state.inputValue,
      newValue => {
        state.filteredItems = newValue.length
          ? items.value.filter(item =>
              item.name.toLowerCase().includes(newValue.toLowerCase()),
            )
          : items.value
      },
    )

    return {
      ...toRefs(state),
      availableCategories,
      filteredItemsSeparatedByCategory,
      apiHasError,
      apiIsLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
.menu {
  padding: 0 25px 60px;
  max-width: 1200px;
  margin: 28px auto 0;

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

  &__no-items {
    margin-top: 28px;
  }

  &__error {
    margin-top: 28px !important;
    font-size: 20px !important;
    color: darkred !important;
  }

  &__loading {
    margin-top: 28px !important;
    font-size: 20px !important;
  }

  @include lg {
    h1 {
      font-size: 30px;
      margin-bottom: 28px;
    }

    h2 {
      font-size: 30px;
      margin: 21px 0 0;
    }
  }

  @include xl {
    h1 {
      font-size: 36px;
      margin-bottom: 28px;
    }

    h2 {
      font-size: 45px;
      margin: 21px 0 0;
    }
  }
}
</style>
