'use client';
import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';

import { IconCirclePlus, IconLoader2 } from '@tabler/icons-react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { generateUuid } from '@/src/utils/appUtils';
import { toast } from 'sonner';
import useListActions from './hooks/useListActions';
import useListState from './hooks/useListState';

import { createList } from '@/src/services/api/ListsApi';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';

export function ListAddButton() {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { list } = useListState();
  const { addListAction, updateListAction, setListsAction } = useListActions();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Creating List. Please wait...');
    if (name === '') {
      toast.dismiss(toastId);
      return;
    }

    const listsBackup = list.lists;
    const listUuid = generateUuid();
    const data = {
      name: name,
    };
    addListAction({ ...data, list_uuid: listUuid });
    setName('');
    setIsLoading(true);
    setOpen(false);

    try {
      const accessToken = await getAccessTokenClient();
      const createdList = await createList(accessToken, data);
      updateListAction({ list_uuid: listUuid, list: createdList });
      toast.dismiss(toastId);
      toast.success('List created successfully');
      router.push(`/lists/${createdList.list_uuid}`);
    } catch (error) {
      console.log('Request failed');
      console.error(error);
      setListsAction(listsBackup);
      toast.dismiss(toastId);
      toast.error('Failed to create list');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isLoading ? (
          <Button
            variant="ghost"
            className="text-xs lg:text-sm flex gap-3 items-center justify-start bg-inherit
                    dark:bg-gray-700 bg-gray-200 font-normal"
          >
            <IconLoader2 size={18} className="animate-spin" />
            Creating List...
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="text-xs lg:text-sm flex gap-2 items-center justify-start bg-inherit
                    dark:hover:bg-gray-700 hover:bg-gray-200 font-normal"
          >
            <IconCirclePlus size={18} />
            Create List
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create List</DialogTitle>
          <DialogDescription>
            Create a new list to organize your tasks. You can add tasks to this list and manage them.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form className="flex flex-col justify-start items-start gap-2" id="create-list" onSubmit={handleCreate}>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Shopping Groceries"
              className="col-span-3"
              onChange={handleChange}
              value={name}
            />
          </form>
        </div>
        <DialogFooter>
          <Button type="submit" form="create-list">
            Create List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
