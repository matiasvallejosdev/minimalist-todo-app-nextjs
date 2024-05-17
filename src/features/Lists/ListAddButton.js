'use client';
import { IconCirclePlus, IconSend } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';
import { createList } from '@/src/services/Lists';
import { useRouter } from 'next/navigation';
import { getAccessTokenClient } from '@/src/services/AuthClient';
import { IconMenu2 } from '@tabler/icons-react';

export default function ListAddButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const router = useRouter();
    const backgroundRef = useRef(null);
    const [isReadyToClose, setIsReadyToClose] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (backgroundRef.current && !backgroundRef.current.contains(event.target) && isReadyToClose) {
                setIsOpen(false);
                setIsReadyToClose(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [backgroundRef, isReadyToClose]);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (name === '') {
            return;
        }
        const accessToken = await getAccessTokenClient();
        createList(accessToken, { name }).then((res) => {
            const { list_uuid } = res;
            setName('');
            router.push(`/lists/${list_uuid}`);
            router.refresh();
            setIsOpen(false)
            setIsReadyToClose(false)
        });
    };

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            setIsReadyToClose(true);
        }
    };

    return (
        <>
            {!isOpen ? (
                <li
                    key="create-button"
                    className="flex flex-col lg:flex-row gap-2 cursor-pointer justify-center lg:justify-start items-center
            rounded-md p-2 text-gray-700
            dark:text-white dark:hover:bg-gray-700
            dark:focus:ring-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-100
            color-red-500 font-bold-400
            text-xs lg:text-sm
            "
                    onClick={() => handleOpen()}
                >
                    <IconCirclePlus size={18} />
                    <span className="text-center">Create List</span>
                </li>
            ) : (
                <form
                    ref={backgroundRef}
                    id="create-task"
                    name="create-task"
                    className="
                        cursor-pointer
                        flex gap-2 items-center justify-between
                        hover:bg-gray-100 p-2 rounded-md
                        w-full
                        dark:hover:bg-gray-800
                        h-10
                    "
                    onBlur={handleCreate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreate(e);
                        }
                        if (e.key == 'Escape') {
                            e.preventDefault();
                            setIsOpen(false);
                            setIsReadyToClose(false);
                        }
                    }}
                >
                    <IconMenu2 size={20} />
                    <input
                        type="text"
                        className="h-full rounded-md bg-inherit w-full border-none
                                focus:outline-none focus:border-none focus:ring-0 text-black
                                placeholder-gray-500 dark:placeholder-gray-400 dark:text-gray-100
                                p-0
                                flex items-center justify-start gap-2 flex-col lg:flex-row text-xs lg:text-sm
                                "
                        placeholder="List Name"
                        autoFocus
                        value={name}
                        onChange={(e) => handleChange(e)}
                    />
                </form>
            )}
        </>
    );
}

{
    /* <div className="background-div">
          <div
            className="h-auto bg-white flex flex-col gap-2 cursor-pointer
            rounded-md p-2.5 text-sm dark:focus:ring-gray-700 items-center
            shadow-lg
            py-6 px-8 centered-div top-1/4 z-10
            bg-before
            dark:bg-slate-800
            mt-2
            w-96
            "   
          >
            <h4 className="text-left w-full text-lg font-semibold mb-2">Create List</h4>
            <form id="create-list" name="create-list" onSubmit={(e) => handleSumbit(e)} className="w-full">
              <input
                type="text"
                className="text-sm p-2 rounded-sm bg-inherit w-full border border-gray-300 outline-none
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
                placeholder="List name"
                onChange={(e) => handleNameChange(e)}
                value={name}
              />
            </form>
            <div className="flex gap-4 justify-end w-full">
              <button
                className="py-2 px-4 btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button form="create-list" type="submit" className="btn btn-primary py-2 px-4 rounded-md">
                Create List
              </button>
            </div>
          </div>
        </div> */
}
