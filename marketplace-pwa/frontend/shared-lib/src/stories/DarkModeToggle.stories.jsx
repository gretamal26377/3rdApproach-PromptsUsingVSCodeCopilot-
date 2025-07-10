import React from "react";
import DarkModeToggle from "../components/ui/DarkModeToggle";

export default {
  title: "UI/DarkModeToggle",
  component: DarkModeToggle,
};

const Template = (args) => <DarkModeToggle {...args} />;

export const Default = Template.bind({});
Default.args = {};
