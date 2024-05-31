import { FC, lazy } from "react";

export const LazyMousepadsPage: FC = lazy(() => import("./mousepads-page"));

LazyMousepadsPage.displayName = "lazy-mousepads-page";
