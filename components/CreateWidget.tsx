import {Box, Tabs, Tab} from '@mui/material'
import {useState} from 'react'
import CreateForm from '@/components/CreateForm'
import { Typography } from "@mui/material";

export default function () {
    const [tab, setTab] = useState<Number>(0);

    function handleChange (e: React.SyntheticEvent, value: Number) {
        setTab(value);
    }

    return (
        <Box sx={{
            border: '1px solid black',
            borderRadius: '1rem',
            padding: '1rem',
            minWidth: '30rem',
            maxWidth: '60rem'
        }}>
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
                <CreateForm mode={tab} />
            </Box>
        </Box>
    )
}