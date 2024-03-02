import React from "react";
import { priorities, statuses } from "./tagData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useSession } from "next-auth/react";

const SelectCell = ({ getValue, row, column, table }) => {
  const { data: session } = useSession();
  const status = getValue() || {};
  const { updateData } = table.options.meta;

  const labels =
    column.id === "status"
      ? statuses
      : column.id === "priority"
      ? priorities
      : null;
  const label = labels
    ? labels.find((label) => {
        if (label.value === "done" && row.getValue(column.id) === "notdone") {
          return true;
        } else if (
          label.value === "canceled" &&
          row.getValue(column.id) === "notcanceled"
        ) {
          return true;
        } else {
          return label.value === row.getValue(column.id);
        }
      })
    : null;

  return (
    <div className="px-1 md:px-2 lg:px-2">
      {session ? (
        row.original.status === "done" ||
        row.original.status === "canceled" ||
        (session.user.id === row.original.assignedByuserId &&
          column.id === "status") ||
        (session.user.id !== row.original.assignedByuserId &&
          column.id === "priority") ? (
          <div className="flex">
            <div className="flex items-center gap-1">
              {label && (
                <label.icon className="text-gray-300 h-10 text-muted-foreground" />
              )}

              {label ? label.label : status}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="flex items-center">
              {label && (
                <label.icon className="text-gray-300 h-10 text-muted-foreground" />
              )}
              <Select
                onValueChange={(value) => {
                  if (value === "done") {
                    updateData(row.index, column.id, "notdone");
                  } else if (value === "canceled") {
                    updateData(row.index, column.id, "notcanceled");
                  } else {
                    updateData(row.index, column.id, value);
                  }
                }}
              >
                <SelectTrigger className="bg-transparent border-none text-xs md:text-sm min-w-[120px]">
                  {label ? label.label : status}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {labels.map((item, index) => {
                      return (
                        <SelectItem
                          value={item.value}
                          key={index}
                          className="text-xs md:text-sm"
                        >
                          {item.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SelectCell;
