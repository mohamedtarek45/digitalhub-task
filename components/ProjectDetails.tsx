"use client";
import { notFound } from 'next/navigation'
import { useGetProject } from "@/hooks/projects";
import { Timestamp } from "firebase/firestore";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  Search,
  Plus,
} from "lucide-react";
import TaskItem from "./TaskItem";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Modal from "./ModalAddTask";
import { RootState } from "@/store/store";
const formatDate = (date: Timestamp) => date.toDate().toLocaleDateString();

const ProjectDetails = ({ id }: { id: string }) => {
  const { role } = useSelector((state: RootState) => state.user);
  const { data, isPending, error } = useGetProject(id);
  const [search, setSearch] = useState<string>("");
  const [filterName, setFilterName] = useState("");
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<string>("all");
  useEffect(() => {
    setTimeout(() => {
      setFilterName(search);
    }, 700);
  }, [search]);
  const fiterdpriorityData = useMemo(() => {
    if (priority === "all") return data?.tasks;
    return data?.tasks?.filter((item) =>
      item.priority.toLowerCase().includes(priority.toLowerCase())
    );
  }, [data, priority]);
  const filteredData = useMemo(() => {
    return fiterdpriorityData?.filter((item) =>
      item.assignedTo.toLowerCase().includes(filterName.toLowerCase())
    );
  }, [fiterdpriorityData, filterName]);

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading project...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-800 font-semibold text-center">
            Error loading project
          </p>
        </div>
      </div>
    );

  if (!data)
    return notFound();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data.name}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  data.status
                )}`}
              >
                {data.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Budget</p>
                  <p className="text-lg font-bold text-blue-900">
                    ${data.budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">
                    Progress
                  </p>
                  <p className="text-lg font-bold text-purple-900">
                    {data.progress}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">
                    Start Date
                  </p>
                  <p className="text-sm font-semibold text-green-900">
                    {formatDate(data.startDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-orange-600 font-medium">
                    End Date
                  </p>
                  <p className="text-sm font-semibold text-orange-900">
                    {formatDate(data.endDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-gray-900">
                {data.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-linear-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${data.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
            {role === "admin" && (
              <button
                onClick={() => {
                  setOpen(true);
                }}
                className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            )}
          </div>
          <Modal isOpen={open} onClose={() => setOpen(false)} id={id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search by user name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <select
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <TaskItem
            projectId={id}
            data={filteredData ?? []}
            role={role ?? " "}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
