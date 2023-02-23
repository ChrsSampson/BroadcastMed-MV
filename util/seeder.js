// utility for planting data into the database for testing

const User = require('../models/User');
const Machine = require('../models/Machine');
const Issue = require('../models/Issue');
const mongoose = require('mongoose');

const testUsers = [
    {
        email: 'John.Doe@placeholder.com',
        password: '123456',
        displayName: 'John Doe',
        role: 'user'
    },
    {
        email: 'admin',
        password: '1',
        displayName: 'Test Admin',
        role: 'admin'
    },
    {
        email: 'reset@test.com',
        displayName: 'Test Rester',
        password: '123',
        role: 'user'
    }
]

const testMachines = [
    {
        name: 'Machine 1',
        link: 'https://test.com',
        tag: 'Desktop Encoder'
    },
    {
        name: 'Machine 2',
        link: 'https://test.com',
        tag: 'Desktop Encoder'
    },
    {
        name: 'Machine 3',
        link: 'https://test.com',
        tag: 'Laptop Encoder'
    },
    {
        name: 'Machine 4',
        link: 'https://test.com',
        tag: 'Radius'
    }
]

const testIssues = [
    {
        issue: 'Expired Link',
        description: 'This link is expired',
    },
    {
        issue: 'Incorrect Info',
        description: 'Wrong name',
    },
    {
        issue: 'Other',
        description: 'Entire screen is green',
    }
]


async function seeder () {

    const users = testUsers;
    const machines = testMachines;

    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log(err));

    const Ids = {
        users: [],
        machines: [],
        issues: []
    }
    try{

    for(let user of users) {
        const test = await User.find({email: user.email});
        if(test.length > 0) continue;
            const newUser = new User(user);
            await newUser.save();
            Ids.users.push(newUser._id);
    }

    for(let machine of machines) {
        const test = await Machine.find({name: machine.name});
        if(test.length > 0) continue;
            const newMachine = new Machine(machine);
            await newMachine.save();
            Ids.machines.push(newMachine._id);
    }

    for(let issue of testIssues) {
        // get random userId and machineId from ids
        const userId = Ids.users[0]
        const machineId = Ids.machines[Math.floor(Math.random() * Ids.machines.length)];

        const newIssue = new Issue({
            machine: machineId,
            user: userId,
            issue: issue.issue,
            description: issue.description
        });

        const r = await newIssue.save();
        Ids.issues.push(r._id);
    }

    return Ids;
    } catch(err) {
        console.log(err);
    }
}

module.exports = seeder