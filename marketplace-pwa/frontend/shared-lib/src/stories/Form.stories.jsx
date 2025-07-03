import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import Input from "../components/ui/input";
import Button from "../components/ui/button";

export default {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
};

export const Basic = {
  render: () => (
    <Form>
      <FormField>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input id="email" type="email" placeholder="Enter your email" />
          </FormControl>
          <FormMessage>Email is required</FormMessage>
        </FormItem>
      </FormField>
      <div className="flex gap-2 mt-4">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="reset" variant="outline">
          Clear
        </Button>
      </div>
    </Form>
  ),
};
