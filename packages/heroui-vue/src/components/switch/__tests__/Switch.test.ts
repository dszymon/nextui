import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Switch from '../Switch.vue';

describe('Switch', () => {
  it('renders correctly', () => {
    const wrapper = mount(Switch, {
      slots: {
        default: 'Toggle me'
      }
    });
    expect(wrapper.text()).toContain('Toggle me');
  });

  it('emits update when clicked', async () => {
    const wrapper = mount(Switch);
    await wrapper.find('input').trigger('change');
    expect(wrapper.emitted('update:isSelected')).toBeTruthy();
  });
});
