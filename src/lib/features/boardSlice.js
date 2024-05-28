import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    tasks: [],
    list: {},
    slug: '',
    count: {
      incompleted: 0,
      completed: 0,
      total: 0,
    },
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setTasks: (state, action) => {
      state.count.completed = action.payload.filter((task) => task.completed).length;
      state.count.incompleted = action.payload.filter((task) => !task.completed).length;
      state.count.total = action.payload.length;
      state.tasks = action.payload;
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.task_uuid != action.payload);
    },
    addTask: (state, action) => {
      const task = action.payload;
      state.tasks = [...state.tasks, task];
    },
    updateStatusTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.task_uuid == action.payload.task_uuid) {
          task.completed = action.payload.status == 'completed' ? true : false;
          state.count.completed =
            action.payload.status == 'completed' ? state.count.completed + 1 : state.count.completed - 1;
          state.count.incompleted =
            action.payload.status == 'incompleted' ? state.count.incompleted + 1 : state.count.incompleted - 1;
        }
        return task;
      });
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.task_uuid == action.payload.task_uuid) {
          task = action.payload.task;
        }
        return task;
      });
    },
    updateListName: (state, action) => {
      state.list.name = action.payload.name;
    },
  },
});

export const { setList, setSlug, setTasks, updateStatusTask, addTask, removeTask, updateTask, updateListName } = boardSlice.actions;
