// the button box that lives inside the viewer side bar that holds, and filters encoder buttons

import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ({encoders, tag, addEncoder}: {encoders: Object[], tag: string, addEncoder: Function}) {

    const [collapse, setCollapse] = useState<boolean>(true)

    if(!collapse) {
        return (
            <Box sx={{
                border: '1px solid lightgrey',
                borderRadius: '5px',
                margin: '.5rem',
                padding: '.5rem'
            }}>
                <Box>
                    <Button onClick={() => setCollapse(!collapse)}>
                        <Typography variant="overline">Hide</Typography>
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '.25rem',
                    borderBottom: '1px solid lightgrey',
                }}>
                    <Typography variant="h6">{tag}</Typography>
                    <TextField placeholder="Filter" />
                </Box>
                {encoders.length ? encoders.map((encoder: any) => {
                    return <Button
                                key={encoder.name}
                                variant="contained"
                                sx={{margin: '.25rem'}}
                                onClick={() => addEncoder(encoder)}
                            >
                                {encoder.name}
                            </Button>
                })
                :
                    <Typography variant="overline">No Encoders</Typography>
                }
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    border: '1px solid lightgrey',
                    borderRadius: '5px',
                    margin: '.5rem',
                    padding: '.5rem'
                }}
                onClick={() => setCollapse(!collapse)}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6">{tag}</Typography>
                    <ExpandMoreIcon />
                </Box>
            </Box>
        )
    }
}

