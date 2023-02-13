// list of items to edit
import {useState} from 'react'
import {Box, TextField, Button, Typography} from '@mui/material'
import MachineListItem from '@/components/MachineListItem'
import UserListItem from '@/components/UserListItem'
import EditForm from '@/components/EditForm'

export default function ({items, mode, openModal}: {items: any, mode: Number, openModal: Function}) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '1em'
        }}>
            {
                items ? items.map((item: any, index: number) => {
                    if(mode === 1) {
                        return (
                            MachineListItem({item, onClick: () => openModal(item, mode)})
                        )
                    } else {
                        return (
                            UserListItem({user: item, onClick: () => openModal(item, mode)})
                        )
                    }
                }
                )
                : null
            }
        </Box>
    )
}