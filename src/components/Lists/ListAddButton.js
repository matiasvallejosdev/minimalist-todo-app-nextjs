'use client'
import { IconCirclePlus, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { createList } from "@/src/services/Lists";
import { useRouter } from "next/navigation";
import { getAccessTokenClient } from "@/src/services/AuthClient";

export default function ListAddButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (name === "") {
            alert("Name is required. Please enter a name!");
            return;
        }

        const accessToken = await getAccessTokenClient();

        createList(accessToken, { name })
            .then((res) => {
                const {list_uuid} = res;
                setIsOpen(false);
                setName("");
                router.refresh();
                router.push(`/lists/${list_uuid}`);
            })
    }

    return <>
        {!isOpen ? <li key='create-button' className="flex gap-2 cursor-pointer justify-start
            rounded-md p-2 text-sm text-gray-700
            dark:text-white dark:hover:bg-gray-700
            dark:focus:ring-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-gray-100
            color-red-500 font-bold-400"
            onClick={() => setIsOpen(!isOpen)}
        >
            <IconCirclePlus size={18} />
            <span>
                Create List
            </span>
        </li> : <div className="background-div"><div className="h-auto bg-white flex flex-col gap-2 cursor-pointer
            rounded-md p-2.5 text-sm dark:focus:ring-gray-700 items-center
            shadow-lg
            py-6 px-8 centered-div top-1/4 z-10 w-1/4
            bg-before
">
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
            <div className="flex gap-4 mt-2 justify-end w-full">
                <button className="py-2 px-4 btn-ghost" onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                }}>
                    Cancel
                </button>
                <button form="create-list" type="submit" className="btn btn-primary py-2 px-4 rounded-md">
                    Create List
                </button>
            </div>
        </div></div>
        }
    </>
}