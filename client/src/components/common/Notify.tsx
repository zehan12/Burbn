import { FC, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

const Notify: FC = () => {
    const notify =  useAppSelector((state) => state.notify);
    // {data:{type:"",message:"hello"},loading:true}
    useEffect(()=>{
        console.log(notify.data);
    },[notify.data])
    return (<div>
        {notify.loading && (
            <div className="absolute w-full h-full text-center bottom-0 right-0 bg-black bg-opacity-70">
                <div className="absolute top-2/4 left-2/4 flex items-center space-x-2  ">
                    <div aria-label="Loading..." role="status">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="animate-spin w-4 h-4 stroke-black-500">
                            <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12">
                            </path>
                        </svg>
                    </div>
                    <span className="text-xs font-medium text-black-500">Loading...</span>
                </div>
            </div>
        )
        }
        {
            notify.data.message ? (<div className="absolute bg-white w-40 right-1">
                <div>
                    {notify.data.message}
                </div>
            </div>) : ""
        }
    </div >)
}

export default Notify;