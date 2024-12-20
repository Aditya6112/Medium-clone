import { Link } from "react-router-dom";
interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className=" p-4 border-b border-slate-300 pb-6 cursor-pointer">
            <div className="flex">
                <div className="flex mt-0.5">
                    <Avatar name={authorName} w={4} h={4} />
                </div>
                <div className="font-extralight pl-2 text-sm">
                    {authorName}
                </div>
                <div className="text-xs ml-1 p-0.5 text-slate-400">
                    &#9679;
                </div>
                <div className="pl-1 font-thin text-slate-500 text-sm">
                    {publishedDate}
                </div>
            </div>
            <div className="font-bold text-xl pt-2">
                {title}
            </div>
            <div className="text-base font-serif text-black">
                {content.slice(0, 131) + "..."}
            </div>
            <div className="text-sm text-slate-500 font-sans pt-4">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
    </Link>
};

function Avatar({ name, w = 4, h = 4 }: { name: string; w?: number; h?: number }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center bg-gray-600 rounded-full overflow-hidden`}
            style={{ width: `${w * 0.25}rem`, height: `${h * 0.25}rem` }}
        >
            <span className="font-medium text-slate-300">{name[0]}</span>
        </div>
    );
}

export default Avatar;
