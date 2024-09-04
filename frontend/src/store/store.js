import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice.js";
import eventReducer from "./slices/EventSlice.js";
import speakerReducer from "./slices/SpeakerSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    speaker: speakerReducer,
  },
});
