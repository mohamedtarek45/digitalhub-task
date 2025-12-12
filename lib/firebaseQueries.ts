import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Timestamp } from "firebase/firestore";

export type Project = {
  id: string;
  name: string;
  budget: number;
  startDate: Timestamp;
  endDate: Timestamp;
  progress: number;
  status: string;
};
export type Task = {
  id: string;
  name: string;
  assignedTo: string;
  priority: string;
  status: string;
};

type UpdateProjectInput = Partial<Omit<Project, "id">>;

export const updateTask = async ({
  projectId,
  data,
}: {
  projectId: string;
  data: Task;
}) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const taskRef = doc(projectRef, "task", data.id);
    await updateDoc(taskRef, data);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const addTask = async ({
  id,
  data,
}: {
  id: string;
  data: Omit<Task, "id">;
}) => {
  try {
    const projectRef = doc(db, "projects", id);
    const taskRef = collection(projectRef, "task");
    await addDoc(taskRef, data);
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateProject = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateProjectInput;
}) => {
  try {
    const projectRef = doc(db, "projects", id);
    await updateDoc(projectRef, data);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Project, "id">),
  }));
};
export const getProjectWithTasks = async (projectId: string) => {
  const projectRef = doc(db, "projects", projectId);
  const projectSnap = await getDoc(projectRef);
  if (!projectSnap.exists()) return null;
  const projectData = { id: projectSnap.id, ...projectSnap.data() };
  const tasksRef = collection(db, "projects", projectId, "task");
  const tasksSnap = await getDocs(tasksRef);
  const tasks: Task[] = tasksSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Task, "id">),
  }));
  return { ...(projectData as Project), tasks };
};
