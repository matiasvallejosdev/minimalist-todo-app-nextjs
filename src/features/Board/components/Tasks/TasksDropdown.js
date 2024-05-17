'use client';
import { useState } from 'react';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';

import { useSelector } from 'react-redux';

export default function TasksDropdown({ children }) {
  const board = useSelector((state) => state.board);
  const [open, setOpen] = useState(true);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full bg-gray-300 dark:bg-gray-500" style={{ height: '0.05rem' }}></div>
        <h4
          className="flex items-center justify-between text-base py-3 cursor-pointer text-gray-600 dark:text-gray-300"
          onClick={(e) => handleOpen(e)}
          style={{ userSelect: 'none' }}
        >
          <span>Completed ({board.count.completed})</span>
          {open ? (
            <IconChevronUp className="inline-block ml-2 text-gray-600 dark:text-gray-300" />
          ) : (
            <IconChevronDown className="inline-block ml-2 text-gray-600 dark:text-gray-300" />
          )}
        </h4>
        {open && children}
      </div>
    </>
  );
}
