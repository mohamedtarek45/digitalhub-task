"use client";

import { useMutation } from "@tanstack/react-query";
import { addTask, Task, Project, updateTask } from "@/lib/firebaseQueries";
import queryClient from "@/lib/queryClient";
import { v4 as uuidv4 } from "uuid";
import { socket } from "@/lib/socket";

type PrevData = Project & {
  tasks: Task[];
};
export function useAddTask() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: addTask,
    onMutate: ({ id, data }) => {
      const tempId = uuidv4();
      const newTask: Task = { id: tempId, ...data };
      queryClient.cancelQueries({ queryKey: ["project", id] });
      queryClient.setQueryData(["project", id], (oldData: PrevData) => {
        if (!oldData) return oldData;
        const newData = { ...oldData, tasks: [...oldData.tasks, newTask] };
        return newData;
      });
    },
    onSuccess: (_, { id }) => {
      if (socket.connected) {
        socket.emit("RevalidateTask", {
          projectId: id,
        });
      }
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });
  return { mutate, isPending, error };
}

export function useUpdateTask() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: updateTask,
    onMutate: ({ projectId, data }) => {
      queryClient.cancelQueries({ queryKey: ["project", projectId] });
      queryClient.setQueryData(["project", projectId], (oldData: PrevData) => {
        if (!oldData) return oldData;
        const newData = {
          ...oldData,
          tasks: oldData.tasks.map((task) => {
            if (task.id === data.id) {
              return data;
            }
            return task;
          }),
        };
        return newData;
      });
    },
    onSuccess: (_, { projectId }) => {
      if (socket.connected) {
        socket.emit("RevalidateTask", {
          projectId,
        });
      }
    },
  });
  return { mutate, isPending, error };
}
