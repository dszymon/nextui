import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from '../Tooltip.vue';

describe('Tooltip', () => {
  it('renders content when open', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'Tooltip Content',
        trigger: 'click' // Easier to test
      },
      slots: {
        default: '<button>Trigger</button>'
      }
    });

    // Initially hidden (internal state)
    // await wrapper.find('.heroui-tooltip-wrapper').trigger('mouseenter');
    // Using props to force open for testing structure
    await wrapper.setProps({ isOpen: true });

    expect(wrapper.text()).toContain('Tooltip Content');
  });
});
