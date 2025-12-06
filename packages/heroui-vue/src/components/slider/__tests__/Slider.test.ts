import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Slider from '../Slider.vue';

describe('Slider', () => {
  it('renders correctly', () => {
    const wrapper = mount(Slider, {
      props: {
        value: 50
      }
    });
    expect(wrapper.classes()).toContain('heroui-slider');
    const thumb = wrapper.find('.heroui-slider-thumb');
    expect(thumb.attributes('style')).toContain('left: 50%');
  });
});
