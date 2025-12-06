import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Chip from '../Chip.vue';

describe('Chip', () => {
  it('renders content correctly', () => {
    const wrapper = mount(Chip, {
      slots: {
        default: 'Chip Content'
      }
    });
    expect(wrapper.text()).toContain('Chip Content');
  });

  it('emits close event when close button clicked', async () => {
    const wrapper = mount(Chip, {
      props: {
        isCloseable: true
      }
    });
    await wrapper.find('.heroui-chip-close-button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
