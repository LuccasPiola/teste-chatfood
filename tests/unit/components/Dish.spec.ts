import 'jest-localstorage-mock'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import Dish from '@/components/Dish.vue'
import dishes from '@/mocks/dishes.json'

let wrapper: VueWrapper<any>
const dishesArray = dishes

const factory = () => {
  return shallowMount(Dish, {
    props: {
      dish: dishesArray[0],
    },
  })
}
beforeEach(() => {
  wrapper = factory()
  localStorage.clear()
})

describe('Dish tests', () => {
  it('should be visible when mounted', () => {
    expect(wrapper).toBeDefined()
  })
  it('should show formatted price with discount', () => {
    const formattedPrice = wrapper.find('strong')
    expect(formattedPrice.text()).toEqual('AED 90')
  })
  it('should show formatted price without discount', () => {
    const anotherWrapper = shallowMount(Dish, {
      props: {
        dish: dishesArray[1],
      },
    })
    const formattedPrice = anotherWrapper.find('strong')
    expect(formattedPrice.text()).toEqual('AED 100')
  })
  it('should add item in basket when it has stock available', async () => {
    localStorage.setItem('@chatfood/basket', JSON.stringify([]))
    await wrapper.get('.dish').trigger('click')

    expect(localStorage.__STORE__).toEqual({
      '@chatfood/basket': '[{"id":"1","quantity":1}]',
    })

    await wrapper.get('.dish').trigger('click')

    expect(localStorage.__STORE__).toEqual({
      '@chatfood/basket': '[{"id":"1","quantity":2}]',
    })
  })

  it('should not add item in basket when it has stock unavailable', async () => {
    window.alert = jest.fn()
    localStorage.setItem(
      '@chatfood/basket',
      JSON.stringify([{ id: '1', quantity: 2 }]),
    )
    await wrapper.get('.dish').trigger('click')

    expect(localStorage.__STORE__).toEqual({
      '@chatfood/basket': '[{"id":"1","quantity":2}]',
    })
    expect(window.alert).toHaveBeenCalled()
  })

  it('should not add item in basket when it does not have stock', async () => {
    window.alert = jest.fn()
    localStorage.setItem('@chatfood/basket', '{}')
    const anotherWrapper = shallowMount(Dish, {
      props: {
        dish: dishesArray[1],
      },
    })
    await anotherWrapper.get('.dish').trigger('click')

    expect(localStorage.__STORE__).toEqual({ '@chatfood/basket': '{}' })
    expect(window.alert).toHaveBeenCalledWith(
      "We don't have stock for this item",
    )
  })

  it('should return if localStorage item does not exists', async () => {
    await wrapper.get('.dish').trigger('click')
    expect(localStorage.__STORE__).toEqual({})
  })
})
