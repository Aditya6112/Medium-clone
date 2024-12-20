import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import Avatar from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center mt-12">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl">
                <div className=" col-span-8">
                    <div className="text-5xl font-extrabold  ">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-4 text-sm">
                        Posted on December 20, 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-sm">
                        Author
                    </div>
                    <div className="flex mt-3">
                        <div className="mt-3 mr-4">
                            <Avatar name={blog.author.name || "Anonymus"} w={5} h={5} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymus"}
                            </div>
                            <div className="text-sm font-serif">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, inventore est.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}