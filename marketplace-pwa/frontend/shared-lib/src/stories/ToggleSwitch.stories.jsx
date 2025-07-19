import React, { useState } from "react";
import ToggleSwitch from "../components/ui/toggle-switch";

export default {
  title: "UI/ToggleSwitch",
  component: ToggleSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Docs: A toggle switch component for boolean settings",
      },
      page: null, // Use default autodocs page
      label: "Docs",
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    label: { control: "text" },
  },
};

const Template = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <ToggleSwitch
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
  label: "Enable feature",
};

/*
export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: "Enabled",
};
*/
