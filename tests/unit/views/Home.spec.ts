import { shallowMount, VueWrapper } from '@vue/test-utils'
import store from '@/store'
import Home from '@/views/Home.vue'
import menuAPI from '@/services/api/menu/methods'

jest.mock('@/services/api/menu/methods', () => {
  const menu = require('@/mocks/menu.json')
  return {
    getMenu: jest.fn(() => ({ data: menu })),
  }
})
let wrapper: VueWrapper<any>

const factory = () => {
  return shallowMount(Home, {
    global: {
      plugins: [store],
      stubs: ['font-awesome-icon'],
      renderStubDefaultSlot: true,
    },
  })
}

describe('Home tests', () => {
  beforeEach(async () => {
    jest.resetModules()
    await store.dispatch('menu/reset')
    wrapper = factory()
  })
  it('should be visible when mounted', () => {
    expect(wrapper).toBeDefined()
  })
  it('should show items when API returns', async () => {
    await store.dispatch('menu/fetchMenu')
    expect(wrapper.find('.menu').exists()).toBe(true)
  })
  it('should filter items accordingly with input value', async () => {
    await store.dispatch('menu/fetchMenu')
    const input = wrapper.find('input')
    await input.setValue('burg')
    expect(wrapper.findAll('.dish')).toHaveLength(2)
    await input.setValue('')
    expect(wrapper.findAll('.dish')).toHaveLength(12)
  })
  it('should show error when API fails', async () => {
    await store.commit('menu/SET_ERROR')
    expect(wrapper.find('.menu__error').exists()).toBe(true)
  })
  it('should be able to commit error when API fails', async () => {
    const mockedMenuApi = menuAPI as jest.Mocked<typeof menuAPI>
    mockedMenuApi.getMenu.mockImplementationOnce(() => Promise.reject())
    await store.dispatch('menu/fetchMenu')
    expect(mockedMenuApi.getMenu).toHaveBeenCalled()
  })
  it('should show loading when API is loading', async () => {
    await store.commit('menu/SET_LOADING')
    expect(wrapper.find('.menu__loading').exists()).toBe(true)
  })
})
