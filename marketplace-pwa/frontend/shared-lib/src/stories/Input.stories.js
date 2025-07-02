import Input from "../components/ui/input";

export default {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: { control: "text" },
  },
};

export const Default = {
  args: {
    placeholder: "Type here...",
    disabled: false,
    type: "text",
  },
};

export const Disabled = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
    type: "text",
  },
};
