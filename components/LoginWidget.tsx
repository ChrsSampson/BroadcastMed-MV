import {useState} from 'react';
import axios from 'axios';
import {Box, TextField, Button} from '@mui/material'

interface SubmitEvent {
    (username: string, password: string): Promise<void>
}

export default function LoginWidget({onSubmit}: {onSubmit: SubmitEvent}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await onSubmit(username, password)
        } catch (err) {
            console.log(err);
            setError('Incorrect email or password.');
        }
        setLoading(false);
    };

    return (
        <>
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant='filled'
                    label="Email"
                    value={username}
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    variant='filled'
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button variant='contained' type="submit" disabled={loading}>Login</Button>
            </form>
            {error && <p>{error}</p>}
        </Box>
        </>
    );
}