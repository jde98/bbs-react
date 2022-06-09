import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: ['게시판', '공지사항'],
}

export const menuSelectedSlice = createSlice({
    name: 'menuSelected',
    initialState,
    reducers: {
        MenuSelected: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { MenuSelected } = menuSelectedSlice.actions

export default menuSelectedSlice.reducer