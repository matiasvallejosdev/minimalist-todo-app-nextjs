// export default function TaskUpcoming({ task }) {
//   const { task_uuid } = task;
//   const [isOpen, setIsOpen] = useState(false);
//   const defaultValue =
//     task.date == null ? new Date().toISOString().split('T')[0] : new Date(task.due_date).toISOString().split('T')[0];
//   const [date, setDate] = useState(defaultValue);
//   const router = useRouter();

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//     console.log(e.target.value);
//   };

//   return (
//     <>
//       {task.due_date ? (
//         <>
//           <button
//             className="text-gray-600 pr-2 dark:text-white"
//             onClick={(e) => {
//               setIsOpen(!isOpen);
//             }}
//           >
//             <span className="text-sm">{new Date(task.due_date).toISOString().split('T')[0]}</span>
//           </button>
//         </>
//       ) : (
//         <>
//           <button
//             className="hover:text-gray-600 text-gray-300 pr-2 dark:hover:text-white dark:text-gray-400"
//             onClick={(e) => {
//               setIsOpen(!isOpen);
//             }}
//           >
//           </button>
//         </>
//       )}
//       {isOpen && (
//         <div className="">
//           <div
//             className="h-auto bg-white flex flex-col gap-2 cursor-pointer
//             rounded-md p-2.5 text-sm dark:focus:ring-gray-700 items-center
//             shadow-lg
//             py-6 px-8 absolute right-0 top-6 z-10 w-auto
//             bg-before
//             dark:bg-slate-800
// "
//           >
//             <form id="create-list" name="create-list" onSubmit={(e) => handleSumbit(e)} className="w-full">
//               <input
//                 type="date"
//                 className="text-sm p-2 rounded-sm bg-inherit w-full border border-gray-300 outline-none
//                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
//                 placeholder="List name"
//                 onChange={(e) => handleDateChange(e)}
//                 value={date}
//               />
//             </form>
//             <div className="flex gap-4 mt-2 justify-end w-full">
//               <button
//                 className="py-2 px-4 btn-ghost"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setIsOpen(false);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button form="create-list" type="submit" className="btn btn-primary py-2 px-4 rounded-md">
//                 Schedule Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
'use client';
import { getRelativeDate } from '@/src/utils/dateUtils';
import { IconCalendarEvent, IconClockHour10, IconSunrise, IconPlayerTrackNext, IconForbid } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useState } from 'react';
import useBoardActions from '../../hooks/useBoardActions';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';
import { updateTask } from '@/src/services/api/TasksApi';
import { toast } from 'sonner';
import { getRelativeDayString } from '@/src/utils/dateUtils';
import { useRouter } from 'next/navigation';

export default function TaskUpcomingSchedule({ handleUpcoming, task }) {
  const [isOpen, setIsOpen] = useState(false);
  const { task_uuid } = task;
  const { updateTaskAction } = useBoardActions();
  const router = useRouter();

  const handleSumbit = async (option) => {
    setIsOpen(false);
    const accessToken = await getAccessTokenClient();
    const taskBackup = task;
    let date;
    if (option === 'no_due_date') {
      date = null;
    } else {
      date = getRelativeDate(option).toISOString();
    }
    const data = {
      due_date: date,
    };
    const taskUpdated = {
      ...task,
      ...data,
    };
    console.log(data);

    updateTaskAction({ task_uuid: task_uuid, task: taskUpdated });
    updateTask(accessToken, task_uuid, data)
      .then((task) => {
        updateTaskAction({ task_uuid: task_uuid, task: task });
        toast.success('Task updated successfully');
        setIsOpen(false);
        router.refresh();
        handleUpcoming(!isOpen);
      })
      .catch((err) => {
        console.log(err);
        toast.error('An error occurred while updating the task');
        updateTaskAction({ task_uuid: taskBackup.task_uuid, task: taskBackup });
        setIsOpen(false);
        handleUpcoming(!isOpen);
      });
  };

  return (
    <DropdownMenu
      isOpen={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        handleUpcoming(!isOpen);
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className={`hover:text-gray-600 text-gray-300 dark:hover:text-white dark:text-gray-400
          ${isOpen ? 'text-gray-600 dark:text-white' : ''}
        `}>
          {task.due_date ? (
            <div className="text-sm text-gray-500">{getRelativeDayString(task.due_date)}</div>
          ) : (
            <IconCalendarEvent size={20} />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleSumbit('today')}>
            <span className="flex items-center justify-start gap-2">
              <IconClockHour10 size={18} />
              Today
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSumbit('tomorrow')}>
            <span className="flex items-center justify-start gap-2">
              <IconSunrise size={18} />
              Tomorrow
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSumbit('next_week')}>
            <span className="flex items-center justify-start gap-2">
              <IconPlayerTrackNext size={18} />
              Next Week
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSumbit('no_due_date')}>
            <span className="flex items-center justify-start gap-2">
              <IconForbid size={18} />
              No Due Date
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
