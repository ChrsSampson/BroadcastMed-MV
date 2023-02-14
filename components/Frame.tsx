// frame to display ping plotter

import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";

interface Encoder{
    name: string,
    link: string,
    tag: string,
    _id: string
}

export default function ({encoder, removeEncoder} : {encoder: Encoder, removeEncoder: Function}) {

    const [collapse, setCollapse] = useState<boolean>(false)

    return (
        <Box
            sx={{
                border: '1px solid lightgrey',
                borderRadius: '5px',
                margin: '.5rem',
                height: '20em',
                overflow: 'hidden'
            }}
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
                    <Typography color="white" variant="h6">{encoder.name}</Typography>
                    <Button color="error" variant="contained" onClick={() => removeEncoder(encoder._id)}>Remove</Button>
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
        </Box>
    )
}