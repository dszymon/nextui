import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Popover from '../Popover.vue';

describe('Popover', () => {
  it('toggles content on click', async () => {
    const wrapper = mount(Popover, {
      slots: {
        trigger: '<button>Trigger</button>',
        content: 'Popover Content'
      }
    });

    expect(wrapper.text()).not.toContain('Popover Content');

    await wrapper.find('.heroui-popover-trigger').trigger('click');

    expect(wrapper.text()).toContain('Popover Content');
  });
});
