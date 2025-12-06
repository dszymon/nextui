import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../Button.vue';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    });
    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.classes()).toContain('heroui-button');
  });

  it('applies variant classes', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'bordered',
        color: 'primary'
      }
    });
    expect(wrapper.classes()).toContain('heroui-button-bordered');
    expect(wrapper.classes()).toContain('heroui-button-color-primary');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        isDisabled: true
      }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('shows spinner when loading', () => {
    const wrapper = mount(Button, {
      props: {
        isLoading: true
      }
    });
    expect(wrapper.find('.heroui-spinner').exists()).toBe(true);
  });
});
