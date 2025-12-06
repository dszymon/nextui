import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from '../Badge.vue';

describe('Badge', () => {
  it('renders content correctly', () => {
    const wrapper = mount(Badge, {
      props: {
        content: '5'
      }
    });
    expect(wrapper.text()).toContain('5');
  });

  it('applies variant and color classes', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'flat',
        color: 'warning'
      }
    });
    const badge = wrapper.find('.heroui-badge');
    expect(badge.classes()).toContain('heroui-badge-flat');
    expect(badge.classes()).toContain('heroui-badge-warning');
  });
});
