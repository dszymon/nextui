import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Dropdown from '../Dropdown.vue';

describe('Dropdown', () => {
  it('toggles menu on open', async () => {
    const wrapper = mount(Dropdown, {
      props: {
        isOpen: false
      },
      slots: {
        trigger: '<button>Trigger</button>',
        menu: '<div>Menu Content</div>'
      }
    });

    expect(wrapper.text()).not.toContain('Menu Content');

    await wrapper.setProps({ isOpen: true });

    expect(wrapper.text()).toContain('Menu Content');
  });
});
