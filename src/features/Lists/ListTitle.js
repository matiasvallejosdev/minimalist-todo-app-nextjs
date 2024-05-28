'use client';
import { useState } from 'react';
import { getAccessTokenClient } from '@/src/services/auth/AuthClient';
import { updateList } from '@/src/services/api/ListsApi';

import { useEffect } from 'react';

import useBoardState from '../Board/hooks/useBoardState';
import useBoardActions from '../Board/hooks/useBoardActions';
import useListActions from './hooks/useListActions';

export default function ListTitle() {
  const { board } = useBoardState();
  const { list } = board;
  const [listName, setListName] = useState(list.name);
  const { updateBoardListNameAction, setListAction } = useBoardActions();
  const { updateListNameAction } = useListActions();

  useEffect(() => {
    setListName(list.name);
  }, [list.name]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    let name = String(list.name).toLowerCase();
    if (name == 'inbox' || name == 'upcoming') return;
    setIsOpen(true);
  };

  const handleBlur = async () => {
    const backupList = list;
    const data = {
      name: listName,
    };

    setIsOpen(false);
    updateBoardListNameAction({ ...data });
    updateListNameAction({ list_uuid: list.list_uuid, name: listName });

    const accessToken = await getAccessTokenClient();
    updateList(accessToken, list.list_uuid, data)
      .then((list) => {
        setListAction(list);
      })
      .catch((err) => {
        console.log(err);
        setListAction(backupList);
      });
  };

  return (
    <>
      {isOpen ? (
        <>
          <input
            type="text"
            value={listName}
            autoFocus
            onBlur={handleBlur}
            onChange={(e) => {
              setListName(e.target.value);
            }}
            className="text-2xl lg:text-3xl cursor-text p-0 bg-inherit border-none focus:outline-none focus:border-none focus:ring-0 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100 rounded-none"
          />
        </>
      ) : (
        <h4 onClick={handleClick} className="text-2xl lg:text-3xl cursor-text">
          {listName == 'inbox' ? 'Inbox' : listName == 'upcoming' ? 'Upcoming' : listName}
        </h4>
      )}
    </>
  );
}
