import type { Meta, StoryObj } from '@storybook/svelte';
import LanguageSwitch from './LanguageSwitch.svelte';

const meta = {
  title: 'Components/LanguageSwitch',
  component: LanguageSwitch,
} satisfies Meta<LanguageSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    locale: "en"
  }
};