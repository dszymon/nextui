import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox from '../Checkbox.vue';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = mount(Checkbox, {
      slots: {
        default: 'Check me'
      }
    });
    expect(wrapper.text()).toContain('Check me');
    expect(wrapper.classes()).toContain('heroui-checkbox');
  });

  it('updates modelValue when clicked', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        isSelected: false,
        'onUpdate:isSelected': (e: boolean) => wrapper.setProps({ isSelected: e })
      }
    });

    await wrapper.find('input').trigger('change'); // Simulate change
    // Since we handle internal change manually in test sometimes or rely on v-model:
    // Here we mocked the prop update. But trigger change on input should fire emit.
    expect(wrapper.emitted('update:isSelected')).toBeTruthy();
  });
});
