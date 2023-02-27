// container the renders a list of Issue components

import {Typography} from '@mui/material'
import Table from '@mui/joy/Table';
import IssueListItem from './IssueListItem'

export default function IssueList ({items, handleOpenModal, handleDelete} : {items: Array<any>, handleOpenModal: Function, handleDelete: Function }) {
    return (
        <Table 
            aria-label="Issue Table"
        >
            <thead 
                style={{
                    backgroundColor: '#2B76D2',
                    color: 'white',
                    fontSize: '1.25rem',
                    borderRadius: '1rem 1rem 0 0',
                    borderBottom: '3px solid black'
                }}
            >
                <tr>
                    <th style={{width: '5em'}}></th>
                    <th>Status</th>
                    <th>Encoder</th>
                    <th>Author</th>
                    <th>Issue</th>
                    <th>Created on</th>
                </tr>
            </thead>
            <tbody>
            {
                items ?
                items.map((item: any) => {
                    return <IssueListItem issue={item} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
                })    
                :
                <Typography variant="h6" component="h2" sx={{color: 'black'}}>No Open Issues</Typography>
            }
            </tbody>
        </Table>
    )
}