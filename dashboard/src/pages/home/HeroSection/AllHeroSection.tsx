import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../../utils/useDebounce";
import {
  useDeleteHeroeMutation,
  useGetAllHeroesQuery,
} from "../../../redux/api/heroesApi";
import type { Hero } from "../../../types/hero.types";
import type { ApiError } from "../../../types/authType";
import Pagination from "../../../utils/Pagination";

const LIMIT = 10;

const AllHeroSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, error, refetch, isFetching } = useGetAllHeroesQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
  });

  const [deleteService] = useDeleteHeroeMutation();

  const services: Hero[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeleteService = async (service: Hero) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete service "${service.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      await deleteService(service.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Service "${service.title}" has been deleted.`,
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
            Failed to load services
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
    <div
      className={`rounded-lg border border-gray-base bg-black-base overflow-hidden`}
    >
      <div className="overflow-x-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-700">
          <div>
            <h1 className="text-xl font-semibold">Home Hero</h1>
            <p className="text-sm text-gray-400">Manage all Hero Section</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search Services..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={`w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base 
              bg-black-solid text-primary-muted 
              placeholder-gray-400 dark:placeholder-gray-300 
              `}
            />
            <Link to="/add-home-hero">
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
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Title
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  description
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Company
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Score
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Rating
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Campaigns
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Revenue
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Image
                </th>
                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Video
                </th>

                <th
                  className={`py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service, index) => (
                  <tr
                    key={service.id}
                    className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                  >
                    <td className={`py-2 px-4  border-b border-gray-base`}>
                      {index + 1}
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.title}
                    </td>
                    <td className="py-2 px-4 border-l border-b border-gray-base max-w-xs">
                      <p className="truncate">{service.description}</p>
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.company}
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.score || "-"}
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.rating || 0}
                    </td>

                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.rating || 0}
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.campaigns || "-"}
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.image ? (
                        <img
                          src={
                            service?.image
                              ? `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${service.image}?v=${new Date().getTime()}`
                              : "/placeholder.png"
                          }
                          alt={service?.title || "service"}
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      {service.videoUrl ? (
                        <a
                          href={service.videoUrl}
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
                    <td
                      className={`py-2 px-4 border-l border-b border-gray-base`}
                    >
                      <div className="flex gap-2">
                        <Link to={`/edit-home-hero/${service.id}`}>
                          <button
                            className="p-2 cursor-pointer rounded-md transition-colors hover:bg-gray-200 text-green-600 dark:hover:bg-gray-800 dark:text-green-400"
                            title="Edit Service"
                          >
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteService(service)}
                          className="flex cursor-pointer gap-2 w-fit p-2 rounded text-sm text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/10 transition"
                          title="Delete Service"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-gray-500">
                    No services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {services.length > 0 && (
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

export default AllHeroSection;
