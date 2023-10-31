import { HiOutlineSearch } from "react-icons/hi";
import { AiFillHome, AiTwotoneHeart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BsPlusCircleDotted } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { useEffect, useState } from "react";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDarkSide, setDarkSide] = useState<boolean>(false);

    useEffect(() => {
        if (isDarkSide) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkSide]);

    return (
        <div className="shadow-sm border-b bg-white dark:bg-black dark:text-white sticky top-0 -z-50">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
                <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
                    <h2>burbn</h2>
                </div>
                <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
                    <div>Logo</div>
                </div>
                {/* middle search*/}
                <div className="max-w-xs">
                    <div className="relative mt-1 p-3 rounded-md">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineSearch className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                </div>
                {/* right */}
                <div className="flex items-center justify-end space-x-4">
                    <AiFillHome className="navBtn" />
                    <FiMenu className="h-6 md:hidden cursor-pointer" />
                    <div className="relative navBtn">
                        <HiOutlinePaperAirplane className="navBtn rotate-45" />
                        <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">
                            3
                        </div>
                    </div>
                    <BsPlusCircleDotted className="navBtn" />
                    <MdGroups className="navBtn" />
                    <AiTwotoneHeart className="navBtn" />
                    <div className="inline-block relative">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="py-2 px-4 rounded inline-flex items-center">
                            <img
                                src=""
                                alt="pp"
                                className="h-10 w-10 bg-red-600 rounded-full cursor-pointer text-white"
                            />
                        </button>
                        <ul className={`absolute text-gray-700 pt-1 ${isMenuOpen ? 'block' : 'hidden'}`}>
                            <li className=""><a className="rounded-t bg-white hover:bg-gray-50 py-2 px-4 block whitespace-no-wrap" href="#">profile</a></li>
                            <li className=""><a className="bg-white hover:bg-gray-50 py-2 px-4 block whitespace-no-wrap" href="#">options</a></li>
                            <li className=""><a className="rounded-b bg-white hover:bg-gray-50 py-2 px-4 block whitespace-no-wrap" href="#">logout</a></li>
                        </ul>
                    </div>
                    <div
                        onClick={() => setDarkSide(!isDarkSide)}
                        className="cursor-pointer"
                    >
                        {isDarkSide ? "dark" : "light"}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header;