import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    error: null,
  },
  reducers: {
    get_events: (state, action) => {
      state.events = action.payload;
    },
    create_event: (state, action) => {
      state.events.push(action.payload);
    },
    update_event: (state, action) => {
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event.id === updatedEvent.id
      );
      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
    },
    delete_event: (state, action) => {
      const eventId = action.payload;
      state.events = state.events.filter((event) => event.id !== eventId);
    },
    set_error: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  get_events,
  create_event,
  set_error,
  update_event,
  delete_event,
} = eventSlice.actions;

export default eventSlice.reducer;
