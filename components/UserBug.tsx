// user Bug

import {Box, Button} from '@mui/material'
import {useRouter} from 'next/router'
import axios from 'axios'

interface Props {
    user: {
        email: string,
        displayName: string,
    },
}

export default function UserBug(props: Props) {
    const router = useRouter()

    const logout = () => {
        axios.post('/api/auth/logout')
        .then(res => {
            router.push('/login')
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
            alert('Error logging out. Please try again later.')
        })
    }

    return(
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '1rem',
            border: '1px solid black',
            maxWidth: '15em'
        }}>
            <h2 style={{color: 'black'}}>{props.user.email}</h2>
            <Button 
                variant='contained'
                color='info'
                onClick={() => logout()}>
                    Logout
            </Button>
        </Box>
    )
}