'use client';

import { IconDotsVertical, IconTrash, IconArchive, IconLoader2 } from '@tabler/icons-react';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { useState } from 'react';

import useBoardState from '../../Board/hooks/useBoardState';
import useListActions from '../../Lists/hooks/useListActions';

import { deleteList, updateList } from '@/src/services/api/ListsApi';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

export default function ActionsList() {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const { removeListAction } = useListActions();
  const { board } = useBoardState();
  const { list: listBoard } = board;

  const listUuid = listBoard.list_uuid;

  const handleDeleteList = async () => {
    const accessToken = await getAccessTokenClient();
    setDeleteLoading(true);

    deleteList(accessToken, listUuid)
      .then(() => {
        setDeleteLoading(false);
        removeListAction(listUuid);
        toast.success('List deleted successfully');
        closeDropdown();
        router.push('/lists/inbox');
      })
      .catch(() => {
        setDeleteLoading(false);
        toast.error('An error occurred while deleting the list');
        closeDropdown();
      });
  };

  const handleArchiveList = async () => {
    const accessToken = await getAccessTokenClient();
    const data = {
      archived: true,
    };
    setArchiveLoading(true);
    setIsOpen(true);

    updateList(accessToken, listUuid, data)
      .then(() => {
        setArchiveLoading(false);
        removeListAction(listUuid);
        toast.success('List archived successfully');
        router.push('/lists/inbox');
        closeDropdown();
      })
      .catch(() => {
        setArchiveLoading(false);
        toast.error('An error occurred while archiving the list');
        closeDropdown();
      });
  };

  return (
    <DropdownMenu isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="icon">
          <IconDotsVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleArchiveList}>
            <span className="flex items-center justify-start gap-2">
              {archiveLoading ? (
                <>
                  <IconLoader2 size={18} className="animate-spin" />
                  Archiving List...
                </>
              ) : (
                <>
                  <IconArchive size={18} />
                  Archive List
                </>
              )}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteList}>
            <span className="flex items-center justify-start gap-2">
              {deleteLoading ? (
                <>
                  <IconLoader2 size={18} className="animate-spin" />
                  Deleting List...
                </>
              ) : (
                <>
                  <IconTrash size={18} />
                  Delete List
                </>
              )}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
