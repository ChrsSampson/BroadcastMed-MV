import {useState} from 'react';
import axios from 'axios';
import {Box, TextField, Button, Snackbar, Alert} from '@mui/material'
import Image from 'next/image';



export default function LoginWidget({onSubmit}: {onSubmit: Function}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if(!username || !password) throw new Error('Invalid username or password');
            await onSubmit(username, password)
        } catch (err:any) {
            setError('Invalid username or password');
            console.error(err)
        }
        setLoading(false);
    };

    return (
        <>
        <Box sx={{
            display: 'grid',
            placeItems: 'center',
            height: '100vh',
            backgroundColor: '#0B86DB'
        }}>
            <form
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderRadius: '1.25rem',
                    border: '1px solid white',
                }}
                onSubmit={(e) => handleSubmit(e)}
            >
                <Box sx={{
                    display: 'grid',
                    placeItems: 'center'
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
                    
                <TextField
                    error={error ? true : false}
                    variant='outlined'
                    label="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    error={error ? true : false}
                    variant='outlined'
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='contained' type="submit" disabled={loading}>Login</Button>
                </Box>
            </form>
        </Box>
        <Snackbar open={error ? true : false} autoHideDuration={6000} message={error} >
            <Alert severity="error" variant="filled" sx={{ width: '100%' }} >
                {error}
            </Alert>
        </Snackbar>
        </>
    );
}