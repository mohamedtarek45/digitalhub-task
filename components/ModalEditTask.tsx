"use client";
import { CheckCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import type { Task } from "@/lib/firebaseQueries";
import * as Yup from "yup";
import { useUpdateTask } from "@/hooks/tasks";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  data?: Task;
};

export default function ModalEditTask({
  isOpen,
  onClose,
  data,
  projectId,
}: Props) {
  const { mutate: editTask, isPending } = useUpdateTask();

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      assignedTo: data?.assignedTo || "",
      priority: data?.priority || "low",
      status: data?.status || "pending",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      assignedTo: Yup.string().required("Required"),
      priority: Yup.string()
        .oneOf(["Low", "Medium", "High"])
        .required("Priority is required"),
      status: Yup.string()
        .oneOf(["Pending", "In progress", "Completed"])
        .required("Status is required"),
    }),
    onSubmit: async (values) => {
      if (!data?.id) {
        onClose();
        return;
      }
      editTask({
        projectId,
        data: {
          ...values,
          id: data?.id,
        },
      });
      onClose();
    },
  });

  if (!isOpen) return null;
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] flex justify-center items-center p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="bg-blue-100 p-2 rounded-lg">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>
        </div>
        <form className="p-6 space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Name
            </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Enter task name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
                <span>{formik.errors.name}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Assigned To
            </label>
            <input
              type="text"
              name="assignedTo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.assignedTo}
              placeholder="Enter user name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {formik.touched.assignedTo && formik.errors.assignedTo && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 flex items-center gap-1">
                <span>{formik.errors.assignedTo}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="In progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer flex-1 px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed
             bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              {isPending ? "Editing..." : "Edit Task"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
