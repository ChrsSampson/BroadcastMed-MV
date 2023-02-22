// forgot password page to trigger a password reset email

import { useState } from "react";
import { useRouter } from "next/router"
import { Box, TextField, Button, Snackbar, Alert, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function () {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        axios.post(`/api/auth/reset`, {
            email
        })
        .then(res => {
            setMessage('Your account has been found, You will receive an email shortly.')
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
            setError('Invalid Email')
            setLoading(false)
        })
    }

    return (
        <Box 
            sx={{
                display: 'grid',
                placeItems: 'center',
                height: '100vh',
                backgroundColor: '#0B86DB'
            }}
        >
            <Box>
            <form
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    borderRadius: '1.25rem',
                    border: '1px solid white',
                }}
                onSubmit={(e) => handleSubmit(e)}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2em',
                }}>
                    <Image priority src="/icon.ico" alt="logo" width={150} height={150} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0 1rem 1rem 0',
                }}>   
                    <Typography variant='h6' align="center">
                        Password Reset
                    </Typography>
                    {
                    message &&
                            <Alert severity="success" variant="filled" sx={{ width: '100%' }} >
                            {message}
                        </Alert>
                    }
                    <TextField
                        error={error ? true : false}
                        variant='outlined'
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {
                        loading ? 
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}>
                                <CircularProgress  />
                            </Box>
                        : 
                            <Button variant='contained' type="submit" disabled={loading}>Send Reset Email</Button>
                    }
                    <Typography variant='h6' align="center">
                        <Button>
                            <Link href="/login">
                               Back To Login
                            </Link>
                        </Button>
                    </Typography>
                </Box>
            </form>
            </Box>
            <Snackbar open={error ? true : false} autoHideDuration={6000} message={error} >
                <Alert severity="error" variant="filled" sx={{ width: '100%' }} >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}