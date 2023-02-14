// navigation bar
import UserBug from "./UserBug";
import { Button, Box, Typography } from "@mui/material";
import Image from "next/image";

export default function (props: any) {

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '.5rem',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
            }}>
                <Image alt="logo" src="/icon.ico" width={40} height={40} />
                <Typography variant="h6" component="h1" sx={{}}>Multiviewer</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
            }}>
                {props.user.role === 'admin' ? <Button href="/dashboard" variant="text">Dashboard</Button> : null}
                <UserBug user={props.user}/>
            </Box>
        </Box>
    )
}