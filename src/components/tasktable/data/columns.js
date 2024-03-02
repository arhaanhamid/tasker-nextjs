import { Badge } from "@/components/ui/badge";
import { labels, statuses, priorities } from "./tagData";
import SelectCell from "./SelectCell";
import TextCell from "./TextCell";
import DateCell from "./DateCell";
import { getUser } from "@/lib/data";

export const columns = [
  {
    header: "Task ID",
    accessorKey: "taskId",
    cell: (props) => (
      <p className="min-w-20 max-w-20 md:min-w-[90px] md:max-w-[90px] px-1 md:px-2 lg:px-2 text-xs md:text-sm lg:text-sm">
        {props?.getValue("taskId")}
      </p>
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: TextCell,
  },
  {
    header: "Deadline",
    accessorKey: "deadline",
    // cell: (props) => <p>{props?.getValue("deadline")}</p>,
    cell: DateCell,
  },
  {
    header: "Assigned By",
    accessorKey: "assignedByName",
    cell: (props) => {
      return (
        <p className="min-w-[100px] md:min-w-[120px] px-1 md:px-2 lg:px-2 text-xs md:text-sm lg:text-sm">
          {props?.getValue("assignedByName")}
        </p>
      );
    },
  },
  {
    header: "Assigned To",
    accessorKey: "assignedToName",
    // cell: (props) => <p>{props?.getValue("assignedTo")}</p>,
    cell: (props) => {
      return (
        <p className="min-w-[100px] md:min-w-[120px] px-1 md:px-2 lg:px-2 text-xs md:text-sm lg:text-sm">
          {props?.getValue("assignedToName")}
        </p>
      );
    },
    // cell: TextCell,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: SelectCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: SelectCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    //   cell: ({ row }) => {
    //     const priority = priorities.find(
    //       (priority) => priority.value === row.getValue("priority")
    //     );

    //     if (!priority) {
    //       return null;
    //     }

    //     return (
    //       <div className="flex items-center">
    //         {priority.icon && (
    //           <priority.icon className="text-gray-300 mr-2 h-4 w-4 text-muted-foreground" />
    //         )}
    //         <span>{priority.label}</span>
    //       </div>
    //     );
    //   },
  },
];
