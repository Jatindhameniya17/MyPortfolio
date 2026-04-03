"use client";

import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageLoader } from "./PageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ChatBot } from "@/components/chat/ChatBot";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import type { ReactNode } from "react";

export function ClientShell({ children }: { children: ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
      <ChatBot />
    </>
  );
}
