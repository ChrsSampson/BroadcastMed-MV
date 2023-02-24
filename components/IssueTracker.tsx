// issue tracking component

import {Box, Typography} from '@mui/material'

export default function () {
    return (
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '1rem',
                padding: '1rem',
                border: '1px solid black',
                borderRadius: '1rem',
            }}
        >
            <Typography variant="h4" component="h1" sx={{color: 'black'}}>Issue Tracker</Typography>
        </Box>
    )
}