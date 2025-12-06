import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Alert from '../Alert.vue';

describe('Alert', () => {
  it('renders title and description', () => {
    const wrapper = mount(Alert, {
      props: {
        title: 'Error',
        description: 'Something went wrong'
      }
    });
    expect(wrapper.text()).toContain('Error');
    expect(wrapper.text()).toContain('Something went wrong');
  });

  it('emits close event', async () => {
    const wrapper = mount(Alert, {
      props: {
        isClosable: true
      }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
