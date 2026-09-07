/* =====================================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT FILE
   Written in simple, beginner-friendly style with
   comments explaining what every part does.
===================================================== */

/* -----------------------------------------------------
   1. SET CURRENT YEAR IN FOOTER
----------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();


/* -----------------------------------------------------
   2. DARK / LIGHT MODE TOGGLE
   We save the user's choice in localStorage so the
   theme stays the same next time they open the site.
----------------------------------------------------- */
const themeToggle = document.getElementById("themeToggle");
const htmlTag = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

// Check if user already chose a theme before
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  htmlTag.setAttribute("data-theme", "dark");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", function () {
  const isDark = htmlTag.getAttribute("data-theme") === "dark";

  if (isDark) {
    // Switch back to light mode
    htmlTag.removeAttribute("data-theme");
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    // Switch to dark mode
    htmlTag.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});


/* -----------------------------------------------------
   3. ACHIEVEMENTS TYPEWRITER EFFECT (Home Page)
   This types out one achievement line, waits a bit,
   erases it letter by letter, then moves to the next
   line in the list - and keeps looping forever.
   To change the lines, just edit the array below.
----------------------------------------------------- */
const achievements = [
  "Certified in HTML, CSS & JavaScript - 10Pearls University",
  "Completed Web Development with AI - Bano Qabil",
  "1 Year Experience as a Call Center Agent",
  "Currently Studying Software Engineering at SMIU",
  "Building Real-World Projects with HTML, CSS & JavaScript"
];

const typedTextEl = document.getElementById("typedText");
let achieveIndex = 0;   // which line we are on
let charIndex = 0;      // which letter we are on
let isDeleting = false; // are we typing or erasing?

function typeAchievements() {
  const currentLine = achievements[achieveIndex];

  if (!isDeleting) {
    // Typing forward, one letter at a time
    typedTextEl.textContent = currentLine.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentLine.length) {
      // Line fully typed - wait, then start erasing
      isDeleting = true;
      setTimeout(typeAchievements, 1800);
      return;
    }
  } else {
    // Erasing backward, one letter at a time
    typedTextEl.textContent = currentLine.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      // Fully erased - move to the next line
      isDeleting = false;
      achieveIndex = (achieveIndex + 1) % achievements.length;
    }
  }

  const speed = isDeleting ? 35 : 55;
  setTimeout(typeAchievements, speed);
}

typeAchievements();


/* -----------------------------------------------------
   3B. SKILL CARDS - FLIP ON CLICK / TAP
   Each skill card flips to show a short description
   when clicked, and flips back when clicked again.
----------------------------------------------------- */
document.querySelectorAll(".skill-card").forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("flipped");
  });
});


/* -----------------------------------------------------
   3C. ASK AI WIDGET
   This is a simple, beginner-friendly chatbot. It is NOT
   connected to any real AI service - it just looks for
   keywords in the visitor's question and replies with a
   ready-made answer about Fahad. Perfect starting point
   to later connect to a real AI API if you want to.
----------------------------------------------------- */
const askAiBtn = document.getElementById("askAiBtn");
const askAiPanel = document.getElementById("askAiPanel");
const askAiClose = document.getElementById("askAiClose");
const askAiForm = document.getElementById("askAiForm");
const askAiInput = document.getElementById("askAiInput");
const askAiMessages = document.getElementById("askAiMessages");

// Open / close the chat panel
askAiBtn.addEventListener("click", function () {
  askAiPanel.classList.toggle("open");
});

askAiClose.addEventListener("click", function () {
  askAiPanel.classList.remove("open");
});

// Keyword -> answer pairs. Add more rows here anytime.
const aiKnowledge = [
  { keywords: ["skill", "technology", "tech stack"], answer: "Fahad works with HTML, CSS, JavaScript, Git, GitHub, Python, AI tools, MS Word, Excel and PowerPoint." },
  { keywords: ["project"], answer: "Fahad has built a Coza Store front-end (mid-term project) and a To-Do App, both shown in the Projects section above." },
  { keywords: ["education", "degree", "university", "study"], answer: "Fahad is currently in his 5th semester of BS Software Engineering at Sindh Madressatul Islam University (SMIU)." },
  { keywords: ["experience", "job", "work", "call center"], answer: "Fahad worked for 1 year as a Call Center Agent before moving into web development." },
  { keywords: ["certificate", "certification"], answer: "Fahad holds certificates in HTML/CSS/JavaScript from 10Pearls University and Web Development with AI from Bano Qabil - see the Certificates section." },
  { keywords: ["contact", "email", "reach", "hire"], answer: "You can reach Fahad at fahadkhalidd36@gmail.com, on WhatsApp, or through the Contact form on this page." },
  { keywords: ["whatsapp", "phone", "number"], answer: "You can message Fahad directly on WhatsApp using the green floating button at the bottom-left of the page." },
  { keywords: ["linkedin"], answer: "You can find Fahad on LinkedIn - the link is in the Contact section and the footer." },
  { keywords: ["cv", "resume"], answer: "You can download Fahad's CV using the 'Download CV' button in the Home section or the footer." },
  { keywords: ["hello", "hi", "hey"], answer: "Hello! Ask me anything about Fahad's skills, projects, education or how to contact him." }
];

