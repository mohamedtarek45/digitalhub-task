"use client";
import { useDispatch } from "react-redux";
import { addUser ,UserState } from "@/store/userSlice";
const UserInitializer = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: UserState;
}) => {
  const dispatch = useDispatch();
  dispatch(addUser(data));
  return <>{children}</>;
};

export default UserInitializer;
