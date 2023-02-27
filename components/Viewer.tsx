// components to display frames selected by the user

import {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography, Paper} from '@mui/material';
import Frame from "@/components/Frame";
import IssueForm from './IssueForm';


interface UserProps {
    _id: string,
    email: string,
    displayName: string
}

export default function Viewer(
    {selectedEncoders, removeEncoder, clearViewer, user, setAlert} : 
    {selectedEncoders: Object[], removeEncoder: Function, clearViewer: Function, user: UserProps, setAlert: Function}
    ) {

    const [machines, setMachines] = useState([]);
    // number of columns in the grid
    const [layout, setLayout] = useState<Number>(1);

    const [openIssue, setOpenIssue] = useState<boolean>(false);
    const [issueData, setIssueData] = useState<any>({});

    function getColumns () {
        let columns = ''

        for(let i = 0; i < layout; i++) {
            columns += '1fr '
        }

        return columns
    }

    function handleOpenIssue(encoder: object) {
        setIssueData(encoder)
        setOpenIssue(true)
    }

    function handleCloseIssue() {
        setOpenIssue(false)
        setIssueData({})
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    margin: '.5rem',
                    padding: '0 .25rem',
                    border: '1px solid lightgrey',
                    borderRadius: '5px',
                    maxWidth: '21.3rem',
                    gap: '.5rem'
                }}
                elevation={3}
            >
                <Typography>Layout</Typography>
                <Button variant={layout === 1 ? 'outlined' : 'text'} onClick={() => setLayout(1)}>1</Button>
                <Button variant={layout === 2 ? 'outlined' : 'text'} onClick={() => setLayout(2)}>2</Button>
                <Button variant={layout === 3 ? 'outlined' : 'text'} onClick={() => setLayout(3)}>3</Button>
                <Button variant={layout === 4 ? 'outlined' : 'text'} onClick={() => setLayout(4)}>4</Button>
                <Button variant='contained' color="error" onClick={() => clearViewer()}>Clear</Button>
            </Paper>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: getColumns(),
                }}
            >
                {
                    selectedEncoders.length ? selectedEncoders.map((encoder: any) => {
                        return <Frame encoder={encoder} removeEncoder={removeEncoder} handleOpenIssue={handleOpenIssue} />
                    }) : null
                }
            </Box>
            <IssueForm open={openIssue} encoder={issueData} close={handleCloseIssue} user={user} setAlert={setAlert} />
        </Box>
    )
}