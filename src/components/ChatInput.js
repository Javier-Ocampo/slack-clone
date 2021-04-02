import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase';

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState('');
  const sendMessage = event => {
    event.preventDefault();
    if (!channelId) {
      return false;
    }
    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "JavierOB",
      userImage: 'https://yt3.ggpht.com/ytc/AAUvwnhqkfXjUbj6CrbrNeERnNdYITEmFZLFOxYbgMYgNw=s900-c-k-c0x00ffffff-no-rj'
    });
    chatRef?.current?.scrollIntoView({
      behavior: "smooth"
    });
    setInput('');
  }
  return (
    <ChatInputContainer>
      <form>
        <input value={input} onChange={event => setInput(event.target.value)} placeholder={`Message # ${channelName} `} />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
