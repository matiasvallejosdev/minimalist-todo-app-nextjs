'use client';
import TasksList from './Tasks/TasksList';
import TasksDropdown from './Tasks/TasksDropdown';

import { useEffect } from 'react';

import useBoardState from '../hooks/useBoardState';
import useBoardActions from '../hooks/useBoardActions';

export default function Board({ slug, tasks, list }) {
  const { board } = useBoardState();
  const { setListAction, setSlugAction, setTasksAction } = useBoardActions();

  useEffect(() => {
    setListAction(list);
    setSlugAction(slug);
    setTasksAction(tasks);
  }, [list, slug, tasks]);

  return (
    <>
      <TasksList status="incompleted" />
      {board.count.completed > 0 && (
        <TasksDropdown>
          <TasksList status="completed" />
        </TasksDropdown>
      )}
    </>
  );
}
