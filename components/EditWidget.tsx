import {Box, Tab, Tabs, Typography, Backdrop, CircularProgress, TextField} from '@mui/material'
import {useState, useEffect} from 'react'
import axios from 'axios'
import EditList from '@/components/EditList'

export default function EditWidget ({openModal} : {openModal: Function}) {

    const [tab, setTab] = useState<Number>(0);
    const [loading, setLoading] = useState<Boolean>(false);
    const [machines, setMachines] = useState<Array<any>>([]);
    const [users, setUsers] = useState<Array<any>>([]);
    const [error, setError] = useState<String>('');
    const [search, setSearch] = useState<String>('');

    useEffect(() => {
        populateState();
    }, [])

    // get all machines and all users and mount them in state
    async function populateState () {
        setLoading(true);
        try{
            const machines = await axios.get('/api/machines');
            const users = await axios.get('/api/users');
            setMachines([...machines.data.data]);
            setUsers([...users.data.data]);
            setLoading(false);
        } catch (err: any) {
            console.error(err);
            setError(err.response.data.message);
            setLoading(false);
        }
    }

    function handleChange (e: React.SyntheticEvent, value: Number) {
        setTab(value);
    }

    return (
        <Box sx={{
            border: '1px solid black',
            borderRadius: '1rem',
            padding: '1rem',
            minWidth: '50rem',
            maxWidth: '70rem'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Typography style={{color: 'black'}} variant="h4" component="h1">
                    Edit
                </Typography>
                <TextField placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            </Box>
            {error ? <Typography style={{color: 'red'}} variant="h5" component="h1">{error}</Typography> : null}
            <Box
                sx={{
                    paddingBottom: '1em'
                }}
            >
                <Tabs
                    value={tab}
                    indicatorColor="primary"
                    onChange={handleChange}
                >
                    <Tab value={0} label="Users" />
                    <Tab value={1} label="Encoders" />
                </Tabs>
            </Box>
            <Box>
                    <EditList openModal={openModal} mode={tab} items={tab === 0 ? users : machines} />
            </Box>
        </Box>
    )
}