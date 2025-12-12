"use client";
import { store } from "@/store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import { Provider } from "react-redux";
const ClientWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default ClientWrapper;
