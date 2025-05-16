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
        searchBtn.addEventListener('click', handleSearch);
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

    // Setup location autocomplete on the location input
    const locationInput = document.getElementById('location');
    if (locationInput) {
        setupLocationAutocomplete(locationInput);
    }
});

// Updated parking data with multiple categories per location
const parkingData = {
    "iba main campus": {
        types: [
            { 
                name: "Staff Parking", 
                baseRate: 100,
                color: "#3498db"
            },
            { 
                name: "Student Parking", 
                baseRate: 70,
                color: "#2ecc71"
            },
            { 
                name: "Disabled Parking", 
                baseRate: 50,
                color: "#9b59b6"
            }
        ],
        mapUrl: "https://maps.google.com/maps?q=IBA+Main+Campus+Karachi&t=&z=13&ie=UTF8&iwloc=&output=embed",
        occupancyStatus: "normal" // can be "low", "normal", "high"
    },
    "iba city campus": {
        types: [
            { 
                name: "Staff Parking", 
                baseRate: 100,
                color: "#3498db" 
            },
            { 
                name: "Student Parking", 
                baseRate: 80,
                color: "#2ecc71"
            },
            { 
                name: "Disabled Parking", 
                baseRate: 60,
                color: "#9b59b6"
            }
        ],
        mapUrl: "https://maps.google.com/maps?q=IBA+City+Campus+Karachi&t=&z=13&ie=UTF8&iwloc=&output=embed",
        occupancyStatus: "high" // can be "low", "normal", "high"
    },
    "luckyone mall": {
        types: [
            { 
                name: "Normal Parking", 
                baseRate: 150,
                color: "#3498db"
            },
            { 
                name: "Premium Parking", 
                baseRate: 200,
                color: "#f1c40f"
            },
            { 
                name: "Disabled Parking", 
                baseRate: 100,
                color: "#9b59b6"
            },
            { 
                name: "Outside Parking", 
                baseRate: 60,
                color: "#e74c3c"
            }
        ],
        mapUrl: "https://maps.google.com/maps?q=Lucky+One+Mall+Karachi&t=&z=13&ie=UTF8&iwloc=&output=embed",
        occupancyStatus: "high" // can be "low", "normal", "high"
    }
};

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
        const filteredLocations = Object.keys(parkingData).filter(location => 
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
    const locationKey = Object.keys(parkingData).find(key => location.toLowerCase().includes(key));
    if (!locationKey) {
        alert('Sorry, we do not have parking available at this location. We currently only support IBA Main Campus, IBA City Campus, and Lucky One Mall.');
        return;
    }
    
    // Calculate hours difference
    const hours = calculateHoursDifference(startTime, endTime);
    if (hours <= 0) {
        alert('End time must be after start time');
        return;
    }
    
    // Get the location data
    const locationInfo = parkingData[locationKey];
    
    // Remove any existing tokens, map and FAQs
    clearPreviousResults();
    
    // Display the map for this location
    displayGoogleMap(locationInfo.mapUrl);
    
    // Display the occupancy status
    displayOccupancyStatus(locationKey, locationInfo.occupancyStatus);
    
    // Generate tokens for each parking type at this location
    locationInfo.types.forEach((parkingType, index) => {
        // Apply occupancy pricing adjustment
        const adjustedRate = getAdjustedRate(parkingType.baseRate, locationInfo.occupancyStatus);
        const totalFee = adjustedRate * hours;
        
        // Generate a token for this parking type
        displayParkingToken(
            locationKey, 
            parkingType.name, 
            date, 
            startTime, 
            endTime, 
            hours, 
            adjustedRate, 
            totalFee,
            parkingType.color,
            index
        );
    });
    
    // Display FAQs after all tokens
    displayFAQs(locationKey);
}

// Calculate hours between two time strings (HH:MM format)
function calculateHoursDifference(startTime, endTime) {
    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    
    // If end time is earlier than start time, assume it's the next day
    const diff = end - start;
    return Math.max(0, diff / (1000 * 60 * 60));
}

// Adjust rate based on occupancy status
function getAdjustedRate(baseRate, occupancyStatus) {
    switch(occupancyStatus) {
        case "low": 
            return baseRate * 0.9; // 10% discount
        case "high": 
            return baseRate * 1.2; // 20% surcharge
        default: 
            return baseRate; // normal rate
    }
}

