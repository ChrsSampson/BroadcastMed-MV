// user list item for edit list
import {Box, Button, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export default function ({user, onClick, index}: {user: any, onClick: Function, index: number}) {

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
                border: '1px solid lightgrey',
                padding: '1em',
                borderRadius: '1em',
                marginBottom: '.5em'
            }}
            key={index}
        >
            <Typography style={{color: 'black'}} variant="h5" component="h1">
                {user.displayName ? user.displayName : user.email}
            </Typography>
            <Box sx={{
                display: 'flex'
            }}>
                <Typography style={{color: 'black'}} variant="subtitle1" component="h1">
                    Last Updated: { user.lastUpdated ? date(user.lastUpdated) : 'Never'}
                </Typography>
                <Button onClick={() => onClick(user)} >
                    <EditIcon />
                </Button>
            </Box>
        </Box>
    )
}