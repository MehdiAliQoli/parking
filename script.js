// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements we'll need
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.getElementById('closeModal');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const searchBtn = document.getElementById('searchBtn');
    const bookNowBtn = document.getElementById('bookNowBtn');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && !event.target.closest('.nav-menu')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Open modal when clicking login or signup buttons
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
            showLoginForm();
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
            showSignupForm();
        });
    }

    // Close modal when clicking the X button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            hideModal();
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            hideModal();
        }
    });

    // Tab switching in the modal
    if (loginTab) {
        loginTab.addEventListener('click', function() {
            showLoginForm();
        });
    }

    if (signupTab) {
        signupTab.addEventListener('click', function() {
            showSignupForm();
        });
    }

    // Links to switch between forms
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Here you would normally send this data to a server
            console.log("Login attempt with:", email);
            
            // For demo purposes, just hide the modal
            alert("Login successful! (This is just a demo)");
            hideModal();
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            // Here you would normally send this data to a server
            console.log("Signup attempt with:", name, email);
            
            // For demo purposes, just hide the modal
            alert("Signup successful! (This is just a demo)");
            hideModal();
        });
    }

    // Search button functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const location = document.getElementById('location').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            if (!location || !date || !time) {
                alert("Please fill in all fields");
                return;
            }
            
            // Here you would normally search for parking spots
            alert(`Searching for parking near ${location} on ${date} at ${time}`);
        });
    }

    // Book now button functionality
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to search box
            const searchBox = document.querySelector('.search-box');
            if (searchBox) {
                searchBox.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Helper functions for the modal
    function showModal() {
        if (authModal) {
            authModal.style.display = 'flex';
        }
    }

    function hideModal() {
        if (authModal) {
            authModal.style.display = 'none';
        }
    }

    function showLoginForm() {
        if (loginTab && signupTab && loginForm && signupForm) {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        }
    }

    function showSignupForm() {
        if (loginTab && signupTab && loginForm && signupForm) {
            loginTab.classList.remove('active');
            signupTab.classList.add('active');
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        }
    }

    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's not the modal links
            if (!this.id.includes('login') && !this.id.includes('signup') && 
                !this.id.includes('switchTo')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
});