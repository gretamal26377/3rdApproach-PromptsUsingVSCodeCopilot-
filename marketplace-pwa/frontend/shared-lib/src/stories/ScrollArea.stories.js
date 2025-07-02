import ScrollArea from "../components/ui/scroll-area";

export default {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
};

export const Basic = {
  render: () => (
    <ScrollArea className="h-32 w-64 border p-2">
      <div style={{ height: "200px" }}>
        This is a scrollable area. Add more content here to see the scrollbar
      </div>
    </ScrollArea>
  ),
};
