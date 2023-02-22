// login page

import { useState } from "react";
import { useRouter } from "next/router";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Head from "next/head";

import LoginWidget from "@/components/LoginWidget";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState('');

    async function handleLogin (username:string, password:string) {
        axios.post(`/api/auth/login`, {
            username,
            password
        })
        .then(res => {
            router.push('/app')
        })
        .catch(err => {
            console.log(err);
            setError('Invalid username or password')
        })
    }

    return (
        <>
        <Head>
            <title>BroadcastMed x Pingplotter MultiViewer | Login</title>
            <meta name="description" content="MultiViewer Login" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.ico" />
        </Head>
        <div>
            <LoginWidget onSubmit={handleLogin} />
            <Snackbar open={error ? true : false} autoHideDuration={6000} message={error} >
                <Alert severity="error" variant="filled" sx={{ width: '100%' }} >
                    {error}
                </Alert>
            </Snackbar>
        </div>
        </>
    )
}