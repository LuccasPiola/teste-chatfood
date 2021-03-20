<template>
  <div class="dish" @click="() => addItemToBasket(dish.id)">
    <div class="dish__info" :style="{ width: dish.photo ? '70%' : '100%' }">
      <h3>{{ dish.name }}</h3>
      <p>{{ dish.description }}</p>
      <div>
        <strong>{{
          dish.discount_rate ? formattedDiscountPrice : formattedOriginalPrice
        }}</strong>
        <h4 v-if="dish.discount_rate">{{ formattedOriginalPrice }}</h4>
      </div>
    </div>
    <div
      v-if="dish.photo"
      class="dish__photo"
      :style="{
        backgroundImage: `url('${dish.photo}')`,
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { IItem } from '@/types/store/menu'
import { transformNumberIntoMoney } from '@/helpers/money'
import { IBasket } from '@/types/components/Dish'

export default defineComponent({
  name: 'Dish',
  setup(props) {
    const formattedOriginalPrice = computed(() =>
      transformNumberIntoMoney({
        number: props.dish.price,
        withLocale: 'ae',
        andStyle: {
          style: 'currency',
          currency: 'AED',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        },
      }),
    )

    const formattedDiscountPrice = computed(() =>
      transformNumberIntoMoney({
        number: props.dish.price * (1 - props.dish.discount_rate),
        withLocale: 'ae',
        andStyle: {
          style: 'currency',
          currency: 'AED',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        },
      }),
    )

    const addItemToBasket = (itemId: string) => {
      const localStorageBasket = localStorage.getItem('@chatfood/basket')
      if (!localStorageBasket) return
      if (!props.dish.stock) {
        alert("We don't have stock for this item")
        return
      }

      const basket: IBasket = JSON.parse(localStorageBasket)
      const index = basket.findIndex(item => item.id === itemId)

      if (index === -1) basket.push({ id: itemId, quantity: 1 })
      else if (basket[index].quantity < props.dish.stock.availability)
        basket[index].quantity += 1
      else {
        alert('You ordered the max permitted quantity for this item')
        return
      }

      localStorage.setItem('@chatfood/basket', JSON.stringify(basket))
    }

    return {
      formattedOriginalPrice,
      formattedDiscountPrice,
      addItemToBasket,
    }
  },
  props: {
    dish: {
      type: Object as () => IItem, // I can only infeer an interface as a prop type with this trick
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.dish {
  display: flex;
  align-items: center;
  padding: 21px 0;
  transition: all 0.2s ease-in;

  &__info {
    h3 {
      color: #071c4d;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 7px;
    }
    p {
      font-weight: 400;
      color: #838da6;
      font-size: 14px;
      margin-bottom: 7px;
    }
    div {
      display: flex;
      strong {
        font-weight: 600;
        font-size: 14px;
        color: #071c4d;
        margin-right: 14px;
      }
      h4 {
        font-size: 14px;
        color: #838da6;
        font-weight: 400;
        text-decoration: line-through;
      }
    }
  }
  &__photo {
    width: 30%;
    height: 91px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 7px;
    margin-left: 14px;
  }

  & + .dish {
    border-top: 1px solid #f4f6f9;
  }

  &:active {
    transition: all 0.2s ease-in;
    background-color: #eeefff;
  }
}
</style>
