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
