import { createContext } from "react";

export const PopupContext = createContext<{
  Success: (
    title: string,
    message: string,
    confirmText?: string,
  ) => Promise<void>;
  Error: (
    title: string,
    message: string,
    confirmText?: string,
  ) => Promise<void>;
  Warning: (
    title: string,
    message: string,
    confirmText?: string,
  ) => Promise<void>;
  Confirm: (
    title: string,
    message: string,
    confirmText?: string,
    declineText?: string,
  ) => Promise<boolean>;
} | null>(null);
