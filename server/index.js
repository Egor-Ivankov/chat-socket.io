const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const route = require('./route');
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");

const app = express();
app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

server.listen(5311, () => {
    console.log("Server is runnig");
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);

        const { user, isExist } = addUser({ name, room });

        let userMessage = isExist
            ? `Welcome back, ${user.name}`
            : `Hello, my friend, ${user.name}`;

        socket.emit('message', {
            data: { user: { name: 'Admin' }, message: userMessage }
        });

        socket.broadcast.to(user.room).emit('message', {
            data: { user: { name: 'Admin' }, message: `${user.name} has joined` }
        });

        io.to(user.room).emit('changeRoom', {
            data: { users: getRoomUsers(user.room) }
        });
    });

    socket.on('sendMessage', ({ message, params }) => {

        const user = findUser(params);

        if (user) {
            io.to(user.room).emit('message', { data: { user, message } });
        }
    });

    socket.on('leftRoom', ({ params }) => {

        const user = removeUser(params);

        if (user) {
            const { room, name } = user;

            io.to(room).emit('message', {
                data: {
                    user: { name: 'Admin' },
                    message: `${name} has left`
                }
            });

            io.to(room).emit('changeRoom', {
                data: { users: getRoomUsers(room) }
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

