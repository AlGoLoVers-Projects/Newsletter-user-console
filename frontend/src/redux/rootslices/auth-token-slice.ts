import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
};

const initialState: AuthState = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
    },
});

export const {setToken} = authSlice.actions;
export default authSlice.reducer;

export const selectToken = (state: any) => state.auth.token;
