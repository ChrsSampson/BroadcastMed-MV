// Issue Data Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    machine: {
        type: mongoose.ObjectId,
        ref: 'Machine',
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    },
    issue: {
        type: String,
        enum: ['Expired Link', 'Incorrect Info', 'Other'],
        required: false,
        default: 'Other'
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        required: false,
        default: 'Open'
    },
    dateCreated: {
        type: Date,
        required: false,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        required: false,
        default: Date.now
    },
})



module.exports = mongoose.model('Issue', IssueSchema);