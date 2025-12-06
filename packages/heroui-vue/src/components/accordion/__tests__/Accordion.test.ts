import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Accordion from '../Accordion.vue';
import AccordionItem from '../AccordionItem.vue';

describe('Accordion', () => {
  it('renders correctly', () => {
    const wrapper = mount(Accordion, {
        slots: {
            default: '<div class="item">Item</div>'
        }
    });
    expect(wrapper.classes()).toContain('heroui-accordion');
    expect(wrapper.text()).toContain('Item');
  });

  it('toggles item', async () => {
      // Must wrap in Accordion to provide context
      const wrapper = mount(Accordion, {
          slots: {
              default: `
                <AccordionItem title="Title" value="1">Content</AccordionItem>
              `
          },
          global: {
              components: { AccordionItem }
          }
      });

      const item = wrapper.findComponent(AccordionItem);
      expect(item.find('.heroui-accordion-item-content').attributes('style')).toContain('max-height: 0px');

      await item.find('button').trigger('click');

      expect(item.find('.heroui-accordion-item-content').attributes('style')).toContain('max-height: 1000px');
  });
});
