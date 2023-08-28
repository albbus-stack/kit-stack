import type { Meta, StoryObj } from '@storybook/svelte';

import TrpcButtons from './TrpcButtons.svelte';

const meta = {
  title: 'Components/TrpcButtons',
  component: TrpcButtons,
  tags: ['autodocs'],
} satisfies Meta<TrpcButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {};
