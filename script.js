/*-----------scroll up--------*/
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var btn = document.querySelector('.gotopbtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.classList.remove('hidden');
    } else {
        btn.classList.add('hidden');
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Function to toggle visibility
function toggleWork() {
    var work4 = document.getElementById("wor4");
    var work5 = document.getElementById("wor5");
    var work6 = document.getElementById("wor6");
    var seeMoreBtn = document.getElementById("see-more-btn");
    
    if (work4.style.display !== "none") {
        work4.style.display = "none";
        work5.style.display = "none";
        work6.style.display = "none";
        seeMoreBtn.innerText = "See more"; 
    } else {
        work4.style.display = "block";
        work5.style.display = "block";
        work6.style.display = "block";
        seeMoreBtn.innerText = "See less"; 
    }
}

/*---typing---*/
const roles = ['Web Developer', 'UX/UI Designer', 'Game Developer', 'Mobile App Developer'];
let roleIndex = 0;
const roleElement = document.getElementById('role');

function typeRole() {
    roleElement.textContent = '';
    const role = roles[roleIndex];
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < role.length) {
            roleElement.textContent += role.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            setTimeout(eraseRole, 1000);
        }
    }, 100);
}

function eraseRole() {
    const role = roles[roleIndex];
    let charIndex = role.length - 1;
    const eraseInterval = setInterval(() => {
        if (charIndex >= 0) {
            roleElement.textContent = role.substring(0, charIndex);
            charIndex--;
        } else {
            clearInterval(eraseInterval);
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 500);
        }
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    typeRole();
});

/*-----------contact form--------*/
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const emailInput = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `
        <html>
            <body>
                <p>Full Name: ${fullName.value}</p>
                <p>Email: ${emailInput.value}</p>
                <p>Message: ${message.value}</p>
            </body>
        </html>
    `;

    Email.send({
        SecureToken: "1b6061ad-327a-4836-8af3-be4e9b2541e1",
        To: 'gailrods76@gmail.com',
        From: "gailrods76@gmail.com",
        Subject: subject.value,
        Body: bodyMessage,
        ContentType: "text/html; charset=utf-8"
    }).then(
        response => {
            if (response === "OK") {
                Swal.fire({
                    title: "Success!",
                    text: "Message sent successfully!",
                    icon: "success"
                });
                form.reset();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Message failed to send. Please try again.",
                    icon: "error"
                });
            }
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});


