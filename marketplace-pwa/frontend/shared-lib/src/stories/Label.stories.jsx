import Label from "../components/ui/label";

export default {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    htmlFor: { control: "text" },
    children: { control: "text" },
  },
};

export const Default = {
  args: {
    htmlFor: "Input",
    children: "Label Text",
  },
};
