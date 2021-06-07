// const sanitize = require('sanitize');
import sanitize from 'sanitize';
import chat from './chat';
import { addEventListeners, updateChatBody, updateVisibility } from './dom';

const sanitizer = sanitize();

const uiState = {
    closed: true,
    chats: [],
};


const toggleVisibility = () => {
    uiState.closed = !uiState.closed;
    updateVisibility(uiState.closed);
};

const onChatHistoryLoaded = (chats) => {
    uiState.chats = [...chats, ...uiState.chats];
    updateChatBody(uiState);
};

const onUserSend = (value) => {
    chat.sendChat(sanitizer.value(value, 'str'));
};

const onChatReceived = (newChat) => {
    console.log(newChat);
    uiState.chats = [...uiState.chats, newChat.chat];
    updateChatBody(uiState);
};


const init = () => {
    updateVisibility(uiState.closed);
    addEventListeners({
        toggleVisibility,
        onChatHistoryLoaded,
        onUserSend,
        onChatReceived
    });
};

init();