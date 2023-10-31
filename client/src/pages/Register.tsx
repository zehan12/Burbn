import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

const Register: FC = () => {
    const token = useAppSelector(
        (state) => state.auth.token
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");

    const register = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                body: JSON.stringify(
                    {
                        fullname: "ze kskdjk",
                        username: "zeal1",
                        email: "zehan1@gmail.com",
                        password: "123456789"
                    }
                ),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await res.json();
            return json;
        } catch (error) {
            throw new Error("error unable  login!");
        }
    };

    const handleSubmit = () => {
        console.log("submit")
    }

    console.log(token);
    return (<div className="w-full h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="bg-white border border-gray-300 w-80 py-8 px-4 flex items-center flex-col mb-3">
            <h1 className="text-3xl font-medium font-sans">burbn</h1>
            <form className="mt-8 w-64 flex flex-col" />
            <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                id="email" placeholder="Mobile number, or email" type="text" />
            <input
                value={fullname} onChange={(e) => setFullname(e.target.value)}
                className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                id="Fullname" placeholder="Full Name" type="text" />
            <input
                value={username} onChange={(e) => setUsername(e.target.value)}
                className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                id="Username" placeholder="Username" type="text"
            />
            <input
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                id="password" placeholder="Password" type="password" />

            <button onClick={handleSubmit} className="w-40 text-sm text-center bg-blue-500 text-white py-1 rounded font-medium">
                Sign Up
            </button>

        </div>
        <div className="bg-white border border-gray-300 text-center w-80 py-4">
            <span className="text-sm">Have an account</span>
            <Link to="/auth/login" className="text-blue-500 text-sm font-semibold px-3">Log in</Link>
        </div>
        <button onClick={register} className="w-60 h-14 my-4 bg-green-500 text-white">register</button>
    </div>)
};

export default Register;