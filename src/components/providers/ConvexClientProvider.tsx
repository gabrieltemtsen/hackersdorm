"use client";

import React, { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
let convexClient: ConvexReactClient | null = null;

if (convexUrl && convexUrl.startsWith("http")) {
  try {
    convexClient = new ConvexReactClient(convexUrl);
  } catch (e) {
    console.warn("Convex URL provided but client could not initialize:", e);
  }
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convexClient) {
    // When Convex URL is not set yet, render children directly with our reactive provider
    return <>{children}</>;
  }

  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}
