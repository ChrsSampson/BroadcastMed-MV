// main app component

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Box, TextField, Button} from '@mui/material'
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
               Cookie: `session=${cookie.session};` 
            }
        });
        r = result.data;

    } catch (err) {
        console.error(err);
    }

    if(r) {
        return {
            props: {
                user: r ? r.data : null,
                data: 'data'
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
            <h1>Hello</h1>
            <p>{props.user.email}</p>
        </Box>
    )
}