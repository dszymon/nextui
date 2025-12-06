import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../components/button/Button.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  args: {
    default: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'primary',
  },
};

export const Variants: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 10px;">
        <Button v-bind="args" color="default">Default</Button>
        <Button v-bind="args" color="primary">Primary</Button>
        <Button v-bind="args" color="secondary">Secondary</Button>
        <Button v-bind="args" color="success">Success</Button>
        <Button v-bind="args" color="warning">Warning</Button>
        <Button v-bind="args" color="danger">Danger</Button>
      </div>
    `,
  }),
};
