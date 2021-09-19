import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'models/note';
import { Post } from 'models/post';

export interface DashboardStatistics {
    postCount: number;
    noteCount: number;
    likeCount: number;
    other: number;
}

export interface DashboardState {
    loading: boolean;
    statistics: DashboardStatistics;
    highestPostList: Post[];
    noteList: Note[];
}

const initialState: DashboardState = {
    loading: false,
    statistics: {
        postCount: 0,
        noteCount: 0,
        likeCount: 0,
        other: 0,
    },
    highestPostList: [],
    noteList: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state){
            state.loading = true;
        },
        fetchDataSuccess(state){
            state.loading = false;

        },
        fetchDataFailed(state){
            state.loading = false;

        },

        setStatistics(state, action: PayloadAction<DashboardStatistics>){
            state.statistics = action.payload;
        },
        setHighestPostList(state, action: PayloadAction<Post[]>){
            state.highestPostList = action.payload;
        },
        setNoteList(state, action: PayloadAction<Note[]>){
            state.noteList = action.payload;

        },
    }
});

// Actions
export const dashboardAction = dashboardSlice.actions;

// Selector
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectDashboardHighestPostList = (state: RootState) => state.dashboard.highestPostList;
export const selectDashboardNoteList = (state: RootState) => state.dashboard.noteList;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;