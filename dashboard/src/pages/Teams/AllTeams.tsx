// components/admin/teams/AllTeams.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import { useDeleteTeamMutation, useGetAllTeamsQuery } from "../../redux/api/teamsApi";
import type { Team } from "../../types/team.types";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";


const LIMIT = 10;

const AllTeams: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, error, refetch, isFetching } = useGetAllTeamsQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteTeam] = useDeleteTeamMutation();

  const teams: Team[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;


  const handleDelete = async (team: Team) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete "${team.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteTeam(team.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `"${team.name}" has been deleted.`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err: unknown) {
      const apiError = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: apiError.data?.message || apiError.message || "Delete failed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-700 p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load teams
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {err.data?.message || "Server error. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold">Team Members</h1>
            <p className="text-sm text-gray-400">
              Manage all team members
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400"
            />

            <Link to="/add-teams">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 sm:min-w-full">
            <thead>
              <tr className="bg-black-solid">
                <th className="py-1 px-4 border-b border-gray-base text-sm">ID</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-sm">Name</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-sm">Designation</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-sm">Image</th>
                <th className="py-1 px-4 border-l border-b border-gray-base text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teams.length > 0 ? (
                teams.map((t, index) => (
                  <tr
                    key={t.id}
                    className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                  >
                    <td className="py-2 px-4 border-b border-gray-base">
                      {(currentPage - 1) * LIMIT + index + 1}
                    </td>

                    <td className="py-2 px-4 border-l border-b border-gray-base">{t.name}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{t.designation}</td>

                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      {t.image ? (
                        <img
                          src={`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${t.image}?v=${new Date().getTime()}`}
                          alt={t.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      <div className="flex gap-2">
                        <Link to={`/edit-teams/${t.id}`}>
                          <button className="p-2 rounded-md hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800">
                            <Edit size={16} />
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(t)}
                          className="p-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {teams.length > 0 && (
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

export default AllTeams;