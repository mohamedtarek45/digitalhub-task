"use client";
import { useState } from "react";
import { CheckCircle2, User } from "lucide-react";
import type { Task } from "@/lib/firebaseQueries";
import dynamic from "next/dynamic";
const ModalEditTask = dynamic(() => import("./ModalEditTask"), { ssr: false });
const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-orange-100 text-orange-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
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
const TaskItem = ({ data ,projectId ,role }: { data: Task[];projectId:string,role:string }) => {
  const [open, setOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<Task>();

  return (
    <>
      <ModalEditTask
        projectId={projectId}
        isOpen={open}
        onClose={() => setOpen(false)}
        data={dataToEdit}
      />
      {data.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No tasks yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((task, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>
                      <span className="font-medium">Assigned to:</span>{" "}
                      {task.assignedTo}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>
                {role === "admin" && <button
                  onClick={() => {
                    setDataToEdit(task);
                    setOpen(true);
                  }}
                  className="px-5 py-1 cursor-pointer rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
                >
                  Edit
                </button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TaskItem;
