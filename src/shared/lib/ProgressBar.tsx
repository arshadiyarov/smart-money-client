"use client";

import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar = () => {
  return (
    <AppProgressBar
      height="4px"
      color="#D6C1F3"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
