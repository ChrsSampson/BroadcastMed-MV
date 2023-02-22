// main app component

import { useState, useEffect } from "react";
import Head from 'next/head'
import {Box, Alert, Snackbar} from '@mui/material'
import NavBar from "@/components/NavBar";
import Viewer from "@/components/Viewer";
import axios from "axios";
import cookies from 'next-cookies'
import {Drawer} from '@mui/material'
import ViewerSidebar from "@/components/ViewerSidebar";

interface Props {
    user: {
        email: string,
        displayName: string
    },
    data: string
}


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
        console.log('Error', err);
    }

    if(r) {
        return {
            props: {
                user: r ? r : null,
            }
        }
    } else {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
}

interface Encoder{
    _id: string,
    name: string,
    link: string
}

export default function App(props: Props) {

    const [laptops, setLaptops] = useState<string[]>([])
    const [radius, setRadius] = useState<string[]>([])
    const [desktops, setDesktops] = useState<string[]>([])
    const [enclosures, setEnclousures] = useState<string[]>([])
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [selectedEncoders, setSelectedEncoders] = useState<Array<Encoder> >([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
        getEncoders()
    }, [])

    function toggleDrawer() {
        setOpenDrawer(!openDrawer)
    }

    function addEncoder (data: Encoder) {
        setSelectedEncoders([...selectedEncoders, data])
    }

    function removeEncoder (id: string) {
        setSelectedEncoders(selectedEncoders.filter((encoder) => encoder._id !== id))
    }

    function clearViewer () {
        setSelectedEncoders([])
    }

    async function getEncoders () {
        try{
            const l = await axios.get('/api/machines/tag/Laptop Encoder')
            setLaptops(l.data.data)
            const r = await axios.get('/api/machines/tag/Radius')
            setRadius(r.data.data)
            const d = await axios.get('/api/machines/tag/Desktop Encoder')
            setDesktops(d.data.data)
            const e = await axios.get('/api/machines/tag/Enclosure')
            setEnclousures(e.data.data)
        } catch (err: any) {
            console.log('Error', err);
            setError(`Backend Error ${err.message}`)
        }
    }

    return (
        <>
        <Head>
            <title>BroadcastMed x Pingplotter MultiViewer | Viewer </title>
            <meta name="description" content="BroadcastMed X Pingplotter Multiviewer App" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.ico" />
        </Head>
        <Box
            sx={{
                color: 'black'
            }}
        >
            <NavBar user={props.user} openDrawer={toggleDrawer} />
            <Drawer
                anchor="left"
                open={openDrawer}
            >
                <ViewerSidebar toggleDrawer={toggleDrawer} addEncoder={addEncoder} laptops={laptops} radius={radius} desktops={desktops} enclosures={enclosures} />
            </Drawer>
            <Viewer selectedEncoders={selectedEncoders} removeEncoder={removeEncoder} clearViewer={clearViewer} />
            <Snackbar open={error ? true : false} autoHideDuration={6000} message={error} >
                <Alert severity="error" variant="filled" sx={{ width: '100%' }} >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
        </>
    )
}