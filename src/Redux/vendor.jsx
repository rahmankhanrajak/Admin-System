import { createSlice } from "@reduxjs/toolkit";

export const BooksRecordSlice = createSlice({
    name: "BooksRecord",
    initialState: {
        value: [],
    },
    reducers: {
        populate_BooksRecord: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { populate_BooksRecord } = BooksRecordSlice.actions;
export default BooksRecordSlice.reducer;
