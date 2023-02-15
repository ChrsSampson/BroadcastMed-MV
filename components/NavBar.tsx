// navigation bar
import UserBug from "./UserBug";
import { Button, Box, Typography, AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
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
                    <Tooltip title="Open Menu">
                        <IconButton
                            onClick={() => props.openDrawer()}
                            size="small"
                        >
                            <MenuOpenIcon/>
                        </IconButton>
                    </Tooltip>
                    <Image alt="logo" src="/icon.ico" width={40} height={40} />
                    <Typography variant="h6" component="h1" sx={{}}>Multiviewer</Typography>
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