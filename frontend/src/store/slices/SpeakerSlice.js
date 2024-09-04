import {createSlice} from "@reduxjs/toolkit";

export const speakerSlice = createSlice({
    name: "speaker",
    initialState: {
        speakers: [],
        error: null,
    },
    reducers: {
        get_speakers: (state, action) => {
            state.speakers = action.payload;
        },
        create_speaker: (state, action) => {
            state.speakers.push(action.payload);
        },
        update_speaker: (state, action) => {
            const updatedSpeaker = action.payload;
            const index = state.speakers.findIndex(
                (speaker) => speaker.id === updatedSpeaker.id
            );
            if (index !== -1) {
                state.speakers[index] = updatedSpeaker;
            }
        },
        delete_speaker: (state, action) => {
            const speakerId = action.payload;
            state.speakers = state.speakers.filter(
                (speaker) => speaker.id !== speakerId
            );
        },
        set_error: (state, action) => {
            state.error = action.payload;
        },
        add_review: (state, action) => {
            const {speakerId, review} = action.payload;
            const speaker = state.speakers.find((s) => s.id === speakerId);
            if (speaker) {
                if (!speaker.reviews) {
                    speaker.reviews = [];
                }
                speaker.reviews.push(review);
            }
        },
    },
});

export const {
    get_speakers,
    create_speaker,
    set_error,
    update_speaker,
    delete_speaker,
    add_review,
} = speakerSlice.actions;

export default speakerSlice.reducer;
