// login page

import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import LoginWidget from "@/components/LoginWidget";

export default function Login() {
    const router = useRouter();


    function handleLogin (username:string, password:string) {
        axios.post(`/api/auth/login`, {
            username,
            password
        })
        .then(res => {
            router.push('/app')
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <LoginWidget onSubmit={handleLogin} />
        </div>
    )
}