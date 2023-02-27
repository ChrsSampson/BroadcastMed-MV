// issue display compoenent

import {Paper, Box, Typography, Button, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Issue {
    _id: number,
    issue: string,
    description: string,
    status: string,
    user: {
        _id: string,
        email: string,
        displayName: string
    },
    machine: {
        _id: string,
        name: string,
        tag: string
        link: string
    },
    dateCreated: string,
    lastUpdated: string
}

export default function IssueListItem ({issue, handleOpenModal, handleDelete}: {issue: Issue, handleOpenModal: Function, handleDelete: Function}) {

    function formateDate (dateString: string) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <tr>
            <td
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <IconButton onClick={() => handleOpenModal(issue)} aria-label="edit" size="small" color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(issue._id)}>
                    <DeleteForeverIcon />
                </IconButton>
            </td>
            <td>
                {issue.status}
            </td>
            <td>
                {issue.machine.tag} {issue.machine.name}
            </td>
            <td>
                {issue.user.displayName || issue.user.email}
            </td>
            <td>
                {issue.issue}
            </td>
            <td>
                {formateDate(issue.dateCreated)}
            </td>
        </tr>
    )
}  