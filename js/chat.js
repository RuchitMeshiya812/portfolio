// Chatbot Logic - Integrated with Hugging Face Space

// UI Handling
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget';
    chatWidget.innerHTML = `
        <div id="chat-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div id="chat-window" class="hidden">
            <div class="chat-header">
                <span>AI Assistant</span>
                <button id="close-chat">&times;</button>
            </div>
            <iframe 
                src="https://ruchit812-career-conversation.hf.space" 
                style="flex: 1; border: none; width: 100%; background: white;" 
                title="AI Assistant"
                allow="microphone">
            </iframe>
        </div>
    `;
    document.body.appendChild(chatWidget);

    const chatBtn = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');

    function toggleChat() {
        chatWindow.classList.toggle('hidden');
    }

    chatBtn.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
});
