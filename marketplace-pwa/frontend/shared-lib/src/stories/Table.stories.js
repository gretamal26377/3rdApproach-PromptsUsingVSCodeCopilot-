import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';

export default {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

export const Basic = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
