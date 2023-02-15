// the button box that lives inside the viewer side bar that holds, and filters encoder buttons

import {Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ({encoders, tag, addEncoder}: {encoders: Object[], tag: string, addEncoder: Function}) {

        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant="h6">{tag}</Typography>
                </AccordionSummary>
                <Box sx={{
                    border: '1px solid lightgrey',
                    borderRadius: '5px',
                    margin: '.5rem',
                    padding: '.5rem'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '.25rem',
                        borderBottom: '1px solid lightgrey',
                    }}>
                        <TextField 
                            placeholder="Filter"
                            size="small"
                        />
                    </Box>
                    <Box>
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
                </Box>
            </Accordion>
        )

}

