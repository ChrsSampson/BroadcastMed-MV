import {Box, Tab, Tabs, Typography, Backdrop, CircularProgress, TextField} from '@mui/material'
import {useState, useEffect} from 'react'
import EditList from '@/components/EditList'

export default function EditWidget (
    {
        openModal,
        handleTabChange,
        tab,
        machines,
        users,
        error,
        loading
    } 
    :
    {
        openModal: Function,
        handleTabChange: (e: React.SyntheticEvent, value: number) => void,
        tab: Number,
        machines: Array<any>,
        users: Array<any>,
        error: String,
        loading: boolean
    }
    ) {

        const [search, setSearch] = useState<string>('');
        const [filteredMachines, setFilteredMachines] = useState<Array<any>>([...machines]);
        const [filteredUsers, setFilteredUsers] = useState<Array<any>>([...users]);

        useEffect(() => {
            clearSearch();
        }, [])

        function changeTab(e: React.SyntheticEvent, value: number) {
            clearSearch();
            handleTabChange(e, value);
        }

        function clearSearch () {
            setSearch('');
            setFilteredMachines([...machines]);
            setFilteredUsers([...users]);
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
        

    return (
        <Box sx={{
            border: '1px solid black',
            borderRadius: '1rem',
            padding: '1rem',
            minWidth: '31rem',
            maxWidth: '70rem',
            maxHeight: '90vh',
            overflow: 'scroll',
        }}>
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
            <EditList openModal={openModal} mode={tab} items={tab === 0 ? filteredUsers : filteredMachines} />
        </Box>
    )
}