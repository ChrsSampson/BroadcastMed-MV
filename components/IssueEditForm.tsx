
import {Box, Button, TextField, Typography, Modal, Paper, Select, MenuItem, FormControl, InputLabel} from '@mui/material'
import {Textarea} from '@mui/joy'
import {useEffect, useState} from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';

export default function IssueEditForm (props: any) {

    const [status, setStatus] = useState<string>(props.issue.status)
    const [description, setDescription] = useState<string>(props.issue.description)

    async function handleSubmit (e: React.SyntheticEvent) {
        e.preventDefault();
        try{

            const res = await axios.put(`api/issues/${props._id}`, {
                status: status,
                description: description,
                lastUpdated: new Date( Date.now() )
            })

            props.handleCloseModal()
        } catch (err: any) {

            console.log(err)
        }   

    }


    return (
        <Modal open={props.open}>
            <Box 
                sx={{
                    height: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <Paper
                    sx={{
                        minWidth: '20%',
                        borderRadius: '1rem',
                        padding: '2rem',
                    }}
                    elevation={5}
                >
                    <form 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h4" component="h1">Edit Issue</Typography>
                            <Button color="error" variant="contained" onClick={() => props.handleCloseModal()}>
                                <CloseIcon />
                            </Button>
                        </Box>
                        <FormControl sx={{
                            minWidth: '5rem',
                        }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                disabled={true}
                                value={props.issue.status}
                                onChange={(e) => setStatus(e.target.value as string)}
                                label="Status"
                                autoWidth
                            >
                                <MenuItem value="Open">Open</MenuItem>
                                <MenuItem value="Closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                        <Box>
                            <InputLabel>Issue Description</InputLabel>
                            <Textarea value={props.issue.description} disabled={true} onChange={(e) => setDescription(e.target.value)} placeholder="There is nothing here" />
                        </Box>
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </form>
                </Paper>
            </Box>
        </Modal>
    )
}