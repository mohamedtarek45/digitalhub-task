"use client";
import { socket } from "@/lib/socket";
import { useEffect } from "react";
import queryClient from "@/lib/queryClient";
const ClientWrapper2 = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("RevalidateData", ({projectId}) => {
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
  return <>{children}</>;
};

export default ClientWrapper2;
