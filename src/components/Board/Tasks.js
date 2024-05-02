'use client';
import TaskElement from '@/src/features/Board/components/TaskElement';
import TaskAddButton from '@/src/features/Board/components/TaskAddButton';

import { useSelector } from 'react-redux';

export default function Tasks({ status = 'all' }) {
  const board = useSelector((state) => state.board);
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
        {tasks.length == 0 && status == 'all' && (
          <li>
            <p className="text-xs lg:text-sm text-gray-500 py-2">
              {slug == 'upcoming' ? "You don't have any upcoming task." : "You don't have any task."}
            </p>
          </li>
        )}
        {tasks.map((task) => {
          return <TaskElement tasksClient={tasks} key={task.task_uuid} task={task} />;
        })}
        {status == 'incompleted' && slug != 'upcoming' && <TaskAddButton key={"new-task"} list={list} slug={slug} />}
      </ul>
    </>
  );
}
