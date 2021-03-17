<template>
  <div class="dish">
    <div class="dish__info">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
      <div>
        <strong>AED {{ price }}</strong>
        <h4>AED 15.20</h4>
      </div>
    </div>
    <div
      class="dish__photo"
      :style="{
        backgroundImage: `url('${photo}')`,
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Dish',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: [String],
      default: '',
    },
    discountRate: {
      type: Number,
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

  &__info {
    width: 70%;
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
    border-radius: 7px;
    margin-left: 7px;
  }

  & + .dish {
    border-top: 1px solid #f4f6f9;
  }
}
</style>
