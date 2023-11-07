import type { Meta, StoryObj } from '@storybook/svelte';
import InternationalizationExample from './InternationalizationExample.svelte';

const meta = {
  title: 'Components/InternationalizationExample',
  component: InternationalizationExample,
} satisfies Meta<InternationalizationExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};