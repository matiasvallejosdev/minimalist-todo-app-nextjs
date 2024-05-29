'use client';
import ListElement from '@/src/features/Lists/ListElement';
import { IconMenu2 } from '@tabler/icons-react';

import useListState from './hooks/useListState';

import { ScrollArea } from '@/src/components/ui/scroll-area';

export default function Lists() {
  const { list } = useListState();
  const listsMap = list.lists;
  return (
    <ScrollArea className="rounded-md border w-full border-none h-auto">
      <div className="flex flex-col gap-1">
        {listsMap.map((list) => {
          const { id, name, list_uuid } = list;
          return (
            <ListElement key={list_uuid} id={id} name={name} list_uuid={list_uuid} icon={<IconMenu2 size={17} />} />
          );
        })}
      </div>
    </ScrollArea>
  );
}
