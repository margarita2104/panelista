import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            accessToken: localStorage.getItem('accessToken') || undefined,
        },
        reducers: {
            login_user: (state, action) => {
                state.accessToken = action.payload
            },
            logout_user: (state) => {
                state.accessToken = null
                localStorage.removeItem('accessToken')
            }
        }
    }
)

export const {login_user, logout_user} = userSlice.actions

export default userSlice.reducer





