// Admin Dashboard Page
import { useState, useEffect } from "react";
import {Box, Container, Button, Alert, Snackbar} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Typography } from "@mui/material";
import CreateWidget from "@/components/CreateWidget";
import EditWidget from "@/components/EditWidget";
import EditForm from "@/components/EditForm";
import IssueTracker from "@/components/IssueTracker";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { EnumDeclaration } from "typescript";

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

    const [issues, setIssues] = useState<Array<any>>([]);

    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState< 'success' | 'error' | 'warning' >('success');

    function handleChange (e: React.SyntheticEvent, value: Number) {
        setTab(value);
    }

    function setAlert (message:string , severity: 'success' | 'error' | 'warning' ) {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
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
                    gridTemplateColumns: '.4fr auto',
                    maxWidth: '1600px',
                    paddingTop: '1em',
                    gap: '1em'
                }}
            >   
                <CreateWidget setAlert={setAlert} />
                <EditWidget />
            </Container>
            <Container>
                <IssueTracker />
            </Container>
        </Box>
        <Snackbar open={message ? true  : false} autoHideDuration={5000} onClose={() => setMessage('')} >
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        </>
    )
}