
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import { useDeleteWhoWeAreMutation, useGetAllWhoWeAreQuery } from "../../redux/api/whoWeAreApi";
import type { WhoWeAre } from "../../types/whoWeAre.types";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";


const LIMIT = 10;

const AllWhoWeAre: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, error, refetch, isFetching } = useGetAllWhoWeAreQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteWhoWeAre] = useDeleteWhoWeAreMutation();

  const entries: WhoWeAre[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDelete = async (entry: WhoWeAre) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete "${entry.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteWhoWeAre(entry.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `"${entry.title}" has been deleted.`,
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
            Failed to load entries
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold">Who We Are</h1>
            <p className="text-sm text-gray-400">Manage all Who We Are entries</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-solid text-primary-muted placeholder-gray-400 dark:placeholder-gray-300"
            />
            <Link to="/add-who-we-are">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 sm:min-w-full">
            <thead>
              <tr className="bg-black-solid">
                <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                  ID
                </th>
                <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                  Title
                </th>
                <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                  Description
                </th>
                <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                  Image
                </th>
                <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                  Video
                </th>
                <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                  >
                    <td className="py-2 px-4 border-b border-gray-base">{index + 1}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">{entry.title}</td>
                    <td className="py-2 px-4 border-l border-b border-gray-base max-w-xs">
                      <p className="truncate">{entry.description}</p>
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                  

                        {entry.image ? (
                        <img
                          src={
                            entry?.image
                              ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${entry.image}?v=${new Date().getTime()}`
                              : "/placeholder.png"
                          }
                          alt={entry?.title || "entry"}
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      {entry.video_url ? (
                        <a
                          href={entry.video_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          Video
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base">
                      <div className="flex gap-2">
                        <Link to={`/edit-who-we-are/${entry.id}`}>
                          <button
                            className="p-2 cursor-pointer rounded-md transition-colors hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800 dark:text-green-400"
                            title="Edit Entry"
                          >
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(entry)}
                          className="flex cursor-pointer gap-2 w-fit p-2 rounded text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/10 transition"
                          title="Delete Entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {entries.length > 0 && (
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

export default AllWhoWeAre;