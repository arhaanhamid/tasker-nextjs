"use client";

import { useFormState } from "react-dom";
import { addTask } from "@/lib/action";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { labels, priorities, statuses } from "../tasktable/data/tagData";

export function CreateTaskForm({ userId }) {
  const [state, formAction] = useFormState(addTask, undefined);
  const [date, setDate] = React.useState();

  return (
    <Card className="bg-black text-white border-gray-600 w-[100%] md:w-70%] lg:w-[50%] mt-0 md:mt-2 lg:mt-5  mr-0 md:mr-2 lg:mr-5">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Assign new task</CardTitle>
        <CardDescription>Enter the details of the task</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        <form action={formAction} className="grid gap-5">
          <Input id="userId" type="hidden" name="userId" value={userId} />
          <Input id="deadline" type="hidden" name="deadline" value={date} />
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              className="w-full bg-black border-gray-600 text-white"
              id="title"
              type="text"
              name="title"
              placeholder="Task title here..."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tag">Tag</Label>
            <Select required name="tag">
              <SelectTrigger className="w-full bg-black border-gray-600 text-white">
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-600">
                <SelectGroup>
                  {labels.map((label, index) => (
                    <SelectItem key={index} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assignToEmail">Assign To (email)</Label>
            <Input
              className="w-full bg-black border-gray-600 text-white"
              id="assignToEmail"
              type="email"
              name="assignToEmail"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select required name="status">
              <SelectTrigger className="w-full bg-black border-gray-600 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-600">
                <SelectGroup>
                  {statuses.map((status, index) => (
                    <SelectItem key={index} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select required name="priority">
              <SelectTrigger className="w-full bg-black border-gray-600 text-white">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-gray-600">
                <SelectGroup>
                  {priorities.map((priority, index) => (
                    <SelectItem key={index} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Pick a due date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full bg-black border-gray-600 text-white justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button className="w-full bg-white text-black hover:bg-black hover:text-white">
            Create Task
          </Button>
        </form>
        {state?.error}
      </CardContent>
    </Card>
  );
}
