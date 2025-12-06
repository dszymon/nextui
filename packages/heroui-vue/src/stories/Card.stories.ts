import type { Meta, StoryObj } from '@storybook/vue3';
import Card from '../components/card/Card.vue';
import CardHeader from '../components/card/CardHeader.vue';
import CardBody from '../components/card/CardBody.vue';
import CardFooter from '../components/card/CardFooter.vue';
import Divider from '../components/divider/Divider.vue';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    isPressable: { control: 'boolean' },
    isHoverable: { control: 'boolean' },
    isFooterBlurred: { control: 'boolean' },
    variant: { control: 'select', options: ['shadow', 'bordered', 'flat', 'faded'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Card, CardHeader, CardBody, CardFooter, Divider },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args" style="max-width: 400px;">
        <CardHeader style="display: flex; gap: 10px;">
            <div style="display: flex; flex-direction: column;">
                <p style="font-weight: 600;">HeroUI Vue</p>
                <p style="font-size: 0.875rem; color: #888;">heroui.com</p>
            </div>
        </CardHeader>
        <Divider />
        <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
            <p>Footer</p>
        </CardFooter>
      </Card>
    `,
  }),
};
