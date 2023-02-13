// edit form component
import {Box, TextField, Button, Typography, Modal, Select, MenuItem, Switch, FormControlLabel} from '@mui/material';
import {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function ({data, open, mode, closeModal} : {data: any, mode: Number, open: Boolean, closeModal: Function}) {

    const [name, setName] = useState<String>('');
    const [email, setEmail] = useState<String>('');

    const [category, setCategory] = useState<String>('');
    const [link, setLink] = useState<String>('');
    const [encoderName, setEncoderName] = useState<String>('');
    const [role, setRole] = useState<Boolean>(false);

    // mode 0 = user, mode 1 = machine

    function handleUserEdit (e: React.SyntheticEvent) {
        e.preventDefault();
        console.log('edit user');
    }

    function handleMachineEdit (e: React.SyntheticEvent) {
        e.preventDefault();
        console.log('edit machine');
    }

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
                        borderRadius: '1em',
                        padding: '1em',
                        boxShadow: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                    }}
                >
                    <Box
                        sx ={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h4" component="h1" sx={{color: 'black'}}>
                            Edit {mode === 0 ? 'User' : 'Machine'}
                        </Typography>
                        <Button variant='contained' color="error" onClick={() => closeModal()}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    <form
                        onSubmit={mode === 0 ? handleUserEdit : handleMachineEdit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '1em',
                            gap:'1em'
                        }}
                    >
                        {
                            mode === 0 ?
                            <>
                                <TextField
                                    label="Display Name"
                                    variant="outlined"
                                    defaultValue={''}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    defaultValue={''}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FormControlLabel sx={{color: 'black'}} control={<Switch onChange={() => setRole(!role)}  />} label="Administrator Privledges" labelPlacement="end" />
                            </>
                            :
                            <>
                                <TextField
                                    label="Machine Name"
                                    variant="outlined"
                                    defaultValue={data.name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    label="Link"
                                    variant="outlined"
                                    defaultValue={data.link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                                <Select
                                    displayEmpty
                                    labelId="Category"
                                    id="Category"
                                    value={data.tag}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <MenuItem value="untagged">Untagged</MenuItem>
                                    <MenuItem value="Desktop Encoder">Desktop Encoder</MenuItem>
                                    <MenuItem value="Laptop Encoder">Laptop Encoder</MenuItem>
                                    <MenuItem value="Radius">Radius</MenuItem>
                                    <MenuItem value="Enclosure">Enclosure</MenuItem>

                                </Select>
                            </>
                        }

                        <Button variant="contained" type="submit">Submit</Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}