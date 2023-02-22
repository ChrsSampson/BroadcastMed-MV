// user Bug

import {Box, Button, Menu, Typography, Grow, Paper, IconButton, Tooltip, MenuItem, ClickAwayListener} from '@mui/material'
import {Fab} from '@mui/material'
import {useRouter} from 'next/router'
import {useState} from 'react'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    user: {
        email: string,
        displayName: string,
        role: string
    },
}

export default function UserBug(props: Props) {
    const router = useRouter()

    const [collapsed, setCollapsed] = useState<boolean>(true)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

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

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        if(!collapsed) {
            setAnchorEl(event.currentTarget);
            setCollapsed(true)
        } else {
            setCollapsed(false)
            setAnchorEl(event.currentTarget);
        }
        
    }

    return(
        <>
        <Tooltip title="Account">
            <IconButton 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    maxWidth: '15em'
                }}
                size="medium"
                onClick={(e) => handleClick(e)}
            >
                <AccountCircleIcon fontSize='medium' />
            </IconButton>
        </Tooltip>
                <Menu 
                    open={!collapsed}
                    anchorEl={anchorEl}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            }
                        }
                    }}
                >
                    <MenuItem>
                        <PersonIcon />
                        <Typography
                            sx={{
                                color: 'black',
                            }}
                        >
                            {props.user.displayName ? props.user.displayName : props.user.email}
                        </Typography>
                    </MenuItem>
                    {
                        props.user.role === 'admin' ?
                        <MenuItem onClick={() => router.push('/dashboard')}>
                            <DashboardIcon/> Dashboard
                        </MenuItem>
                        :
                        null
                    }
                    <MenuItem onClick={() => logout()}>
                        <LogoutIcon /> Logout
                    </MenuItem>
                    <MenuItem onClick={() => setCollapsed(true)}>
                        <CloseIcon /> Close Menu
                    </MenuItem>
                </Menu>
        </>
    )
}