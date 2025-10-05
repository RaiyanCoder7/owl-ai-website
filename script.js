// Image Slider (with fade effect)
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
document.querySelector(".next").addEventListener("click", () => plusSlides(1));

// Auto-slide every 5 seconds
setInterval(() => plusSlides(1), 5000);

// Animated Progress Bars on Scroll (with glow effect)
function animateProgress() {
    const progresses = document.querySelectorAll(".progress");
    progresses.forEach(progress => {
        const target = progress.getAttribute("data-target");
        if (progress.style.width === "") {
            progress.style.width = target + "%";
        }
    });
}

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress();
            aboutObserver.unobserve(entry.target);
        }
    });
});
aboutObserver.observe(document.querySelector(".about"));

// Smooth Scroll to Section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Interactive Task Cards (toggle expand/collapse)
function toggleTask(card) {
    const details = card.querySelector(".task-details");
    const btn = card.querySelector(".expand-btn");
    if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
        btn.textContent = "Hide Details";
    } else {
        details.classList.add("hidden");
        btn.textContent = "Details";
    }
}

// Helper Function: Show Upload Messages (success/error with auto-hide)
function showUploadMessage(div, message, type) {
    div.innerHTML = message;
    div.className = `upload-message ${type}`;
    div.classList.remove('hidden');
    // Auto-hide after 5 seconds
    setTimeout(() => {
        div.classList.add('hidden');
    }, 5000);
}

// New: PDF Upload Simulation for Task 1
function submitPdfUpload(taskId) {
    const fileInput = document.getElementById('pdf-upload-' + taskId);
    const messageDiv = document.getElementById('upload-message-' + taskId);
    const file = fileInput.files[0];

    if (!file) {
        showUploadMessage(messageDiv, 'Please select a PDF file first.', 'error');
        return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
        showUploadMessage(messageDiv, 'Please select a valid PDF file (must end with .pdf).', 'error');
        return;
    }

    // Simulate upload success (in real app, send to server)
    showUploadMessage(messageDiv, `PDF "${file.name}" uploaded successfully! We'll review it for Task 1.`, 'success');
    // Optional: Clear the input after success
    fileInput.value = '';
}

// New: URL Upload Simulation for Tasks 2 and 3
function submitUrlUpload(taskId) {
    const urlInput = document.getElementById('url-upload-' + taskId);
    const messageDiv = document.getElementById('upload-message-' + taskId);
    const url = urlInput.value.trim();

    if (!url) {
        showUploadMessage(messageDiv, 'Please enter a GitHub or Google Drive link.', 'error');
        return;
    }

    // Basic URL validation (checks if it's a valid URL format)
    try {
        new URL(url);
    } catch (e) {
        showUploadMessage(messageDiv, 'Please enter a valid URL (e.g., https://github.com/username/repo or https://drive.google.com/...).', 'error');
        return;
    }

    // Simulate submission success (in real app, send to server)
    const taskName = taskId === 'task2' ? 'Task 2' : 'Task 3';
    showUploadMessage(messageDiv, `${taskName} link "${url}" submitted successfully! <a href="${url}" target="_blank" style="color: inherit;">View Link</a>`, 'success');
    // Optional: Clear the input after success
    urlInput.value = '';
}

// New: Sample Certificate Download Simulation
function downloadSampleCertificate() {
    // Simulate download - in a real setup, you could use:
    // - A direct link: window.open('images/sample-certificate.jpg', '_blank');
    // - Or generate a PDF with jsPDF library
    alert('Sample certificate download initiated! In a full implementation, this would download a personalized PDF. Check your downloads folder or integrate a real download link.');
    // For now, just open the image in a new tab as a demo
    window.open('images/sample-certificate.jpg', '_blank');
}

// Contact Form Validation and Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const resume = document.getElementById("resume").files[0];
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email) {
        formMessage.textContent = "Name and email are required.";
        formMessage.className = "error";
        formMessage.classList.remove("hidden");
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = "Please enter a valid email.";
        formMessage.className = "error";
        formMessage.classList.remove("hidden");
        return;
    }

    // Simulate submission (shows success; in real use, integrate EmailJS or Formspree)
    let successMsg = `Thank you, ${name}! Your application has been submitted.`;
    if (resume) {
        successMsg += ` Resume "${resume.name}" received.`;
    }
    if (message) {
        successMsg += ` We'll review your interest in Owl AI.`;
    }
    successMsg += ` We'll get back soon.`;
    
    formMessage.textContent = successMsg;
    formMessage.className = "success";
    formMessage.classList.remove("hidden");
    this.reset(); // Clear form
});

// Real-time email validation on blur (for contact form)
document.getElementById("email").addEventListener("blur", function() {
    const email = this.value.trim();
    const formMessage = document.getElementById("formMessage");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        formMessage.textContent = "Invalid email format.";
        formMessage.className = "error";
        formMessage.classList.remove("hidden");
    } else if (email) {
        formMessage.textContent = "Email looks good!";
        formMessage.className = "success";
        formMessage.classList.remove("hidden");
        setTimeout(() => formMessage.classList.add("hidden"), 2000); // Hide after 2s
    } else {
        formMessage.classList.add("hidden");
    }
});