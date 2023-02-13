// Admin Dashboard Page
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Box, TextField, Button, Tab, Tabs} from '@mui/material'
import { Typography } from "@mui/material";
import CreateWidget from "@/components/CreateWidget";
import EditWidget from "@/components/EditWidget";
import EditForm from "@/components/EditForm";
import Image from "next/image";

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

export default function () {
    const [tab, setTab] = useState<Number>(0);
    const [open, setOpen] = useState<Boolean>(false);
    const [modalData, SetModalData] = useState<any>(null);

    function handleChange (e: React.SyntheticEvent, value: Number) {
        setTab(value);
    }

    function openModal (data: any) {
        SetModalData(data);
        setOpen(true);
    }

    return (
        <Box
            sx={{
                padding: '1em',
                height: '100vh'
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    height: '50px',
                    margin: '1em',
                    gap: '1em'
                }}>
                    <a href="/app">
                        <Image alt="Logo" src="/icon.ico" height={50} width={50} />
                    </a>
                    <Typography variant="h4" component="h1" sx={{paddingBottom: '1em', color: 'black'}}>Dashboard</Typography>
                </Box>
                <Button size="large" href="/app">Back</Button>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: '1em'
            }}>
                <CreateWidget />
                <EditWidget openModal={openModal} />
                {open ? <EditForm data={null} open={open} mode={0} /> : null}
            </Box>
        </Box>
    )
}