import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchLoginUserRequest } from "../redux/auth/auth.slice";
import { FULFILLED, PENDING, REJECTED } from "../constant/general";
import { setIsLoading, setNotifyData } from "../redux/notify/notify.slice";
import { Link } from "react-router-dom";
import useRouter from "../hooks/useRouter";

const LogIn = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const fetchLoginUserStatus = useAppSelector(
        (state) => state.auth.fetchLoginUserStatus
    );
    const loginUser = useAppSelector(
        (state) => state.auth.loginUser
    );
    const token = useAppSelector(
        (state) => state.auth.token
    );
    const loginError = useAppSelector(
        (state) => state.auth.loginError
    );
    const loading = useAppSelector((state) => state.notify.loading);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(fetchLoginUserRequest({ email, password }));
    }

    const click = () => {
        dispatch(fetchLoginUserRequest({ email: "zehan@gmail.com", password: "123456789" }));
    }

    useEffect(() => {
        console.log(fetchLoginUserStatus, "login");
        if (fetchLoginUserStatus === PENDING) {
            dispatch(setIsLoading(true));
            setTimeout(() => {
                dispatch(setIsLoading(false));
            }, 1000);
        }
        if (fetchLoginUserStatus === FULFILLED) {

            if (token) {
                if (loginUser?.fullname) {
                    dispatch(setNotifyData({ type: "success", message: "user login successfully" }));
                }
                setTimeout(() => {
                    dispatch(setNotifyData({ type: "", message: "" }));
                }, 1000);
                router.history("/");
            }
        }

        if (fetchLoginUserStatus === REJECTED) {
            if (loginError) {
                dispatch(setNotifyData({ type: "error", message: loginError }));
            }
        }
    }, [fetchLoginUserStatus, loginUser, dispatch, router, token, loginError]);

    useEffect(() => {
        if (!loading && loginError) {
            dispatch(setNotifyData({ type: "error", message: loginError }));
            setTimeout(() => {
                dispatch(setNotifyData({ type: "", message: "" }));
            }, 1300);
        }
    }, [loading, loginError, dispatch])

    useEffect(() => {
        console.log(token, "access token")
    }, [token])

    return (
        <div className="w-full h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="bg-white border border-gray-300 w-80 py-8 px-4 flex items-center flex-col mb-3">
                <h1 className="text-3xl font-medium font-sans">burbn</h1>
                <form className="mt-8 w-64 flex flex-col" />
                <input
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                    id="email" placeholder="Phone number, username, or email" type="text" />
                <input
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                    id="password" placeholder="Password" type="password" />
                <button onClick={handleLogin} className="w-40 text-sm text-center bg-blue-500 text-white py-1 rounded font-medium">
                    Log In
                </button>
                <div className="flex justify-evenly space-x-2 w-64 mt-4">
                    <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                    <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
                    <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                </div>
                <a className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">Forgot password?</a>
            </div>
            <div className="bg-white border border-gray-300 text-center w-80 py-4">
                <span className="text-sm">Don't have an account?</span>
                <Link to="/auth/register" className="text-blue-500 text-sm font-semibold px-3">Sign up</Link>
            </div>
            <button onClick={click} className="w-60 h-14 my-4 bg-amber-500 text-white">login</button>
        </div>
    )
}

export default LogIn;