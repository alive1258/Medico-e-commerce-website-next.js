// src/pages/Banners/AllBanners.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Image,
  Link2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllBannersQuery,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} from "../../redux/api/bannerApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { IBanner } from "../../redux/api/bannerApi";

const LIMIT = 10;

const AllBanners: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterActive, setFilterActive] = useState<boolean | undefined>(
    undefined,
  );
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } = useGetAllBannersQuery(
    {
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      is_active: filterActive,
      sort_by: "position",
      sort_order: "ASC",
    },
  );

  const [deleteBanner] = useDeleteBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  const banners: IBanner[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleToggleStatus = async (banner: IBanner) => {
    try {
      await updateBanner({
        id: banner.id,
        data: { is_active: !banner.is_active },
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Banner ${banner.is_active ? "deactivated" : "activated"} successfully`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Failed to update status",
      });
    }
  };

  const handleDeleteBanner = async (banner: IBanner) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete banner "${banner.title}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteBanner(banner.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Banner "${banner.title}" has been deleted.`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Delete failed",
      });
    }
  };

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

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load banners
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
          <div>
            <h1 className="text-xl font-semibold">Banners</h1>
            <p className="text-sm text-gray-400">Manage all banners</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search banners..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={
                  filterActive === undefined
                    ? ""
                    : filterActive
                      ? "active"
                      : "inactive"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setFilterActive(val === "" ? undefined : val === "active");
                }}
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <Link to="/add-banner">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
              </button>
            </Link>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-b border-gray-base font-semibold text-sm">
                #
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Banner
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Title
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Position
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Status
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Created
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <tr
                  key={banner.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="w-16 h-12 rounded overflow-hidden bg-gray-800">
                      <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">{banner.title}</div>
                      {banner.redirect_url && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Link2 size={12} />
                          <span className="truncate max-w-[150px]">
                            {banner.redirect_url}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base text-center">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-xs">
                      #{banner.position}
                    </span>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <button
                      onClick={() => handleToggleStatus(banner)}
                      className="flex items-center gap-2 hover:opacity-80 transition"
                    >
                      {banner.is_active ? (
                        <span className="flex items-center gap-1 text-green-400">
                          <ToggleRight size={20} />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                          <ToggleLeft size={20} />
                          Inactive
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(new Date(banner.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(banner.created_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-banner/${banner.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="Edit Banner"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteBanner(banner)}
                        className="flex cursor-pointer gap-2 w-fit p-2 text-red-500 hover:text-red-600 rounded text-sm"
                        title="Delete Banner"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <p className="text-gray-400 text-5xl mb-3">🖼️</p>
                    <span className="text-gray-500 text-sm font-medium">
                      No Banners Found
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default AllBanners;
