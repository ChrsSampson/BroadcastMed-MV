// components to display frames selected by the user

import {useEffect, useState} from 'react';
import {Box, Button, TextField} from '@mui/material';
import axios from 'axios';

export default function Viewer() {

    const [machines, setMachines] = useState([]);

    useEffect(() => {
        axios.get('/api/machines')
        .then(res => {
            setMachines(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
        <Box>
            <h1>Viewer</h1>
        </Box>

        </Box>
    )
}