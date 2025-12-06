import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Spinner from '../Spinner.vue';

describe('Spinner', () => {
  it('renders correctly', () => {
    const wrapper = mount(Spinner);
    expect(wrapper.classes()).toContain('heroui-spinner');
  });

  it('applies color class', () => {
    const wrapper = mount(Spinner, {
      props: {
        color: 'success'
      }
    });
    expect(wrapper.classes()).toContain('heroui-spinner-success');
  });

  it('applies size class', () => {
    const wrapper = mount(Spinner, {
      props: {
        size: 'lg'
      }
    });
    expect(wrapper.classes()).toContain('heroui-spinner-lg');
  });

  it('renders label', () => {
    const wrapper = mount(Spinner, {
      props: {
        label: 'Loading...'
      }
    });
    expect(wrapper.text()).toContain('Loading...');
  });
});
