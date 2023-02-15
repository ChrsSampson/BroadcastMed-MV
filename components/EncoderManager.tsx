// the button box that lives inside the viewer side bar that holds, and filters encoder buttons

import {Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ({encoders, tag, addEncoder}: {encoders: Object[], tag: string, addEncoder: Function}) {

    const [filter, setFilter] = useState<string>('')
    const [filteredEncoders, setFilteredEncoders] = useState<Object[]>(encoders)

    function handleFilter(value: string){
        if(!value) {
            setFilteredEncoders(encoders)
            setFilter(value)
            return
        }
        setFilter(value)
        applyFilter()
    }

    function applyFilter () {
        let filtered = encoders.filter((encoder: any) => {
            return encoder.name.toLowerCase().includes(filter.toLowerCase())
        })

        setFilteredEncoders(filtered)
    }

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
                        onChange={(e) => handleFilter(e.target.value)}
                    />
                </Box>
                <Box>
                    {filteredEncoders.length ? filteredEncoders.map((encoder: any) => {
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

