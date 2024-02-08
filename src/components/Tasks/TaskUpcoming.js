'use client';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { getAccessTokenClient } from '@/src/services/AuthClient';
import { useState } from 'react';
import { updateTask } from '@/src/services/Tasks';
import { getDateStatus } from '@/src/utils/DateUtilities';

export default function TaskUpcoming({ task }) {
  const { task_uuid } = task;
  const [isOpen, setIsOpen] = useState(false);
  const defaultValue = new Date(task.due_date).toISOString().split('T')[0];
  const [date, setDate] = useState(defaultValue);
  const router = useRouter();

  const handleSumbit = async (e) => {
    const accessToken = await getAccessTokenClient();
    console.log(accessToken);
    updateTask(accessToken, task_uuid, {
      due_date: date,
    })
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      {task.due_date ? (
        <>
          <button
            className="text-gray-600 pr-2 dark:text-white"
            onClick={(e) => {
              setIsOpen(!isOpen);
            }}
          >
            <span className="text-sm">{getDateStatus(new Date(task.due_date).toISOString().slice(0, 10))}</span>
          </button>
        </>
      ) : (
        <>
          <button
            className="hover:text-gray-600 text-gray-300 pr-2 dark:hover:text-white dark:text-gray-400"
            onClick={(e) => {
              setIsOpen(!isOpen);
            }}
          >
            <IconCalendarEvent size={20} />
          </button>
        </>
      )}
      {isOpen && (
        <div className="background-div">
          <div
            className="h-auto bg-white flex flex-col gap-2 cursor-pointer
            rounded-md p-2.5 text-sm dark:focus:ring-gray-700 items-center
            shadow-lg
            py-6 px-8 centered-div top-1/4 z-10 w-1/4
            bg-before
            dark:bg-slate-800
"
          >
            <h4 className="text-left w-full text-lg font-semibold mb-2">Select Date</h4>
            <form id="create-list" name="create-list" onSubmit={(e) => handleSumbit(e)} className="w-full">
              <input
                type="date"
                className="text-sm p-2 rounded-sm bg-inherit w-full border border-gray-300 outline-none
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                placeholder="List name"
                onChange={(e) => handleDateChange(e)}
                value={date}
              />
            </form>
            <div className="flex gap-4 mt-2 justify-end w-full">
              <button
                className="py-2 px-4 btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button form="create-list" type="submit" className="btn btn-primary py-2 px-4 rounded-md">
                Schedule Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
