import {Box, Tab, Tabs, Typography, Backdrop, CircularProgress, TextField} from '@mui/material'
import {useState, useEffect} from 'react'
import axios from 'axios'
import EditList from '@/components/EditList'

export default function EditWidget (
    {
        openModal,
        handleTabChange,
        tab,
        machines,
        users,
        error,
        search,
        setSearch,
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
        search: String,
        setSearch: Function
        loading: boolean
    }
    ) {


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
                    onChange={handleTabChange}
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