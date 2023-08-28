import type { Meta, StoryObj } from '@storybook/svelte';

import LoginForm from './LoginForm.svelte';
import type { SupabaseClient } from '@supabase/supabase-js';

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  args:{
    data: {
      supabase: null as unknown as SupabaseClient<never, "public", never>,
      session: null,
      url: ""
    },
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['demo', 'signup', 'signin', 'signout'],
    }
  }
} satisfies Meta<LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    type: "demo"
  }
};

export const Signup: Story = {
  args: {
    type: "signup"
  }
};

export const Signin: Story = {
  args: {
    type: "signin"
  }
};

export const Signout: Story = {
  args: {
    type: "signout"
  }
};