'use client';
import TaskElement from '@/src/components/Tasks/TaskElement';
import TaskAddButton from '@/src/components/Tasks/TaskAddButton';

export default function Board({ tasks, list, slug, tableCompleted }) {
  return (
    <>
      <ul className="flex flex-col items-start justify-center w-full">
        {tasks
          .filter(({ completed }) => completed === tableCompleted)
          .map((task, index) => {
            return (
                <TaskElement key={task.id} task={task} />
            );
          })}
          {
            tasks.length == 0 && !tableCompleted && <p className="text-xs lg:text-sm text-gray-500 py-2">
              {
                slug == 'upcoming' ? "You don't have Upcoming tasks" : "List empty. Press 'New Task' to add it."
              }
            </p>
          }
        {!tableCompleted && slug != 'upcoming' && <TaskAddButton list={list} slug={slug} />}
      </ul>
    </>
  );
}
