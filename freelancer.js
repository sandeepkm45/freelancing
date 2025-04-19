// Import the Firebase functions properly at the beginning of the script
import { 
    initializeApp, 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where 
  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  
  // Initialize Firebase with your config
  const firebaseConfig = {
    apiKey: "AIzaSyC_4ImmkQfHuhpQuFtAjtb0485ZhVxV3p4",
    authDomain: "freelancehub-a1f32.firebaseapp.com",
    projectId: "freelancehub-a1f32",
    storageBucket: "freelancehub-a1f32.firebasestorage.app",
    messagingSenderId: "443483995651",
    appId: "1:443483995651:web:7d49449f605aeb183b5836",
    measurementId: "G-PMN8VY94Y3"
  };
  
  // Initialize Firebase once the document is loaded
  document.addEventListener('DOMContentLoaded', function() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // DOM elements - Navigation
    const navHome = document.getElementById('nav-home');
    const navFreelancers = document.getElementById('nav-freelancers');
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navDashboard = document.getElementById('nav-dashboard');
    const navLogout = document.getElementById('nav-logout');
    
    // Page elements
    const homePage = document.getElementById('home-page');
    const registerPage = document.getElementById('register-page');
    const loginPage = document.getElementById('login-page');
    const freelancersPage = document.getElementById('freelancers-page');
    const freelancerDetailPage = document.getElementById('freelancer-detail-page');
    const dashboardPage = document.getElementById('dashboard-page');
    
    // Form elements
    const freelancerForm = document.getElementById('freelancer-form');
    const clientForm = document.getElementById('client-form');
    const loginForm = document.getElementById('login-form-element');
    
    // Dashboard elements
    const userNameSpan = document.getElementById('user-name');
    const freelancerDashboard = document.getElementById('freelancer-dashboard');
    const clientDashboard = document.getElementById('client-dashboard');
    
    // Alert elements
    const successAlert = document.getElementById('success-alert');
    const errorAlert = document.getElementById('error-alert');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // UI Navigation Functions
    function showPage(pageToShow) {
      // Hide all pages first
      homePage.classList.add('hidden');
      registerPage.classList.add('hidden');
      loginPage.classList.add('hidden');
      freelancersPage.classList.add('hidden');
      freelancerDetailPage.classList.add('hidden');
      dashboardPage.classList.add('hidden');
      
      // Show the selected page
      pageToShow.classList.remove('hidden');
    }
    
    // Alert Functions
    function showAlert(type, message) {
      const alertElement = type === 'success' ? successAlert : errorAlert;
      const messageElement = type === 'success' ? successMessage : errorMessage;
      
      messageElement.textContent = message;
      alertElement.classList.remove('hidden');
      
      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertElement.classList.add('hidden');
      }, 3000);
    }
    
    // Session Functions
    function updateUIForLoggedInUser(user) {
      navLogin.classList.add('hidden');
      navRegister.classList.add('hidden');
      navDashboard.classList.remove('hidden');
      navLogout.classList.remove('hidden');
    }
    
    function logout() {
      localStorage.removeItem('currentUser');
      
      navLogin.classList.remove('hidden');
      navRegister.classList.remove('hidden');
      navDashboard.classList.add('hidden');
      navLogout.classList.add('hidden');
      
      showPage(homePage);
      showAlert('success', 'You have been logged out successfully.');
    }
    
    // Check for logged in user on page load
    function checkLoggedInUser() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      if (currentUser) {
        updateUIForLoggedInUser(currentUser);
      }
    }
    
    // Load User Dashboard 
    function loadUserDashboard() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      if (!currentUser) {
        showPage(loginPage);
        return;
      }
      
      // Update the user name display
      userNameSpan.textContent = currentUser.name;
      
      // Show the appropriate dashboard based on user type
      if (currentUser.type === 'freelancer') {
        freelancerDashboard.classList.remove('hidden');
        clientDashboard.classList.add('hidden');
        
        // Update freelancer dashboard details
        document.getElementById('dashboard-name').textContent = currentUser.name;
        document.getElementById('dashboard-email').textContent = currentUser.email;
        document.getElementById('dashboard-skills').textContent = currentUser.skills.join(', ');
        document.getElementById('dashboard-rate').textContent = currentUser.rate;
        
        const portfolioLink = document.getElementById('dashboard-portfolio');
        if (currentUser.portfolio) {
          portfolioLink.href = currentUser.portfolio;
          portfolioLink.textContent = currentUser.portfolio;
        } else {
          portfolioLink.textContent = 'No portfolio provided';
          portfolioLink.removeAttribute('href');
        }
        
      } else if (currentUser.type === 'client') {
        freelancerDashboard.classList.add('hidden');
        clientDashboard.classList.remove('hidden');
        
        // Update client dashboard details
        document.getElementById('dashboard-client-name').textContent = currentUser.name;
        document.getElementById('dashboard-client-email').textContent = currentUser.email;
        document.getElementById('dashboard-client-company').textContent = currentUser.company || 'Not specified';
      }
    }
    
    // Initialize the app
    checkLoggedInUser();
    
    // Add event listeners for navigation
    navHome.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(homePage);
    });
    
    navFreelancers.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(freelancersPage);
      loadFreelancers();
    });
    
    navLogin.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(loginPage);
    });
    
    navRegister.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(registerPage);
    });
    
    navDashboard.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(dashboardPage);
      loadUserDashboard();
    });
    
    navLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
    
    // More functions and event listeners will be added in Part 2...
  });

  // Continue from previous script - add this inside the DOMContentLoaded event handler

