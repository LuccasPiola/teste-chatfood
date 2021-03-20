import { shallowMount, VueWrapper } from '@vue/test-utils'
import CustomInput from '@/components/CustomInput.vue'

let wrapper: VueWrapper<any>
const factory = () => {
  return shallowMount(CustomInput, {
    global: {
      stubs: ['font-awesome-icon'],
    },
  })
}
beforeEach(() => {
  wrapper = factory()
})

describe('CustomInput tests', () => {
  it('should be visible when mounted', () => {
    expect(wrapper).toBeDefined()
  })
  it('should emit event to the parent', async () => {
    const input = wrapper.find('input')
    await input.setValue('testing')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })
})
