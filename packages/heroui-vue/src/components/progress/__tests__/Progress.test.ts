import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from '../Progress.vue';

describe('Progress', () => {
  it('renders correctly', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 50
      }
    });
    expect(wrapper.classes()).toContain('heroui-progress');
    const indicator = wrapper.find('.heroui-progress-indicator');
    expect(indicator.attributes('style')).toContain('width: 50%');
  });

  it('renders label', () => {
    const wrapper = mount(Progress, {
      props: {
        label: 'Loading...',
        value: 20
      }
    });
    expect(wrapper.text()).toContain('Loading...');
  });

  it('renders value label', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 75,
        showValueLabel: true
      }
    });
    expect(wrapper.text()).toContain('75%');
  });
});
