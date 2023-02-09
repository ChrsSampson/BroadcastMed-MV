// main app component

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Box, TextField, Button} from '@mui/material'
import NavBar from "@/components/NavBar";
import Viewer from "@/components/Viewer";
import axios from "axios";
import cookies from 'next-cookies'

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
        console.log('Error', err.data);
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


export default function App(props: Props) {

    return (
        <Box sx={{
            color: 'black'
        }}>
            <NavBar user={props.user}/>
            <Viewer />
        </Box>
    )
}