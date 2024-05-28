'use client';
import { IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { deleteList } from '@/src/services/api/ListsApi';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';

export default function ListDelete({ list }) {
  const { list_uuid } = list;
  const router = useRouter();

  const handleDelete = async () => {
    const accessToken = await getAccessTokenClient();

    deleteList(accessToken, list_uuid).then(() => {
      router.push('/lists/inbox');
      router.refresh();
    });
  };

  return (
    <>
      <button
        className="flex gap-3 cursor-pointer justify-start
        rounded-md p-4 text-xs md:text-sm text-gray-700
        dark:text-white dark:hover:bg-slate-700
        dark:focus:ring-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-100
        color-red-500 font-bold-400 w-full
        items-center
        h-6
        lg:h-8
        "
        onClick={(e) => handleDelete(e)}
      >
        <IconTrash size="18" />
        Delete List
      </button>
    </>
  );
}
