// Admin Dashboard Page
import { useState, useEffect } from "react";
import {Box, Container, Button} from '@mui/material'
import { Typography } from "@mui/material";
import CreateWidget from "@/components/CreateWidget";
import EditWidget from "@/components/EditWidget";
import EditForm from "@/components/EditForm";
import NavBar from "@/components/NavBar";
import Head from "next/head";

import axios from "axios";
import cookies from 'next-cookies'

export async function getServerSideProps(ctx: any) {
    const cookie = cookies(ctx)
    let r = null;
    try{
        const result = await axios.get('http://localhost:3000/api/users/me', {
            headers: {
               Cookie: `session=${cookie.session ? cookie.session : null};`
            }
        });
        // axios non-sense
        r = result.data.data
    } catch (err: any) {
        console.log('Error', err.data);
    }

    if(r && r.role === 'admin') {
        return {
            props: {
                user: r ? r : null,
            }
        }
    } else {
        return {
            redirect: {
                destination: '/app',
                permanent: false
            }
        }
    }
}

export default function (props: any) {
    const [tab, setTab] = useState<Number>(0);
    const [open, setOpen] = useState(false);
    const [modalData, SetModalData] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [machines, setMachines] = useState<Array<any>>([]);
    const [users, setUsers] = useState<Array<any>>([]);
    const [error, setError] = useState<String>('');


    useEffect(() => {
        populateState();
    }, [users, machines])

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

    function openModal (data: any) {
        SetModalData(data);
        setOpen(true);
    }

    function closeModal () {
        SetModalData(null);
        setOpen(false);
    }

    function refreshList () {
        populateState();
    }

    return (
        <>
        <Head>
            <title>BroadcastMed x Pingplotter MultiViewer | Dashboard</title>
            <meta name="description" content="MultiViewer Dashboard" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.ico" />
        </Head>
        <Box
            sx={{
                height: '100vh'
            }}
        >
            <NavBar user={props.user} title="Dashboard" />
            <Container
                maxWidth="lg"
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '.5fr auto',
                    maxWidth: '1600px',
                    paddingTop: '1em',
                    gap: '1em'
                }}
            >
                <CreateWidget />
                <EditWidget
                    openModal={openModal}
                    handleTabChange={handleChange}
                    tab={tab}
                    machines={machines}
                    users={users}
                    loading={loading}
                    error={error}
                />
                {open ? <EditForm data={modalData} open={open} closeModal={closeModal} mode={tab} refresh={refreshList} /> : null}
            </Container>
        </Box>
        </>
    )
}