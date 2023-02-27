// frame to display ping plotter

import {Box, Button, TextField, Typography, Paper} from "@mui/material";
import {useState} from "react";

interface Encoder{
    name: string,
    link: string,
    tag: string,
    _id: string
}

export default function ({encoder, removeEncoder, handleOpenIssue} : {encoder: Encoder, removeEncoder: Function, handleOpenIssue: Function}) {

    const [collapse, setCollapse] = useState<boolean>(false)

    return (
        <Paper
            sx={{
                borderRadius: '.5rem',
                margin: '.5rem',
                height: '35em',
                overflow: 'hidden'
            }}
            elevation={3}
            onMouseLeave={() => setCollapse(false)}
            onMouseEnter={() => setCollapse(true)}
        >
            {/* header */}
            {collapse ?
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '.5rem',
                    backgroundColor: '#0B86DB'
                }}>
                    <Typography color="white" variant="h6">{encoder.tag} {encoder.name}</Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: '.5rem'
                    }}>
                        <Button color="warning" variant="contained" onClick={() => handleOpenIssue(encoder)}>Report Issue</Button>
                        <Button color="error" variant="contained" onClick={() => removeEncoder(encoder._id)}>Remove</Button>
                    </Box>
                </Box>
            :null
            }
            <iframe
                style={{
                    border: 'none',
                    borderRadius: '0 0 5px 5px',
                }}
                title={encoder.name}
                src={encoder.link}
                width="100%"
                height="100%"
            >
                <p>Your browser does not support iframes.</p>
            </iframe>
        </Paper>
    )
}