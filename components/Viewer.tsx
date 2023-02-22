// components to display frames selected by the user

import {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import Frame from "@/components/Frame";

export default function Viewer(
    {selectedEncoders, removeEncoder, clearViewer} : 
    {selectedEncoders: Object[], removeEncoder: Function, clearViewer: Function}
    ) {

    const [machines, setMachines] = useState([]);
    // number of columns in the grid
    const [layout, setLayout] = useState<Number>(1);


    function getColumns () {
        let columns = ''

        for(let i = 0; i < layout; i++) {
            columns += '1fr '
        }

        return columns
    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '.5rem',
                    padding: '0 .25rem',
                    border: '1px solid lightgrey',
                    borderRadius: '5px',
                    maxWidth: '21.3rem',
                    gap: '.5rem'
                }}
            >
                <Typography>Layout</Typography>
                <Button variant={layout === 1 ? 'outlined' : 'text'} onClick={() => setLayout(1)}>1</Button>
                <Button variant={layout === 2 ? 'outlined' : 'text'} onClick={() => setLayout(2)}>2</Button>
                <Button variant={layout === 3 ? 'outlined' : 'text'} onClick={() => setLayout(3)}>3</Button>
                <Button variant={layout === 4 ? 'outlined' : 'text'} onClick={() => setLayout(4)}>4</Button>
                <Button variant='contained' color="error" onClick={() => clearViewer()}>Clear</Button>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: getColumns(),
                }}
            >
                {
                    selectedEncoders.length ? selectedEncoders.map((encoder: any) => {
                        return <Frame encoder={encoder} removeEncoder={removeEncoder} />
                    }) : null
                }
            </Box>

        </Box>
    )
}