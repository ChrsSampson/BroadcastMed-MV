// edit form component
import {Box, TextField, Button, Typography, Modal} from '@mui/material'
import {useState} from 'react'

export default function ({data,open, mode} : {data: any, mode: Number, open: Boolean}) {
    return (
        <Modal open={open}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                padding: '1em'
            }}>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                <Typography variant="h4" component="h1" sx={{color: 'black'}}>
                    Edit {mode === 1 ? 'Machine' : 'User'}
                </Typography>
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField />
                        <TextField />
                        <TextField />
                        <Button type="submit">Submit</Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}