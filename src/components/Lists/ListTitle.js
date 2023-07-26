'use client'
import { useState } from "react";
import { getAccessTokenClient } from "@/src/services/AuthClient";
import { updateList } from "@/src/services/Lists";

export default function ListTitle({ list }) {
    const [isOpen, setIsOpen] = useState(false);
    const [listName, setListName] = useState(list.name);

    const handleClick = () => {
        if (list.name == 'inbox') return;
        setIsOpen(true);
    }

    const handleBlur = async () => {
        setIsOpen(false);
        const accessToken = await getAccessTokenClient();
        updateList(accessToken, list.list_uuid, {
            name: listName
        }).then(() => {
            list.name = listName;
            router.refresh();
        }).catch(err => {
            console.log(err);
        })
    }


    return <>
        {
            isOpen ? <>
                <input type="text" value={listName} autoFocus onBlur={handleBlur} onChange={(e) => {
                    setListName(e.target.value);
                }} className={`p-0 text-4xl pb-3 font-semibold bg-inherit border-none
                                    focus:outline-none focus:border-none focus:ring-0 text-gray-900
                                    placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100
                                    ${isOpen ? 'rounded-none' : ''}
                                    `}
                />
            </> : <h4 onClick={handleClick} className="text-4xl pb-3 font-semibold">
                {
                    list.name == 'inbox' ? 'Inbox' : list.name
                }
            </h4>
        }
    </>
}