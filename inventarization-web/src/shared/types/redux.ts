import { store } from "@app/app-store";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
