import auth from "./slice/auth";
import tag from "./slice/tag";
import school from "./slice/school";
import category from "./slice/category";
import subject from "./slice/subject";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    auth: auth,
    tag: tag,
    school: school,
    category: category,
    subject: subject,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
