import { Link } from "react-router-dom"
import Avatar from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between
     px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col text-black font-extrabold font-serif text-2xl cursor-pointer">
            Medium
        </Link>
        <div className="flex">
            <div className="mr-6">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center me-3 mb-3 mt-0.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New Blog</button>
            </div>
            <div className="">
                <Avatar w={8} h={8} name="Aditya" />
            </div>
        </div>
    </div>
}