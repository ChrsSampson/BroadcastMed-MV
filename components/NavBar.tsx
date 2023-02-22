// navigation bar
import UserBug from "./UserBug";
import { Button, Box, Typography, AppBar, IconButton, Toolbar, Tooltip, Link } from "@mui/material";
import Image from "next/image";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function (props: any) {

    return (
        <AppBar
            position="static"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                backgroundColor: 'transparent',
                color: 'white',
            }}
        >
            <Toolbar
                sx={{
                    backgroundColor: '#0B86DB',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '.5rem',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    { props.openDrawer &&
                        <Tooltip title="Open Menu">
                            <IconButton
                                onClick={() => props.openDrawer()}
                                size="small"
                            >
                                <MenuOpenIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                    <Link href="/app">
                        <Image alt="logo" src="/icon.ico" style={{border: '1px solid white', borderRadius: '.5em'}} width={40} height={40} />
                    </Link>
                    <Typography variant="h6" component="h1" sx={{}}>{ props.title ? props.title : 'Multiviewer' }</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    <UserBug user={props.user}/>
                </Box>
            </Toolbar>
        </AppBar>
    )
}