'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { IconCalendarEvent } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { getAccessTokenClient } from '@/src/services/AuthClient';
import { useState } from 'react';
import { updateTask } from '@/src/services/Tasks';

// export default function TaskUpcoming({ task }) {
//   const { task_uuid } = task;
//   const [isOpen, setIsOpen] = useState(false);
//   const defaultValue =
//     task.date == null ? new Date().toISOString().split('T')[0] : new Date(task.due_date).toISOString().split('T')[0];
//   const [date, setDate] = useState(defaultValue);
//   const router = useRouter();

//   const handleSumbit = async (e) => {
//     const accessToken = await getAccessTokenClient();
//     console.log(accessToken);
//     updateTask(accessToken, task_uuid, {
//       due_date: date,
//     })
//       .then(() => {
//         router.refresh();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

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
//             <IconCalendarEvent size={20} />
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

export default function TaskUpcomingSchedule() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
