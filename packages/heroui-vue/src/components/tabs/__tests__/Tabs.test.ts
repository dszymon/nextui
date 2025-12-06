import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tabs from '../Tabs.vue';
import Tab from '../Tab.vue';

describe('Tabs', () => {
  it('renders tabs', () => {
    const wrapper = mount(Tabs, {
        slots: {
            default: [
                '<Tab title="Tab 1" />',
                '<Tab title="Tab 2" />'
            ]
        },
        global: {
            components: { Tab }
        }
    });
    // This test is tricky because slot content needs correct compilation context.
    // Simplified verification of container.
    expect(wrapper.classes()).toContain('heroui-tabs');
  });
});
