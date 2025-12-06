import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Avatar from '../Avatar.vue';

describe('Avatar', () => {
  it('renders name initials correctly', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John Doe'
      }
    });
    expect(wrapper.text()).toBe('JD');
  });

  it('renders image when src provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://i.pravatar.cc/150'
      }
    });
    expect(wrapper.find('img').exists()).toBe(true);
  });
});
