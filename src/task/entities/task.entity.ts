export class Task {
  id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  createdBy: {
    id: string;
    name: string;
  };
  assignedTo: {
    id: string;
    name: string;
  };
}
