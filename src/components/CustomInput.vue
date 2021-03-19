<template>
  <div id="input">
    <font-awesome-icon icon="search" size="xs" :style="{ color: '#838da6' }" />
    <label>
      <input placeholder="Search for dishes..." @input="handleInput" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, { emit }) {
    function handleInput(e: { target: HTMLInputElement }) {
      emit('update:modelValue', e.target.value) // Vue Composition API new event to use v-model on custom component
    }

    return {
      handleInput,
    }
  },
})
</script>

<style scoped lang="scss">
#input {
  display: flex;
  align-items: center;
  border: 2px solid #ebeff4;
  border-radius: 7px;
  padding: 18px 16px;

  input {
    margin-left: 11px;
    background: none;
    border: 0;
    width: 100%;
    font-size: 14px;

    &::placeholder {
      color: #838da6;
    }
  }
}
</style>
