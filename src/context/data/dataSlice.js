import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'myFeature',
  initialState: {
    postCount: 0,
    feedCount: 0,
    posts: [],
    followers: [],
    darkMode: true
  },
  reducers: {
    setPostCount: (state, action) => {
      state.postCount += action.payload;
    },
    setFeedCount: (state, action) => {
      state.feedCount = action.payload;
    },
    setPosts: (state, action) => {
      state.posts.push(action.payload)
    },
    setFollowers: (state, action) => {
      state.followers.push(action.payload)
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
    }
  },
});

export const {
  setPostCount,
  setFeedCount,
  setPosts,
  setFollowers,
  setDarkMode
} = dataSlice.actions;

export default dataSlice.reducer;
