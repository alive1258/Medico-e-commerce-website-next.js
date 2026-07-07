// src/pages/addresses/AllAddresses.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllAddressesQuery,
  useDeleteAddressMutation,
} from "../../redux/api/addressApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { IAddress } from "../../redux/api/addressApi";

const LIMIT = 10;

const AllAddresses: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllAddressesQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
    });

  const [deleteAddress] = useDeleteAddressMutation();

  const addresses: IAddress[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeleteAddress = async (address: IAddress) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete this address?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteAddress(address.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Address has been deleted.",
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
            Failed to load addresses
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
            <h1 className="text-xl font-semibold">Addresses</h1>
            <p className="text-sm text-gray-400">Manage all addresses</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search addresses..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link to="/add-address">
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
                User
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Phone
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Address
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Default
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <tr
                  key={address.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">
                        {address.user?.name || address.full_name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {address.user?.email || address.email || ""}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {address.phone}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="max-w-xs truncate">
                      {address.address}
                      {address.city && `, ${address.city}`}
                      {address.district && `, ${address.district}`}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {address.is_default ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <CheckCircle size={16} /> Default
                      </span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/edit-address/${address.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="Edit Address"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteAddress(address)}
                        className="flex cursor-pointer gap-2 w-fit p-2 text-red-500 hover:text-red-600 rounded text-sm"
                        title="Delete Address"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <p className="text-gray-400 text-5xl mb-3">📍</p>
                    <span className="text-gray-500 text-sm font-medium">
                      No Addresses Found
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

export default AllAddresses;
