import React, { useState } from "react";
import { useGetUsersQuery } from "../../redux/api/usersApi";
import { Download } from "lucide-react";
import { useDebounce } from "../../utils/useDebounce";
import Pagination from "../../utils/Pagination";


export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role: string;
  is_verified?: boolean;
}

const LIMIT = 10;

const AllUsers: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isFetching } = useGetUsersQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const users: User[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  /* ---------------- LOADING (SKELETON) ---------------- */
  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  // if (error) {
  //   const err = error as ApiError;
  //   return (
  //     <div className="flex h-[70vh] flex-col items-center justify-center text-center">
  //       <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
  //         <h2 className="text-lg font-semibold text-red-400 mb-2">
  //           Failed to load data
  //         </h2>
  //         <p className="text-sm text-gray-400 mb-4">
  //           {err.data?.message || "Server error. Please try again."}
  //         </p>
  //         <button
  //           onClick={() => refetch()}
  //           className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
          <p className="text-sm text-gray-400">Manage all users</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base 
                       bg-black-solid text-primary-muted 
                       placeholder-gray-400"
          />

          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-b border-gray-base font-semibold text-sm">
                #
              </th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">
                Name
              </th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">
                Email
              </th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">
                Mobile
              </th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">
                Role
              </th>
              <th className="py-2 px-4 text-left border-l border-gray-base border-b font-semibold text-sm">
                Verified
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 !== 0
                      ? "bg-black-solid hover:bg-black-base"
                      : ""
                  }`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {user.name}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {user.email}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {user.mobile || "-"}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b capitalize">
                    {user.role}
                  </td>

                  <td className="py-2 px-4 border-l border-gray-base border-b">
                    {user.is_verified ? (
                      <span className="text-green-400 font-medium">Verified</span>
                    ) : (
                      <span className="text-red-400 font-medium">Not Verified</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {users.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalResults={totalItems}
            limit={LIMIT}
            isFetching={isFetching}
          />
        )}
      </div>
    </div>
  );
};

export default AllUsers;
