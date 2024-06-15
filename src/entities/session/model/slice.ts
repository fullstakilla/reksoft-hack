import { createSlice } from "@reduxjs/toolkit"

type SessionSliceState =
| {
  isAuthorized: true
  userId: number
  roleId: number
  name: string
  surname: string
  patronymic: string
  phone: string
  email: string
}
| {
  isAuthorized: false
  userId?: number
  roleId?: number
  name?: string
  surname?: string
  patronymic?: string
  phone?: string
  email?: string
}

const initialState: SessionSliceState = {
    isAuthorized: false,
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setupUser(state: SessionSliceState, action) {
            state.isAuthorized = true;
            state.userId = action.payload.userId;
            state.roleId = action.payload.roleId;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.patronymic = action.payload.patronymic;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
        },
        logout(state: SessionSliceState) {
            state.isAuthorized = false;
            state.userId = undefined;
            state.roleId = undefined;

            localStorage.removeItem('access_token');
        }
    }
})

export const {setupUser, logout} = sessionSlice.actions;

export default sessionSlice.reducer;