import React from "react";
import Button from "../components/ui/button";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "destructive", "ghost"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  tags: ["autodocs"],
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
  children: "Outline Button",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
  children: "Destructive Button",
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
  children: "Ghost Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "primary",
  children: "Disabled Button",
  disabled: true,
};
