"use client";
import { socket } from "@/lib/socket";
import { useEffect } from "react";
import queryClient from "@/lib/queryClient";
import { logout } from "@/lib/actions";
import { useDispatch } from "react-redux";
import { removeUser } from "@/store/userSlice";
import {useSelector} from "react-redux";
import { RootState } from "@/store/store";
const ClientWrapper2 = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("RevalidateData", ({ projectId }) => {
      queryClient.refetchQueries({ queryKey: ["project", projectId] });
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("RevalidateData");
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    dispatch(removeUser());
  };
  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800">Hello {user.email}</div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      {children}
    </>
  );
};

export default ClientWrapper2;