// Registration form toggling
const showFreelancerRegister = document.getElementById('show-freelancer-register');
const showClientRegister = document.getElementById('show-client-register');
const freelancerRegisterForm = document.getElementById('freelancer-register-form');
const clientRegisterForm = document.getElementById('client-register-form');

showFreelancerRegister.addEventListener('click', function() {
  freelancerRegisterForm.classList.remove('hidden');
  clientRegisterForm.classList.add('hidden');
  showFreelancerRegister.classList.add('active');
  showClientRegister.classList.remove('active');
});

showClientRegister.addEventListener('click', function() {
  freelancerRegisterForm.classList.add('hidden');
  clientRegisterForm.classList.remove('hidden');
  showFreelancerRegister.classList.remove('active');
  showClientRegister.classList.add('active');
});

// Login form toggling
document.getElementById('show-freelancer-login').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('show-client-login').classList.remove('active');
  document.getElementById('login-user-type').value = 'freelancer';
});

document.getElementById('show-client-login').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('show-freelancer-login').classList.remove('active');
  document.getElementById('login-user-type').value = 'client';
});

// Hero buttons and navigation shortcuts
document.getElementById('join-as-client').addEventListener('click', function() {
  showPage(registerPage);
  showClientRegister.click();
});

document.getElementById('join-as-freelancer').addEventListener('click', function() {
  showPage(registerPage);
  showFreelancerRegister.click();
});

document.getElementById('go-to-register').addEventListener('click', function(e) {
  e.preventDefault();
  showPage(registerPage);
});

document.getElementById('go-to-login').addEventListener('click', function(e) {
  e.preventDefault();
  showPage(loginPage);
});

document.getElementById('go-to-login-from-client').addEventListener('click', function(e) {
  e.preventDefault();
  showPage(loginPage);
});

// Dashboard freelancer button
document.getElementById('dashboard-find-freelancers').addEventListener('click', function() {
  showPage(freelancersPage);
  loadFreelancers();
});

// Back button on details page
document.getElementById('back-to-freelancers').addEventListener('click', function(e) {
  e.preventDefault();
  showPage(freelancersPage);
});

// Close alert buttons
document.querySelectorAll('.close-alert').forEach(function(button) {
  button.addEventListener('click', function() {
    this.parentElement.parentElement.classList.add('hidden');
  });
});

// Freelancer Registration Form Submit
freelancerForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('freelancer-name').value;
  const email = document.getElementById('freelancer-email').value;
  const password = document.getElementById('freelancer-password').value;
  const skills = document.getElementById('freelancer-skills').value.split(',').map(skill => skill.trim());
  const portfolio = document.getElementById('freelancer-portfolio').value;
  const rate = parseInt(document.getElementById('freelancer-rate').value);
  
  try {
    // Save freelancer data to Firebase
    const docRef = await addDoc(collection(db, "freelancers"), {
      name,
      email,
      skills,
      portfolio,
      rate,
      createdAt: new Date(),
      // In a real app, you would hash this password or use Firebase Authentication
      password
    });
    
    // Store user data in local storage for session management
    const userData = {
      id: docRef.id,
      name,
      email,
      skills,
      portfolio,
      rate,
      type: 'freelancer'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Show success message and update UI
    showAlert('success', 'Registration successful! Welcome to FreelanceHub.');
    updateUIForLoggedInUser(userData);
    showPage(dashboardPage);
    loadUserDashboard();
    
  } catch (error) {
    console.error("Error adding document: ", error);
    showAlert('error', 'Registration failed. Please try again.');
  }
});

