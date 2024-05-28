'use client';
import TasksList from './Tasks/TasksList';
import TasksDropdown from './Tasks/TasksDropdown';

import { useEffect } from 'react';

import useBoardActions from '../hooks/useBoardActions';

export default function Board({ slug, tasks, list }) {
  const { setListAction, setSlugAction, setTasksAction } = useBoardActions();

  useEffect(() => {
    setListAction(list);
    setSlugAction(slug);
    setTasksAction(tasks);
  }, [list, slug, tasks]);

  return (
    <>
      <TasksList status="incompleted" />
      <TasksDropdown>
        <TasksList status="completed" />
      </TasksDropdown>
    </>
  );
}
