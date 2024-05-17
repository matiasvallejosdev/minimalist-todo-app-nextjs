'use client';
import TasksList from './Tasks/TasksList';
import TasksDropdown from './Tasks/TasksDropdown';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setList, setSlug, setTasks } from '@/src/lib/features/board/boardSlice';

export default function Board({ slug, tasks, list }) {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setList(list));
    dispatch(setSlug(slug));
    dispatch(setTasks(tasks));
  }, [list, slug, tasks]);

  // if (slug == 'upcoming') {
  //     [tasksCounted, tasks] = await Promise.all([countTasks(accessToken, data), getTasks(accessToken, data)]);
  //     taskList = {
  //         id: 0,
  //         name: 'Upcoming',
  //     };
  // } else {

  // }

  return (
    <>
      <TasksList status="incompleted" />
      <TasksDropdown>
        <TasksList status="completed" />
      </TasksDropdown>
    </>
  );
}
