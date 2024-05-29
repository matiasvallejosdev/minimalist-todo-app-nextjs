'use client';
import { IconMenu2 } from '@tabler/icons-react';

import TaskCheckbox from '@/src/features/Board/components/Tasks/TaskCheckbox';
import TaskDelete from '@/src/features/Board/components/Tasks/TaskDelete';
import TaskUpcomingSchedule from '@/src/features/Board/components/Tasks/TaskUpcomingSchedule';
import TaskRowEdit from '@/src/features/Board/components/Tasks/TaskRowEdit';

import { useState } from 'react';

export default function Task({ task }) {
  const [isHover, setIsHover] = useState(false);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const { task_uuid, completed } = task;

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (!isUpcoming) {
      setIsHover(false);
    }
  };

  const handleUpcoming = (isOpen) => {
    setIsUpcoming(isOpen);
    setIsHover(isOpen);
  };

  return (
    <>
      <li
        key={task_uuid}
        className={`
            relative
            cursor-pointer
            flex gap-3 items-center justify-between
            ${completed ? 'line-through' : ''}
            hover:bg-gray-100 p-1 rounded-md px-4
            w-full
            dark:hover:bg-gray-800
            ${isUpcoming ? 'bg-gray-100 dark:bg-gray-800' : ''}
            ${isHover ? 'bg-gray-100 dark:bg-gray-800' : ''}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* {isHover && (
          <div className="absolute flex items-center justify-center bottom-0 p-1 pr-3 -left-6 -z-20 bg-gray-100 dark:bg-gray-800 rounded-l-md h-full min-w-fit">
            <IconMenu2 size={16} className={`${isHover ? 'text-gray-400 cursor-grab' : 'text-gray-400'}`} />
          </div>
        )} */}
        <div className="flex items-center justify-start gap-3 w-full|">
          <TaskCheckbox task={task} />
          <TaskRowEdit task={task} />
        </div>
        <div className="flex justify-end items-center gap-2">
          {!task.completed && task.due_date != null ? (
            <TaskUpcomingSchedule handleUpcoming={handleUpcoming} task={task} />
          ) : (
            isHover && <TaskUpcomingSchedule handleUpcoming={handleUpcoming} task={task} />
          )}
          {isHover && <TaskDelete task={task} />}
        </div>
      </li>
    </>
  );
}
