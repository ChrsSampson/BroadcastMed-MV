// list item for edit list
import {Box, Button, Typography, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export default function ({item, onClick}: {item: any, onClick: Function}) {

    const date = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    }

    return (
        <Box sx={{
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
        >
            <Typography style={{color: 'black'}} variant="h5" component="h1">
                {item.tag} {item.name}
            </Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography style={{color: 'black'}} variant="subtitle1" component="h1">
                    Last Updated {date(item.lastUpdated)}
                </Typography>
                <IconButton
                    onClick={() => onClick(item)} 
                    color='primary'
                >
                    <EditIcon />
                </IconButton>
            </Box>
        </Box>
    )
}