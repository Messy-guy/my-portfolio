"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../sanity.config";

export default function Studio() {
  const embeddedConfig = {
    ...config,
    basePath: "/studio",
  };
  return <NextStudio config={embeddedConfig} />;
}
