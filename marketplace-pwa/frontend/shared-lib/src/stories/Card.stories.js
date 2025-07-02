import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";

export default {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export const Basic = {
  // render: () => (...) is a flexible way to define a Storybook story with custom JSX.
  // Use it when you need more control than args: pattern provides
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>This is the card content</CardContent>
      <CardFooter>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};