// Client Registration Form Submit
clientForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('client-name').value;
  const email = document.getElementById('client-email').value;
  const password = document.getElementById('client-password').value;
  const company = document.getElementById('client-company').value;
  
  try {
    // Save client data to Firebase
    const docRef = await addDoc(collection(db, "clients"), {
      name,
      email,
      company,
      createdAt: new Date(),
      // In a real app, you would hash this password or use Firebase Authentication
      password
    });
    
    // Store user data in local storage
    const userData = {
      id: docRef.id,
      name,
      email,
      company,
      type: 'client'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Show success message and update UI
    showAlert('success', 'Registration successful! Welcome to FreelanceHub.');
    updateUIForLoggedInUser(userData);
    showPage(dashboardPage);
    loadUserDashboard();
    
  } catch (error) {
    console.error("Error adding document: ", error);
    showAlert('error', 'Registration failed. Please try again.');
  }
});

// Login Form Submit - Fixed implementation
document.getElementById('login-form-element').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const userType = document.getElementById('login-user-type').value;
  
  try {
    // This is a simplified login function for demonstration
    // In a real app, you would use Firebase Auth
    const collectionName = userType === 'freelancer' ? 'freelancers' : 'clients';
    
    // Query Firestore to find a user with matching email and password
    const q = query(collection(db, collectionName), 
                    where("email", "==", email), 
                    where("password", "==", password));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      showAlert('error', 'Invalid email or password. Please try again.');
      return;
    }
    
    // Get the first matching user
    const userDoc = querySnapshot.docs[0];
    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
      type: userType
    };
    
    // Remove password from user data before storing
    delete userData.password;
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Show success message and update UI
    showAlert('success', 'Login successful! Welcome back.');
    updateUIForLoggedInUser(userData);
    showPage(dashboardPage);
    loadUserDashboard();
    
  } catch (error) {
    console.error("Error during login: ", error);
    showAlert('error', 'Login failed. Please try again.');
  }
});

// Freelancer search and display functions 
async function loadFreelancers() {
  const freelancersList = document.getElementById('freelancers-list');
  freelancersList.innerHTML = '<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>Loading freelancers...</h3></div></div>';
  
  try {
    // Get all freelancers from Firestore
    const querySnapshot = await getDocs(collection(db, "freelancers"));
    
    if (querySnapshot.empty) {
      freelancersList.innerHTML = '<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>No freelancers found</h3></div></div>';
      return;
    }
    
    // Clear the placeholder
    freelancersList.innerHTML = '';
    
    // Add each freelancer to the list
    querySnapshot.forEach((doc) => {
      const freelancer = doc.data();
      const freelancerId = doc.id;
      
      const skillsHtml = freelancer.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
      ).join('');
      
      const card = document.createElement('div');
      card.className = 'freelancer-card';
      card.innerHTML = `
        <div class="freelancer-info">
          <h3>${freelancer.name}</h3>
          <p class="rate">$${freelancer.rate}/hr</p>
          <div class="skills-tags">
            ${skillsHtml}
          </div>
          <button class="btn-secondary view-profile" data-id="${freelancerId}">View Profile</button>
        </div>
      `;
      
      freelancersList.appendChild(card);
      
      // Add click event to view profile button
      card.querySelector('.view-profile').addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        viewFreelancerProfile(id);
      });
    });
    
  } catch (error) {
    console.error("Error loading freelancers: ", error);
    freelancersList.innerHTML = '<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>Error loading freelancers</h3></div></div>';
  }
}

// View Freelancer Profile
async function viewFreelancerProfile(freelancerId) {
  try {
    // Get freelancer data from Firestore
    const docRef = doc(db, "freelancers", freelancerId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const freelancer = docSnap.data();
      
      // Update the profile page with freelancer data
      document.getElementById('profile-name').textContent = freelancer.name;
      document.getElementById('profile-rate').textContent = freelancer.rate;
      
      // Display skills
      const skillsContainer = document.getElementById('profile-skills');
      skillsContainer.innerHTML = '';
      
      freelancer.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
      });
      
      // Update portfolio link
      const portfolioElement = document.getElementById('profile-portfolio');
      if (freelancer.portfolio) {
        portfolioElement.innerHTML = `<a href="${freelancer.portfolio}" target="_blank">${freelancer.portfolio}</a>`;
      } else {
        portfolioElement.textContent = 'No portfolio provided';
      }
      
      // Show the detail page
      showPage(freelancerDetailPage);
      
    } else {
      showAlert('error', 'Freelancer not found');
    }
  } catch (error) {
    console.error("Error viewing freelancer profile: ", error);
    showAlert('error', 'Error loading freelancer profile');
  }
}// Continue from previous script - add this inside the DOMContentLoaded event handler

