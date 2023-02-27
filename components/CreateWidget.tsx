import {Box, Tabs, Tab} from '@mui/material'
import {useState} from 'react'
import CreateForm from '@/components/CreateForm'
import { Typography, Paper } from "@mui/material";

export default function (setAlert: any) {
    const [tab, setTab] = useState<number>(0);

    function handleChange (e: React.SyntheticEvent, value: number) {
        setTab(value);
    }

    return (
        <Paper
            sx={{
                borderRadius: '1rem',
                padding: '1rem',
                minWidth: '30rem',
                maxWidth: '60rem',
                maxHeight: '34.5rem',
                minHeight: 'auto'
            }}
            elevation={3}
        >
            <Typography variant="h4" component="h1" sx={{paddingBottom: '1em', color: 'black'}}>Create</Typography>
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
                    <Tab value={0} label="User" />
                    <Tab value={1} label="Encoder" />
                </Tabs>
            </Box>
            <Box>
                <CreateForm mode={tab} setAlert={setAlert} />
            </Box>
        </Paper>
    )
}