// user list item for edit list
import {Box, Button, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export default function ({user, onClick}: {user: any, onClick: Function}) {

    const date = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'lightgrey',
                padding: '1em',
                borderRadius: '1em',
            }}
        >
            <Typography style={{color: 'black'}} variant="h5" component="h1">
                {user.displayName ? user.displayName : user.email}
            </Typography>
            <Box sx={{
                display: 'flex'
            }}>
                <Typography style={{color: 'black'}} variant="h5" component="h1">
                    Last Updated: { user.lastUpdated ? date(user.lastUpdated) : 'Never'}
                </Typography>
                <Button onClick={() => onClick(user)} >
                    <EditIcon />
                </Button>
            </Box>
        </Box>
    )
}