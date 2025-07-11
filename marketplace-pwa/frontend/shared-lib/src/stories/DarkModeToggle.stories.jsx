import React from "react";
import DarkModeToggle from "../components/ui/DarkModeToggle";

export default {
  title: "UI/DarkModeToggle",
  component: DarkModeToggle,
};

const Template = (args) => <DarkModeToggle {...args} />;

// Typical code lines for a Storybook story. Args are passed and managed by Storybook
export const Default = Template.bind({});
// Define the default args for the story as an empty object
Default.args = {};
