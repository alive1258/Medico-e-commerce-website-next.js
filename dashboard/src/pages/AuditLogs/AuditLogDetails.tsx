// src/pages/audit-logs/AuditLogDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import { ArrowLeft, User, Clock, Tag, Database, Globe } from "lucide-react";

import { useGetSingleAuditLogQuery } from "../../redux/api/auditLogApi";
import type { ApiError } from "../../types/authType";

const AuditLogDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetSingleAuditLogQuery(id as string, {
    skip: !id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading audit log...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load audit log
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {err.data?.message || "Server error. Please try again."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const log = data?.data;

  if (!log) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">Audit log not found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-base">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold">Audit Log Details</h1>
          <p className="text-sm text-gray-400">ID: {log.id}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* User */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <User size={16} />
              <span className="text-sm font-medium">User</span>
            </div>
            <div>
              {log.user ? (
                <>
                  <p className="font-medium">{log.user.name}</p>
                  <p className="text-sm text-gray-400">{log.user.email}</p>
                </>
              ) : (
                <p className="text-gray-400">System</p>
              )}
            </div>
          </div>

          {/* Action & Entity */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Tag size={16} />
              <span className="text-sm font-medium">Action & Entity</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                {log.action}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                {log.entity_name}
              </span>
              {log.entity_id && (
                <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-mono">
                  ID: {log.entity_id}
                </span>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Clock size={16} />
              <span className="text-sm font-medium">Timestamp</span>
            </div>
            <p className="font-medium">
              {format(new Date(log.created_at), "PPpp")}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* IP & User Agent */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Globe size={16} />
              <span className="text-sm font-medium">Network Info</span>
            </div>
            {log.ip_address && (
              <p className="text-sm">
                <span className="text-gray-400">IP: </span>
                <span className="font-mono">{log.ip_address}</span>
              </p>
            )}
            {log.user_agent && (
              <p className="text-sm mt-1">
                <span className="text-gray-400">User Agent: </span>
                <span className="font-mono text-xs break-all">
                  {log.user_agent}
                </span>
              </p>
            )}
          </div>

          {/* Metadata */}
          {log.metadata && Object.keys(log.metadata).length > 0 && (
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Database size={16} />
                <span className="text-sm font-medium">Metadata</span>
              </div>
              <pre className="text-xs bg-black-base p-2 rounded overflow-auto max-h-[150px]">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Changes Section */}
      {log.changes && log.changes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Changes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black-solid">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Field
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Old Value
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    New Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {log.changes.map((change, index) => (
                  <tr key={index} className="border-t border-gray-base">
                    <td className="px-4 py-2 text-sm font-medium">
                      {change.field}
                    </td>
                    <td className="px-4 py-2 text-sm text-red-400">
                      <pre className="text-xs bg-black-base p-1 rounded overflow-auto max-w-[200px]">
                        {JSON.stringify(change.old_value, null, 2)}
                      </pre>
                    </td>
                    <td className="px-4 py-2 text-sm text-green-400">
                      <pre className="text-xs bg-black-base p-1 rounded overflow-auto max-w-[200px]">
                        {JSON.stringify(change.new_value, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Old Data & New Data */}
      {(log.old_data || log.new_data) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {log.old_data && (
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <h4 className="text-sm font-medium text-red-400 mb-2">
                Old Data
              </h4>
              <pre className="text-xs bg-black-base p-2 rounded overflow-auto max-h-[300px]">
                {JSON.stringify(log.old_data, null, 2)}
              </pre>
            </div>
          )}
          {log.new_data && (
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
              <h4 className="text-sm font-medium text-green-400 mb-2">
                New Data
              </h4>
              <pre className="text-xs bg-black-base p-2 rounded overflow-auto max-h-[300px]">
                {JSON.stringify(log.new_data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuditLogDetails;