function getAiReply(question) {
  const q = question.toLowerCase();

  for (let i = 0; i < aiKnowledge.length; i++) {
    const item = aiKnowledge[i];
    const matched = item.keywords.some(function (word) {
      return q.includes(word);
    });
    if (matched) {
      return item.answer;
    }
  }

  // Default reply when no keyword matches
  return "I'm a simple demo assistant, so I might not have that answer. Try asking about Fahad's skills, projects, education or contact info!";
}

function addChatMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = "ai-msg " + sender; // sender is "bot" or "user"
  msg.textContent = text;
  askAiMessages.appendChild(msg);
  // Always scroll to the newest message
  askAiMessages.scrollTop = askAiMessages.scrollHeight;
}

askAiForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const question = askAiInput.value.trim();
  if (question === "") return;

  addChatMessage(question, "user");
  askAiInput.value = "";

  // Small delay makes it feel like the assistant is "thinking"
  setTimeout(function () {
    const reply = getAiReply(question);
    addChatMessage(reply, "bot");
  }, 500);
});


/* -----------------------------------------------------
   4. MOBILE MENU (HAMBURGER) TOGGLE
----------------------------------------------------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Close the mobile menu automatically when a link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});


/* -----------------------------------------------------
   5. BACK TO TOP BUTTON
   Shows the button only after the user scrolls down,
   and scrolls smoothly back to the top when clicked.
----------------------------------------------------- */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* -----------------------------------------------------
   6. FLOATING CODE SYMBOLS BACKGROUND
   Every so often, we create a new <span> with a random
   coding symbol, place it at a random horizontal spot,
   and let CSS animate it floating upward. After the
   animation finishes we remove it so the page stays fast.
----------------------------------------------------- */
const codeBg = document.getElementById("code-bg");

const codeSymbols = ["</>", "{ }", ";", "( )", "const", "let", "=>", "&&", "className", "#id", "<div>", "</div>"];

function createCodeSymbol() {
  const symbol = document.createElement("span");
  symbol.className = "code-symbol";
  symbol.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];

  // Random horizontal position across the screen
  symbol.style.left = Math.random() * 100 + "vw";

  // Random size so it feels more natural
  const size = Math.random() * 14 + 12; // between 12px and 26px
  symbol.style.fontSize = size + "px";

  // Random speed (duration) and slight delay
  const duration = Math.random() * 8 + 10; // between 10s and 18s
  symbol.style.animationDuration = duration + "s";

  codeBg.appendChild(symbol);

  // Remove the symbol once its animation has finished
  setTimeout(function () {
    symbol.remove();
  }, duration * 1000);
}

// Create a new floating symbol every 900ms
setInterval(createCodeSymbol, 900);


/* -----------------------------------------------------
   7. CONTACT FORM (main contact section)
   Since this is a simple front-end only website, we open
   the visitor's email app with the message pre-filled
   instead of sending it through a server.
----------------------------------------------------- */
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = "Message from " + name + " (Portfolio Website)";
  const body = message + "\n\nFrom: " + name + " (" + email + ")";

  // Opens the default email app with everything filled in
  window.location.href =
    "mailto:fahadkhalidd36@gmail.com?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  formNote.textContent = "Opening your email app...";
  contactForm.reset();
});


/* -----------------------------------------------------
   8. FOOTER QUICK MESSAGE BOX
   Works the same way as the main contact form, just a
   shorter version placed inside the footer.
----------------------------------------------------- */
const footerForm = document.getElementById("footerForm");
const footerFormNote = document.getElementById("footerFormNote");

footerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("footerEmail").value;
  const msg = document.getElementById("footerMsg").value;

  window.location.href =
    "mailto:fahadkhalidd36@gmail.com?subject=" +
    encodeURIComponent("Quick message from portfolio website") +
    "&body=" +
    encodeURIComponent(msg + "\n\nFrom: " + email);

  footerFormNote.textContent = "Opening your email app...";
  footerForm.reset();
});