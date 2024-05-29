'use client';
import TaskElement from '@/src/features/Board/components/Tasks/Task';
import TaskAddButton from '@/src/features/Board/components/Tasks/TaskAddButton';

import useBoardState from '../../hooks/useBoardState';

export default function TasksList({ status = 'all' }) {
  const { board } = useBoardState();
  const tasks =
    status === 'all'
      ? board.tasks
      : status === 'completed'
      ? board.tasks.filter((task) => task.completed)
      : board.tasks.filter((task) => !task.completed);
  const list = board.list;
  const slug = board.slug;

  return (
    <>
      <ul className="flex flex-col items-start justify-center w-full">
        {tasks.map((task) => {
          return <TaskElement tasksClient={tasks} key={task.task_uuid} task={task} />;
        })}
        {status == 'incompleted' && slug != 'upcoming' && <TaskAddButton key={'new-task'} list={list} slug={slug} />}
      </ul>
    </>
  );
}
