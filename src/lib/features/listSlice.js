import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: [],
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    addList: (state, action) => {
      const list = action.payload;
      state.lists = [...state.lists, list];
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter((list) => list.list_uuid != action.payload);
    },
    updateList: (state, action) => {
      state.lists = state.lists.map((list) => {
        if (list.list_uuid == action.payload.list_uuid) {
          list = action.payload.list;
        }
        return list;
      });
    },
    updateListName: (state, action) => {
      state.lists = state.lists.map((list) => {
        console.log(list, action.payload);
        if (list.list_uuid == action.payload.list_uuid) {
          list.name = action.payload.name;
        }
        return list;
      });
    },
  },
});

export const { setLists, addList, removeList, updateList, updateListName } = listSlice.actions;
