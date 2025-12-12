"use client";
import type { Project } from "@/lib/firebaseQueries";
import { useState } from "react";
import { useUpdateProject } from "@/hooks/projects";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
const ProjectItem = ({ data }: { data: Project[] }) => {
  const router = useRouter();
  const role = useSelector((state: RootState) => state.user.role);
  const { mutate: updateProject } = useUpdateProject();
  const [editing, setEditing] = useState<{ id: string; field: string } | null>(
    null
  );
  const handleUpdate = (id: string, field: string, value: string) => {
    let updatedValue: string | number | Timestamp = value;

    if (field === "startDate" || field === "endDate") {
      updatedValue = Timestamp.fromDate(new Date(value));
    }
    if (field === "budget" || field === "progress") {
      updatedValue = Number(value);
    }

    updateProject({
      id,
      data: { [field]: updatedValue },
    });
    setEditing(null);
  };
  return (
    <tbody>
      {data?.map((project, index) => (
        <tr
          key={project.id || index}
          className="hover:bg-gray-50 transition-colors duration-150"
        >
          <td
            onClick={() => setEditing({ id: project.id, field: "name" })}
            className="px-4 py-3 text-sm text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {editing?.id === project.id &&
            editing.field === "name" &&
            role === "admin" ? (
              <input
                autoFocus
                defaultValue={project.name}
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                onBlur={() => setEditing(null)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate(project.id, "name", e.currentTarget.value)
                }
              />
            ) : (
              project.name
            )}
          </td>

          <td
            onClick={() => setEditing({ id: project.id, field: "budget" })}
            className="px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {editing?.id === project.id &&
            editing.field === "budget" &&
            role === "admin" ? (
              <input
                autoFocus
                type="number"
                onBlur={() => setEditing(null)}
                defaultValue={project.budget}
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate(project.id, "budget", e.currentTarget.value)
                }
              />
            ) : (
              `$${project.budget.toLocaleString()}`
            )}
          </td>

          <td
            onClick={() => setEditing({ id: project.id, field: "startDate" })}
            className="px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {editing?.id === project.id &&
            editing.field === "startDate" &&
            role === "admin" ? (
              <input
                autoFocus
                type="date"
                onBlur={() => setEditing(null)}
                defaultValue={
                  project.startDate.toDate().toISOString().split("T")[0]
                }
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate(project.id, "startDate", e.currentTarget.value)
                }
              />
            ) : (
              project.startDate.toDate().toLocaleDateString()
            )}
          </td>

          <td
            onClick={() => setEditing({ id: project.id, field: "endDate" })}
            className="px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {editing?.id === project.id &&
            editing.field === "endDate" &&
            role === "admin" ? (
              <input
                autoFocus
                type="date"
                onBlur={() => setEditing(null)}
                defaultValue={
                  project.endDate.toDate().toISOString().split("T")[0]
                }
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate(project.id, "endDate", e.currentTarget.value)
                }
              />
            ) : (
              project.endDate.toDate().toLocaleDateString()
            )}
          </td>
          <td
            onClick={() => setEditing({ id: project.id, field: "progress" })}
            className="px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {editing?.id === project.id &&
            editing.field === "progress" &&
            role === "admin" ? (
              <input
                autoFocus
                type="number"
                onBlur={() => setEditing(null)}
                min={0}
                max={100}
                defaultValue={project.progress}
                className="border border-gray-300 rounded px-2 py-1 w-full text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleUpdate(project.id, "progress", e.currentTarget.value)
                }
              />
            ) : (
              `${project.progress}%`
            )}
          </td>

          <td
            onClick={() => setEditing({ id: project.id, field: "status" })}
            className="px-4 py-3 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {editing?.id === project.id &&
            editing.field === "status" &&
            role === "admin" ? (
              <select
                autoFocus
                defaultValue={project.status}
                onBlur={() => setEditing(null)}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                onChange={(e) =>
                  handleUpdate(project.id, "status", e.currentTarget.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <span
                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${
                    project.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : project.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                `}
              >
                {project.status}
              </span>
            )}
          </td>
          <td className="px-4 py-3">
            <button
              onClick={() => router.push(`/projects/${project.id}`)}
              className="text-blue-600 hover:underline text-sm cursor-pointer"
            >
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProjectItem;
