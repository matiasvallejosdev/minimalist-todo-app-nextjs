import { useDispatch } from 'react-redux';
import {
  addTask,
  updateStatusTask,
  removeTask,
  updateTask,
  setList,
  setTasks,
  setSlug,
} from '@/src/lib/features/board/boardSlice';

export default function useBoardActions() {
  const dispatch = useDispatch();

  const addTaskAction = (task) => {
    dispatch(addTask(task));
  };

  const updateStatusTaskAction = ({ task_uuid, status }) => {
    dispatch(updateStatusTask({ task_uuid, status }));
  };

  const removeTaskAction = (task_uuid) => {
    dispatch(removeTask(task_uuid));
  };

  const updateTaskAction = ({ task_uuid, task }) => {
    dispatch(updateTask({ task_uuid, task }));
  };

  const setListAction = (list) => {
    dispatch(setList(list));
  };

  const setTasksAction = (tasks) => {
    dispatch(setTasks(tasks));
  };

  const setSlugAction = (slug) => {
    dispatch(setSlug(slug));
  };

  return {
    addTaskAction,
    updateStatusTaskAction,
    removeTaskAction,
    updateTaskAction,
    setListAction,
    setTasksAction,
    setSlugAction,
  };
}
