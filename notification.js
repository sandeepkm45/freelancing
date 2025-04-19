const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const emptyState = document.getElementById('emptyState');
const notificationBadge = document.getElementById('notificationBadge');
const senderSelect = document.getElementById('senderSelect');
const recruiterDeviceBtn = document.getElementById('recruiterDeviceBtn');
const freelancerDeviceBtn = document.getElementById('freelancerDeviceBtn');

let notificationCount = 0;
let currentDevice = 'Recruiter'; 
let messages = []; 


recruiterDeviceBtn.addEventListener('click', () => {
    currentDevice = 'Recruiter';
    recruiterDeviceBtn.classList.add('active');
    freelancerDeviceBtn.classList.remove('active');
    senderSelect.value = 'Recruiter';
    updateMessagesView();
});

freelancerDeviceBtn.addEventListener('click', () => {
    currentDevice = 'Freelancer';
    freelancerDeviceBtn.classList.add('active');
    recruiterDeviceBtn.classList.remove('active');
    senderSelect.value = 'Freelancer';
    updateMessagesView();
});


function addMessage(text, sender) {
    const currentTime = new Date();
    const timeStr = currentTime.getHours() + ':' + 
                   (currentTime.getMinutes() < 10 ? '0' : '') + 
                   currentTime.getMinutes();
    
    
    if (emptyState.parentElement) {
        emptyState.remove();
    }

    // Create message object
    const message = {
        text: text,
        sender: sender,
        time: timeStr,
        timestamp: currentTime.getTime()
    };
    
    
    messages.push(message);
    
  
    updateMessagesView();
    
   
    if (sender !== currentDevice) {
        notifyUser(`New message from ${sender}: ${text}`);
    }
}


function updateMessagesView() {
  
    messagesContainer.innerHTML = '';
    
    
    if (messages.length === 0) {
        messagesContainer.appendChild(emptyState);
        return;
    }
    
    // Add all messages to container
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender.toLowerCase()}`;
        
        messageElement.innerHTML = `
            <div class="message-sender">${message.sender}</div>
            <div>${message.text}</div>
            <div class="timestamp">${message.time}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to notify the user
function notifyUser(notificationText) {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification';
    notificationElement.innerText = notificationText;
    
    
    document.getElementById('notificationContainer').appendChild(notificationElement);
    
    
    notificationCount++;
    notificationBadge.innerText = notificationCount;
    
    
    setTimeout(() => {
        notificationElement.remove();
        notificationCount--;
        notificationBadge.innerText = notificationCount === 0 ? '0' : notificationCount;
    }, 5000);
}


sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    const sender = senderSelect.value;
    
    if (message.trim()) {
        addMessage(message, sender);
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = messageInput.value;
        const sender = senderSelect.value;
        
        if (message.trim()) {
            addMessage(message, sender);
            messageInput.value = '';
        }
    }
});


document.getElementById('testMessageBtn').addEventListener('click', () => {
    notifyUser('This is a test message notification!');
});

document.getElementById('testOpportunityBtn').addEventListener('click', () => {
    notifyUser('You have a new job opportunity available!');
});

document.getElementById('testReminderBtn').addEventListener('click', () => {
    notifyUser('This is a reminder notification!');
});

document.getElementById('testErrorBtn').addEventListener('click', () => {
    notifyUser('An error has occurred! Please check your input.');
});


senderSelect.addEventListener('change', () => {
    if (senderSelect.value === 'Recruiter') {
        recruiterDeviceBtn.click();
    } else {
        freelancerDeviceBtn.click();
    }
});
