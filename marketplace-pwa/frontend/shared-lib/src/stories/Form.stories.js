import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import Input from "../components/ui/input";

export default {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
};

// Issue: Subject/Clear/Cancel Buttons are missing in this form story
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
    </Form>
  ),
};
