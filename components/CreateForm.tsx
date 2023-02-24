// form component for create recourses like users or encoders


import { useState, useEffect } from "react";
import {Box, Button, TextField, Switch, FormGroup, FormControlLabel, Select, MenuItem} from '@mui/material';
import axios from 'axios';


export default function ({mode, setAlert}: {mode: number, setAlert: (msg: string, sev: string) => void}) {

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [displayName, setDisplayName] = useState<String>('');
    const [role, setRole] = useState<Boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<String>('');

    const [name, setName] = useState<String>('');
    const [link, setLink] = useState<String>('');
    const [category, setCategory] = useState<String>('');

    function handleUserSubmit (e: any) {
        e.preventDefault();

        if(password !== confirmPassword) return alert('Passwords do not match!')

        axios.post('/api/users', {
            username: email,
            password,
            displayName,
            role: role  ? 'admin' : 'user'
        })
        .then(res => {
            setEmail('')
            setPassword('')
            setDisplayName('')
            setRole(false)
            setAlert('User Created', 'success')
        })
        .catch(err => {
            console.log(err);
            setAlert('Something went wrong', 'error')
        });
    }

    const handleEncoderSubmit = (e: any) => {
        e.preventDefault();

        axios.post('/api/machines', {
            name,
            link,
            tag: category
        })
        .then(res => {
            setName('')
            setLink('')
            setCategory('')
            alert(res.data.message)
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (mode === 1) {
        return (
            <Box>
                <form 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em'
                    }} 
                    onSubmit={handleEncoderSubmit}
                >
                    <TextField label="Name" onChange={(e) => setName(e.target.value) } />
                    <TextField label="Link" onChange={(e) => setLink(e.target.value)} />
                    <Select
                        displayEmpty
                        labelId="Category"
                        id="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="">No Category</MenuItem>
                        <MenuItem value="Desktop Encoder">Desktop Encoder</MenuItem>
                        <MenuItem value="Laptop Encoder">Laptop Encoder</MenuItem>
                        <MenuItem value="Radius">Radius</MenuItem>
                        <MenuItem value="Enclosure">Enclosure</MenuItem>

                    </Select>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        )
    } else {
        return (
            <Box>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em'
                    }}
                    onSubmit={handleUserSubmit}
                >
                    <TextField label="Name" onChange={(e) => setDisplayName(e.target.value)} />
                    <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
                    <TextField required={true} label="Password" type="password" onChange={(e) => setPassword(e.target.value) } />
                    <TextField required={true} label="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <FormControlLabel sx={{color: 'black'}} control={<Switch onChange={() => setRole(!role)}  />} label="Administrator Privledges" labelPlacement="end" />
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        )
    }
}