// Clear any previously displayed tokens, map and FAQs
function clearPreviousResults() {
    // Remove all token containers
    const tokenContainers = document.querySelectorAll('.parking-token-container');
    tokenContainers.forEach(container => container.remove());
    
    // Remove any map containers
    const mapContainer = document.getElementById('googleMapContainer');
    if (mapContainer) {
        mapContainer.remove();
    }
    
    // Remove occupancy status
    const statusContainer = document.getElementById('occupancyStatusContainer');
    if (statusContainer) {
        statusContainer.remove();
    }
    
    // Remove FAQs
    const faqContainer = document.getElementById('parkingFaqsContainer');
    if (faqContainer) {
        faqContainer.remove();
    }
}

// Display Google Map for the searched location
function displayGoogleMap(mapUrl) {
    const mapContainer = document.createElement('div');
    mapContainer.id = 'googleMapContainer';
    mapContainer.className = 'container';
    
    mapContainer.innerHTML = `
        <div class="map-wrapper">
            <h2>Location Map</h2>
            <div class="google-map">
                <iframe src="${mapUrl}" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </div>
    `;
    
    // Insert after search box
    const searchBox = document.querySelector('.search-box');
    searchBox.parentNode.insertBefore(mapContainer, searchBox.nextSibling);
}

// Display occupancy status with explanation
function displayOccupancyStatus(location, status) {
    const statusContainer = document.createElement('div');
    statusContainer.id = 'occupancyStatusContainer';
    statusContainer.className = 'container';
    
    // Format location name for display
    const displayLocation = location.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Define status text and colors
    let statusText, statusColor, explanation;
    
    switch(status) {
        case "low":
            statusText = "Low Occupancy";
            statusColor = "#2ecc71"; // Green
            explanation = "The parking area is less busy than usual. Enjoy a 10% discount on our regular rates!";
            break;
        case "high":
            statusText = "High Occupancy";
            statusColor = "#e74c3c"; // Red
            explanation = "The parking area is busier than usual. A 20% surcharge applies to our regular rates.";
            break;
        default:
            statusText = "Normal Occupancy";
            statusColor = "#f39c12"; // Orange
            explanation = "The parking area has typical occupancy levels. Standard rates apply.";
    }
    
    statusContainer.innerHTML = `
        <div class="occupancy-status">
            <h2>Current Parking Status at ${displayLocation}</h2>
            <div class="status-indicator" style="background-color: ${statusColor};">
                <span>${statusText}</span>
            </div>
            <p>${explanation}</p>
        </div>
    `;
    
    // Insert after search box but before map
    const mapContainer = document.getElementById('googleMapContainer');
    mapContainer.parentNode.insertBefore(statusContainer, mapContainer);
}

