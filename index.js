// import express from 'express';
const express = require('express');
// import http from 'http';
const http = require('http');
// import { Server } from "socket.io";
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
//   res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('user connection', 'a user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    io.emit('user connection', 'a user connected');
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});