'use client';
import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';

import TaskCheckbox from '@/src/components/Tasks/TaskCheckbox';
import TaskDelete from '@/src/components/Tasks/TaskDelete';
import TaskUpcoming from '@/src/components/Tasks/TaskUpcoming';
import TaskRow from '@/src/components/Tasks/TaskRow';

export default function TaskElement({ tasksClient, task }) {
  const [open, setOpen] = useState(false);
  const { task_uuid, completed } = task;

  return (
    <>
      <li
        key={task_uuid}
        className={`
            relative
            cursor-pointer
            flex gap-3 items-center justify-between
            ${completed ? 'line-through' : ''}
            hover:bg-gray-100 p-1 rounded-md
            w-full
            dark:hover:bg-gray-800
        `}
        onMouseEnter={(e) => setOpen(true)}
        onMouseLeave={(e) => setOpen(false)}
      >
        {open && (
          <div 
          className="absolute flex items-center justify-center bottom-0 p-1 pr-3 -left-6 -z-20 bg-gray-100 dark:bg-gray-800 rounded-l-md h-full min-w-fit">
            <IconMenu2 size={16} className={`${open ? 'text-gray-400 cursor-grab' : 'text-gray-400'}`} />
          </div>
        )}
        <div className="flex items-center justify-start gap-3 w-full|">
          <TaskCheckbox task={task} />
          <TaskRow task={task} />
        </div>
        <div className="flex items-center justify-end">
          <div className="flex justify-end items-center">
            {!task.completed && task.due_date != null ? (
              <TaskUpcoming task={task} />
            ) : (
              open && <TaskUpcoming task={task} />
            )}
            {open && <TaskDelete task={task} />}
          </div>
        </div>
      </li>
    </>
  );
}
