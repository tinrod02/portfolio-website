document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const chatInput = document.getElementById('chat-input');
  const sendChatButton = document.getElementById('send-chat');
  const chatBody = document.getElementById('chat-body');
  const container = document.querySelector('.container');
  
  Email.defaults = {
    SecureToken: '1b6061ad-327a-4836-8af3-be4e9b2541e1'
  };

  function sendEmail(bodyMessage) {
    return Email.send({
      SecureToken: Email.defaults.SecureToken,
      To: "gailrods76@gmail.com",
      From: "gailrods76@gmail.com",
      Subject: "Private Inquiry Form",
      Body: bodyMessage,
    });
  }

  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const budget = document.getElementById('budget').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const bodyMessage = `
          <html>
              <body>
                  <p>First Name: ${firstName}</p>
                  <p>Last Name: ${lastName}</p>
                  <p>Budget: ${budget}</p>
                  <p>Email: ${email}</p>
                  <p>Message: ${message}</p>
              </body>
          </html>
      `;

      sendEmail(bodyMessage).then(response => {
          if (response === "OK") {
              Swal.fire({
                  title: "Success!",
                  text: "Message sent successfully!",
                  icon: "success"
              });

              container.classList.add('success');
              setTimeout(() => {
                  container.classList.remove('success');
              }, 1500);
          } else {
              Swal.fire({
                  title: "Error!",
                  text: "Message failed to send. Please try again.",
                  icon: "error"
              });
          }
      }).catch(error => {
          Swal.fire({
              title: "Error!",
              text: "Message failed to send. Please try again.",
              icon: "error"
          });
      });

      contactForm.reset();
  });

  sendChatButton.addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Send message to email
    const bodyMessage = `
      <html>
        <body>
          <p>Message: ${message}</p>
        </body>
      </html>
    `;
    sendEmail(bodyMessage).then(response => {
      if (response !== "OK") {
        console.error("Message failed to send. Please try again.");
      }
    }).catch(error => {
      console.error("Error occurred while sending message:", error);
    });

    displayMessageInChat(message, 'user');
  });

  function displayMessageInChat(message, messageType) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', messageType);
    
    const messageContent = `
      <div class="chat-message-content">
        <div class="chat-message-text">${message}</div>
        <div class="chat-message-time">${getCurrentTime()}</div>
      </div>
    `;
    
    messageElement.innerHTML = messageContent;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;

    chatInput.value = '';
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const minimizeChatButton = document.getElementById('minimize-chat');
  const closeChatButton = document.getElementById('close-chat');
  const openChatButton = document.getElementById('open-chat');

  minimizeChatButton.addEventListener('click', function() {
    document.getElementById('chat-box').classList.toggle('minimized');
  });

  closeChatButton.addEventListener('click', function() {
    document.getElementById('chat-box').style.display = 'none';
  });

  openChatButton.addEventListener('click', function() {
    document.getElementById('chat-box').style.display = 'block';
  });
});
