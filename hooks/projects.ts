"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getProjects, updateProject ,getProjectWithTasks } from "@/lib/firebaseQueries";
import type { Project } from "@/lib/firebaseQueries";
import queryClient from "@/lib/queryClient";
export function useGetProjects() {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return { data, isPending, error };
}
export function useGetProject(id: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const data = await getProjectWithTasks(id);
      return data;
    },
  });
  return { data, isPending, error };
}
export function useUpdateProject() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: updateProject,
    onMutate: ({ id, data }) => {
      queryClient.cancelQueries({ queryKey: ["projects"] });
      queryClient.setQueryData(["projects"], (oldData:Project[]|undefined) => {
        if (!oldData) return oldData;
        const newData = [...oldData];
        const projectIndex = newData.findIndex((project) => project.id === id);
        if (projectIndex === -1) return newData;
        newData[projectIndex] = { ...newData[projectIndex], ...data };
        return newData;
      });
    },
  });
  return { mutate, isPending, error };
}
