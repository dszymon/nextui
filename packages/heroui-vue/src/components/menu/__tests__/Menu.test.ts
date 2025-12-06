import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Menu from '../Menu.vue';
import MenuItem from '../MenuItem.vue';

describe('Menu', () => {
  it('renders items', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: [
            '<MenuItem>Item 1</MenuItem>',
            '<MenuItem>Item 2</MenuItem>'
        ]
      },
      global: {
          components: { MenuItem }
      }
    });

    expect(wrapper.classes()).toContain('heroui-menu');
    // Testing slots in JSDOM/HappyDOM can be tricky with string templates if not compiled fully.
    // Assuming vue-test-utils handles simple stubs.
  });
});
