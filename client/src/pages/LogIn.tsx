import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchLoginUserRequest } from "../redux/auth/auth.slice";
import { FULFILLED } from "../constant/general";

const LogIn = () => {
    const dispatch = useAppDispatch();
    const fetchLoginUserStatus = useAppSelector(
        (state) => state.auth.fetchLoginUserStatus
    );
    const loginUser = useAppSelector(
        (state) => state.auth.loginUser
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = { email, password }
    const handleSubmit = async () => {
        console.log(email, password)
        const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        });
        // if () router.history("/");
        const json = await res.json();
        console.log(json);
    }

    const click = () => {
        console.log("click");
        dispatch(fetchLoginUserRequest({ email: "zehan@gmail.com", password: "123456789" }));
    }

    useEffect(() => {
        console.log(fetchLoginUserStatus, "login");
        if ( fetchLoginUserStatus === FULFILLED ) {
            console.log(loginUser,"login user")
        }
    }, [fetchLoginUserStatus,loginUser]);
    
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
            <button onClick={click} className="w-60 h-24 bg-blue-500 text-white">onClick</button>
            <h1>burbn</h1>
            <div className="flex flex-col">
                <label>Email Address</label> <br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="border-2" />
                <br />
                <label>Password</label> <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2" />
                <br />
                <button onClick={handleSubmit} className="bg-blue-500 text-white">Login</button>
            </div>
        </div>
    )
}

export default LogIn;