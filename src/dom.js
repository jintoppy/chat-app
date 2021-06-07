import dayjs from 'dayjs';
import chat from './chat';

const chatWidgetEl = document.querySelector('.chat-widget');
const chatHistoryEl = document.querySelector('.chat-history');
const chatWidgetLogoEl = document.querySelector('.chat-widget__logo');
const chatCloseIconEl = document.querySelector('.icon-close');
const chatInputEl = document.querySelector('.chat-input');
const sendButtonEl = document.querySelector('.send-button');
const liveChatEl = document.querySelector('.live-chat');
const chatBodyEl = document.querySelector('.chat-room__body');
const loadChatHistoryButtonEl = document.querySelector('.chat-history__load-button');


exports.updateVisibility = (isClosed) => {
    if (isClosed) {
        chatWidgetEl.classList.add('chat-widget--closed');
        return;
    }
    chatWidgetEl.classList.remove('chat-widget--closed');
    chatInputEl.focus();
};

exports.updateChatBody = (uiState) => {
    const chatTemplate = uiState.chats.map(chatItem => {
        return `
            <div class="chat-message-box ${chatItem.from === 'Visitor' ? 'chat-message-box--visitor' : 'chat-message-box--operator'}">
                <span class="chat-message-box__datetime">${dayjs(chatItem.datetime).format('HH:mm:ss A')}</span>
                <span class="chat-message-box__message">${chatItem.message}</span>
            </div>
            <div class="clearfix"></div>
        `
    }).join('');
    liveChatEl.innerHTML = chatTemplate;
    chatBodyEl.scrollTop = chatBodyEl.scrollHeight;
};

exports.addEventListeners = ({ toggleVisibility, onChatHistoryLoaded, onUserSend, onChatReceived }) => {
    chatWidgetLogoEl.addEventListener('click', toggleVisibility);
    chatCloseIconEl.addEventListener('click', toggleVisibility);
    sendButtonEl.addEventListener('click', () => {
        onUserSend(chatInputEl.value);
        chatInputEl.value = '';
        chatInputEl.focus();
    });
    sendButtonEl.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 13) {
            onUserSend(chatInputEl.value);
            chatInputEl.value = '';
            chatInputEl.focus();
        }
    });
    loadChatHistoryButtonEl.addEventListener('click', () => {
        chat.getChatHistory(onChatHistoryLoaded);
        chatHistoryEl.style.display = 'none';
    });
    chat.addListener('chatreceived', onChatReceived);
}