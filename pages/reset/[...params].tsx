
import {Box, Button, TextField, Typography, Alert, Snackbar} from '@mui/material';
import {useState} from "react" ;
import axios from  "axios" ;
import Image from "next/image";
import Link from "next/link";


export async function getServerSideProps(context: any) {
    // get the userId and token from the url params

    const [userId, token] = context.params.params;




    // check if itd and token are in params
    if(!userId || !token) {
        return {
            notFound: true
        }
    }

    try{
    // check if the token is valid
    const result = await axios.get(`http://localhost:3000/api/auth/reset/${userId}/${token}`);

        if(result.data.status !== 200) {
            console.log(result.data)
            return {
                props: {
                    propError: result.data.message
                }
            }
        }

        return {
            props: {
                userId,
                token
            }
        }

    } catch (err) {
        console.log(err);
        return {
            notFound: true
        }
    }
} 

export default function ({userId, token, propError}: {userId: string, token: string, propError: string}) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(propError ? propError : '');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(e:any) {
        e.preventDefault();
        if(password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        axios.post(`/api/auth/reset/${userId}/${token}`, {
            password
        })
        .then(res => {
            setMessage('Your password has been reset, You can now login with your new password.')
        })
        .catch(err => {
            console.log(err.data.error);
            setError('Something Went Wrong')
        });   
    }

    // login the user after they have reset their password
    function handleLogin() {
       
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
                    display: 'grid',
                    placeItems: 'center',
                    padding: '2em'
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
                        label="New Password"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        error={error ? true : false}
                        variant='outlined'
                        label="Confirm Password"
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button variant='contained' type="submit" disabled={loading}>Submit</Button>
                    <Typography variant='h6' align="center">
                        <Button>
                            <Link href="/login">
                               Cancel
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