import { describe, it, expect, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils'
import router from '../../../src/router/index'
import AppLayout from '../../../src/components/AppLayout.vue';

describe('AppLayout Component', () => {
  const wrapper = mount(AppLayout, {
    slots: {
      default: 'Example View/Page'
    },
    global: {
      plugins: [router]
    }
  });

  beforeAll(async () => {
    await router.isReady()
  })

  it('should render the component with the correct header elements', () => {
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)

    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Find a Doctor')
    expect(wrapper.text()).toContain('My Appointments')
    expect(wrapper.find('[alt="ShiftCare"]').exists()).toBe(true)
  })

  it('should render the view/page inside the main content', () => {
    expect(wrapper.find('main').text()).toContain('Example View/Page')
  })

  it('should render the component with the correct footer elements', () => {
    expect(wrapper.find('footer').text()).toContain('© 2025 ShiftCare. All rights reserved.')
  })
})
