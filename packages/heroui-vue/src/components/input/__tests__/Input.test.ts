import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '../Input.vue';

describe('Input', () => {
  it('renders label', () => {
    const wrapper = mount(Input, {
      props: {
        label: 'Email'
      }
    });
    expect(wrapper.text()).toContain('Email');
  });

  it('updates modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string | number) => wrapper.setProps({ modelValue: e })
      }
    });

    await wrapper.find('input').setValue('test');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test']);
  });
});
