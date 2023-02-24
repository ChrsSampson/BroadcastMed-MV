import {Box, Tab, Tabs, Typography, Backdrop, CircularProgress, TextField, Paper} from '@mui/material'
import {useState, useEffect} from 'react'
import EditList from '@/components/EditList'
import EditForm from '@/components/EditForm'
import axios from 'axios';
import { Refresh } from '@mui/icons-material';


// ---------------Warning: Dumper fire----------------
export default function EditWidget () {

        const [machines, setMachines] = useState<Array<any>>([]);
        const [users, setUsers] = useState<Array<any>>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<String>('');
        const [search, setSearch] = useState<string>('');
        const [filteredMachines, setFilteredMachines] = useState<Array<any>>([...machines]);
        const [filteredUsers, setFilteredUsers] = useState<Array<any>>([...users]);
        const [open, setOpen] = useState(false);
        const [modalData, setModalData] = useState<any>(null);
        const [tab, setTab] = useState<Number>(0);

        async function requestData () {
            try{
                const machines = axios.get('/api/machines');
                const users = axios.get('/api/users');
                
                setUsers( (await users).data.data);
                setMachines( (await machines).data.data);

            } catch (err: any) {
                console.log('Error', err.data);
                setError(err.data);
            }
        }  

        function openModal (data: any) {
            setModalData(data);
            setOpen(true);
        }

        function closeModal () {
            setOpen(false);
            setModalData(null);
        }

        function changeTab(e: React.SyntheticEvent, value: number) {
            clearSearch();
            setTab(value);
        }

        function clearSearch () {
            setSearch('');
            setFilteredMachines([...machines]);
            setFilteredUsers([...users]);
        }

        function refresh () {
            clearSearch();
        }

        function handleSearch (value: string) {
            setSearch(value);

            // filter machines
            if(tab) {
                if(!value) {
                    setFilteredMachines(machines);
                    return;
                }

                const filteredMachines = machines.filter((machine: any) => {
                    return machine.name.toLowerCase().includes(value.toLowerCase());
                });

                setFilteredMachines(filteredMachines);
            } else {
                if(!value) {
                    setFilteredUsers(users);
                    return;
                }

                const filteredUsers = users.filter((user: any) => {
                    return user.displayName.toLowerCase().includes(value.toLowerCase());
                });

                setFilteredUsers(filteredUsers);
            }
        }    
        

        function doListShit () {
            if(tab) {
                return (
                    <EditList
                        items={filteredMachines}
                        mode={1}
                        openModal={openModal}
                    />
                )
            } else {
                return (
                    <EditList
                        items={filteredUsers}
                        mode={0}
                        openModal={openModal}
                    />
                )
            }
        }

        useEffect( () => {
            try{
                setLoading(true); 

                requestData()
                    .then(() => {
                        setLoading(false);
                    })
            } catch (err: any) {
                console.log('Error', err);
                setError(err);
                setLoading(false);
            }
        }, []);

        useEffect( () => {
            refresh();
        }, [users, machines])    

    return (
        <>
            <Paper 
                sx={{
                    borderRadius: '1rem',
                    padding: '1rem',
                    minWidth: '31rem',
                    maxWidth: '70rem',
                    maxHeight: '90vh',
                    overflowY: 'scroll',
                }}
                elevation={3}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Typography style={{color: 'black'}} variant="h4" component="h1">
                        Edit
                    </Typography>
                    <TextField placeholder="Filter" value={search} onChange={(e) => handleSearch(e.target.value)} />
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
                        onChange={changeTab}
                    >
                        <Tab value={0} label="Users" />
                        <Tab value={1} label="Encoders" />
                    </Tabs>
                </Box>
                {loading ?
                    <Box sx={{
                        display: 'grid',
                        placeItems: 'center',
                        height: '70%',
                    }}>
                        <CircularProgress size={90} color="primary" />
                    </Box>
                    :
                    doListShit()
                }
            </Paper>
            {open ? <EditForm data={modalData} open={open} closeModal={closeModal} mode={tab} refresh={refresh} /> : null}
        </>
    )
}