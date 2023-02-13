// Admin Dashboard Page
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Box, TextField, Button, Tab, Tabs} from '@mui/material'
import { Typography } from "@mui/material";
import NavBar from "@/components/NavBar";
import CreateWidget from "@/components/CreateWidget";
import EditWidget from "@/components/EditWidget";

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


    function handleChange (e: React.SyntheticEvent, value: Number) {
        setTab(value);
    }

    

    return (
        <Box sx={{padding: '1em'}}>
            <Typography variant="h4" component="h1" sx={{paddingBottom: '1em', color: 'black'}}>Admin Dashboard</Typography>
            <CreateWidget />
            <EditWidget />
        </Box>
    )
}