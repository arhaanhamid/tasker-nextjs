import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateTasks } from "@/lib/action";
import { Cross2Icon } from "@radix-ui/react-icons";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import { priorities, statuses } from "./tagData";
import { Icons } from "@/components/ui/icons";

const Toolbar = ({ setFiltering, filtering, tasks, data, table }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const isFiltered = table.getState().columnFilters.length > 0;

  function handleUpdate() {
    setErrorMsg(updateTasks(tasks, data));
  }
  return (
    <div className="flex lg:gap-10 md:gap-5 gap-1">
      <Input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="bg-black text-white border-gray-600 min-w-[100px] max-w-[100px] lg:max-w-[300px] md:max-w-[200px]  "
        placeholder="Filter Tasks..."
      />
      {table.getColumn("status") && (
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
        />
      )}
      {table.getColumn("priority") && (
        <DataTableFacetedFilter
          column={table.getColumn("priority")}
          title="Priority"
          options={priorities}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3 bg-white text-black"
        >
          <span className="font-medium hidden lg:block md:block">Reset</span>

          <Cross2Icon className="mr-0 h-4 w-4 md:mr-2 lg:mr-2" />
        </Button>
      )}
      <Button
        className="bg-white text-black hover:bg-gray-100 hover:text-black"
        onClick={handleUpdate}
      >
        <Icons.updateIcon className="mr-0 h-4 w-4 md:mr-2 lg:mr-2" />
        <span className="font-medium hidden lg:block md:block">Update</span>
      </Button>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
};

export default Toolbar;
