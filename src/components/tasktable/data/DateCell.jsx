"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { PopoverClose } from "@radix-ui/react-popover";

export default function DateCell({ getValue, row, column, table }) {
  const [date, setDate] = React.useState(new Date(getValue()));
  const { data: session } = useSession();

  function handleDate(e) {
    setDate(e);
    table.options.meta?.updateData(row.index, column.id, e);
  }

  return (
    <div>
      {session ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                `bg-transparent border-none px-2 font-normal ${
                  (row.original.status === "done" ||
                    row.original.status === "canceled" ||
                    session.user.id !== row.original.assignedByuserId) &&
                  "hover:bg-transparent hover:text-white cursor-default"
                }`,
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          {row.original.status !== "done" &&
            row.original.status !== "canceled" &&
            session.user.id === row.original.assignedByuserId && (
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDate}
                  initialFocus
                />
              </PopoverContent>
            )}
        </Popover>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
