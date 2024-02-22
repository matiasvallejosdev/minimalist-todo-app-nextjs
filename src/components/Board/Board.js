'use client';
import TaskElement from '@/src/components/Tasks/TaskElement';
import TaskAddButton from '@/src/components/Tasks/TaskAddButton';
import { useTasksContext, useTasksDispatchContext} from '@/src/context/TaskProvider';

export default function Board({ tasks, list, slug, tableCompleted }) {
  // const tasksClient = useTasksContext();
  // const tasksDispatch = useTasksDispatchContext();

  // tasksDispatch(tasks, 'set')
  // console.log(tasksClient, tasksDispatch);
  return (
    <>
      <ul className="flex flex-col items-start justify-center w-full">
        {tasks
          .filter(({ completed }) => completed === tableCompleted)
          .map((task) => {
            return (
                <TaskElement tasksClient={tasks} key={task.id} task={task} />
            );
          })}
          {
            tasks.length == 0 && !tableCompleted && <p className="text-xs lg:text-sm text-gray-500 py-2">
              {
                slug == 'upcoming' ? "You don't have any upcoming task." : "You don't have any task."
              }
            </p>
          }
        {!tableCompleted && slug != 'upcoming' && <TaskAddButton list={list} slug={slug} />}
      </ul>
    </>
  );
}
