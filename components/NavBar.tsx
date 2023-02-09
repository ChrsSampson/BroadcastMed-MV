// navigation bar 
import UserBug from "./UserBug";
import { Button, Box } from "@mui/material";

export default function (props: any) {

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1rem',
            padding: '.5rem',
        }}>
            {props.user.role === 'admin' ? <Button href="/dashboard" variant="contained">Dashboard</Button> : null}
            <UserBug user={props.user}/>
        </Box>
    )
}