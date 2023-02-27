// form for creating new issue

import {useState} from 'react'
import {Box, Button, TextField, Typography, Paper, Modal, Select, MenuItem, InputLabel, Toolbar} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import axios from 'axios';


interface UserProps {
    email: string,
    _id: string,
    displayName: string
}

interface EncoderProps {
    _id: string,
    name: string,
    link: string,
    tag: string
}

// open and close control the modal state
export default function IssueForm({open, close, encoder, setAlert}: {open: boolean, close: Function, encoder: EncoderProps, user: UserProps, setAlert: Function}){
    
    const [issue, setIssue] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    async function handleSubmit (e: React.SyntheticEvent) {
        e.preventDefault();
        try{

            if( (issue === 'Other' && !description) ) throw new Error('Please fill out all required fields')

            const res = await axios.post('/api/issues', {
                issue,
                description,
                email: user.email,
                user: user._id,
                machine: encoder._id
            })

            close()

            setAlert('Issue submitted successfully')
        } catch (err: any) {
            setAlert(err.message)
            console.log(err)
        }
    }

    return (
        <Modal open={open}>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center'
                }}
            >
                <Paper
                    sx={{
                        padding: '1rem',
                        borderRadius: '1rem',
                        minWidth: '30rem',
                    }}
                    elevation={5}
                >
                    <form 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            height: '100%',
                            justifyContent: 'space-between'
                        }}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Toolbar
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: '1rem',
                            }}
                        >
                            <Typography variant="h5">
                                <ReportProblemIcon color="warning" /> {encoder.tag} {encoder.name}
                            </Typography>
                            <Button onClick={() => close()} variant="contained" color="error">
                                <CloseIcon />
                            </Button>
                        </Toolbar>

                        <Typography variant="subtitle2" align='center'>
                            Submiting this form will submit a ticket for review by IT.
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5rem'
                            }}
                        >
                            <InputLabel id="issue-label">Type of Issue</InputLabel>
                            <Select required label="Type of Issue" labelId='issue-label' displayEmpty value={issue} onChange={(e) => setIssue(e.target.value)}>
                                <MenuItem value=''>Select Issue</MenuItem>
                                <MenuItem value='Expired Link'>Expired Link</MenuItem>
                                <MenuItem value="Incorrect Info">Link Broken</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </Box>
                        
                        {
                            issue === 'Other' ?
                                <Textarea
                                    minRows={3}
                                    required
                                    color="primary"
                                    placeholder="Describe the problem you are having."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            : null
                        }

                        {
                            issue !== '' ?
                                <Button variant="contained" color="primary" type="submit">Submit</Button>
                            : null
                        }
                    </form>
                </Paper>
            </Box>
        </Modal>
    )


}