import { useState } from "react";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = {email,password}
    const handleSubmit = async () => {
        console.log(email,password)
        const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const json = await res.json();
        console.log(json);
    }
    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
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