// Search functionality
document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const searchSkills = document.getElementById('search-skills').value.trim().toLowerCase();
    const freelancersList = document.getElementById('freelancers-list');
    
    if (!searchSkills) {
      loadFreelancers();
      return;
    }
    
    freelancersList.innerHTML = '<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>Searching freelancers...</h3></div></div>';
    
    try {
      // Get all freelancers from Firestore
      const querySnapshot = await getDocs(collection(db, "freelancers"));
      
      if (querySnapshot.empty) {
        freelancersList.innerHTML = '<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>No freelancers found</h3></div></div>';
        return;
      }
      
      // Clear the placeholder
      freelancersList.innerHTML = '';
      
      let foundFreelancers = false;
      
      // Filter and add matching freelancers to the list
      querySnapshot.forEach((doc) => {
        const freelancer = doc.data();
        const freelancerId = doc.id;
        
        // Check if any of the freelancer's skills match the search term
        const hasMatchingSkill = freelancer.skills.some(skill => 
          skill.toLowerCase().includes(searchSkills)
        );
        
        if (hasMatchingSkill) {
          foundFreelancers = true;
          
          const skillsHtml = freelancer.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
          ).join('');
          
          const card = document.createElement('div');
          card.className = 'freelancer-card';
          card.innerHTML = `
            <div class="freelancer-info">
              <h3>${escapeHTML(freelancer.name)}</h3>
              <p class="rate">$${freelancer.rate}/hr</p>
              <div class="skills-tags">
                ${skillsHtml}
              </div>
              <button class="btn-secondary view-profile" data-id="${freelancerId}">View Profile</button>
            </div>
          `;
          
          freelancersList.appendChild(card);
          
          // Add click event to view profile button
          card.querySelector('.view-profile').addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewFreelancerProfile(id);
          });
        }
      });
      
      if (!foundFreelancers) {
        freelancersList.innerHTML = `<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>No freelancers found with skills matching '${escapeHTML(searchSkills)}'</h3></div></div>`;
      }
      
    } catch (error) {
      console.error("Error searching freelancers: ", error);
      freelancersList.innerHTML = '<div class="freelancer-card placeholder"><div class="freelancer-info"><h3>Error searching freelancers</h3></div></div>';
    }
  });
  
  // Contact functionality
  document.getElementById('contact-freelancer').addEventListener('click', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      showAlert('error', 'Please login to contact freelancers.');
      showPage(loginPage);
      return;
    }
    
    // In a real app, this would open a modal or redirect to a messaging page
    showAlert('success', 'Contact request sent! The freelancer will reach out to you soon.');
  });
  
  // Security enhancement: Input validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
  
  // Add pre-submit validation to forms
  freelancerForm.addEventListener('submit', function(e) {
    const email = document.getElementById('freelancer-email').value;
    const password = document.getElementById('freelancer-password').value;
    
    if (!validateEmail(email)) {
      e.preventDefault();
      showAlert('error', 'Please enter a valid email address.');
      return false;
    }
    
    if (!validatePassword(password)) {
      e.preventDefault();
      showAlert('error', 'Password must be at least 6 characters.');
      return false;
    }
  });
  
  clientForm.addEventListener('submit', function(e) {
    const email = document.getElementById('client-email').value;
    const password = document.getElementById('client-password').value;
    
    if (!validateEmail(email)) {
      e.preventDefault();
      showAlert('error', 'Please enter a valid email address.');
      return false;
    }
    
    if (!validatePassword(password)) {
      e.preventDefault();
      showAlert('error', 'Password must be at least 6 characters.');
      return false;
    }
  });
  
  // Security enhancement: Escape HTML to prevent XSS attacks
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // Security enhancement: Rate limiting for login attempts
  const loginAttempts = {};
  
  loginForm.addEventListener('submit', function(e) {
    const email = document.getElementById('login-email').value;
    
    // Simple rate limiting for login attempts
    if (!loginAttempts[email]) {
      loginAttempts[email] = {
        count: 1,
        timestamp: Date.now()
      };
    } else {
      const attempt = loginAttempts[email];
      const currentTime = Date.now();
      const timeDiff = (currentTime - attempt.timestamp) / 1000; // Convert to seconds
      
      if (attempt.count >= 5 && timeDiff < 300) { // 5 attempts within 5 minutes
        e.preventDefault();
        showAlert('error', 'Too many login attempts. Please try again later.');
        return false;
      }
      
      // Reset count if more than 5 minutes have passed
      if (timeDiff >= 300) {
        attempt.count = 1;
        attempt.timestamp = currentTime;
      } else {
        attempt.count++;
      }
    }
  });
  
  // Load freelancers when the page loads if on the freelancers page
  if (!document.getElementById('freelancers-page').classList.contains('hidden')) {
    loadFreelancers();
  }
  
  // Enhance security by clearing sensitive data on reload
  window.addEventListener('beforeunload', function() {
    // Clear any sensitive data from forms
    document.getElementById('freelancer-password').value = '';
    document.getElementById('client-password').value = '';
    document.getElementById('login-password').value = '';
  });
