import Checkbox from "../components/ui/checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export const Default = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Checked = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const CheckedDisabled = {
  args: {
    checked: true,
    disabled: true,
  },
};
