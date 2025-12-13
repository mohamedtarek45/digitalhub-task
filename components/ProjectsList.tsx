"use client";
import { useGetProjects } from "@/hooks/projects";
import ProjectItem from "./ProjectItem";
import Pagination from "./Pagination";
import { useEffect, useMemo, useState } from "react";

const ProjectsList = () => {
  const { data, isPending, error } = useGetProjects();
  const [search, setSearch] = useState<string>("");
  const [filterName, setFilterName] = useState("");
  const [sort, setSort] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setFilterName(search);
      setPage(1);
    }, 700);
    return () => clearTimeout(t);
  }, [search]);

  const sortedData = useMemo(() => {
    const d = data ?? [];
    if (!sort) return d;

    return [...d].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "budget") return a.budget - b.budget;
      if (sort === "startDate")
        return a.startDate.toDate().getTime() - b.startDate.toDate().getTime();
      if (sort === "endDate")
        return a.endDate.toDate().getTime() - b.endDate.toDate().getTime();
      if (sort === "progress") return a.progress - b.progress;
      if (sort === "status") return a.status.localeCompare(b.status);
      return 0;
    });
  }, [data, sort]);

  const filteredData = useMemo(() => {
    return sortedData?.filter((item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }, [sortedData, filterName]);

  const { paginatedData, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredData.length / 5);
    const start = (page - 1) * 5;
    return {
      paginatedData: filteredData.slice(start, start + 5),
      totalPages: total,
    };
  }, [filteredData, page]);

  const handleReset = () => {
    setSearch("");
    setFilterName("");
    setSort(null);
    setPage(1);
  };

  if (isPending)
    return (
      <div className="container p-6 min-h-[600px]">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-64 bg-g ray-200 rounded" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );

  return (
    <div className="container p-6">
      <div className="flex gap-3 items-center mb-4 justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleReset}
          className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 min-h-[400px]">
        <table className="min-w-full text-sm text-center">
          <thead className="bg-gray-200 text-gray-700 ">
            <tr>
              <th
                onClick={() => setSort("name")}
                className={`px-4 py-3 w-80  font-semibold cursor-pointer hover:text-blue-600 transition ${
                  sort === "name" ? "text-blue-600" : ""
                }`}
              >
                Project Name
              </th>
              <th
                onClick={() => setSort("budget")}
                className={`px-4 py-3 w-80 font-semibold cursor-pointer hover:text-blue-600 transition ${
                  sort === "budget" ? "text-blue-600" : ""
                }`}
              >
                Budget
              </th>
              <th
                onClick={() => setSort("startDate")}
                className={`px-4 py-3 w-80 font-semibold cursor-pointer hover:text-blue-600 transition ${
                  sort === "startDate" ? "text-blue-600" : ""
                }`}
              >
                Start Date
              </th>
              <th
                onClick={() => setSort("endDate")}
                className={`px-4 py-3 w-80  font-semibold cursor-pointer hover:text-blue-600 transition ${
                  sort === "endDate" ? "text-blue-600" : ""
                }`}
              >
                End Date
              </th>
              <th
                onClick={() => setSort("progress")}
                className={`px-4 py-3 w-80 font-semibold cursor-pointer hover:text-blue-600 transition ${
                  sort === "progress" ? "text-blue-600" : ""
                }`}
              >
                Progress
              </th>
              <th
                onClick={() => setSort("status")}
                className={`px-4 py-3 w-80 font-semibold cursor-pointer hover:text-blue-600 transition ${
                  sort === "status" ? "text-blue-600" : ""
                }`}
              >
                Status
              </th>
              <th className="w-44">go to project</th>
            </tr>
          </thead>
          <ProjectItem data={paginatedData ?? []} />
        </table>
      </div>
      <div className="mt-6 min-h-[60px]">
        <Pagination
          currentPage={page}
          setPage={setPage}
          numberOfPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
