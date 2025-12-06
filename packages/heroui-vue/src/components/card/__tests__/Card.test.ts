import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '../Card.vue';
import CardHeader from '../CardHeader.vue';
import CardBody from '../CardBody.vue';
import CardFooter from '../CardFooter.vue';

describe('Card', () => {
  it('renders correctly', () => {
    const wrapper = mount(Card, {
      slots: {
        default: 'Card Content'
      }
    });
    expect(wrapper.text()).toContain('Card Content');
    expect(wrapper.classes()).toContain('heroui-card');
  });

  it('renders subcomponents', () => {
    const wrapper = mount({
        components: { Card, CardHeader, CardBody, CardFooter },
        template: `
            <Card>
                <CardHeader>Header</CardHeader>
                <CardBody>Body</CardBody>
                <CardFooter>Footer</CardFooter>
            </Card>
        `
    });

    expect(wrapper.find('.heroui-card-header').text()).toBe('Header');
    expect(wrapper.find('.heroui-card-body').text()).toBe('Body');
    expect(wrapper.find('.heroui-card-footer').text()).toBe('Footer');
  });

  it('emits click when pressable', async () => {
    const wrapper = mount(Card, {
      props: {
        isPressable: true
      }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
