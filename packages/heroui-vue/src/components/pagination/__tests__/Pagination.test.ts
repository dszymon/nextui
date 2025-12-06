import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from '../Pagination.vue';

describe('Pagination', () => {
  it('renders pages correctly', () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 5
      }
    });
    const items = wrapper.findAll('.heroui-pagination-item');
    // 5 pages + 2 controls (prev/next) if showControls is default true
    expect(items.length).toBe(7);
  });

  it('updates page on click', async () => {
    const wrapper = mount(Pagination, {
      props: {
        total: 5,
        page: 1,
        'onUpdate:page': (e: number) => wrapper.setProps({ page: e })
      }
    });

    // Click page 2 (index 2 because index 0 is prev)
    await wrapper.findAll('.heroui-pagination-item')[2].trigger('click');
    expect(wrapper.emitted('update:page')).toBeTruthy();
    expect(wrapper.emitted('update:page')![0]).toEqual([2]);
  });
});
