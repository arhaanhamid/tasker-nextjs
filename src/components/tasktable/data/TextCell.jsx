import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { labels } from "./tagData";
import { Badge } from "@/components/ui/badge";

const TextCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const { data: session } = useSession();

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const label = labels.find((label) => label.value === row.original.tag);
  return (
    <div className="flex items-center space-x-1  px-1 md:px-2 lg:px-2">
      {label && column.id !== "assignedToName" && (
        <Badge
          variant="outline"
          className="text-gray-300 h-5 p-1 text-[10px] font-normal"
        >
          {label.label}
        </Badge>
      )}
      <span className="truncate font-medium">
        {session ? (
          row.original.status !== "done" &&
          row.original.status !== "canceled" &&
          session.user.id === row.original.assignedByuserId ? (
            <Input
              type="text"
              className="bg-transparent border-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
            />
          ) : (
            <span>{row.getValue(column.id)}</span>
          )
        ) : (
          <p>Loading...</p>
        )}
      </span>
    </div>
  );
};
export default TextCell;
