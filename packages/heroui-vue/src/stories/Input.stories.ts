import type { Meta, StoryObj } from '@storybook/vue3';
import Input from '../components/input/Input.vue';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['flat', 'bordered', 'underlined', 'faded'] },
    labelPlacement: { control: 'select', options: ['inside', 'outside', 'outside-left'] },
    isDisabled: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const Variants: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 300px;">
        <Input v-bind="args" variant="flat" label="Flat" placeholder="Flat input" />
        <Input v-bind="args" variant="bordered" label="Bordered" placeholder="Bordered input" />
        <Input v-bind="args" variant="underlined" label="Underlined" placeholder="Underlined input" />
        <Input v-bind="args" variant="faded" label="Faded" placeholder="Faded input" />
      </div>
    `,
  }),
};
