// issue tracking component

import {Paper, Box, Typography, Switch, FormGroup, FormControlLabel} from '@mui/material'
import {useState, useEffect} from 'react'
import axios from 'axios'
import IssueList from './IssueList'
import IssueEditForm from './IssueEditForm'

export default function () {

    const [issues, setIssues] = useState<any>([])

    const [showAll, setShowAll] = useState<boolean>(false)

    const [modalData, setModalData] = useState<object>({})
    const [openModal, setOpenModal] = useState<boolean>(false)

    useEffect(() => {
        getIssues()
    }, [])

    // re-render on state change
    useEffect(() => {}, [issues])

    async function getIssues() {
        try{
            const res = await axios.get('/api/issues')
            setIssues(res.data.data)

        } catch (err:any) {
            console.log(err)
        }
    } 

    async function handleDelete (id: string) {
        try{
            await axios.delete(`/api/issues/${id}`)
            getIssues()
        } catch (err:any) {
            console.log(err)
        }
    }

    function handleOpenModal (data: any) {
        setModalData(data)
        setOpenModal(true)
    }

    function handleCloseModal () {
        setOpenModal(false)
        setModalData({})
    }

    return (
        <Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '1rem',
            }}
            elevation={3}
        >
            <Typography variant="h4" component="h1" sx={{color: 'black'}}>Issue Tracker</Typography>
            <FormGroup
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                }}
            >
                <FormControlLabel control={<Switch color="warning" value={showAll} onChange={(e) => setShowAll(!showAll)} />} label="Show Closed" />
            </FormGroup>
            <IssueList items={issues} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            <IssueEditForm open={openModal} issue={modalData} handleCloseModal={handleCloseModal} />
        </Paper>
    )
}