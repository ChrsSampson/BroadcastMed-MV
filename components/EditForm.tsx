// edit form component
import {Box, TextField, Button, Typography, Modal, Select, MenuItem, Switch, FormControlLabel, Toolbar, Dialog, DialogTitle, DialogContent} from '@mui/material';
import {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'

export default function ({data, open, mode, closeModal, refresh} : {data: any, mode: Number, open: boolean, closeModal: Function, refresh: Function}) {

    const [name, setName] = useState<String>(data.displayName || '');
    const [email, setEmail] = useState<String>(data.email || '');

    const [category, setCategory] = useState<String>(data.tag || '');
    const [link, setLink] = useState<String>(data.link || '');
    const [encoderName, setEncoderName] = useState<String>(data.name || '');
    const [role, setRole] = useState<boolean>(data.role === 'admin' ? true : false);

    const [error, setError] = useState<String>('');

    const [showDialog, setShowDialog] = useState<boolean>(false);

    // mode 0 = user, mode 1 = machine

    async function handleUserEdit (e: React.SyntheticEvent) {
        e.preventDefault();
        const id = data._id;
        if(!id){
            setError('Missing document ID, try logging out and back in.')
        } else {
            try{
                const r = await axios.put('http://localhost:3000/api/users/' + id, {
                    displayName: name,
                    username: email,
                    role: role ? 'admin' : 'user'
                })
                closeModal();
                refresh();
            } catch (err: any) {
                console.error(err)
                setError(err.response.data.message)
            }
        }
    }

    async function handleMachineEdit (e: React.SyntheticEvent) {
        e.preventDefault();
        const id = data._id;
        if(!id){
            setError('Missing document ID, try logging out and back in.')
        } else {
            try{
                const r = await axios.put('http://localhost:3000/api/machines/' + id, {
                    name: encoderName,
                    link: link,
                    tag: category
                })
                closeModal();
                refresh();
            } catch (err: any) {
                console.error(err)
                setError(err.response.data.message)
            }
        }
    }

    async function handleUserDelete (e: React.SyntheticEvent) {
        e.preventDefault();
        const id = data._id;
        if(!id){
            setError('Missing document ID, try logging out and back in.')
        } else {
            try{
                const r = await axios.delete('http://localhost:3000/api/users/' + id);
                closeModal();
                refresh();
            } catch (err: any) {
                console.error(err)
                setError(err.response.data.message)
            }
        }
    }

    async function handleMachineDelete (e: React.SyntheticEvent) {
        e.preventDefault();
        const id = data._id;
        if(!id){
            setError('Missing document ID, try logging out and back in.')
        } else {
            try{
                const r = await axios.delete('http://localhost:3000/api/machines/' + id);
                closeModal();
                refresh();
            } catch (err: any) {
                console.error(err)
                setError(err.response.data.message)
            }
        }
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
                    <Toolbar
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
                    </Toolbar>
                    { error ? <Typography style={{color: 'red'}} variant="h5" component="h1">{error}</Typography> : null }
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
                                    defaultValue={data.displayName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    defaultValue={data.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FormControlLabel
                                    sx={{color: 'black'}}
                                    control={<Switch defaultChecked={data.role === 'admin' ? true : false} onChange={() => setRole(!role)}  />}
                                    label="Administrator Privledges"
                                    labelPlacement="end"
                                />
                            </>
                            :
                            <>
                                <TextField
                                    label="Machine Name"
                                    variant="outlined"
                                    defaultValue={data.name}
                                    onChange={(e) => setEncoderName(e.target.value)}
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
                                    value={category}
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
                        <Button variant="contained" color="error" onClick={() => setShowDialog(true)}>Delete</Button>
                    </form>
                    <Dialog
                        open={showDialog}
                    >
                        <DialogTitle>
                            Delete {mode === 0 ? data.email : data.name }?
                        </DialogTitle>
                        <DialogContent
                            sx={{
                                display: 'flex',
                                gap: '1em',
                            }}
                        >
                            <Button 
                                variant="contained"
                                color="error"
                                onClick={mode === 0 ? handleUserDelete : handleMachineDelete}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={() => setShowDialog(false)}
                                variant="contained"
                            >
                                No
                            </Button>
                        </DialogContent>
                    </Dialog>
                </Box>
            </Box>
        </Modal>
    )
}