// list of items to edit
import {Box, Typography} from '@mui/material'
import MachineListItem from '@/components/MachineListItem'
import UserListItem from '@/components/UserListItem'

export default function ({items, mode, openModal}: {items: any, mode: Number, openModal: Function}) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '1em'
        }}>
            {
                items.length ? items.map((item: any, index: number) => {
                    if(mode === 1) {
                        return (
                            MachineListItem({item, onClick: () => openModal(item, mode)})
                        )
                    } else {
                        return (
                            UserListItem({user: item, onClick: () => openModal(item, mode)})
                        )
                    }
                })
                : 
                <Typography variant="subtitle1" component="h1" sx={{color: 'black'}}>No Matching Results</Typography>
            }
        </Box>
    )
}