// Display a single parking token
function displayParkingToken(location, parkingType, date, startTime, endTime, hours, hourlyRate, totalFee, headerColor, index) {
    // Create token container
    const tokenContainer = document.createElement('div');
    tokenContainer.className = 'parking-token-container container';
    
    // Format the location name for display
    const displayLocation = location.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Generate a unique ID for this token
    const tokenId = `PP-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    
    // Format the token HTML with the specified color
    tokenContainer.innerHTML = `
        <div class="parking-token">
            <div class="token-header" style="background-color: ${headerColor};">
                <h2>${parkingType}</h2>
                <p class="token-id">ID: ${tokenId}</p>
            </div>
            <div class="token-content">
                <div class="token-info">
                    <p><strong>Location:</strong> ${displayLocation}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> ${startTime} to ${endTime}</p>
                    <p><strong>Duration:</strong> ${hours.toFixed(1)} hours</p>
                </div>
                <div class="token-pricing">
                    <p><strong>Rate:</strong> PKR ${hourlyRate.toFixed(0)}/hour</p>
                    <p class="token-total"><strong>Total Fee:</strong> PKR ${totalFee.toFixed(0)}</p>
                </div>
            </div>
            <div class="token-footer">
                <p>Thank you for choosing ParkPal!</p>
                <button class="btn" onclick="window.print()">Print Token</button>
                <button class="btn btn-secondary" onclick="window.location.href='card.html'">Pay Now</button>
            </div>
        </div>
    `;
    
    // Determine where to insert the token
    let referenceNode;
    if (index === 0) {
        // First token goes after the occupancy status
        referenceNode = document.getElementById('occupancyStatusContainer');
    } else {
        // Subsequent tokens go after the previous token
        const tokens = document.querySelectorAll('.parking-token-container');
        referenceNode = tokens[tokens.length - 1];
    }
    
    // Insert token after the reference node
    referenceNode.parentNode.insertBefore(tokenContainer, referenceNode.nextSibling);
}

// Display Frequently Asked Questions
function displayFAQs(location) {
    const faqContainer = document.createElement('div');
    faqContainer.id = 'parkingFaqsContainer';
    faqContainer.className = 'container';
    
    // Format the location name for display
    const displayLocation = location.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Create location-specific FAQs
    let faqs;
    switch(location) {
        case "iba main campus":
            faqs = [
                {
                    question: "What are the operating hours for parking at IBA Main Campus?",
                    answer: "Parking at IBA Main Campus is available from 7:00 AM to 10:00 PM, seven days a week."
                },
                {
                    question: "Is there a designated area for visitor parking?",
                    answer: "Yes, visitors can use the Student Parking area. Please display your printed token on your dashboard."
                },
                {
                    question: "Do I need an IBA ID to park in the Staff Parking area?",
                    answer: "Yes, you must have a valid IBA staff ID to park in the Staff Parking area. Random checks are conducted."
                },
                {
                    question: "How do I qualify for Disabled Parking?",
                    answer: "You need to display a valid disabled parking permit on your vehicle dashboard along with your ParkPal token."
                }
            ];
            break;
        case "iba city campus":
            faqs = [
                {
                    question: "Is overnight parking allowed at IBA City Campus?",
                    answer: "No, overnight parking is not permitted. All vehicles must exit by 10:00 PM."
                },
                {
                    question: "Can faculty members park in the Student Parking area?",
                    answer: "Faculty members should use the Staff Parking area. The Student Parking area is reserved for students only."
                },
                {
                    question: "Is there CCTV surveillance in the parking areas?",
                    answer: "Yes, all parking areas are monitored by CCTV cameras 24/7 for security purposes."
                },
                {
                    question: "What happens if I exceed my booked parking time?",
                    answer: "Additional charges will apply at a rate of PKR 150 per hour for any time exceeding your booking."
                }
            ];
            break;
        case "luckyone mall":
            faqs = [
                {
                    question: "What's the difference between Normal and Premium Parking?",
                    answer: "Premium Parking offers spots closer to mall entrances, wider spaces, and dedicated security personnel."
                },
                {
                    question: "Is Outside Parking covered or open-air?",
                    answer: "Outside Parking is open-air and located in the peripheral areas of the mall complex."
                },
                {
                    question: "Do mall shoppers get free parking?",
                    answer: "Shoppers with purchases over PKR 5,000 can get parking validated for up to 3 hours free at the customer service desk."
                },
                {
                    question: "Is valet parking available?",
                    answer: "Yes, valet parking is available for an additional PKR 300 fee and can be requested at the main entrance."
                }
            ];
            break;
        default:
            faqs = [
                {
                    question: "How do I cancel my parking reservation?",
                    answer: "You can cancel your reservation up to 2 hours before your scheduled time for a full refund."
                },
                {
                    question: "What payment methods are accepted?",
                    answer: "We accept all major credit/debit cards, EasyPaisa, JazzCash, and ParkPal wallet funds."
                },
                {
                    question: "Is my parking spot guaranteed?",
                    answer: "Yes, once you complete your booking, your spot is guaranteed for the reserved time period."
                },
                {
                    question: "What if I can't find parking despite having a reservation?",
                    answer: "Please contact our helpline at 0800-PARKPAL and a representative will assist you immediately."
                }
            ];
    }
    
    // Create the FAQ HTML
    let faqHTML = `
        <div class="faqs-section">
            <h2>Frequently Asked Questions - ${displayLocation}</h2>
            <div class="faq-list">
    `;
    
    // Add each FAQ item
    faqs.forEach(faq => {
        faqHTML += `
            <div class="faq-item">
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
            </div>
        `;
    });
    
    // Close the HTML structure
    faqHTML += `
            </div>
        </div>
    `;
    
    faqContainer.innerHTML = faqHTML;
    
    // Insert after the last token
    const tokens = document.querySelectorAll('.parking-token-container');
    const lastToken = tokens[tokens.length - 1];
    lastToken.parentNode.insertBefore(faqContainer, lastToken.nextSibling);
}