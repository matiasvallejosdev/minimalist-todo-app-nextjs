'use client'

import ListElement from '@/src/features/Lists/ListElement';
import { IconCalendar, IconInbox } from '@tabler/icons-react';

import Lists from '@/src/features/Lists/Lists';

import useListActions from '../features/Lists/hooks/useListActions';
import { useEffect } from 'react';
import Separator from '../components/Separator';

export default function Navbar({lists}) {
  const { setListsAction } = useListActions();
  
  useEffect(() => {
    setListsAction(lists);
  }, [lists, setListsAction]);


  return (
    <>
      <ul className="flex flex-col gap-1">
        <ListElement key={'1-inbox'} id={'1-inbox'} name={'Inbox'} list_uuid="inbox" icon={<IconInbox size={17} />} />
        <ListElement
          key={'2-upcoming'}
          id={'2-upcoming'}
          name={'Upcoming'}
          list_uuid="upcoming"
          icon={<IconCalendar size={17} />}
        />
        <Separator />
        <Lists />
      </ul>
    </>
  );
}
