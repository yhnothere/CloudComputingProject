"use client";
import { configureAmplify } from "@/lib/auth";

configureAmplify(); 

export default function Amplify({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}