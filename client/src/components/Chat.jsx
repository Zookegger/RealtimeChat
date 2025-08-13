import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Typography, List, ListItem, TextField, Button, Paper } from '@mui/material';

const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [myId, setId] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            setId(socket.id);
        })

        socket.on('chat message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return() => {
            socket.off('connect');
            socket.off('chat message');
        };
    }, []);

    const sendMessage = (e) => {
        const message = input.trim();
        e.preventDefault();

        if (message) {
            socket.emit('chat message', message);
            console.log(message);
            setInput('');
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant='h4' gutterBottom>
                    Realtime Chat Application
                </Typography>

                <List sx={{ mb: 3, maxHeight: 300, overflow: 'auto' }}>
                    {messages.map((msg, idx) => (
                        <ListItem 
                            key={idx}
                            sx={{ 
                                border: 1, 
                                borderRadius: 4, 
                                marginBottom: 2, 
                                display: 'flex', 
                                justifyContent: msg.sender === myId ? 'flex-end' : 'flex-start', 
                                bgcolor: msg.sender === myId ? 'primary.light' : 'grey.100'
                            }} 
                        >
                            <span style={{
                                textAlign: msg.sender === myId ? 'right' : 'left',
                                color: msg.sender === myId ? 'white' : 'black',
                                fontWeight: msg.sender === myId ? '500' : '',
                                width: '100%',
                            }}>
                                {msg.text}
                            </span>
                        </ListItem>
                    ))}
                </List>

                <form onSubmit={sendMessage} style={{ display: 'flex', gap: 3}}>
                    <TextField 
                        value={input} 
                        onChange={(e) => {setInput(e.target.value)}}
                        variant='outlined'
                        fullWidth
                        size='small'
                    />
                    <Button type='submit' variant='contained'>Send</Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Chat;