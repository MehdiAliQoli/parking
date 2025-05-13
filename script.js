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









// Location-based pricing (per hour in PKR)
const locationPrices = {
    "iba main campus": 100,
    "iba city campus": 120,
    "sea view": 150,
    "bahadurabad": 80,
    "luckyone mall": 200,
    "meezan hostel": 60
};

// Event listeners setup
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('location');
    
    // Setup autocomplete suggestions
    if (locationInput) {
        setupLocationAutocomplete(locationInput);
    }
    
    // Setup search button
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
});

// Setup location autocomplete functionality
function setupLocationAutocomplete(inputElement) {
    // Create the autocomplete container
    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.className = 'autocomplete-container';
    autocompleteContainer.style.display = 'none';
    inputElement.parentNode.appendChild(autocompleteContainer);
    
    // Create the suggestions list
    const suggestionsList = document.createElement('ul');
    suggestionsList.className = 'suggestions-list';
    autocompleteContainer.appendChild(suggestionsList);
    
    // Event listener for showing suggestions on input focus
    inputElement.addEventListener('focus', function() {
        showSuggestions(inputElement.value.toLowerCase().trim());
    });
    
    // Event listener for filtering suggestions while typing
    inputElement.addEventListener('input', function() {
        showSuggestions(inputElement.value.toLowerCase().trim());
    });
    
    // Event listener to hide suggestions when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (e.target !== inputElement && !autocompleteContainer.contains(e.target)) {
            autocompleteContainer.style.display = 'none';
        }
    });
    
    // Function to show filtered suggestions
    function showSuggestions(query) {
        // Clear existing suggestions
        suggestionsList.innerHTML = '';
        
        // Filter locations based on input
        const filteredLocations = Object.keys(locationPrices).filter(location => 
            query === '' || location.includes(query)
        );
        
        if (filteredLocations.length > 0) {
            autocompleteContainer.style.display = 'block';
            
            // Add filtered locations to the suggestions list
            filteredLocations.forEach(location => {
                const listItem = document.createElement('li');
                
                // Capitalize the first letter of each word
                const displayLocation = location.split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                
                listItem.textContent = displayLocation;
                
                // Event listener for clicking on a suggestion
                listItem.addEventListener('click', function() {
                    inputElement.value = displayLocation;
                    autocompleteContainer.style.display = 'none';
                });
                
                suggestionsList.appendChild(listItem);
            });
        } else {
            autocompleteContainer.style.display = 'none';
        }
    }
}

// Main search handling function
function handleSearch() {
    const location = document.getElementById('location').value.toLowerCase().trim();
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    
    // Check if inputs are valid
    if (!location || !date || !startTime || !endTime) {
        alert('Please fill all fields');
        return;
    }
    
    // Check if location is in our supported locations
    if (!Object.keys(locationPrices).some(key => location.toLowerCase().includes(key))) {
        alert('Sorry, we do not have parking available at this location.');
        return;
    }
    
    // Calculate hours difference
    const hours = calculateHoursDifference(startTime, endTime);
    if (hours <= 0) {
        alert('End time must be after start time');
        return;
    }
    
    // Find the matching location for pricing
    const matchedLocation = Object.keys(locationPrices).find(key => location.toLowerCase().includes(key));
    const hourlyRate = locationPrices[matchedLocation];
    const totalFee = hourlyRate * hours;
    
    // Generate and display the token
    displayParkingToken(matchedLocation, date, startTime, endTime, hours, hourlyRate, totalFee);
}

// Calculate hours between two time strings (HH:MM format)
function calculateHoursDifference(startTime, endTime) {
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    
    // If end time is earlier than start time, assume it's the next day
    const diff = end - start;
    return Math.max(0, diff / (1000 * 60 * 60));
}

// Display the parking token with all details
function displayParkingToken(location, date, startTime, endTime, hours, hourlyRate, totalFee) {
    // Create token container if it doesn't exist or remove existing one
    let tokenContainer = document.getElementById('parkingTokenContainer');
    if (tokenContainer) {
        tokenContainer.remove();
    }
    
    // Create new token
    tokenContainer = document.createElement('div');
    tokenContainer.id = 'parkingTokenContainer';
    tokenContainer.className = 'container';
    
    // Format the token HTML
    tokenContainer.innerHTML = `
        <div class="parking-token">
            <div class="token-header">
                <h2>ParkPal Parking Token</h2>
                <p class="token-id">ID: PP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}</p>
            </div>
            <div class="token-content">
                <div class="token-info">
                    <p><strong>Location:</strong> ${location.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${startTime} to ${endTime}</p>
                    <p><strong>Duration:</strong> ${hours.toFixed(1)} hours</p>
                </div>
                <div class="token-pricing">
                    <p><strong>Rate:</strong> PKR ${hourlyRate}/hour</p>
                    <p class="token-total"><strong>Total Fee:</strong> PKR ${totalFee.toFixed(0)}</p>
                </div>
            </div>
            <div class="token-footer">
                <p>Thank you for choosing ParkPal!</p>
                <button class="btn" id="printToken">Print Token</button>
                <button class="btn btn-secondary" id="payNow">Pay Now</button>
            </div>
        </div>
    `;
    
    // Insert token after search box
    const searchBox = document.querySelector('.search-box');
    searchBox.parentNode.insertBefore(tokenContainer, searchBox.nextSibling);
    
    // Add event listeners for token buttons
    document.getElementById('printToken').addEventListener('click', function() {
        window.print();
    });
    
    document.getElementById('payNow').addEventListener('click', function() {
        alert('Redirecting to payment gateway...');
    });
}



