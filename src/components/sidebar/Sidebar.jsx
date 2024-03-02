"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/lib/action";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <div className="bg-black border-r border-gray-600 flex items-center justify-center mr-0 md:mr-2 lg:mr-5">
      <div className="flex flex-col items-center w-[70px] md:w-[160px] lg:w-[180px] h-full overflow-hidden text-gray-400 ">
        <Link href="/" className=" flex items-center w-full px-3 mt-3">
          <svg
            className="w-9 h-9 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
          <span className="ml-2 text-lg font-bold hidden lg:block md:block">
            Tasker
          </span>
        </Link>

        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
            <Link
              href="/dashboard"
              className={`${
                pathName == "/dashboard" ? "bg-gray-700" : "bg-transparent"
              } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`}
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-2 text-sm font-medium hidden lg:block md:block">
                Dasboard
              </span>
            </Link>

            <Link
              href="/alltasks"
              className={`${
                pathName == "/tasks" ? "bg-gray-700" : "bg-transparent"
              } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`}
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-2 text-sm font-medium hidden lg:block md:block">
                All Tasks
              </span>
            </Link>

            <Link
              href="/createtask"
              className={`${
                pathName == "/createtask" ? "bg-gray-700" : "bg-transparent"
              } flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`}
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              <span className="ml-2 text-sm font-medium hidden lg:block md:block">
                Create Task
              </span>
            </Link>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-full h-16 mt-auto bg-black text-white hover:bg-gray-600 hover:text-white border-t border-gray-600">
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>

            <span className="ml-2 text-sm font-medium hidden lg:block md:block">
              Account
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-black text-white border border-gray-600 min-w-12 lg:min-w-full md:min-w-full">
            <DropdownMenuItem>
              <form action={handleLogout}>
                <button className="flex items-center w-full gap-2">
                  <svg
                    className="w-6 h-6 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="ml-2 text-sm font-medium hidden lg:block md:block">
                    Logout
                  </span>
                </button>
              </form>
            </DropdownMenuItem>

            {session ? (
              session.user.isAdmin && (
                <DropdownMenuItem>
                  <Link href="/admin">Admin Panel</Link>
                </DropdownMenuItem>
              )
            ) : (
              <p>Loading...</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
