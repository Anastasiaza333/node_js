// const path = require('node:path');
// const fs = require('node:fs/promises');
//
// const foo = async () => {
//     try {
//         const baseFolderPath = path.join(process.cwd(), 'baseFolder');
//         await fs.mkdir(baseFolderPath, {recursive: true});
//
//         const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
//         const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
//
//         await Promise.allSettled(folderNames.map(async (folderName) => {
//             const folderPath = path.join(baseFolderPath, folderName);
//             await fs.mkdir(folderPath, {recursive: true});
//             await Promise.allSettled(fileNames.map(async (fileName) => {
//                 await fs.writeFile(path.join(folderPath, fileName), "Hello!!!");
//             }));
//         }));
//
//         const folders = await fs.readdir(baseFolderPath);
//         for (const folder of folders) {
//             const folderPath = path.join(baseFolderPath, folder);
//             const stat = await fs.stat(folderPath);
//             console.log(`${folderPath} isDirectory: ${stat.isDirectory()}`);
//
//             const files = await fs.readdir(path.join(baseFolderPath, folder));
//             for (const file of files) {
//                 const filePath = path.join(folderPath, file);
//                 const stat = await fs.stat(filePath);
//                 console.log(`${filePath} isDirectory: ${stat.isDirectory()}`);
//             }
//         }
//
//     } catch (e) {
//         console.error(e.message)
//     }
//
// }
//
// void foo()

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = [
    {id: 1, name: 'Oleg', email: 'olezhka@gmail.com', password: 'qwe123'},
    {id: 2, name: 'Olya', email: 'olyathegreatest@gmail.com', password: 'ert345'},
    {id: 3, name: 'Anna', email: 'ann700@gmail.com', password: 'ghj393'},
    {id: 4, name: 'Galyna', email: 'galya23@gmail.com', password: 'afs787'},
    {id: 5, name: 'Dima', email: 'taperblade@gmail.com', password: 'rtt443'},
    {id: 6, name: 'vika', email: 'vikusya@gmail.com', password: 'vcx344'},
    {id: 7, name: 'Denis', email: 'denchik100@gmail.com', password: 'sdf555'},
    {id: 8, name: 'Boghdan', email: 'BigBoss@gmail.com', password: 'ccc322'},
    {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
    {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
];
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.get('/users', (req, res) => {
    try {
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;

        const index = users.findIndex((user) => user.email === email)
        if (index !== -1) {
            return res.status(409).json('User with this email already exists')
        }
        const newUser = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            password
        }
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('User not found')
        }
        res.json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.put('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const {name, email, password} = req.body;
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('User not found')
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
});

app.delete('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return res.status(404).json('User not found')
        }
        users.splice(index, 1);
        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

