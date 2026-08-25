
        class ShowroomDeskCRM {
            constructor() {
                this.currentUser = null;
                this.userRole = null;
                this.showroomData = null;
                // Store owner credentials securely in memory (only for current session)
                this.ownerCredentials = {
                    email: null,
                    password: null
                };

                this.registrationData = {
                    step: 1,
                    showroom: {},
                    vehicleTypes: [],
                    brands: [],
                    models: {},
                    paymentMethod: 'trial'
                };

                // Razorpay live keys
                this.RAZORPAY_KEY_ID = 'rzp_live_SGLHT8GJ1V9Axy';

                // Vehicle brands database with default models
                this.vehicleBrands = {
                    car: [
                        { name: 'Maruti Suzuki', logo: 'fa-car', defaultModels: ['Swift', 'Baleno', 'Dzire', 'Vitara Brezza', 'Ertiga'] },
                        { name: 'Hyundai', logo: 'fa-car', defaultModels: ['Creta', 'i20', 'Verna', 'Venue', 'Tucson'] },
                        { name: 'Toyota', logo: 'fa-car', defaultModels: ['Fortuner', 'Innova Crysta', 'Glanza', 'Urban Cruiser'] },
                        { name: 'Mahindra', logo: 'fa-tractor', defaultModels: ['Scorpio', 'XUV700', 'Thar', 'Bolero', 'XUV300'] },
                        { name: 'Honda', logo: 'fa-car', defaultModels: ['City', 'Amaze', 'WR-V', 'Jazz'] },
                        { name: 'Tata', logo: 'fa-car', defaultModels: ['Nexon', 'Punch', 'Tiago', 'Altroz', 'Harrier'] },
                        { name: 'Kia', logo: 'fa-car', defaultModels: ['Seltos', 'Sonet', 'Carnival', 'Carens'] },
                        { name: 'MG', logo: 'fa-car', defaultModels: ['Hector', 'Astor', 'Gloster', 'ZS EV'] },
                        // NEW CAR BRANDS ADDED
                        { name: 'Ford', logo: 'fa-car', defaultModels: ['Figo', 'Aspire', 'EcoSport', 'Endeavour', 'Mustang'] },
                        { name: 'Skoda', logo: 'fa-car', defaultModels: ['Octavia', 'Superb', 'Kushaq', 'Slavia', 'Kodiaq'] },
                        { name: 'Nissan', logo: 'fa-car', defaultModels: ['Magnite', 'Kicks', 'Sunny', 'Terrano'] },
                        { name: 'Renault', logo: 'fa-car', defaultModels: ['Kwid', 'Triber', 'Kiger', 'Duster'] },
                        { name: 'Volkswagen', logo: 'fa-car', defaultModels: ['Polo', 'Vento', 'Taigun', 'Tiguan'] },
                        { name: 'Other', logo: 'fa-car', defaultModels: ['Other Model'] }
                    ],
                    bike: [
                        { name: 'Hero', logo: 'fa-motorcycle', defaultModels: ['Splendor', 'HF Deluxe', 'Passion', 'Glamour', 'Xpulse'] },
                        { name: 'Bajaj', logo: 'fa-motorcycle', defaultModels: ['Pulsar', 'Platina', 'CT 100', 'Avenger', 'Dominar'] },
                        { name: 'TVS', logo: 'fa-motorcycle', defaultModels: ['Apache', 'Jupiter', 'Ntorq', 'Sport', 'Star City'] },
                        { name: 'Royal Enfield', logo: 'fa-motorcycle', defaultModels: ['Bullet 350', 'Classic 350', 'Hunter 350', 'Meteor 350'] },
                        { name: 'Honda', logo: 'fa-motorcycle', defaultModels: ['Activa', 'Shine', 'CB Hornet', 'Livo', 'Dio'] },
                        { name: 'Suzuki', logo: 'fa-motorcycle', defaultModels: ['Access', 'Gixxer', 'Intruder', 'Burgman'] },
                        { name: 'Yamaha', logo: 'fa-motorcycle', defaultModels: ['Ray', 'Fascino', 'FZ', 'R15'] },
                        { name: 'KTM', logo: 'fa-motorcycle', defaultModels: ['Duke 200', 'Duke 390', 'RC 200', 'RC 390'] },
                        // NEW BIKE BRANDS ADDED
                        { name: 'Jawa', logo: 'fa-motorcycle', defaultModels: ['Jawa 42', 'Jawa Perak', 'Jawa Standard'] },
                        { name: 'Harley Davidson', logo: 'fa-motorcycle', defaultModels: ['Street 750', 'Iron 883', 'Fat Boy', 'Sportster'] },
                        { name: 'CFMoto', logo: 'fa-motorcycle', defaultModels: ['300NK', '650MT', '700CL-X'] },
                        { name: 'Triumph', logo: 'fa-motorcycle', defaultModels: ['Street Triple', 'Bonneville', 'Tiger 800'] },
                        { name: 'BMW', logo: 'fa-motorcycle', defaultModels: ['G 310 R', 'G 310 GS', 'S 1000 RR'] },
                        { name: 'Kawasaki', logo: 'fa-motorcycle', defaultModels: ['Ninja 300', 'Z900', 'Versys 650'] },
                        { name: 'Benelli', logo: 'fa-motorcycle', defaultModels: ['Imperiale 400', 'TRK 502', 'Leoncino 500'] },
                        { name: 'Aprilla', logo: 'fa-motorcycle', defaultModels: ['RS 660', 'Tuono 660', 'SR 160'] },
                        { name: 'Chetak', logo: 'fa-motorcycle', defaultModels: ['Chetak Classic', 'Chetak Premium'] },
                        { name: 'Oben', logo: 'fa-motorcycle', defaultModels: ['Oben Electric'] },
                        { name: 'OLA', logo: 'fa-motorcycle', defaultModels: ['S1 Pro', 'S1 Air'] },
                        { name: 'Other', logo: 'fa-motorcycle', defaultModels: ['Other Model'] }
                    ],
                    tractor: [
                        { name: 'Mahindra', logo: 'fa-tractor', defaultModels: ['Arjun 605', 'Yuvo 575', 'Jivo 245', 'Suvidha', 'Novo'] },
                        { name: 'Swaraj', logo: 'fa-tractor', defaultModels: ['735 FE', '855 FE', '744 XM', '717', '724'] },
                        { name: 'John Deere', logo: 'fa-tractor', defaultModels: ['5050 D', '5310', '5405', '6125 B', '5036 D'] },
                        { name: 'New Holland', logo: 'fa-tractor', defaultModels: ['3630 TX', '5620', '3600', '4710', '6450'] },
                        { name: 'Eicher', logo: 'fa-tractor', defaultModels: ['380', '480', '548', '651', '242'] },
                        { name: 'Massey Ferguson', logo: 'fa-tractor', defaultModels: ['1035', '241 DI', '6028', '7250'] },
                        { name: 'Kubota', logo: 'fa-tractor', defaultModels: ['MU 4501', 'MU 5501', 'L Series'] },
                        { name: 'Sonalika', logo: 'fa-tractor', defaultModels: ['GT 20', 'DI 35', 'Tiger', 'Worldtrac'] },
                        // NEW TRACTOR BRANDS ADDED
                        { name: 'Powertrac', logo: 'fa-tractor', defaultModels: ['Euro 50', '439 Plus', 'Euro 60'] },
                        { name: 'Farmtrac', logo: 'fa-tractor', defaultModels: ['60 PowerMaxx', '45 Classic', '50 Powermaxx'] },
                        { name: 'Solis', logo: 'fa-tractor', defaultModels: ['Solis 26', 'Solis 50', 'Solis 60'] },
                        { name: 'Force', logo: 'fa-tractor', defaultModels: ['Force 5055', 'Force 6065', 'Force 7070'] },
                        { name: 'ACE', logo: 'fa-tractor', defaultModels: ['ACE 60', 'ACE 45', 'ACE 50'] },
                        { name: 'VST', logo: 'fa-tractor', defaultModels: ['VST 130', 'VST 165', 'VST 180'] },
                        { name: 'Trakstar', logo: 'fa-tractor', defaultModels: ['Trakstar 45', 'Trakstar 50', 'Trakstar 60'] },
                        { name: 'Preet', logo: 'fa-tractor', defaultModels: ['Preet 6049', 'Preet 354', 'Preet 245'] },
                        { name: 'Indo Farm', logo: 'fa-tractor', defaultModels: ['Indo Farm 3035', 'Indo Farm 4035', 'Indo Farm 5035'] },
                        { name: 'Kartar', logo: 'fa-tractor', defaultModels: ['Kartar 50', 'Kartar 60', 'Kartar 45'] },
                        { name: 'Escort', logo: 'fa-tractor', defaultModels: ['Escort 380', 'Escort 480', 'Escort 580'] },
                        { name: 'Other', logo: 'fa-tractor', defaultModels: ['Other Model'] }
                    ],
                    threewheeler: [
                        { name: 'Bajaj', logo: 'fa-truck', defaultModels: ['RE 4S', 'RE Compact', 'Maxima C', 'Alox', 'Qute'] },
                        { name: 'Mahindra', logo: 'fa-truck', defaultModels: ['Alfa', 'Treo', 'Jeeto', 'Zor Grand', 'Imperio'] },
                        { name: 'Piaggio', logo: 'fa-truck', defaultModels: ['Ape City', 'Ape Xtra', 'Ape E-City'] },
                        { name: 'TVS', logo: 'fa-truck', defaultModels: ['King', 'Vikram'] },
                        { name: 'Atul', logo: 'fa-truck', defaultModels: ['Gem', 'Shakti', 'Riva'] },
                        { name: 'Force', logo: 'fa-truck', defaultModels: ['Minidor', 'Balwan'] },
                        // NEW 3-WHEELER BRANDS ADDED
                        { name: 'Kinetic Green', logo: 'fa-truck', defaultModels: ['Kinetic Safar', 'Kinetic Zing'] },
                        { name: 'Other', logo: 'fa-truck', defaultModels: ['Other Model'] }
                    ]
                };

                this.enquiries = [];
                this.interventions = [];
                this.inventory = [];
                this.team = [];
                this.currentPassword = '';
                // ADD THIS LINE HERE - after existing array initializations
                this.followupChanges = []; // Track follow-up date changes

                // Store filtered enquiries for search/filter
                this.filteredEnquiries = [];

                // Store current enquiry being edited for remarks
                this.currentRemarksEnquiry = null;

                // Store current enquiry for status update
                this.currentStatusEnquiry = null;

                // Store current enquiry for full edit
                this.currentEditEnquiry = null;

                // Store current password being viewed
                this.currentViewPassword = null;
                this.currentViewPasswordName = null;

                // Upgrade payment method
                this.upgradePaymentMethod = 'razorpay';

                // ADD THIS LINE - Track if user came from trial block
                this.isComingFromTrialBlock = false;


                this.init();
            }

            init() {
                console.log('ShowroomDesk CRM initialized');
                this.checkAuth();
                this.setupEventListeners();

                // Handle page load/reload
                window.addEventListener('load', () => {
                    this.handlePageLoad();
                });

                // Also handle when page becomes visible (for tab switches)
                document.addEventListener('visibilitychange', () => {
                    if (!document.hidden) {
                        this.handlePageLoad();
                        // Re-check blocker when tab becomes visible again
                        if (this.currentUser) {
                            this.checkAndReapplyBlocker();
                        }
                    }
                });

                // Force navigation to be visible on page load
                document.addEventListener('DOMContentLoaded', () => {
                    this.ensureNavigationVisible();
                });

                // Start trial period check interval (every minute)
                this.startTrialCheckInterval();

                // Handle browser back/forward buttons
                window.addEventListener('popstate', () => {
                    if (this.currentUser && this.isTrialFullyExpired()) {
                        this.checkAndReapplyBlocker();
                    }
                });

                // Store initial state to prevent back button bypass
                history.pushState({ trialBlocked: this.isTrialFullyExpired() }, '');
            }
            handlePageLoad() {
                console.log('Page loaded/reloaded');
                // Ensure only one section is visible
                if (this.currentUser) {
                    setTimeout(() => {
                        document.querySelectorAll('.section').forEach(section => {
                            if (!section.classList.contains('active')) {
                                section.style.display = 'none';
                            }
                        });
                    }, 200);
                }
            }


            // New method to ensure navigation is always visible
            ensureNavigationVisible() {
                const navButtons = document.querySelectorAll('.nav-btn');
                navButtons.forEach(btn => {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                    btn.style.opacity = '1';
                });

                const mainNav = document.querySelector('.main-nav');
                if (mainNav) {
                    mainNav.style.display = 'flex';
                    mainNav.style.visibility = 'visible';
                    mainNav.style.opacity = '1';
                }
            }

            setupEventListeners() {
                // Close user dropdown when clicking elsewhere
                document.addEventListener('click', (event) => {
                    if (!event.target.closest('.user-dropdown')) {
                        document.querySelectorAll('.user-dropdown').forEach(dropdown => {
                            dropdown.classList.remove('open');
                            dropdown.querySelector('.user-profile')?.setAttribute('aria-expanded', 'false');
                        });
                    }
                });

                // Navigation buttons
                document.querySelectorAll('.nav-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const section = e.currentTarget.dataset.section;
                        this.switchSection(section);
                    });
                });

                // Enquiry form
                const enquiryForm = document.getElementById('enquiry-form');
                if (enquiryForm) {
                    enquiryForm.addEventListener('submit', (e) => this.saveEnquiry(e));
                }

                // Login form
                const loginForm = document.getElementById('login-form');
                if (loginForm) {
                    loginForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        this.handleLogin();
                    });
                }

                // Add search input debounce
                const searchInput = document.getElementById('enquiry-search');
                if (searchInput) {
                    let debounceTimer;
                    searchInput.addEventListener('input', () => {
                        clearTimeout(debounceTimer);
                        debounceTimer = setTimeout(() => this.filterEnquiries(), 300);
                    });
                }

                // Password strength checker
                const passwordInput = document.getElementById('team-password');
                if (passwordInput) {
                    passwordInput.addEventListener('input', () => this.checkPasswordStrength());
                }

                // Pamphlet file upload handling
                const fileInput = document.getElementById('pamphlet-file');
                const dropZone = document.getElementById('pamphlet-drop-zone');
                const previewContainer = document.getElementById('pamphlet-file-preview');
                const previewImg = document.getElementById('pamphlet-preview-img');

                if (fileInput) {
                    fileInput.addEventListener('change', (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                previewImg.src = e.target.result;
                                previewContainer.style.display = 'block';
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }

                if (dropZone) {
                    dropZone.addEventListener('click', () => {
                        if (fileInput) fileInput.click();
                    });

                    dropZone.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        dropZone.classList.add('dragover');
                    });

                    dropZone.addEventListener('dragleave', () => {
                        dropZone.classList.remove('dragover');
                    });

                    dropZone.addEventListener('drop', (e) => {
                        e.preventDefault();
                        dropZone.classList.remove('dragover');
                        if (e.dataTransfer.files.length) {
                            fileInput.files = e.dataTransfer.files;
                            fileInput.dispatchEvent(new Event('change'));
                        }
                    });
                }

                // Message preview update
                const customMessage = document.getElementById('send-custom-message');
                if (customMessage) {
                    customMessage.addEventListener('input', () => {
                        this.updateSendMessagePreview();
                    });
                }


            }

            // ==========================================================================
            // Password Functions
            // ==========================================================================
            togglePasswordVisibility(inputId, button) {
                const input = document.getElementById(inputId);
                const icon = button.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            }

            checkPasswordStrength() {
                const password = document.getElementById('team-password').value;
                const strengthEl = document.getElementById('password-strength');

                if (!password) {
                    strengthEl.innerHTML = '';
                    return;
                }

                let strength = 0;
                let feedback = [];

                // Length check
                if (password.length >= 8) {
                    strength += 25;
                } else {
                    feedback.push('at least 8 characters');
                }

                // Uppercase check
                if (/[A-Z]/.test(password)) {
                    strength += 25;
                } else {
                    feedback.push('uppercase letter');
                }

                // Number check
                if (/\d/.test(password)) {
                    strength += 25;
                } else {
                    feedback.push('number');
                }

                // Special character check
                if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                    strength += 25;
                } else {
                    feedback.push('special character');
                }

                let strengthClass = '';
                let strengthText = '';

                if (strength <= 25) {
                    strengthClass = 'danger';
                    strengthText = 'Weak';
                } else if (strength <= 50) {
                    strengthClass = 'warning';
                    strengthText = 'Fair';
                } else if (strength <= 75) {
                    strengthClass = 'info';
                    strengthText = 'Good';
                } else {
                    strengthClass = 'success';
                    strengthText = 'Strong';
                }

                let feedbackText = '';
                if (feedback.length > 0 && strength < 100) {
                    feedbackText = ` - Add ${feedback.join(', ')}`;
                }

                strengthEl.innerHTML = `<span style="color: var(--${strengthClass})">${strengthText}${feedbackText}</span>`;
            }

            // ==========================================================================
            // Screen Navigation
            // ==========================================================================
            showLandingPage() {
                document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
                document.getElementById('landing-page').classList.add('active');
            }

            showRegistrationScreen() {
                document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
                document.getElementById('registration-screen').classList.add('active');
                this.resetRegistration();
            }

            showLoginScreen() {
                document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
                document.getElementById('login-screen').classList.add('active');
            }

            showApp() {
                // First hide all screens
                document.querySelectorAll('.screen').forEach(screen => {
                    screen.classList.remove('active');
                });

                // Show app screen
                document.getElementById('app').classList.add('active');

                // CRITICAL: Hide all sections first
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                });

                // Show only dashboard
                const dashboard = document.getElementById('dashboard');
                if (dashboard) {
                    dashboard.classList.add('active');
                    dashboard.style.display = 'block';
                }

                // Update navigation buttons
                document.querySelectorAll('.nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.section === 'dashboard') {
                        btn.classList.add('active');
                    }
                });

                // Set role class
                if (this.userRole) {
                    document.body.classList.add(`role-${this.userRole}`);
                }

                // Force navigation to show properly
                this.ensureNavigationVisible();

                // Double-check after a short delay
                setTimeout(() => {
                    document.querySelectorAll('.section').forEach(section => {
                        if (!section.classList.contains('active')) {
                            section.style.display = 'none';
                        }
                    });
                }, 100);
            }

            // New method to update UI based on role
            updateUIBasedOnRole() {
                if (this.userRole) {
                    // Remove any existing role classes
                    document.body.classList.remove('role-owner', 'role-sales', 'role-senior');
                    document.body.classList.add(`role-${this.userRole}`);

                    // Force hide/show owner-only sections
                    if (this.userRole !== 'owner') {
                        document.querySelectorAll('.owner-only').forEach(el => {
                            el.style.display = 'none';
                        });
                    } else {
                        document.querySelectorAll('.owner-only').forEach(el => {
                            el.style.display = ''; // Remove inline style to let CSS take over
                        });
                    }
                }
            }

            switchSection(sectionId) {

                if (this.isTrialExpired() && sectionId !== 'upgrade') {
                    this.blockIfTrialExpired();
                    return;
                }
                // Update navigation buttons
                document.querySelectorAll('.nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.section === sectionId) {
                        btn.classList.add('active');
                    }
                });

                // Hide all sections first
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                });

                // Show selected section
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.style.display = 'block';
                }

                // Load section-specific data
                if (sectionId === 'add-enquiry') {
                    this.loadInventoryModels();
                    this.toggleExchangeFields();
                    this.toggleBookingFields();
                } else if (sectionId === 'interventions') {
                    this.loadInterventions();
                } else if (sectionId === 'analytics') {
                    this.loadAnalytics();
                } else if (sectionId === 'reports') {
                    // Just show reports UI
                } else if (sectionId === 'inventory') {
                    this.loadInventory(true);
                } else if (sectionId === 'team' && this.userRole === 'owner') {
                    this.loadTeam();
                    this.populateSalesManagerFilter();
                } else if (sectionId === 'enquiries') {
                    this.renderEnquiriesTable();
                    this.populateSalesManagerFilter();
                } else if (sectionId === 'today') {
                    this.loadTodaySchedule();
                } else if (sectionId === 'today-hold' && this.userRole === 'owner') {
                    this.loadTodayHold(); // Refresh Today's Hold when opened
                }
                else if (sectionId === 'next-10-days') {
                    this.loadNext10Days();
                }
                else if (sectionId === 'pamphlets' && this.userRole === 'owner') {
                    this.loadPamphlets();
                }
            }
            // ==========================================================================
            // Booking Functions
            // ==========================================================================
            toggleBookingFields() {
                const status = document.getElementById('enquiry-status')?.value;
                const bookingFields = document.getElementById('booking-fields');

                if (status === 'booking') {
                    bookingFields.style.display = 'block';
                } else {
                    bookingFields.style.display = 'none';
                    document.getElementById('enquiry-booking-amount').value = '';
                }
            }

            // ==========================================================================
            // Edit Enquiry Functions - UPDATED with history
            // ==========================================================================
            showEditEnquiryModal(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) {
                    this.showToast('Enquiry not found', 'error');
                    return;
                }

                this.currentEditEnquiry = enquiry;

                // Populate the edit modal with enquiry data
                document.getElementById('edit-customer-name').textContent = enquiry.customerName || 'Unknown';
                document.getElementById('edit-phone').textContent = enquiry.phone || 'N/A';

                // Load inventory models for the model dropdown
                this.loadEditInventoryModels();

                // Set form values
                document.getElementById('edit-enquiry-model').value = enquiry.vehicleModel || '';
                document.getElementById('edit-exchange-model').value = enquiry.exchangeModel || '';
                document.getElementById('edit-status').value = enquiry.status || 'new';
                document.getElementById('edit-followup').value = enquiry.followupDate || '';
                document.getElementById('edit-remarks').value = enquiry.remarks || '';

                // Set booking amount if exists
                if (enquiry.bookingAmount) {
                    document.getElementById('edit-booking-amount').value = enquiry.bookingAmount;
                } else {
                    document.getElementById('edit-booking-amount').value = '';
                }

                // Show/hide appropriate fields based on exchange status
                this.toggleEditExchangeFields(enquiry.isExchange || false);

                // Set exchange radio buttons
                if (enquiry.isExchange) {
                    document.getElementById('edit-exchange-yes').checked = true;
                } else {
                    document.getElementById('edit-exchange-no').checked = true;
                }

                // Show/hide booking fields based on status
                this.toggleEditBookingFields();

                document.getElementById('edit-enquiry-modal').classList.add('active');
            }

            closeEditEnquiryModal() {
                document.getElementById('edit-enquiry-modal').classList.remove('active');
                this.currentEditEnquiry = null;
            }

            toggleEditExchangeFields(isExchange = null) {
                // If isExchange is not provided, get from radio buttons
                if (isExchange === null) {
                    isExchange = document.getElementById('edit-exchange-yes')?.checked || false;
                }

                const regularFields = document.getElementById('edit-regular-vehicle-fields');
                const exchangeFields = document.getElementById('edit-exchange-fields');

                if (isExchange) {
                    regularFields.style.display = 'none';
                    exchangeFields.style.display = 'block';
                } else {
                    regularFields.style.display = 'block';
                    exchangeFields.style.display = 'none';
                }
            }

            closeEditEnquiryModal() {
                document.getElementById('edit-enquiry-modal').classList.remove('active');
                this.currentEditEnquiry = null;
            }

            toggleEditExchangeFields(isExchange = null) {
                // If isExchange is not provided, get from radio buttons
                if (isExchange === null) {
                    isExchange = document.getElementById('edit-exchange-yes')?.checked || false;
                }

                const regularFields = document.getElementById('edit-regular-vehicle-fields');
                const exchangeFields = document.getElementById('edit-exchange-fields');

                if (isExchange) {
                    regularFields.style.display = 'none';
                    exchangeFields.style.display = 'block';
                } else {
                    regularFields.style.display = 'block';
                    exchangeFields.style.display = 'none';
                }
            }

            toggleEditBookingFields() {
                const status = document.getElementById('edit-status')?.value;
                const bookingFields = document.getElementById('edit-booking-fields');

                if (status === 'booking') {
                    bookingFields.style.display = 'block';
                } else {
                    bookingFields.style.display = 'none';
                }
            }

            loadEditInventoryModels() {
                const modelSelect = document.getElementById('edit-enquiry-model');
                if (!modelSelect) return;

                modelSelect.innerHTML = '<option value="">Select a model from inventory</option>';

                if (!this.inventory || this.inventory.length === 0) {
                    const option = document.createElement('option');
                    option.value = "";
                    option.disabled = true;
                    option.textContent = "No models in inventory. Please add models first.";
                    modelSelect.appendChild(option);
                    return;
                }

                // Sort models by brand and model name
                const sortedInventory = [...this.inventory].sort((a, b) => {
                    if (a.brand < b.brand) return -1;
                    if (a.brand > b.brand) return 1;
                    if (a.model < b.model) return -1;
                    if (a.model > b.model) return 1;
                    return 0;
                });

                sortedInventory.forEach(item => {
                    const option = document.createElement('option');
                    option.value = `${item.brand} ${item.model}`;
                    option.textContent = `${item.brand} ${item.model} (${item.type})`;
                    option.dataset.brand = item.brand;
                    option.dataset.model = item.model;
                    option.dataset.type = item.type;
                    modelSelect.appendChild(option);
                });

                // Add option for manual entry
                const manualOption = document.createElement('option');
                manualOption.value = "manual";
                manualOption.textContent = "→ Other (specify in remarks)";
                modelSelect.appendChild(manualOption);
            }

            // ==========================================================================
            // WhatsApp Integration
            // ==========================================================================

            openWhatsApp(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) {
                    this.showToast('Enquiry not found', 'error');
                    return;
                }

                const phone = enquiry.phone;
                if (!phone) {
                    this.showToast('Customer phone number not available', 'error');
                    return;
                }

                // Clean phone number (remove spaces, +91, etc.)
                let cleanPhone = phone.toString().replace(/\s/g, '');
                if (cleanPhone.startsWith('+')) {
                    cleanPhone = cleanPhone.substring(1);
                }
                if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
                    // Already has country code
                } else if (cleanPhone.length === 10) {
                    cleanPhone = '91' + cleanPhone;
                }

                // Create personalized message
                const customerName = enquiry.customerName || 'Valued Customer';
                const vehicleModel = enquiry.vehicleModel || (enquiry.isExchange ? enquiry.exchangeModel : 'our vehicles');
                const showroomName = this.showroomData?.name || 'our showroom';

                // Get current date for personalized greeting
                const now = new Date();
                const hour = now.getHours();
                let greeting = 'Hello';
                if (hour < 12) greeting = 'Good Morning';
                else if (hour < 17) greeting = 'Good Afternoon';
                else greeting = 'Good Evening';

                const message = `${greeting} ${customerName},

Thank you for your interest in ${vehicleModel} at ${showroomName}.

We have special offers and flexible financing options available for you!

ðŸ“ž Call us: ${this.showroomData?.phone || ''}
ðŸ“ Visit: ${this.showroomData?.address || ''}

Reply with your convenient time for a test drive.

*Offer valid for limited period!*

- Team ShowroomDesk`;

                // Encode message for URL
                const encodedMessage = encodeURIComponent(message);

                // Open WhatsApp with pre-filled message
                const waLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

                // Open in new tab
                window.open(waLink, '_blank');

                // Log the WhatsApp click
                this.logWhatsAppClick(enquiryId);
            }

            async logWhatsAppClick(enquiryId) {
                try {
                    const logRef = window.firebase.collection(window.firebase.db, 'whatsappLogs');
                    await window.firebase.addDoc(logRef, {
                        enquiryId: enquiryId,
                        sentBy: this.currentUser?.uid,
                        sentByName: document.getElementById('user-name').textContent,
                        sentAt: new Date().toISOString(),
                        showroomId: this.showroomData.id
                    });
                    console.log('WhatsApp click logged');
                } catch (error) {
                    console.error('Error logging WhatsApp click:', error);
                }
            }

            async saveEditEnquiry() {

                if (this.blockIfTrialExpired()) return;
                const status2 = this.getTrialStatus();
                if (status2.status === 'grace') {
                    this.showToast(`⚠️ Grace period active (${status.daysLeft} days left). Please upgrade to add new enquiries.`, 'warning');
                    return;
                }
                if (!this.currentEditEnquiry) {
                    this.closeEditEnquiryModal();
                    return;
                }

                const isExchange = document.getElementById('edit-exchange-yes')?.checked || false;
                const status = document.getElementById('edit-status').value;
                const newFollowupDate = document.getElementById('edit-followup').value;
                const oldFollowupDate = this.currentEditEnquiry.followupDate;
                const remarks = document.getElementById('edit-remarks').value.trim();
                const bookingAmount = document.getElementById('edit-booking-amount').value;

                // Check if follow-up date was changed AND the old date was today
                const isFollowupChanged = newFollowupDate !== oldFollowupDate;

                // NEW: Check if the old follow-up date was today
                let wasOldDateToday = false;
                if (oldFollowupDate) {
                    const oldDate = new Date(oldFollowupDate);
                    const today = new Date();
                    wasOldDateToday = oldDate.toDateString() === today.toDateString();
                }

                console.log('Edit enquiry - was old date today?', wasOldDateToday);
                console.log('Is follow-up changed?', isFollowupChanged);

                // Validate booking amount if status is booking
                if (status === 'booking' && !bookingAmount) {
                    this.showToast('Please enter booking amount', 'error');
                    return;
                }

                // Prepare update data
                const updateData = {
                    isExchange: isExchange,
                    status: status,
                    followupDate: newFollowupDate,
                    remarks: remarks,
                    updatedAt: new Date().toISOString()
                };

                // Add booking amount if status is booking
                if (status === 'booking') {
                    updateData.bookingAmount = parseFloat(bookingAmount);
                    updateData.bookingDate = new Date().toISOString();
                } else {
                    updateData.bookingAmount = null;
                }

                // Handle exchange vs regular vehicle
                if (isExchange) {
                    const exchangeModel = document.getElementById('edit-exchange-model').value.trim();
                    if (!exchangeModel) {
                        this.showToast('Please enter the exchange vehicle model', 'error');
                        return;
                    }
                    updateData.exchangeModel = exchangeModel;
                    updateData.vehicleModel = null;
                    updateData.vehicleType = 'exchange';
                } else {
                    const selectedModel = document.getElementById('edit-enquiry-model').value;

                    if (selectedModel && selectedModel !== "manual" && selectedModel !== "") {
                        updateData.vehicleModel = selectedModel;
                        const selectedOption = Array.from(document.querySelectorAll('#edit-enquiry-model option')).find(
                            opt => opt.value === selectedModel
                        );
                        if (selectedOption && selectedOption.dataset) {
                            updateData.vehicleType = selectedOption.dataset.type || 'unknown';
                            updateData.vehicleBrand = selectedOption.dataset.brand || '';
                        }
                        updateData.exchangeModel = null;
                    } else if (selectedModel === "manual") {
                        updateData.vehicleModel = "Manual entry";
                        updateData.remarks = remarks + "\nNote: Customer interested in a model not in inventory - please specify details.";
                        updateData.exchangeModel = null;
                    } else {
                        this.showToast('Please select a vehicle model', 'error');
                        return;
                    }
                }

                this.showLoading(true);

                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', this.currentEditEnquiry.id);
                    await window.firebase.updateDoc(enquiryRef, updateData);

                    // Save remarks history if remarks changed
                    if (remarks !== this.currentEditEnquiry.remarks) {
                        try {
                            const historyRef = window.firebase.collection(window.firebase.db, 'enquiries', this.currentEditEnquiry.id, 'remarksHistory');
                            await window.firebase.addDoc(historyRef, {
                                oldRemarks: this.currentEditEnquiry.remarks || '',
                                newRemarks: remarks,
                                changedBy: document.getElementById('user-name').textContent,
                                changedByUid: this.currentUser?.uid,
                                timestamp: new Date().toISOString(),
                                changeType: 'edit_enquiry'
                            });
                        } catch (historyError) {
                            console.error('Error saving remarks history:', historyError);
                        }
                    }

                    // ONLY track follow-up change if:
                    // 1. Follow-up date was changed
                    // 2. AND the old date was today (enquiry was scheduled for today)
                    if (isFollowupChanged && wasOldDateToday && oldFollowupDate) {
                        console.log('Tracking follow-up change - enquiry was scheduled for today and date changed');
                        await this.trackFollowupChange(
                            this.currentEditEnquiry.id,
                            this.currentEditEnquiry.customerName,
                            this.currentEditEnquiry.phone,
                            oldFollowupDate,
                            newFollowupDate,
                            remarks || 'Follow-up rescheduled from today'
                        );
                        await this.loadTodayHold(); // Refresh Today's Hold display
                    } else if (isFollowupChanged && !wasOldDateToday) {
                        console.log('Follow-up changed but old date was NOT today - not tracking in Today\'s Hold');
                    }

                    // Update local data
                    Object.assign(this.currentEditEnquiry, updateData);

                    this.closeEditEnquiryModal();
                    this.filterEnquiries(); // Refresh the display
                    this.updateDashboard();
                    this.showToast('Enquiry updated successfully!', 'success');

                } catch (error) {
                    console.error('Error updating enquiry:', error);
                    this.showToast('Error updating enquiry: ' + error.message, 'error');
                } finally {
                    this.showLoading(false);
                }
            }


            async trackFollowupChange(enquiryId, customerName, phone, oldDate, newDate, reason) {
                console.log('Tracking follow-up change (from today to future)...');

                try {
                    const changeData = {
                        enquiryId: enquiryId,
                        customerName: customerName,
                        phone: phone,
                        oldFollowupDate: oldDate,
                        newFollowupDate: newDate,
                        changedBy: document.getElementById('user-name').textContent,
                        changedByUid: this.currentUser?.uid,
                        changedByRole: this.userRole,
                        changedAt: new Date().toISOString(),
                        reason: reason || 'Follow-up rescheduled from today',
                        changeType: 'today_reschedule',
                        showroomId: this.showroomData.id, // CRITICAL: Add showroomId for isolation
                        status: 'pending'
                    };

                    console.log('Saving to Firebase with showroomId:', this.showroomData.id);

                    const holdRef = window.firebase.collection(window.firebase.db, 'followupChanges');
                    const docRef = await window.firebase.addDoc(holdRef, changeData);

                    console.log('Saved with ID:', docRef.id);

                    this.followupChanges.unshift({ id: docRef.id, ...changeData });
                    this.updateTodayHoldBadge();
                    this.renderTodayHold();

                } catch (error) {
                    console.error('Error tracking follow-up change:', error);
                }
            }


            // ==========================================================================
            // Status Update Functions - FIXED null error
            // ==========================================================================
            showStatusUpdateModal(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) {
                    this.showToast('Enquiry not found', 'error');
                    return;
                }

                this.currentStatusEnquiry = enquiry;

                // Safely set customer name
                const customerNameEl = document.getElementById('status-customer-name');
                if (customerNameEl) {
                    customerNameEl.textContent = enquiry.customerName || 'Unknown';
                } else {
                    console.warn('status-customer-name element not found');
                }

                // Safely set current status
                const currentStatusEl = document.getElementById('current-status');
                if (currentStatusEl) {
                    currentStatusEl.value = enquiry.status || 'new';
                } else {
                    console.warn('current-status element not found');
                }

                // Safely set new status dropdown
                const newStatusEl = document.getElementById('new-status');
                if (newStatusEl) {
                    newStatusEl.value = enquiry.status || 'new';
                } else {
                    console.warn('new-status element not found');
                }

                // Safely set remarks field
                const statusRemarksEl = document.getElementById('status-remarks');
                if (statusRemarksEl) {
                    statusRemarksEl.value = '';
                } else {
                    console.warn('status-remarks element not found');
                }

                // Handle booking fields
                if (enquiry.status === 'booking') {
                    const statusBookingAmountEl = document.getElementById('status-booking-amount');
                    if (statusBookingAmountEl) {
                        statusBookingAmountEl.value = enquiry.bookingAmount || '';
                    }

                    const statusBookingFieldsEl = document.getElementById('status-booking-fields');
                    if (statusBookingFieldsEl) {
                        statusBookingFieldsEl.style.display = 'block';
                    }
                } else {
                    const statusBookingFieldsEl = document.getElementById('status-booking-fields');
                    if (statusBookingFieldsEl) {
                        statusBookingFieldsEl.style.display = 'none';
                    }
                }

                // Show the modal
                const modal = document.getElementById('status-update-modal');
                if (modal) {
                    modal.classList.add('active');
                } else {
                    console.error('status-update-modal element not found');
                    this.showToast('Error: Status update modal not found', 'error');
                }
            }

            closeStatusModal() {
                const modal = document.getElementById('status-update-modal');
                if (modal) {
                    modal.classList.remove('active');
                }
                this.currentStatusEnquiry = null;
            }

            async saveStatusUpdate() {
                if (!this.currentStatusEnquiry) {
                    this.closeStatusModal();
                    return;
                }

                // Safely get form values with null checks
                const newStatusSelect = document.getElementById('new-status');
                const newStatus = newStatusSelect ? newStatusSelect.value : 'new';

                const remarksTextarea = document.getElementById('status-remarks');
                const remarks = remarksTextarea ? remarksTextarea.value.trim() : '';

                const bookingAmountInput = document.getElementById('status-booking-amount');
                const bookingAmount = bookingAmountInput ? bookingAmountInput.value : '';

                // Validate booking amount if status is booking
                if (newStatus === 'booking' && !bookingAmount) {
                    this.showToast('Please enter booking amount', 'error');
                    return;
                }

                try {
                    const updateData = {
                        status: newStatus,
                        updatedAt: new Date().toISOString()
                    };

                    // Add booking amount if status is booking
                    if (newStatus === 'booking') {
                        updateData.bookingAmount = parseFloat(bookingAmount);
                        updateData.bookingDate = new Date().toISOString();
                    } else {
                        // Remove booking amount if status is not booking
                        updateData.bookingAmount = null;
                    }

                    // Add remarks if provided
                    if (remarks) {
                        updateData.remarks = this.currentStatusEnquiry.remarks
                            ? this.currentStatusEnquiry.remarks + '\n' + remarks
                            : remarks;
                    }

                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', this.currentStatusEnquiry.id);
                    await window.firebase.updateDoc(enquiryRef, updateData);

                    // Update local data
                    this.currentStatusEnquiry.status = newStatus;
                    if (newStatus === 'booking') {
                        this.currentStatusEnquiry.bookingAmount = parseFloat(bookingAmount);
                        this.currentStatusEnquiry.bookingDate = new Date().toISOString();
                    } else {
                        delete this.currentStatusEnquiry.bookingAmount;
                    }

                    if (remarks) {
                        this.currentStatusEnquiry.remarks = updateData.remarks;
                    }

                    this.closeStatusModal();
                    this.filterEnquiries(); // Refresh the display
                    this.updateDashboard();
                    this.showToast('Status updated successfully!', 'success');

                } catch (error) {
                    console.error('Error updating status:', error);
                    this.showToast('Error updating status: ' + error.message, 'error');
                }
            }

            toggleStatusBookingFields() {
                // Safely get the status select element
                const statusSelect = document.getElementById('new-status');
                if (!statusSelect) {
                    console.warn('new-status element not found in toggleStatusBookingFields');
                    return;
                }

                const status = statusSelect.value;

                // Safely get the booking fields container
                const bookingFields = document.getElementById('status-booking-fields');
                if (!bookingFields) {
                    console.warn('status-booking-fields element not found');
                    return;
                }

                // Show/hide based on status
                if (status === 'booking') {
                    bookingFields.style.display = 'block';
                } else {
                    bookingFields.style.display = 'none';

                    // Safely clear the booking amount input if it exists
                    const bookingAmountInput = document.getElementById('status-booking-amount');
                    if (bookingAmountInput) {
                        bookingAmountInput.value = '';
                    }
                }
            }

            // ==========================================================================
            // Subscription and Upgrade Functions - UPDATED with trial days
            // ==========================================================================
            // ==========================================================================
            // Subscription and Upgrade Functions - UPDATED with trial days
            // ==========================================================================
            // ==========================================================================
            // Subscription and Upgrade Functions - FIXED trial days display
            // ==========================================================================
            updateSubscriptionDisplay() {
                const statusEl = document.getElementById('subscription-status');
                const expiryEl = document.getElementById('subscription-expiry');
                const bannerUpgradeBtn = document.querySelector('.subscription-actions .btn-upgrade'); // The button in the middle bar

                if (!this.showroomData || !this.showroomData.subscription) {
                    if (statusEl) statusEl.textContent = 'No subscription';
                    if (expiryEl) expiryEl.textContent = '';
                    if (bannerUpgradeBtn) {
                        bannerUpgradeBtn.innerHTML = '<i class="fas fa-rocket"></i> Upgrade Now';
                        bannerUpgradeBtn.onclick = () => this.showUpgradeModal();
                    }
                    this.updateUpgradeButtonText();
                    return;
                }

                const sub = this.showroomData.subscription;

                // Handle date properly
                let endDate;
                if (sub.endDate) {
                    if (sub.endDate.toDate) {
                        endDate = sub.endDate.toDate();
                    } else if (sub.endDate.seconds) {
                        endDate = new Date(sub.endDate.seconds * 1000);
                    } else {
                        endDate = new Date(sub.endDate);
                    }
                } else {
                    endDate = new Date();
                }

                const today = new Date();
                const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

                // Get payment status from subscription
                const paymentStatus = sub.paymentStatus || 'unpaid';
                const planType = sub.planType || 'trial';

                // Update top right button
                this.updateUpgradeButtonText(planType, daysLeft, paymentStatus);

                // Update subscription banner
                // Inside updateSubscriptionDisplay method, update the trial section
                // Inside updateSubscriptionDisplay method, update the trial section
                if (planType === 'trial') {
                    const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

                    if (daysLeft < 0) {
                        // Trial expired - show expired status
                        if (statusEl) {
                            statusEl.innerHTML = `<i class="fas fa-hourglass-end" style="color: var(--danger);"></i> Trial Expired - Please Upgrade`;
                            statusEl.style.color = 'var(--danger)';
                        }
                        if (expiryEl) expiryEl.textContent = `Expired on ${endDate.toLocaleDateString()}`;
                        if (bannerUpgradeBtn) {
                            bannerUpgradeBtn.innerHTML = '<i class="fas fa-crown"></i> Upgrade Now';
                            bannerUpgradeBtn.style.background = '#e71d36';
                            bannerUpgradeBtn.style.cursor = 'pointer';
                            bannerUpgradeBtn.onclick = () => this.showUpgradeModal();
                        }
                    } else if (daysLeft <= 3) {
                        // Trial ending soon - warning
                        if (statusEl) {
                            statusEl.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i> Trial Ends in ${daysLeft} days!`;
                        }
                        if (expiryEl) expiryEl.textContent = `Expires on ${endDate.toLocaleDateString()}`;
                        if (bannerUpgradeBtn) {
                            bannerUpgradeBtn.innerHTML = '<i class="fas fa-rocket"></i> Upgrade Now';
                            bannerUpgradeBtn.style.background = '#f59e0b';
                            bannerUpgradeBtn.onclick = () => this.showUpgradeModal();
                        }
                    } else {
                        // Normal trial
                        if (statusEl) statusEl.innerHTML = `<i class="fas fa-gift"></i> Trial Period - ${daysLeft} days left`;
                        if (expiryEl) expiryEl.textContent = `Expires on ${endDate.toLocaleDateString()}`;
                        if (bannerUpgradeBtn) {
                            bannerUpgradeBtn.innerHTML = '<i class="fas fa-rocket"></i> Upgrade Now';
                            bannerUpgradeBtn.onclick = () => this.showUpgradeModal();
                        }
                    }
                } else if (planType === 'paid') {
                    if (paymentStatus === 'paid') {
                        // Fully paid active plan
                        if (statusEl) statusEl.innerHTML = `<i class="fas fa-crown" style="color: gold;"></i> Active Plan - ₹${sub.price || 999}/month`;
                        if (expiryEl) expiryEl.textContent = `Renews on ${endDate.toLocaleDateString()}`;

                        // Update banner button based on days left
                        if (bannerUpgradeBtn) {
                            if (daysLeft <= 10) {
                                // Less than 10 days left - show Renew button
                                bannerUpgradeBtn.innerHTML = `<i class="fas fa-sync-alt"></i> Renew Now (${daysLeft} days left)`;
                                bannerUpgradeBtn.style.background = '#f59e0b';
                                bannerUpgradeBtn.onclick = () => this.showRenewModal();
                            } else {
                                // More than 10 days left - HIDE the button or change to non-clickable
                                bannerUpgradeBtn.style.display = 'none'; // Hide it completely
                                // OR if you want to keep it visible but non-clickable:
                                // bannerUpgradeBtn.innerHTML = '<i class="fas fa-check"></i> Active';
                                // bannerUpgradeBtn.style.background = '#10b981';
                                // bannerUpgradeBtn.style.cursor = 'default';
                                // bannerUpgradeBtn.onclick = null;
                            }
                        }
                    } else {
                        // Active plan but payment pending
                        if (statusEl) statusEl.innerHTML = `<i class="fas fa-clock" style="color: #f59e0b;"></i> Payment Pending - Plan Ready`;
                        if (expiryEl) expiryEl.textContent = `Valid from ${new Date(sub.startDate).toLocaleDateString()}`;
                        if (bannerUpgradeBtn) {
                            bannerUpgradeBtn.innerHTML = '<i class="fas fa-clock"></i> Payment Pending';
                            bannerUpgradeBtn.style.background = '#f59e0b';
                            bannerUpgradeBtn.style.cursor = 'default';
                            bannerUpgradeBtn.onclick = null;
                        }
                    }
                }
            }

            // ==========================================================================
            // Trial Expiration - Complete Blocker (Blocks after trial + 5 days)
            // ==========================================================================

            isTrialFullyExpired() {
                // REMOVED the owner check - now blocks ALL users
                // if (this.userRole !== 'owner') return false;

                if (!this.showroomData || !this.showroomData.subscription) return false;

                const subscription = this.showroomData.subscription;

                // Check if it's a trial subscription
                const isTrial = subscription.planType === 'trial' || subscription.status === 'trial';

                if (!isTrial) return false;

                // Get trial end date
                let endDate = null;
                if (subscription.endDate) {
                    if (subscription.endDate.toDate) {
                        endDate = subscription.endDate.toDate();
                    } else if (subscription.endDate.seconds) {
                        endDate = new Date(subscription.endDate.seconds * 1000);
                    } else {
                        endDate = new Date(subscription.endDate);
                    }
                }

                if (!endDate) return false;

                const today = new Date();
                const daysAfterExpiry = Math.ceil((today - endDate) / (1000 * 60 * 60 * 24));

                // Block after trial ends AND 5+ days have passed for ALL users
                const isFullyExpired = daysAfterExpiry >= 6;

                return isFullyExpired;
            }

            getTrialStatus() {
                if (this.userRole !== 'owner') return { status: 'active', daysLeft: 999 };

                if (!this.showroomData || !this.showroomData.subscription) {
                    return { status: 'active', daysLeft: 999 };
                }

                const subscription = this.showroomData.subscription;
                const isTrial = subscription.planType === 'trial' || subscription.status === 'trial';

                if (!isTrial) return { status: 'paid', daysLeft: 999 };

                let endDate = null;
                if (subscription.endDate) {
                    if (subscription.endDate.toDate) {
                        endDate = subscription.endDate.toDate();
                    } else if (subscription.endDate.seconds) {
                        endDate = new Date(subscription.endDate.seconds * 1000);
                    } else {
                        endDate = new Date(subscription.endDate);
                    }
                }

                if (!endDate) return { status: 'active', daysLeft: 999 };

                const today = new Date();
                const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
                const daysAfterExpiry = Math.ceil((today - endDate) / (1000 * 60 * 60 * 24));

                if (daysLeft > 0) {
                    return { status: 'active', daysLeft: daysLeft };
                } else if (daysAfterExpiry >= 1 && daysAfterExpiry <= 5) {
                    return { status: 'grace', daysOverdue: daysAfterExpiry, daysLeft: 5 - daysAfterExpiry + 1 };
                } else {
                    return { status: 'expired', daysOverdue: daysAfterExpiry };
                }
            }

            showTrialExpiredBlockScreen() {
                // Remove any existing blocker
                const existingBlocker = document.getElementById('trial-blocker-overlay');
                if (existingBlocker) return;

                // Don't show blocker if user is currently in upgrade modal
                const upgradeModal = document.getElementById('upgrade-modal');
                if (upgradeModal && upgradeModal.classList.contains('active')) {
                    return;
                }

                const status = this.getTrialStatus();

                // Create full-screen blocker
                const blockerHTML = `
        <div id="trial-blocker-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: var(--bg-card);
                border-radius: var(--radius-xl);
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: var(--shadow-xl);
                border: 2px solid var(--danger);
                animation: fadeIn 0.3s ease;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: rgba(231, 29, 54, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                ">
                    <i class="fas fa-lock" style="font-size: 3rem; color: var(--danger);"></i>
                </div>
                <h2 style="color: var(--danger); margin-bottom: 1rem;">Access Locked</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">
                    Your 30-day free trial has ended and the 5-day grace period has expired.<br><br>
                    <strong>Trial ended on: ${this.getTrialEndDate()}</strong><br><br>
                    Please upgrade immediately to regain access to your showroom data.
                </p>
                <button id="upgrade-blocker-btn" class="btn-upgrade" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: var(--radius-full);
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-top: 0.5rem;
                ">
                    <i class="fas fa-crown"></i> Upgrade to Premium
                </button>
                <p style="color: var(--text-light); font-size: 0.75rem; margin-top: 1.5rem;">
                    Contact support: support@showroomdesk.com
                </p>
            </div>
        </div>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        </style>
    `;

                document.body.insertAdjacentHTML('beforeend', blockerHTML);

                // Add click handler for upgrade button
                const upgradeBtn = document.getElementById('upgrade-blocker-btn');
                if (upgradeBtn) {
                    upgradeBtn.onclick = () => {
                        // Remove blocker temporarily to show upgrade modal
                        this.removeTrialBlockerScreen();
                        this.showUpgradeModal();
                    };
                }

                // Disable all interactive elements on the page
                this.disableAllInteractions();
            }

            getTrialEndDate() {
                if (!this.showroomData || !this.showroomData.subscription) return 'Unknown';

                const subscription = this.showroomData.subscription;
                let endDate = null;

                if (subscription.endDate) {
                    if (subscription.endDate.toDate) {
                        endDate = subscription.endDate.toDate();
                    } else if (subscription.endDate.seconds) {
                        endDate = new Date(subscription.endDate.seconds * 1000);
                    } else {
                        endDate = new Date(subscription.endDate);
                    }
                }

                return endDate ? endDate.toLocaleDateString() : 'Unknown';
            }

            removeTrialBlockerScreen() {
                const blocker = document.getElementById('trial-blocker-overlay');
                if (blocker) blocker.remove();
                this.enableAllInteractions();
            }

            disableAllInteractions() {
                // Store current page scroll position
                document.body.style.overflow = 'hidden';

                // Disable all buttons
                document.querySelectorAll('button, .nav-btn, .btn, .user-profile, .dropdown-item').forEach(el => {
                    if (!el.closest('#trial-blocker-overlay')) {
                        el.disabled = true;
                        el.style.pointerEvents = 'none';
                    }
                });

                // Disable all form inputs
                document.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = true;
                });

                // Disable all clickable rows
                document.querySelectorAll('.data-table tbody tr, .followup-item, .intervention-item, .day-header, .brand-header').forEach(el => {
                    el.style.pointerEvents = 'none';
                    el.style.cursor = 'not-allowed';
                });

                // Disable navigation
                document.querySelectorAll('.main-nav, .nav-btn').forEach(el => {
                    el.style.pointerEvents = 'none';
                    el.style.opacity = '0.5';
                });
            }

            enableAllInteractions() {
                document.body.style.overflow = '';

                // Re-enable all buttons
                document.querySelectorAll('button, .nav-btn, .btn, .user-profile, .dropdown-item').forEach(el => {
                    el.disabled = false;
                    el.style.pointerEvents = '';
                    el.style.opacity = '';
                });

                // Re-enable all form inputs
                document.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = false;
                });

                // Re-enable all clickable rows
                document.querySelectorAll('.data-table tbody tr, .followup-item, .intervention-item, .day-header, .brand-header').forEach(el => {
                    el.style.pointerEvents = '';
                    el.style.cursor = '';
                });

                // Re-enable navigation
                document.querySelectorAll('.main-nav, .nav-btn').forEach(el => {
                    el.style.pointerEvents = '';
                    el.style.opacity = '';
                });
            }

            blockIfTrialFullyExpired() {
                if (this.isTrialFullyExpired()) {
                    this.showTrialExpiredBlockScreen();
                    return true;
                }
                return false;
            }

            showGracePeriodWarning() {
                const status = this.getTrialStatus();

                if (status.status === 'grace') {
                    // Remove existing warning
                    const existingWarning = document.getElementById('grace-warning');
                    if (existingWarning) existingWarning.remove();

                    const warningHTML = `
            <div id="grace-warning" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #f59e0b, #ea580c);
                color: white;
                padding: 0.75rem;
                text-align: center;
                z-index: 10000;
                animation: slideDown 0.5s ease;
            ">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <div>
                        <i class="fas fa-hourglass-half"></i>
                        <strong>⚠️ Grace Period: ${status.daysLeft} day${status.daysLeft !== 1 ? 's' : ''} remaining!</strong>
                        Your trial ended ${status.daysOverdue} day${status.daysOverdue !== 1 ? 's' : ''} ago. 
                        After ${status.daysLeft} days, access will be locked.
                    </div>
                    <button id="grace-upgrade-btn" class="btn-upgrade" style="
                        background: white;
                        color: #ea580c;
                        padding: 0.5rem 1.5rem;
                        font-size: 0.875rem;
                        border-radius: var(--radius-full);
                        cursor: pointer;
                        border: none;
                        font-weight: 600;
                    ">
                        <i class="fas fa-crown"></i> Upgrade Now
                    </button>
                </div>
            </div>
            <style>
                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
            </style>
        `;

                    document.body.insertAdjacentHTML('afterbegin', warningHTML);

                    const upgradeBtn = document.getElementById('grace-upgrade-btn');
                    if (upgradeBtn) {
                        upgradeBtn.onclick = () => this.showUpgradeModal();
                    }
                }
            }

            enableGracePeriodChecks() {
                // Override action methods during grace period
                const self = this;

                // Check before any save operation
                const originalSaveEnquiry = this.saveEnquiry;
                this.saveEnquiry = async function (e) {
                    const status = self.getTrialStatus();
                    if (status.status === 'grace') {
                        self.showToast(`⚠️ Grace period active! Please upgrade to add new enquiries. ${status.daysLeft} days left before access is locked.`, 'warning');
                        return;
                    }
                    return originalSaveEnquiry.call(self, e);
                };
            }

            // ==========================================================================
            // Trial Expiration - Action Blocker
            // ==========================================================================

            isTrialExpired() {
                // Only check for owners
                if (this.userRole !== 'owner') return false;

                if (!this.showroomData || !this.showroomData.subscription) return false;

                const subscription = this.showroomData.subscription;

                // Check if it's a trial subscription
                const isTrial = subscription.planType === 'trial' || subscription.status === 'trial';

                if (!isTrial) return false;

                // Get trial end date
                let endDate = null;
                if (subscription.endDate) {
                    if (subscription.endDate.toDate) {
                        endDate = subscription.endDate.toDate();
                    } else if (subscription.endDate.seconds) {
                        endDate = new Date(subscription.endDate.seconds * 1000);
                    } else {
                        endDate = new Date(subscription.endDate);
                    }
                }

                if (!endDate) return false;

                const today = new Date();
                const isExpired = today > endDate;

                return isExpired;
            }

            blockIfTrialExpired() {
                if (this.isTrialExpired()) {
                    this.showTrialExpiredBlockScreen();
                    return true;
                }
                return false;
            }

            showTrialExpiredBlockScreen() {
                // Remove any existing blocker
                const existingBlocker = document.getElementById('trial-blocker-overlay');
                if (existingBlocker) return;

                // Create full-screen blocker
                const blockerHTML = `
        <div id="trial-blocker-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: var(--bg-card);
                border-radius: var(--radius-xl);
                padding: 2rem;
                max-width: 450px;
                width: 90%;
                text-align: center;
                box-shadow: var(--shadow-xl);
                border: 2px solid var(--danger);
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: rgba(231, 29, 54, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                ">
                    <i class="fas fa-hourglass-end" style="font-size: 3rem; color: var(--danger);"></i>
                </div>
                <h2 style="color: var(--danger); margin-bottom: 1rem;">Trial Period Ended</h2>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
                    Your 30-day free trial expired on <strong>${new Date().toLocaleDateString()}</strong>.<br>
                    Please upgrade to premium to continue using ShowroomDesk.
                </p>
                <button id="upgrade-blocker-btn" class="btn-upgrade" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: var(--radius-full);
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                ">
                    <i class="fas fa-crown"></i> Upgrade to Premium
                </button>
            </div>
        </div>
    `;

                document.body.insertAdjacentHTML('beforeend', blockerHTML);

                // Add click handler for upgrade button
                const upgradeBtn = document.getElementById('upgrade-blocker-btn');
                if (upgradeBtn) {
                    upgradeBtn.onclick = () => {
                        this.removeTrialBlockerScreen();
                        this.showUpgradeModal();
                    };
                }

                // Disable all interactive elements on the page
                this.disableAllInteractions();
            }

            removeTrialBlockerScreen() {
                const blocker = document.getElementById('trial-blocker-overlay');
                if (blocker) blocker.remove();
                this.enableAllInteractions();
            }

            disableAllInteractions() {
                // Store current page scroll position
                document.body.style.overflow = 'hidden';

                // Disable all buttons
                document.querySelectorAll('button, .nav-btn, .btn, .user-profile, .dropdown-item').forEach(el => {
                    if (!el.closest('#trial-blocker-overlay')) {
                        el.disabled = true;
                        el.style.pointerEvents = 'none';
                    }
                });

                // Disable all form inputs
                document.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = true;
                });

                // Disable all clickable rows
                document.querySelectorAll('.data-table tbody tr, .followup-item, .intervention-item').forEach(el => {
                    el.style.pointerEvents = 'none';
                });
            }

            enableAllInteractions() {
                document.body.style.overflow = '';

                // Re-enable all buttons
                document.querySelectorAll('button, .nav-btn, .btn, .user-profile, .dropdown-item').forEach(el => {
                    el.disabled = false;
                    el.style.pointerEvents = '';
                });

                // Re-enable all form inputs
                document.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = false;
                });

                // Re-enable all clickable rows
                document.querySelectorAll('.data-table tbody tr, .followup-item, .intervention-item').forEach(el => {
                    el.style.pointerEvents = '';
                });
            }

            startTrialCheckInterval() {
                // Check trial every 30 seconds
                setInterval(() => {
                    if (this.currentUser && this.userRole === 'owner') {
                        const status = this.getTrialStatus();

                        if (status.status === 'expired') {
                            this.blockIfTrialFullyExpired();
                        } else if (status.status === 'grace') {
                            this.showGracePeriodWarning();
                        }
                    }
                }, 30000);
            }

            // ==========================================================================
            // Trial Period Expiration Handler
            // ==========================================================================

            // ==========================================================================
            // Enhanced Trial Period Handler with 5-Day Grace Period
            // ==========================================================================

            checkTrialExpiration() {
                // Only check for owners
                if (this.userRole !== 'owner') return false;

                if (!this.showroomData || !this.showroomData.subscription) return false;

                const subscription = this.showroomData.subscription;

                // Check if it's a trial subscription
                const isTrial = subscription.planType === 'trial' || subscription.status === 'trial';

                if (!isTrial) {
                    // Paid user - ensure full access
                    this.removeTrialRestrictions();
                    return false;
                }

                // Get trial end date
                let endDate = null;
                if (subscription.endDate) {
                    if (subscription.endDate.toDate) {
                        endDate = subscription.endDate.toDate();
                    } else if (subscription.endDate.seconds) {
                        endDate = new Date(subscription.endDate.seconds * 1000);
                    } else {
                        endDate = new Date(subscription.endDate);
                    }
                } else if (subscription.trialEnds) {
                    if (subscription.trialEnds.toDate) {
                        endDate = subscription.trialEnds.toDate();
                    } else {
                        endDate = new Date(subscription.trialEnds);
                    }
                }

                if (!endDate) return false;

                const today = new Date();
                const daysAfterExpiry = Math.ceil((today - endDate) / (1000 * 60 * 60 * 24));
                const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

                // CASE 1: Trial not started yet (should not happen)
                if (daysLeft > 30) return false;

                // CASE 2: Within trial period
                if (daysLeft > 0) {
                    this.showTrialActive(daysLeft);
                    return false;
                }

                // CASE 3: Grace period (1-5 days after expiry)
                if (daysAfterExpiry >= 1 && daysAfterExpiry <= 5) {
                    this.showGracePeriod(daysAfterExpiry);
                    return true;
                }

                // CASE 4: Fully expired (more than 5 days after expiry)
                if (daysAfterExpiry > 5) {
                    this.showFullyExpired();
                    return true;
                }

                return false;
            }

            showTrialActive(daysLeft) {
                // Normal trial - full access
                this.removeTrialRestrictions();

                // Show warning if ending soon
                if (daysLeft <= 3) {
                    this.showToast(`⚠️ Your trial ends in ${daysLeft} days! Upgrade to avoid interruption.`, 'warning');
                }
            }

            showGracePeriod(daysOverdue) {
                const daysLeft = 5 - daysOverdue + 1;

                // Enable read-only mode
                this.activateReadOnlyMode();

                // Create grace period notification
                const existingNotification = document.getElementById('grace-period-notification');
                if (existingNotification) return;

                const notificationHTML = `
        <div id="grace-period-notification" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            color: white;
            padding: 0.75rem;
            text-align: center;
            z-index: 10000;
            animation: slideDown 0.5s ease;
        ">
            <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                <div>
                    <i class="fas fa-hourglass-half"></i>
                    <strong> Grace Period: ${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining!</strong>
                    Your trial ended on ${new Date().toLocaleDateString()}. You can view data but cannot add/edit.
                </div>
                <button class="btn-upgrade" onclick="app.showUpgradeModal()" style="
                    background: white;
                    color: #ea580c;
                    padding: 0.5rem 1.5rem;
                    font-size: 0.875rem;
                ">
                    <i class="fas fa-crown"></i> Upgrade Now
                </button>
            </div>
        </div>
        <style>
            @keyframes slideDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
        </style>
    `;

                document.body.insertAdjacentHTML('afterbegin', notificationHTML);

                // Update subscription banner
                const statusEl = document.getElementById('subscription-status');
                if (statusEl) {
                    statusEl.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Grace Period: ${daysLeft} days left! Read-only mode.`;
                    statusEl.style.color = '#ea580c';
                }
            }

            showFullyExpired() {
                // Block all activities completely
                this.activateFullBlocker();

                // Remove grace period notification if exists
                const notification = document.getElementById('grace-period-notification');
                if (notification) notification.remove();

                // Show expired modal
                const existingModal = document.getElementById('fully-expired-modal');
                if (existingModal) return;

                const modalHTML = `
        <div id="fully-expired-modal" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-card);
            border-radius: var(--radius-lg);
            padding: 2rem;
            max-width: 450px;
            width: 90%;
            text-align: center;
            z-index: 100000;
            box-shadow: var(--shadow-xl);
            border: 2px solid var(--danger);
        ">
            <div style="width: 80px; height: 80px; background: rgba(231, 29, 54, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <i class="fas fa-lock" style="font-size: 3rem; color: var(--danger);"></i>
            </div>
            <h2 style="color: var(--danger); margin-bottom: 1rem;">Access Locked</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Your trial period has ended and the 5-day grace period has expired. 
                Please upgrade immediately to regain access to your showroom data.
            </p>
            <button id="upgrade-from-expired" class="btn-upgrade" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                border-radius: var(--radius-full);
                cursor: pointer;
            ">
                <i class="fas fa-crown"></i> Upgrade Now
            </button>
        </div>
        <div id="expired-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 99999;
        "></div>
    `;

                document.body.insertAdjacentHTML('beforeend', modalHTML);

                const upgradeBtn = document.getElementById('upgrade-from-expired');
                if (upgradeBtn) {
                    upgradeBtn.onclick = () => {
                        this.removeExpiredModal();
                        this.showUpgradeModal();
                    };
                }
            }

            removeExpiredModal() {
                const modal = document.getElementById('fully-expired-modal');
                const overlay = document.getElementById('expired-overlay');
                if (modal) modal.remove();
                if (overlay) overlay.remove();
            }

            activateReadOnlyMode() {
                // Disable all add/edit/delete buttons but keep view functionality

                // Disable Add Enquiry button
                const addEnquiryBtn = document.querySelector('.btn-primary[onclick*="add-enquiry"]');
                if (addEnquiryBtn) {
                    addEnquiryBtn.disabled = true;
                    addEnquiryBtn.style.opacity = '0.5';
                    addEnquiryBtn.style.cursor = 'not-allowed';
                    addEnquiryBtn.title = 'Upgrade to add new enquiries';
                }

                // Disable Edit buttons
                document.querySelectorAll('.btn-info, .btn-edit, [onclick*="showEditEnquiryModal"]').forEach(btn => {
                    if (!btn.closest('#grace-period-notification')) {
                        btn.disabled = true;
                        btn.style.opacity = '0.5';
                        btn.style.cursor = 'not-allowed';
                    }
                });

                // Disable Add New Model button in inventory
                const addInventoryBtn = document.querySelector('[onclick*="showAddInventoryModal"]');
                if (addInventoryBtn) {
                    addInventoryBtn.disabled = true;
                    addInventoryBtn.style.opacity = '0.5';
                    addInventoryBtn.style.cursor = 'not-allowed';
                }

                // Disable Add Team Member button
                const addTeamBtn = document.querySelector('[onclick*="showAddTeamModal"]');
                if (addTeamBtn) {
                    addTeamBtn.disabled = true;
                    addTeamBtn.style.opacity = '0.5';
                    addTeamBtn.style.cursor = 'not-allowed';
                }

                // Disable status change dropdowns
                document.querySelectorAll('#enquiry-status, .status-update').forEach(select => {
                    select.disabled = true;
                });

                // Disable enquiry form inputs
                document.querySelectorAll('#enquiry-form input, #enquiry-form select, #enquiry-form textarea').forEach(input => {
                    input.disabled = true;
                });

                // Add read-only indicator to dashboard
                const dashboardHeader = document.querySelector('#dashboard .section-header');
                if (dashboardHeader && !document.querySelector('.readonly-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'readonly-badge';
                    badge.style.cssText = 'background: #ea580c; color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; margin-left: 1rem;';
                    badge.innerHTML = '<i class="fas fa-eye"></i> Read-Only Mode';
                    dashboardHeader.appendChild(badge);
                }

                this.showToast('Your trial has ended. You are now in read-only mode. Upgrade to continue adding/editing.', 'warning');
            }

            activateFullBlocker() {
                // Completely block access to everything
                const appContent = document.querySelector('.app-content');
                if (appContent) {
                    appContent.style.pointerEvents = 'none';
                    appContent.style.opacity = '0.3';
                }

                const appHeader = document.querySelector('.app-header');
                if (appHeader) {
                    appHeader.style.pointerEvents = 'none';
                    appHeader.style.opacity = '0.3';
                }

                // Disable all buttons and inputs
                document.querySelectorAll('button, input, select, textarea, .nav-btn').forEach(el => {
                    el.disabled = true;
                    el.style.pointerEvents = 'none';
                });
            }

            removeTrialRestrictions() {
                // Remove grace period notification
                const notification = document.getElementById('grace-period-notification');
                if (notification) notification.remove();

                // Remove expired modal
                this.removeExpiredModal();

                // Re-enable all buttons
                document.querySelectorAll('.btn-info, .btn-edit, .btn-primary, [onclick*="showEditEnquiryModal"], [onclick*="showAddInventoryModal"], [onclick*="showAddTeamModal"]').forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '';
                    btn.style.cursor = '';
                });

                // Re-enable selects
                document.querySelectorAll('#enquiry-status, .status-update').forEach(select => {
                    select.disabled = false;
                });

                // Re-enable form inputs
                document.querySelectorAll('#enquiry-form input, #enquiry-form select, #enquiry-form textarea').forEach(input => {
                    input.disabled = false;
                });

                // Remove read-only badge
                const badge = document.querySelector('.readonly-badge');
                if (badge) badge.remove();

                // Restore app content
                const appContent = document.querySelector('.app-content');
                if (appContent) {
                    appContent.style.pointerEvents = '';
                    appContent.style.opacity = '';
                }

                const appHeader = document.querySelector('.app-header');
                if (appHeader) {
                    appHeader.style.pointerEvents = '';
                    appHeader.style.opacity = '';
                }
            }

            showTrialExpiredPrompt() {
                // Create a modal-like prompt that doesn't block everything
                const existingPrompt = document.getElementById('trial-expired-prompt');
                if (existingPrompt) return;

                const promptHTML = `
        <div id="trial-expired-prompt" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-card);
            border-radius: var(--radius-lg);
            padding: 2rem;
            max-width: 450px;
            width: 90%;
            text-align: center;
            z-index: 100000;
            box-shadow: var(--shadow-xl);
            border: 2px solid var(--danger);
        ">
            <div style="width: 80px; height: 80px; background: rgba(231, 29, 54, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <i class="fas fa-hourglass-end" style="font-size: 3rem; color: var(--danger);"></i>
            </div>
            <h2 style="color: var(--danger); margin-bottom: 1rem;">Trial Period Ended</h2>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Your 30-day free trial has expired. Please upgrade to continue using ShowroomDesk.</p>
            <button id="upgrade-from-prompt" class="btn-upgrade" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                border-radius: var(--radius-full);
                cursor: pointer;
            ">
                <i class="fas fa-crown"></i> Upgrade Now
            </button>
            <button id="close-prompt" style="
                background: none;
                border: none;
                color: var(--text-light);
                margin-top: 1rem;
                cursor: pointer;
                display: block;
                width: 100%;
                font-size: 0.875rem;
            ">Close</button>
        </div>
        <div id="trial-expired-overlay-bg" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99999;
        "></div>
    `;

                document.body.insertAdjacentHTML('beforeend', promptHTML);

                // Handle upgrade button click
                const upgradeBtn = document.getElementById('upgrade-from-prompt');
                if (upgradeBtn) {
                    upgradeBtn.onclick = () => {
                        this.removeTrialPrompt();
                        this.showUpgradeModal();
                    };
                }

                // Handle close button
                const closeBtn = document.getElementById('close-prompt');
                if (closeBtn) {
                    closeBtn.onclick = () => {
                        this.removeTrialPrompt();
                    };
                }
            }

            removeTrialPrompt() {
                const prompt = document.getElementById('trial-expired-prompt');
                const overlay = document.getElementById('trial-expired-overlay-bg');
                if (prompt) prompt.remove();
                if (overlay) overlay.remove();
            }

            showTrialEndingWarning(daysLeft) {
                // Show a non-blocking warning toast
                this.showToast(`⚠️ Your trial ends in ${daysLeft} days! Upgrade now to avoid interruption.`, 'warning');

                // Update subscription banner to show warning
                const statusEl = document.getElementById('subscription-status');
                if (statusEl) {
                    statusEl.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: var(--danger);"></i> Trial ends in ${daysLeft} days!`;
                }
            }

            // activateTrialBlocker() {
            //     // Show the overlay
            //     const overlay = document.getElementById('trial-expired-overlay');
            //     if (overlay) {
            //         overlay.classList.add('active');
            //     }

            //     // Add blocker class to main app content
            //     const appContent = document.querySelector('.app-content');
            //     if (appContent) {
            //         appContent.classList.add('trial-blocked');
            //     }

            //     // Add blocker to header and navigation
            //     const appHeader = document.querySelector('.app-header');
            //     if (appHeader) {
            //         appHeader.style.pointerEvents = 'none';
            //         appHeader.style.opacity = '0.3';
            //     }

            //     // Block all interactive elements EXCEPT the upgrade button in overlay
            //     const allButtons = document.querySelectorAll('.nav-btn, .btn, .user-profile, .nav-btn, .dropdown-item, .btn-upgrade');
            //     allButtons.forEach(btn => {
            //         // Don't block the upgrade button inside the trial overlay
            //         if (!btn.closest('#trial-expired-overlay')) {
            //             btn.style.pointerEvents = 'none';
            //         }
            //     });

            //     // Block table rows
            //     const allRows = document.querySelectorAll('.data-table tbody tr, .followup-item, .intervention-item');
            //     allRows.forEach(row => {
            //         row.style.pointerEvents = 'none';
            //     });

            //     // Block form inputs
            //     const allInputs = document.querySelectorAll('input, select, textarea');
            //     allInputs.forEach(input => {
            //         input.disabled = true;
            //     });

            //     // Make sure the upgrade button in overlay works
            //     const upgradeBtn = document.getElementById('trial-upgrade-btn');
            //     if (upgradeBtn) {
            //         upgradeBtn.style.pointerEvents = 'auto';
            //         upgradeBtn.style.cursor = 'pointer';
            //         // Remove any existing listeners and add new one
            //         upgradeBtn.removeEventListener('click', this.handleTrialUpgrade);
            //         upgradeBtn.addEventListener('click', () => this.handleTrialUpgrade());
            //     }

            //     this.showToast('Trial period ended. Please upgrade to continue using ShowroomDesk.', 'warning');
            // }

            handleTrialUpgrade() {
                console.log('Trial upgrade button clicked');

                // First, temporarily remove blocker to allow interaction
                const overlay = document.getElementById('trial-expired-overlay');

                // Hide overlay temporarily
                if (overlay) {
                    overlay.classList.remove('active');
                }

                // Show upgrade modal
                this.showUpgradeModal();

                // After modal is closed, check if upgrade was successful
                const checkInterval = setInterval(() => {
                    if (this.showroomData && this.showroomData.subscription) {
                        const isPaid = this.showroomData.subscription.planType === 'paid' ||
                            this.showroomData.subscription.paymentStatus === 'paid';

                        if (isPaid) {
                            // Upgrade successful, remove blocker permanently
                            clearInterval(checkInterval);
                            this.removeTrialBlocker();
                        } else {
                            // Still not upgraded, show overlay again when modal closes
                            const modal = document.getElementById('upgrade-modal');
                            if (modal && !modal.classList.contains('active')) {
                                if (overlay && !overlay.classList.contains('active')) {
                                    overlay.classList.add('active');
                                }
                                clearInterval(checkInterval);
                            }
                        }
                    }
                }, 1000);
            }

            closeTrialOverlayAndUpgrade() {
                console.log('Closing trial overlay and showing upgrade modal');

                // Close the overlay
                const overlay = document.getElementById('trial-expired-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }

                // Show upgrade modal
                this.showUpgradeModal();
            }

            removeTrialBlocker() {
                // Hide the overlay
                const overlay = document.getElementById('trial-expired-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }

                // Remove blocker class from main app content
                const appContent = document.querySelector('.app-content');
                if (appContent) {
                    appContent.classList.remove('trial-blocked');
                }

                // Restore header
                const appHeader = document.querySelector('.app-header');
                if (appHeader) {
                    appHeader.style.pointerEvents = '';
                    appHeader.style.opacity = '';
                }

                // Re-enable all interactive elements
                const allButtons = document.querySelectorAll('.nav-btn, .btn, .user-profile, .nav-btn, .dropdown-item, .btn-upgrade');
                allButtons.forEach(btn => {
                    btn.style.pointerEvents = '';
                });

                // Re-enable table rows
                const allRows = document.querySelectorAll('.data-table tbody tr, .followup-item, .intervention-item');
                allRows.forEach(row => {
                    row.style.pointerEvents = '';
                });

                // Re-enable form inputs
                const allInputs = document.querySelectorAll('input, select, textarea');
                allInputs.forEach(input => {
                    input.disabled = false;
                });
            }

            // Add this new method to update upgrade button text
            updateUpgradeButtonText(planType = null, daysLeft = 0, paymentStatus = null) {
                const upgradeBtn = document.querySelector('.btn-upgrade');
                if (!upgradeBtn) return;

                if (!this.showroomData || !this.showroomData.subscription) {
                    upgradeBtn.innerHTML = '<i class="fas fa-crown"></i> Upgrade Plan';
                    upgradeBtn.onclick = () => this.showUpgradeModal();
                    return;
                }

                const sub = this.showroomData.subscription;
                const actualPlanType = planType || sub.planType || 'trial';
                const actualDaysLeft = daysLeft || Math.ceil((new Date(sub.endDate) - new Date()) / (1000 * 60 * 60 * 24));
                const actualPaymentStatus = paymentStatus || sub.paymentStatus || 'unpaid';

                // Reset button styles
                upgradeBtn.style.background = '';
                upgradeBtn.style.cursor = 'pointer';

                if (actualPlanType === 'trial') {
                    // TRIAL USER - Show upgrade button
                    if (actualDaysLeft > 0) {
                        upgradeBtn.innerHTML = `<i class="fas fa-crown"></i> Upgrade Plan (${actualDaysLeft} day${actualDaysLeft !== 1 ? 's' : ''} left)`;
                    } else {
                        upgradeBtn.innerHTML = '<i class="fas fa-crown"></i> Trial Expired - Upgrade Now';
                    }
                    upgradeBtn.onclick = () => this.showUpgradeModal();

                } else if (actualPlanType === 'paid') {
                    if (actualPaymentStatus === 'paid') {
                        // PAID USER - Check if renewal is approaching (10 days or less)
                        if (actualDaysLeft <= 10) {
                            // 10 days or less left - SHOW RENEW BUTTON
                            upgradeBtn.innerHTML = `<i class="fas fa-sync-alt"></i> Renew Plan (${actualDaysLeft} day${actualDaysLeft !== 1 ? 's' : ''} left)`;
                            upgradeBtn.style.background = '#f59e0b'; // Orange for renewal
                            upgradeBtn.onclick = () => this.showRenewModal();
                        } else {
                            // More than 10 days left - Show Active Plan (no button)
                            upgradeBtn.innerHTML = '<i class="fas fa-crown" style="color: gold;"></i> Active Plan';
                            upgradeBtn.style.background = '#10b981'; // Green
                            upgradeBtn.style.cursor = 'default';
                            upgradeBtn.onclick = null;
                        }
                    } else {
                        // PAID PLAN BUT UNPAID - Show payment pending
                        upgradeBtn.innerHTML = '<i class="fas fa-clock"></i> Payment Pending';
                        upgradeBtn.style.background = '#f59e0b'; // Orange
                        upgradeBtn.style.cursor = 'default';
                        upgradeBtn.onclick = null;
                    }
                } else {
                    // FALLBACK
                    upgradeBtn.innerHTML = '<i class="fas fa-crown"></i> Upgrade Plan';
                    upgradeBtn.onclick = () => this.showUpgradeModal();
                }
            }

            showUpgradeModal() {
                // Store that user came from trial expired state
                if (this.isTrialFullyExpired()) {
                    this.isComingFromTrialBlock = true;
                }

                const modal = document.getElementById('upgrade-modal');
                if (modal) {
                    modal.classList.add('active');
                    this.upgradePaymentMethod = 'razorpay';

                    // Reset payment method selection
                    const razorpayOption = document.querySelector('.payment-method[data-method="razorpay"]');
                    if (razorpayOption) {
                        document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
                        razorpayOption.classList.add('selected');
                    }
                    const bankDetails = document.getElementById('upgrade-bank-details');
                    if (bankDetails) bankDetails.style.display = 'none';

                    // Add listener for modal close
                    const closeHandler = () => {
                        this.checkAndReapplyBlocker();
                    };

                    // Remove existing listener and add new one
                    const closeBtn = modal.querySelector('.modal-close');
                    if (closeBtn) {
                        closeBtn.removeEventListener('click', closeHandler);
                        closeBtn.addEventListener('click', closeHandler);
                    }

                    // Also handle clicking on overlay
                    const overlay = modal;
                    overlay.removeEventListener('click', this.handleOverlayClick);
                    this.handleOverlayClick = (e) => {
                        if (e.target === overlay) {
                            this.checkAndReapplyBlocker();
                        }
                    };
                    overlay.addEventListener('click', this.handleOverlayClick);

                } else {
                    console.error('Upgrade modal not found');
                    this.showToast('Upgrade feature is being loaded. Please try again.', 'error');
                }
            }

            checkAndReapplyBlocker() {
                // Check if trial is still expired
                if (this.isTrialFullyExpired()) {
                    // Re-apply the blocker
                    this.showTrialExpiredBlockScreen();
                    this.showToast('Please complete the upgrade process to continue using ShowroomDesk.', 'warning');
                }
                this.isComingFromTrialBlock = false;
            }

            showRenewModal() {
                // You can customize this based on your needs
                if (confirm('Your plan is expiring soon. Would you like to renew now for ₹10,999/year?')) {
                    // Redirect to payment or show upgrade modal
                    this.showUpgradeModal();
                }
            }

            closeUpgradeModal() {
                const modal = document.getElementById('upgrade-modal');
                if (modal) {
                    modal.classList.remove('active');
                }

                // Remove the trial badge if exists
                const badge = document.querySelector('#upgrade-modal .modal-header .trial-badge');
                if (badge) badge.remove();

                // Reapply blocker if trial is still expired
                this.checkAndReapplyBlocker();
            }

            selectUpgradePaymentMethod(method) {
                this.upgradePaymentMethod = method;

                document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
                const selected = document.querySelector(`.payment-method[data-method="${method}"]`);
                if (selected) selected.classList.add('selected');

                document.getElementById('upgrade-bank-details').style.display = method === 'bank' ? 'block' : 'none';
            }

            async processUpgrade() {
                if (this.upgradePaymentMethod === 'razorpay') {
                    await this.processRazorpayUpgrade();
                } else {
                    this.showToast('Please complete bank transfer and email receipt to accounts@showroomdesk.com', 'info');
                    this.closeUpgradeModal();
                }
            }

            async processRazorpayUpgrade() {
                this.showLoading(true);

                try {
                    const options = {
                        key: this.RAZORPAY_KEY_ID,
                        amount: 1099900,
                        currency: 'INR',
                        name: 'ShowroomDesk',
                        description: 'Annual Subscription - Complete Plan (₹10,999/year)',
                        image: 'https://via.placeholder.com/150x50?text=ShowroomDesk',
                        handler: async (response) => {
                            console.log('Payment successful:', response);

                            // Update subscription in Firebase
                            const userRef = window.firebase.doc(window.firebase.db, 'users', this.currentUser.uid);
                            const endDate = new Date();
                            endDate.setFullYear(endDate.getFullYear() + 1);

                            await window.firebase.updateDoc(userRef, {
                                'subscription.status': 'active',
                                'subscription.planType': 'paid',
                                'subscription.paymentStatus': 'paid',
                                'subscription.paymentId': response.razorpay_payment_id,
                                'subscription.paidAt': new Date().toISOString(),
                                'subscription.endDate': endDate.toISOString(),
                                'subscription.paymentGateway': 'Razorpay'
                            });

                            // Update local data
                            this.showroomData.subscription.status = 'active';
                            this.showroomData.subscription.planType = 'paid';
                            this.showroomData.subscription.paymentStatus = 'paid';
                            this.showroomData.subscription.endDate = endDate.toISOString();

                            // REMOVE TRIAL BLOCKER AFTER SUCCESSFUL UPGRADE
                            this.removeTrialBlockerScreen();

                            // Close upgrade modal
                            this.closeUpgradeModal();

                            // Show success message
                            this.showToast('Upgrade successful! Thank you for your payment.', 'success');

                            // Refresh the page to ensure all features are unlocked
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        },
                        prefill: {
                            name: this.showroomData?.ownerName || this.currentUser?.email,
                            email: this.currentUser?.email,
                            contact: this.showroomData?.ownerPhone || ''
                        },
                        notes: {
                            showroomName: this.showroomData?.name,
                            userId: this.currentUser?.uid
                        },
                        theme: {
                            color: '#4361ee'
                        },
                        modal: {
                            ondismiss: () => {
                                this.showLoading(false);
                                // CRITICAL: Reapply blocker when user cancels payment
                                this.checkAndReapplyBlocker();
                                this.showToast('Payment cancelled. Please complete payment to continue using ShowroomDesk.', 'warning');
                            }
                        }
                    };

                    const razorpay = new Razorpay(options);
                    razorpay.open();

                    razorpay.on('payment.failed', (response) => {
                        console.error('Payment failed:', response.error);
                        this.showToast('Payment failed: ' + response.error.description, 'error');
                        this.showLoading(false);
                        // Reapply blocker on payment failure
                        this.checkAndReapplyBlocker();
                    });

                } catch (error) {
                    console.error('Razorpay error:', error);
                    this.showToast('Unable to process payment. Please try again.', 'error');
                    this.showLoading(false);
                    // Reapply blocker on error
                    this.checkAndReapplyBlocker();
                }
            }

            // ==========================================================================
            // Search and Filter Functions
            // ==========================================================================
            filterEnquiries() {
                const searchTerm = document.getElementById('enquiry-search')?.value.toLowerCase() || '';
                const sourceFilter = document.getElementById('filter-source')?.value || '';
                const leadTypeFilter = document.getElementById('filter-lead-type')?.value || '';
                const salesManagerFilter = document.getElementById('filter-sales-manager')?.value || '';

                this.filteredEnquiries = this.enquiries.filter(enquiry => {
                    // Search filter
                    const matchesSearch = searchTerm === '' ||
                        (enquiry.customerName && enquiry.customerName.toLowerCase().includes(searchTerm)) ||
                        (enquiry.phone && enquiry.phone.includes(searchTerm)) ||
                        (enquiry.vehicleModel && enquiry.vehicleModel.toLowerCase().includes(searchTerm)) ||
                        (enquiry.exchangeModel && enquiry.exchangeModel.toLowerCase().includes(searchTerm));

                    // Source filter
                    const matchesSource = sourceFilter === '' || enquiry.source === sourceFilter;

                    // Sales Manager filter (owner only)
                    const matchesManager = salesManagerFilter === '' ||
                        (this.userRole === 'owner' && enquiry.salesManagerName === salesManagerFilter);

                    // NEW: Lead Type filter (Hot/Warm/Cold)
                    let matchesLeadType = true;
                    if (leadTypeFilter) {
                        const today = new Date();

                        if (leadTypeFilter === 'hot') {
                            // Hot leads: status is 'hot'
                            matchesLeadType = enquiry.status === 'hot';
                        } else if (leadTypeFilter === 'warm') {
                            // Warm leads: follow-up within 30 days (and not hot, not closed/lost/booking)
                            if (enquiry.followupDate && enquiry.status !== 'closed' && enquiry.status !== 'lost' && enquiry.status !== 'booking') {
                                const followupDate = new Date(enquiry.followupDate);
                                const daysDiff = Math.ceil((followupDate - today) / (1000 * 60 * 60 * 24));
                                matchesLeadType = daysDiff <= 30 && daysDiff >= 0;
                            } else {
                                matchesLeadType = false;
                            }
                        } else if (leadTypeFilter === 'cold') {
                            // Cold leads: follow-up after 30+ days (or no follow-up date, but not hot/closed/lost/booking)
                            if (enquiry.followupDate && enquiry.status !== 'closed' && enquiry.status !== 'lost' && enquiry.status !== 'booking') {
                                const followupDate = new Date(enquiry.followupDate);
                                const daysDiff = Math.ceil((followupDate - today) / (1000 * 60 * 60 * 24));
                                matchesLeadType = daysDiff > 30;
                            } else if (!enquiry.followupDate && enquiry.status !== 'hot' && enquiry.status !== 'closed' && enquiry.status !== 'lost' && enquiry.status !== 'booking') {
                                // Enquiries with no follow-up date (excluding hot/closed/lost/booking)
                                matchesLeadType = true;
                            } else {
                                matchesLeadType = false;
                            }
                        }
                    }

                    return matchesSearch && matchesSource && matchesManager && matchesLeadType;
                });

                this.renderFilteredEnquiriesTable();
                this.updateResultsCount();
            }

            renderFilteredEnquiriesTable() {
                const tbody = document.getElementById('enquiries-list');
                if (!tbody) return;

                tbody.innerHTML = '';

                if (this.filteredEnquiries.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="10" class="text-center py-4">No enquiries match your filters</td></tr>';
                    return;
                }

                this.filteredEnquiries.slice(0, 50).forEach(enquiry => {
                    const row = document.createElement('tr');
                    row.onclick = () => this.viewEnquiry(enquiry.id);

                    const followupDate = enquiry.followupDate ? new Date(enquiry.followupDate).toLocaleDateString() : 'Not set';
                    const isOverdue = enquiry.followupDate && new Date(enquiry.followupDate) < new Date() && enquiry.status !== 'closed' && enquiry.status !== 'lost' && enquiry.status !== 'booking';
                    const statusClass = isOverdue ? 'status-overdue' : `status-${enquiry.status || 'new'}`;
                    const statusText = isOverdue ? 'Overdue' : (enquiry.status || 'new');

                    let vehicleDisplay = 'Sale';
                    let modelDisplay = enquiry.vehicleModel || 'N/A';
                    let sourceDisplay = enquiry.source || 'N/A';
                    let bookingAmountDisplay = enquiry.bookingAmount ? `₹${enquiry.bookingAmount.toLocaleString()}` : '-';

                    let lastUpdateDisplay = 'N/A';
                    if (enquiry.updatedAt) {
                        const updateDate = new Date(enquiry.updatedAt);
                        const now = new Date();
                        const diffMs = now - updateDate;
                        const diffMins = Math.floor(diffMs / 60000);
                        const diffHours = Math.floor(diffMs / 3600000);
                        const diffDays = Math.floor(diffMs / 86400000);

                        if (diffMins < 1) {
                            lastUpdateDisplay = 'Just now';
                        } else if (diffMins < 60) {
                            lastUpdateDisplay = `${diffMins} min ago`;
                        } else if (diffHours < 24) {
                            lastUpdateDisplay = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                        } else if (diffDays < 7) {
                            lastUpdateDisplay = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                        } else {
                            lastUpdateDisplay = updateDate.toLocaleDateString();
                        }
                    } else if (enquiry.createdAt) {
                        lastUpdateDisplay = 'Just added';
                    }

                    const isHotOrWarm = enquiry.status === 'hot' || enquiry.status === 'followup' || enquiry.autoLeadType === 'hot' || enquiry.autoLeadType === 'warm';

                    if (enquiry.isExchange) {
                        vehicleDisplay = 'Exchange';
                        modelDisplay = enquiry.exchangeModel || 'N/A';
                    }

                    let sourceEmoji = '';
                    switch (enquiry.source) {
                        case 'Walk In Customer': sourceEmoji = 'ðŸš¶ '; break;
                        case 'Advertisement': sourceEmoji = 'ðŸ“¢ '; break;
                        case 'CRM enquiry': sourceEmoji = 'ðŸ“± '; break;
                        case 'Field Enquiry': sourceEmoji = 'ðŸŒ '; break;
                        default: sourceEmoji = '';
                    }
                    row.innerHTML = `
                     <td>${enquiry.customerName || ''}</td>
                     <td>${enquiry.phone || ''}</td>
                     <td>${sourceEmoji}${sourceDisplay}</td>
                     <td><span class="vehicle-badge ${enquiry.isExchange ? 'exchange' : 'car'}">${vehicleDisplay}</span></td>
                     <td>${modelDisplay}</td>
                     <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                     <td>${bookingAmountDisplay}</td>
                     <td>${followupDate}</td>
                     <td><span title="${enquiry.updatedAt ? new Date(enquiry.updatedAt).toLocaleString() : ''}" style="font-size: 0.8rem; color: var(--text-light);">${lastUpdateDisplay}</span></td>
                     <td>
                        <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.viewEnquiry('${enquiry.id}')">
                        <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-info" onclick="event.stopPropagation(); app.showEditEnquiryModal('${enquiry.id}')">
                         <i class="fas fa-edit"></i> Edit
                        </button>
                    ${isHotOrWarm ? `
                     <button class="btn btn-sm btn-whatsapp" onclick="event.stopPropagation(); app.openWhatsAppWithPamphlet('${enquiry.id}')" title="Send WhatsApp with Pamphlet">
                        <i class="fab fa-whatsapp"></i>
                     </button>
                    ` : ''}
                     <button class="btn btn-sm btn-secondary" onclick="event.stopPropagation(); app.showRemarksHistory('${enquiry.id}')" title="View Remarks History">
                    <i class="fas fa-history"></i>
                    </button>
                    ${this.userRole === 'owner' ? `
                    <button class="btn btn-sm btn-warning" onclick="event.stopPropagation(); app.addIntervention('${enquiry.id}')">
                        <i class="fas fa-exclamation-triangle"></i>
                    </button>
                   ` : ''}
                  </td> `;
                    tbody.appendChild(row);
                });
            }
            updateResultsCount() {
                const countSpan = document.getElementById('enquiry-results-count');
                if (countSpan) {
                    const total = this.enquiries.length;
                    const filtered = this.filteredEnquiries.length;
                    if (filtered === total) {
                        countSpan.textContent = `Showing all ${total} enquiries`;
                    } else {
                        countSpan.textContent = `Showing ${filtered} of ${total} enquiries`;
                    }
                }
            }

            clearFilters() {
                document.getElementById('enquiry-search').value = '';
                document.getElementById('filter-source').value = '';
                document.getElementById('filter-lead-type').value = '';
                if (document.getElementById('filter-sales-manager')) {
                    document.getElementById('filter-sales-manager').value = '';
                }
                this.filteredEnquiries = [...this.enquiries];
                this.renderFilteredEnquiriesTable();
                this.updateResultsCount();
            }

            populateSalesManagerFilter() {
                if (this.userRole !== 'owner') return;

                const filterSelect = document.getElementById('filter-sales-manager');
                if (!filterSelect) return;

                // Get unique sales managers from enquiries
                const managers = [...new Set(this.enquiries.map(e => e.salesManagerName).filter(Boolean))];

                filterSelect.innerHTML = '<option value="">All Sales Managers</option>';
                managers.sort().forEach(manager => {
                    const option = document.createElement('option');
                    option.value = manager;
                    option.textContent = manager;
                    filterSelect.appendChild(option);
                });
            }

            // ==========================================================================
            // Remarks Edit Functions - UPDATED with history
            // ==========================================================================
            editRemarks(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) return;

                this.currentRemarksEnquiry = enquiry;
                document.getElementById('remarks-customer-name').textContent = enquiry.customerName || 'Unknown';
                document.getElementById('remarks-text').value = enquiry.remarks || '';
                document.getElementById('remarks-modal').classList.add('active');
            }

            closeRemarksModal() {
                document.getElementById('remarks-modal').classList.remove('active');
                this.currentRemarksEnquiry = null;
            }

            // ==========================================================================
            // Remarks Edit Functions - UPDATED with better error handling
            // ==========================================================================
            async saveRemarks() {
                if (!this.currentRemarksEnquiry) {
                    this.closeRemarksModal();
                    return;
                }

                const newRemarks = document.getElementById('remarks-text').value.trim();
                const oldRemarks = this.currentRemarksEnquiry.remarks || '';

                // Don't save if no change
                if (newRemarks === oldRemarks) {
                    this.closeRemarksModal();
                    this.showToast('No changes to save', 'info');
                    return;
                }

                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', this.currentRemarksEnquiry.id);

                    // Update the enquiry
                    await window.firebase.updateDoc(enquiryRef, {
                        remarks: newRemarks,
                        updatedAt: new Date().toISOString()
                    });

                    // Save to remarks history subcollection with retry logic
                    try {
                        const historyRef = window.firebase.collection(window.firebase.db, 'enquiries', this.currentRemarksEnquiry.id, 'remarksHistory');

                        // First, try to create the collection by adding a document
                        const historyData = {
                            oldRemarks: oldRemarks,
                            newRemarks: newRemarks,
                            changedBy: document.getElementById('user-name').textContent,
                            changedByUid: this.currentUser?.uid,
                            timestamp: new Date().toISOString(),
                            changeType: 'remarks_edit'
                        };

                        await window.firebase.addDoc(historyRef, historyData);
                        console.log('Remarks history saved successfully');

                    } catch (historyError) {
                        console.error('Error saving remarks history:', historyError);

                        // Show a warning but don't fail the main update
                        this.showToast('Remarks updated but history could not be saved. Please check permissions.', 'warning');
                    }

                    // Update local data
                    this.currentRemarksEnquiry.remarks = newRemarks;
                    this.currentRemarksEnquiry.updatedAt = new Date().toISOString();

                    this.closeRemarksModal();
                    this.filterEnquiries(); // Refresh the display
                    this.showToast('Remarks updated successfully!', 'success');

                } catch (error) {
                    console.error('Error updating remarks:', error);
                    this.showToast('Error updating remarks: ' + error.message, 'error');
                }
            }


            // ==========================================================================
            // Remarks History Functions - NEW
            // ==========================================================================
            // ==========================================================================
            // Remarks History Functions - UPDATED with better error handling
            // ==========================================================================
            async showRemarksHistory(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) {
                    this.showToast('Enquiry not found', 'error');
                    return;
                }

                document.getElementById('history-customer-name').textContent = enquiry.customerName || 'Unknown';
                document.getElementById('history-current-remarks').textContent = enquiry.remarks || 'No remarks';

                const historyList = document.getElementById('remarks-history-list');
                historyList.innerHTML = '<div class="text-center text-muted py-4"><i class="fas fa-spinner fa-spin"></i> Loading history...</div>';

                try {
                    const historyRef = window.firebase.collection(window.firebase.db, 'enquiries', enquiryId, 'remarksHistory');

                    // Try to get history
                    const q = window.firebase.query(historyRef, window.firebase.orderBy('timestamp', 'desc'));
                    const snapshot = await window.firebase.getDocs(q);

                    if (snapshot.empty) {
                        historyList.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-info-circle"></i> No remarks change history available
                </div>
            `;
                    } else {
                        let html = '';
                        snapshot.forEach(doc => {
                            const data = doc.data();
                            const date = data.timestamp ? new Date(data.timestamp).toLocaleString() : 'Unknown date';
                            html += `
                    <div style="padding: 1rem; border-bottom: 1px solid var(--border-light);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-weight: 600;">${data.changedBy || 'Unknown'}</span>
                            <span style="font-size: 0.8rem; color: var(--text-light);">${date}</span>
                        </div>
                        <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: var(--radius);">
                            <div style="margin-bottom: 0.5rem;">
                                <span style="color: var(--danger); text-decoration: line-through;">${data.oldRemarks || '(empty)'}</span>
                            </div>
                            <div>
                                <span style="color: var(--success);">${data.newRemarks || '(empty)'}</span>
                            </div>
                        </div>
                    </div>
                `;
                        });
                        historyList.innerHTML = html;
                    }
                } catch (error) {
                    console.error('Error loading remarks history:', error);

                    // Check if it's a permission error
                    if (error.code === 'permission-denied') {
                        historyList.innerHTML = `
                <div class="text-center text-warning py-4">
                    <i class="fas fa-exclamation-triangle"></i> Unable to load history due to permissions.<br>
                    <small>Please contact your administrator to update Firestore rules.</small>
                </div>
            `;
                    } else {
                        historyList.innerHTML = `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-info-circle"></i> No remarks change history available
                </div>
            `;
                    }
                }

                document.getElementById('remarks-history-modal').classList.add('active');
            }



            closeRemarksHistoryModal() {
                document.getElementById('remarks-history-modal').classList.remove('active');
            }

            // ==========================================================================
            // Refresh Inventory (manual refresh button)
            // ==========================================================================
            refreshInventory() {
                this.loadInventory(true);
                this.showToast('Refreshing inventory...', 'info');
            }

            // ==========================================================================
            // Load inventory models into dropdown
            // ==========================================================================
            loadInventoryModels() {
                const modelSelect = document.getElementById('enquiry-model');
                const inventoryCount = document.getElementById('inventory-count');

                if (!modelSelect) return;

                modelSelect.innerHTML = '<option value="">Select a model from inventory</option>';

                console.log('Loading inventory models. Current inventory:', this.inventory);

                if (!this.inventory || this.inventory.length === 0) {
                    console.log('No inventory items found');
                    const option = document.createElement('option');
                    option.value = "";
                    option.disabled = true;
                    option.textContent = "No models in inventory. Please add models first.";
                    modelSelect.appendChild(option);
                    if (inventoryCount) {
                        inventoryCount.textContent = 'No models available';
                    }
                    return;
                }

                // Sort models by brand and model name
                const sortedInventory = [...this.inventory].sort((a, b) => {
                    if (a.brand < b.brand) return -1;
                    if (a.brand > b.brand) return 1;
                    if (a.model < b.model) return -1;
                    if (a.model > b.model) return 1;
                    return 0;
                });

                console.log('Adding', sortedInventory.length, 'models to dropdown');

                sortedInventory.forEach(item => {
                    const option = document.createElement('option');
                    option.value = `${item.brand} ${item.model}`;
                    option.textContent = `${item.brand} ${item.model} (${item.type})`;
                    option.dataset.brand = item.brand;
                    option.dataset.model = item.model;
                    option.dataset.type = item.type;
                    modelSelect.appendChild(option);
                });

                // Add option for manual entry
                const manualOption = document.createElement('option');
                manualOption.value = "manual";
                manualOption.textContent = "→ Other (specify in remarks)";
                modelSelect.appendChild(manualOption);

                if (inventoryCount) {
                    inventoryCount.textContent = `${sortedInventory.length} model(s) available`;
                }
            }



            // ==========================================================================
            // Toggle exchange fields based on radio selection
            // ==========================================================================
            toggleExchangeFields() {
                const isExchange = document.querySelector('input[name="is-exchange"]:checked')?.value === 'yes';
                const exchangeFields = document.getElementById('exchange-fields');

                // Regular vehicle fields ALWAYS remain visible
                // Only toggle the exchange details section
                if (isExchange) {
                    exchangeFields.style.display = 'block';
                    // Make exchange model field required for exchange enquiries
                    document.getElementById('enquiry-exchange-model').required = true;
                } else {
                    exchangeFields.style.display = 'none';
                    document.getElementById('enquiry-exchange-model').required = false;
                    document.getElementById('enquiry-exchange-model').value = '';
                }
            }

            // ==========================================================================
            // Authentication
            // ==========================================================================
            async handleLogin() {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                if (!email || !password) {
                    this.showToast('Please enter email and password', 'error');
                    return;
                }

                this.showLoading(true);

                try {
                    await window.firebase.signInWithEmailAndPassword(
                        window.firebase.auth,
                        email,
                        password
                    );

                    // ADD THIS: Check user status after login
                    const user = window.firebase.auth.currentUser;
                    if (user) {
                        const userDoc = await window.firebase.getDoc(
                            window.firebase.doc(window.firebase.db, 'users', user.uid)
                        );

                        if (userDoc.exists()) {
                            const userData = userDoc.data();

                            // If user is suspended, sign them out
                            if (userData.status === 'suspended') {
                                await window.firebase.signOut(window.firebase.auth);
                                this.showToast('Your account has been suspended. Please contact administrator.', 'error');
                                this.showLoading(false);
                                return;
                            }
                        }
                    }

                    // Store owner credentials securely in memory if this is an owner login
                    setTimeout(() => {
                        if (this.userRole === 'owner') {
                            this.ownerCredentials = {
                                email: email,
                                password: password
                            };
                            console.log('Owner credentials stored securely in memory');
                        }
                    }, 1000);

                    this.showLoading(false);
                } catch (error) {
                    console.error('Login error:', error);
                    this.showToast('Invalid email or password', 'error');
                    this.showLoading(false);
                }
            }

            async checkAuth() {
                if (!window.firebase || !window.firebase.auth) {
                    setTimeout(() => this.checkAuth(), 500);
                    return;
                }

                window.firebase.onAuthStateChanged(window.firebase.auth, async (user) => {
                    if (user) {
                        console.log('User logged in:', user.email);

                        // Force token refresh to ensure proper permissions
                        try {
                            await user.getIdToken(true);
                            console.log('Token refreshed successfully');
                        } catch (tokenError) {
                            console.error('Token refresh error:', tokenError);
                        }

                        this.currentUser = user;
                        await this.loadUserData(user);
                        this.showApp();
                    } else {
                        console.log('No user logged in');
                        this.showLandingPage();
                    }
                });
            }

            // In your main app (showroomdesk.in) - UPDATE THIS FUNCTION
            async loadUserData(user) {


                try {
                    // Force token refresh to ensure proper permissions
                    const token = await user.getIdToken(true);
                    console.log('User token refreshed:', token ? 'success' : 'failed');

                    const userRef = window.firebase.doc(window.firebase.db, 'users', user.uid);
                    const docSnap = await window.firebase.getDoc(userRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();

                        // Check if user is suspended
                        if (userData.status === 'suspended') {
                            await window.firebase.signOut(window.firebase.auth);
                            this.showToast('Your account has been suspended. Please contact administrator.', 'error');
                            this.showLandingPage();
                            return;
                        }

                        this.userRole = userData.role;

                        // Ensure showroom data exists with safe defaults
                        const showroomData = userData.showroom || {};

                        // MODIFIED: Combine showroom data with subscription data using safe defaults
                        this.showroomData = {
                            id: showroomData.id || 'unknown',
                            name: showroomData.name || 'Unknown Showroom',
                            address: showroomData.address || '',
                            city: showroomData.city || '',
                            state: showroomData.state || '',
                            ownerName: userData.name || '',
                            ownerPhone: userData.phone || '',
                            vehicleTypes: showroomData.vehicleTypes || [],
                            brands: showroomData.brands || [],
                            models: showroomData.models || {},
                            // Add root level fields with safe fallbacks
                            planType: userData.planType || showroomData.planType || 'trial',
                            paymentStatus: userData.paymentStatus || showroomData.paymentStatus || 'unpaid',
                            subscriptionStartDate: userData.subscriptionStartDate || showroomData.subscriptionStartDate,
                            subscriptionEndDate: userData.subscriptionEndDate || showroomData.subscriptionEndDate,
                            // Add the FULL subscription object with safe defaults
                            subscription: userData.subscription || showroomData.subscription || {
                                status: 'trial',
                                planType: 'trial',
                                paymentStatus: 'unpaid',
                                paymentMethod: 'trial',
                                startDate: new Date().toISOString(),
                                endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                            }
                        };

                        this.blockIfTrialFullyExpired();

                        // Store user data in localStorage for backup (optional)
                        try {
                            localStorage.setItem('lastUserData', JSON.stringify({
                                role: this.userRole,
                                showroomId: this.showroomData.id,
                                timestamp: Date.now()
                            }));
                        } catch (e) {
                            console.log('localStorage not available');
                        }

                        // Update UI with user data
                        document.getElementById('user-name').textContent = userData.name || user.email.split('@')[0];
                        document.getElementById('user-role').textContent = this.userRole === 'owner' ? 'Owner' : 'Sales Manager';
                        document.getElementById('header-showroom-name').textContent = this.showroomData.name;

                        // Set role class on body
                        document.body.classList.add(`role-${this.userRole}`);

                        // CRITICAL: Hide all sections first
                        document.querySelectorAll('.section').forEach(section => {
                            section.classList.remove('active');
                            section.style.display = 'none';
                        });

                        // Show only dashboard
                        const dashboard = document.getElementById('dashboard');
                        if (dashboard) {
                            dashboard.classList.add('active');
                            dashboard.style.display = 'block';
                        }

                        // Update navigation buttons
                        document.querySelectorAll('.nav-btn').forEach(btn => {
                            btn.classList.remove('active');
                            if (btn.dataset.section === 'dashboard') {
                                btn.classList.add('active');
                            }
                        });

                        // Force navigation to be visible
                        this.ensureNavigationVisible();

                        // If this is an owner and we don't have credentials stored, try to get from login form
                        if (this.userRole === 'owner' && !this.ownerCredentials.email) {
                            const loginEmail = document.getElementById('login-email')?.value;
                            const loginPassword = document.getElementById('login-password')?.value;

                            if (loginEmail && loginPassword) {
                                this.ownerCredentials = {
                                    email: loginEmail,
                                    password: loginPassword
                                };
                                console.log('Owner credentials captured from login');
                            }
                        }

                        // Load CRM data with retry mechanism
                        await this.loadCRMData();

                        // Update subscription display
                        this.updateSubscriptionDisplay();

                        this.checkTrialExpiration();
                    } else {
                        console.error('User document not found');
                        this.showToast('User data not found. Please contact support.', 'error');
                        await window.firebase.signOut(window.firebase.auth);
                        this.showLandingPage();
                    }
                } catch (error) {
                    console.error('Error loading user data:', error);
                    this.showToast('Error loading user data: ' + error.message, 'error');

                    // Try to load from backup
                    try {
                        const backup = localStorage.getItem('lastUserData');
                        if (backup) {
                            const { role, showroomId, timestamp } = JSON.parse(backup);
                            const age = Date.now() - timestamp;

                            // Use backup if less than 1 hour old
                            if (age < 3600000) {
                                console.log('Using backup user data');
                                this.userRole = role;
                                this.showroomData = { id: showroomId };

                                // Try to load data anyway
                                this.loadCRMData().catch(e => console.log('Could not load CRM data'));
                            }
                        }
                    } catch (backupError) {
                        console.log('No valid backup found');
                    }
                }
            }

            async reauthenticateUser() {
                if (!this.currentUser) return false;

                try {
                    // Try to refresh token
                    await this.currentUser.getIdToken(true);
                    return true;
                } catch (error) {
                    console.error('Token refresh failed:', error);

                    // Try to re-login with stored credentials
                    if (this.ownerCredentials.email && this.ownerCredentials.password) {
                        try {
                            await window.firebase.signInWithEmailAndPassword(
                                window.firebase.auth,
                                this.ownerCredentials.email,
                                this.ownerCredentials.password
                            );
                            console.log('Re-authentication successful');
                            return true;
                        } catch (loginError) {
                            console.error('Re-login failed:', loginError);
                            return false;
                        }
                    }
                    return false;
                }
            }

            async loadCRMData() {
                try {
                    // Load enquiries first (most important)
                    await this.loadEnquiries();

                    // Preload inventory in background
                    this.preloadInventory();

                    // next 10 days 
                    this.loadNext10Days();

                    this.initPamphlets();


                    // Load Today's Hold data (only for owner)
                    if (this.userRole === 'owner') {
                        await this.loadTodayHold();
                    }

                    // Load other data
                    if (this.userRole === 'owner') {
                        await this.loadTeam();
                    }

                    await this.loadInterventions();
                    this.updateCurrentDate();

                } catch (error) {
                    console.error('Error loading CRM data:', error);
                    this.showToast('Error loading data. Please refresh.', 'error');
                }
            }

            async preloadInventory() {
                // Start loading inventory in the background without blocking UI
                setTimeout(() => {
                    this.loadInventory(false);
                }, 1000);
            }

            async loadEnquiries() {
                try {
                    const enquiriesRef = window.firebase.collection(window.firebase.db, 'enquiries');
                    const q = window.firebase.query(
                        enquiriesRef,
                        window.firebase.where('showroomId', '==', this.showroomData.id),
                        window.firebase.orderBy('createdAt', 'desc'),
                        window.firebase.limit(100)
                    );

                    const snapshot = await window.firebase.getDocs(q);
                    this.enquiries = [];
                    snapshot.forEach(doc => {
                        this.enquiries.push({ id: doc.id, ...doc.data() });
                    });

                    // Initialize filtered enquiries
                    this.filteredEnquiries = [...this.enquiries];

                    // Update all UI components that depend on enquiries
                    this.updateDashboard();
                    this.renderEnquiriesTable();
                    this.renderTodaySchedule();
                    this.populateSalesManagerFilter();

                    // Force update of interventions badge
                    const interventionsCount = this.enquiries.filter(e => e.intervention && !e.intervention.resolved).length;
                    document.getElementById('interventions-badge').textContent = interventionsCount;

                    console.log('Enquiries loaded:', this.enquiries.length);
                    console.log('Interventions pending:', interventionsCount);

                    this.loadNext10Days();

                } catch (error) {
                    console.error('Error loading enquiries:', error);
                }
            }

            updateDashboard() {
                const total = this.enquiries.length;
                const hot = this.enquiries.filter(e => e.status === 'hot').length;
                const today = this.enquiries.filter(e => {
                    if (!e.followupDate) return false;
                    const followupDate = new Date(e.followupDate);
                    const today = new Date();
                    return followupDate.toDateString() === today.toDateString();
                }).length;
                const booking = this.enquiries.filter(e => e.status === 'booking').length;

                // Update stats cards
                document.getElementById('dashboard-total').textContent = total;
                document.getElementById('dashboard-hot').textContent = hot;
                document.getElementById('dashboard-today').textContent = today;
                document.getElementById('dashboard-booking').textContent = booking;
                document.getElementById('enquiries-badge').textContent = total;

                // Today's follow-ups
                const todayFollowups = document.getElementById('today-followups');
                const todayItems = this.enquiries.filter(e => {
                    if (!e.followupDate) return false;
                    const followupDate = new Date(e.followupDate);
                    const today = new Date();
                    return followupDate.toDateString() === today.toDateString();
                }).slice(0, 5);

                if (todayItems.length === 0) {
                    todayFollowups.innerHTML = '<div class="text-center text-muted py-4">No follow-ups scheduled</div>';
                } else {
                    let html = '';
                    todayItems.forEach(e => {
                        const vehicleInfo = e.isExchange ?
                            `Exchange: ${e.exchangeModel || ''}` :
                            `${e.vehicleModel || ''}`;

                        html += `
                <div class="followup-item" onclick="app.viewEnquiry('${e.id}')">
                    <div><strong>${e.customerName || ''}</strong> - ${vehicleInfo}</div>
                    <div class="text-muted">${e.followupDate ? new Date(e.followupDate).toLocaleTimeString() : ''}</div>
                </div>
            `;
                    });
                    todayFollowups.innerHTML = html;
                }

                // Pending interventions - FIXED: Properly filter interventions
                const pendingInterventions = document.getElementById('pending-interventions');
                const interventions = this.enquiries.filter(e => e.intervention && !e.intervention.resolved).slice(0, 5);

                if (interventions.length === 0) {
                    pendingInterventions.innerHTML = '<div class="text-center text-muted py-4">No pending interventions</div>';
                } else {
                    let html = '';
                    interventions.forEach(e => {
                        html += `
                <div class="intervention-item" onclick="app.viewEnquiry('${e.id}')">
                    <div class="intervention-header">
                        <span class="intervention-customer">${e.customerName || ''}</span>
                        <span class="intervention-priority priority-${e.intervention?.priority || 'medium'}">${(e.intervention?.priority || 'medium').toUpperCase()}</span>
                    </div>
                    <div class="intervention-message">${e.intervention?.message || ''}</div>
                    <div class="intervention-meta">
                        <span>By: ${e.intervention?.createdBy || 'Owner'}</span>
                        <span>Deadline: ${e.intervention?.deadline ? new Date(e.intervention.deadline).toLocaleDateString() : 'Not set'}</span>
                    </div>
                </div>
            `;
                    });
                    pendingInterventions.innerHTML = html;
                }

                // Vehicle-wise Enquiries - FIXED: Show actual data
                const vehicleStats = document.getElementById('vehicle-stats');
                const saleCount = this.enquiries.filter(e => !e.isExchange).length;
                const exchangeCount = this.enquiries.filter(e => e.isExchange === true).length;

                if (total === 0) {
                    vehicleStats.innerHTML = '<div class="text-center text-muted py-4">No data available</div>';
                } else {
                    vehicleStats.innerHTML = `
            <div class="stat-item">
                <div style="display: flex; justify-content: space-between;">
                    <span><i class="fas fa-car" style="color: var(--primary);"></i> New Vehicle Sales:</span>
                    <span><strong>${saleCount}</strong> (${Math.round(saleCount / total * 100)}%)</span>
                </div>
            </div>
            <div class="stat-item">
                <div style="display: flex; justify-content: space-between;">
                    <span><i class="fas fa-exchange-alt" style="color: var(--exchange-color);"></i> Exchange Enquiries:</span>
                    <span><strong>${exchangeCount}</strong> (${Math.round(exchangeCount / total * 100)}%)</span>
                </div>
            </div>
        `;
                }

                // Top sales
                const topSales = document.getElementById('top-sales');
                const salesPerformance = {};
                this.enquiries.forEach(e => {
                    const name = e.salesManagerName || 'Unassigned';
                    if (!salesPerformance[name]) {
                        salesPerformance[name] = { total: 0, closed: 0, booking: 0, bookingAmount: 0 };
                    }
                    salesPerformance[name].total++;
                    if (e.status === 'closed') {
                        salesPerformance[name].closed++;
                    }
                    if (e.status === 'booking') {
                        salesPerformance[name].booking++;
                        salesPerformance[name].bookingAmount += e.bookingAmount || 0;
                    }
                });

                const sortedSales = Object.entries(salesPerformance)
                    .map(([name, data]) => ({
                        name,
                        ...data,
                        rate: data.total > 0 ? Math.round((data.closed / data.total) * 100) : 0,
                        bookingAmount: data.bookingAmount || 0
                    }))
                    .sort((a, b) => b.closed - a.closed)
                    .slice(0, 5);

                if (sortedSales.length === 0) {
                    topSales.innerHTML = '<div class="text-center text-muted py-4">No sales data</div>';
                } else {
                    let html = '';
                    sortedSales.forEach(s => {
                        html += `
                <div class="stat-item">
                    <div><strong>${s.name}</strong></div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>${s.closed} closed / ${s.booking} bookings</span>
                        <span>₹${s.bookingAmount.toLocaleString()}</span>
                    </div>
                    <div class="progress-bar" style="width: ${s.rate}%; height: 4px; background: var(--success); margin-top: 4px;"></div>
                </div>
            `;
                    });
                    topSales.innerHTML = html;
                }
            }

            // ==========================================================================
            // Next 10 Days Follow-up Feature
            // ==========================================================================

            // ==========================================================================
            // Next 10 Days Follow-up Feature - Day-wise View
            // ==========================================================================

            loadNext10Days() {
                const today = new Date();
                const next10Days = new Date();
                next10Days.setDate(today.getDate() + 10);

                // Update date range display
                const rangeSpan = document.getElementById('next-10-days-range');
                if (rangeSpan) {
                    rangeSpan.textContent = `${today.toLocaleDateString()} - ${next10Days.toLocaleDateString()}`;
                }

                // Group enquiries by date
                const dayWiseData = {};

                // Initialize days 0-10 (0 = today)
                for (let i = 0; i <= 10; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    const dateKey = date.toISOString().split('T')[0];
                    dayWiseData[dateKey] = {
                        date: date,
                        enquiries: [],
                        count: 0
                    };
                }

                // Filter and group enquiries
                this.enquiries.forEach(enquiry => {
                    if (!enquiry.followupDate) return;
                    if (enquiry.status === 'closed' || enquiry.status === 'lost') return;

                    const followupDate = new Date(enquiry.followupDate);
                    const followupDateKey = followupDate.toISOString().split('T')[0];

                    // Check if within next 10 days (including today)
                    const daysDiff = Math.ceil((followupDate - today) / (1000 * 60 * 60 * 24));
                    if (daysDiff >= 0 && daysDiff <= 10 && dayWiseData[followupDateKey]) {
                        dayWiseData[followupDateKey].enquiries.push(enquiry);
                        dayWiseData[followupDateKey].count++;
                    }
                });

                // Calculate statistics
                const totalUpcoming = Object.values(dayWiseData).reduce((sum, day) => sum + day.count, 0);
                const todayCount = dayWiseData[today.toISOString().split('T')[0]]?.count || 0;

                // Next 3 days count (excluding today)
                let next3DaysCount = 0;
                for (let i = 1; i <= 3; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() + i);
                    const dateKey = date.toISOString().split('T')[0];
                    next3DaysCount += dayWiseData[dateKey]?.count || 0;
                }

                const activeCount = this.enquiries.filter(e => e.status !== 'closed' && e.status !== 'lost').length;

                // Update stats display
                document.getElementById('upcoming-count').textContent = totalUpcoming;
                document.getElementById('today-count').textContent = todayCount;
                document.getElementById('priority-count').textContent = next3DaysCount;
                document.getElementById('active-count').textContent = activeCount;

                // Update badge
                const badge = document.getElementById('next-10-days-badge');
                if (badge) badge.textContent = totalUpcoming;

                // Render day-wise accordion
                this.renderDayWiseAccordion(dayWiseData, today);
            }

            renderDayWiseAccordion(dayWiseData, today) {
                const container = document.getElementById('day-wise-container');
                if (!container) return;

                container.innerHTML = '';

                // Sort days
                const sortedDays = Object.keys(dayWiseData).sort();

                sortedDays.forEach((dateKey, index) => {
                    const dayData = dayWiseData[dateKey];
                    const displayDate = new Date(dateKey);
                    const daysDiff = Math.ceil((displayDate - today) / (1000 * 60 * 60 * 24));

                    // Skip empty days (optional - comment out to show all days)
                    if (dayData.count === 0 && daysDiff > 3) return;

                    // Determine day label
                    let dayLabel = '';
                    let isToday = false;

                    if (daysDiff === 0) {
                        dayLabel = 'Today';
                        isToday = true;
                    } else if (daysDiff === 1) {
                        dayLabel = 'Tomorrow';
                    } else {
                        dayLabel = displayDate.toLocaleDateString('en-IN', { weekday: 'long' });
                    }

                    // Determine urgency styling
                    let urgentCount = 0;
                    if (daysDiff <= 3 && daysDiff > 0) {
                        urgentCount = dayData.count;
                    }

                    const accordionId = `day-${index}`;

                    // Create accordion HTML
                    const accordionHTML = `
            <div class="day-accordion" id="accordion-${accordionId}">
                <div class="day-header" onclick="app.toggleDay('${accordionId}')">
                    <div class="day-title">
                        <div class="day-name">${dayLabel}</div>
                        <div class="day-date">${displayDate.toLocaleDateString()}</div>
                    </div>
                    <div class="day-stats">
                        ${urgentCount > 0 ? `<span class="day-urgent-count">⚠️ ${urgentCount} urgent</span>` : ''}
                        <span class="day-count">${dayData.count} follow-up${dayData.count !== 1 ? 's' : ''}</span>
                        <i class="fas fa-chevron-down day-arrow"></i>
                    </div>
                </div>
                <div class="day-content" id="content-${accordionId}">
                    ${this.renderDayTable(dayData.enquiries, daysDiff, isToday)}
                </div>
            </div>
        `;

                    container.insertAdjacentHTML('beforeend', accordionHTML);

                    // Auto-expand today and days with enquiries
                    if (isToday || dayData.count > 0) {
                        setTimeout(() => {
                            const content = document.getElementById(`content-${accordionId}`);
                            const header = document.querySelector(`#accordion-${accordionId} .day-header`);
                            if (content && header && !content.classList.contains('active')) {
                                content.classList.add('active');
                                header.classList.add('active');
                            }
                        }, 100);
                    }
                });
            }

            renderDayTable(enquiries, daysDiff, isToday) {
                if (enquiries.length === 0) {
                    return '<div class="empty-day">No follow-ups scheduled for this day</div>';
                }

                // Sort enquiries by time if available
                enquiries.sort((a, b) => {
                    return (a.followupTime || '').localeCompare(b.followupTime || '');
                });

                let tableHTML = `
        <table class="day-table">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Model</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

                enquiries.forEach(enquiry => {
                    const statusClass = `status-${enquiry.status || 'new'}`;
                    const vehicleDisplay = enquiry.isExchange ?
                        `ðŸ”„ ${enquiry.exchangeModel || 'Exchange'}` :
                        (enquiry.vehicleModel || 'N/A');

                    tableHTML += `
            <tr>
                <td><strong>${enquiry.customerName || 'Unknown'}</strong></td>
                <td>${enquiry.phone || 'N/A'}</td>
                <td><small>${vehicleDisplay}</small></td>
                <td><span class="status-badge ${statusClass}">${enquiry.status || 'new'}</span></td>
                <td><small title="${enquiry.remarks || ''}">${(enquiry.remarks || '').substring(0, 30)}${(enquiry.remarks || '').length > 30 ? '...' : ''}</small></td>
                <td>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.viewEnquiry('${enquiry.id}')" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-info" onclick="event.stopPropagation(); app.showEditEnquiryModal('${enquiry.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${isToday ? `
                            <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); app.quickCompleteFollowup('${enquiry.id}')" title="Mark Completed">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
                });

                tableHTML += `
            </tbody>
        </table>
    `;

                return tableHTML;
            }

            // Method to toggle day accordion
            toggleDay(accordionId) {
                const content = document.getElementById(`content-${accordionId}`);
                const header = document.querySelector(`#accordion-${accordionId} .day-header`);

                if (content && header) {
                    content.classList.toggle('active');
                    header.classList.toggle('active');
                }
            }

            // Quick method to mark today's follow-up as completed
            async quickCompleteFollowup(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) return;

                if (confirm(`Mark follow-up for ${enquiry.customerName} as completed?`)) {
                    try {
                        const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', enquiryId);
                        await window.firebase.updateDoc(enquiryRef, {
                            status: 'followup', // Keep as follow-up or change as needed
                            lastFollowupCompleted: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        });

                        this.showToast(`Follow-up marked for ${enquiry.customerName}`, 'success');
                        this.loadNext10Days(); // Refresh the view
                        this.updateDashboard();

                    } catch (error) {
                        console.error('Error marking follow-up:', error);
                        this.showToast('Error marking follow-up', 'error');
                    }
                }
            }

            refreshNext10Days() {
                this.loadNext10Days();
                this.showToast('Next 10 days schedule refreshed!', 'success');
            }

            renderNext10DaysTable(upcomingEnquiries) {
                const tbody = document.getElementById('next-10-days-list');
                if (!tbody) return;

                const today = new Date();

                tbody.innerHTML = '';

                if (upcomingEnquiries.length === 0) {
                    tbody.innerHTML = '<td><td colspan="9" class="text-center py-4">No follow-ups scheduled in next 10 days</td></tr>';
                    return;
                }

                upcomingEnquiries.forEach(enquiry => {
                    const followupDate = new Date(enquiry.followupDate);
                    const daysLeft = Math.ceil((followupDate - today) / (1000 * 60 * 60 * 24));

                    // Determine urgency class
                    let daysClass = '';
                    let daysText = '';
                    if (daysLeft <= 0) {
                        daysClass = 'urgent-badge';
                        daysText = 'Today!';
                    } else if (daysLeft === 1) {
                        daysClass = 'urgent-badge';
                        daysText = 'Tomorrow';
                    } else if (daysLeft <= 3) {
                        daysClass = 'urgent-badge';
                        daysText = `${daysLeft} days`;
                    } else if (daysLeft <= 7) {
                        daysClass = 'soon-badge';
                        daysText = `${daysLeft} days`;
                    } else {
                        daysClass = 'normal-badge';
                        daysText = `${daysLeft} days`;
                    }

                    const row = document.createElement('tr');
                    row.id = `enquiry-row-${enquiry.id}`;

                    // Get vehicle display
                    const vehicleDisplay = enquiry.isExchange ?
                        `Exchange: ${enquiry.exchangeModel || ''}` :
                        (enquiry.vehicleModel || 'N/A');

                    row.innerHTML = `
            <td><strong>${enquiry.customerName || 'Unknown'}</strong>${enquiry.isExchange ? '<br><small class="text-muted">ðŸ”„ Exchange</small>' : ''}</td>
            <td>${enquiry.phone || 'N/A'}</td>
            <td>${vehicleDisplay}</td>
            <td>
                <input type="date" id="date-${enquiry.id}" value="${enquiry.followupDate || ''}" 
                       class="form-control" style="width: 130px; font-size: 0.8rem;"
                       onchange="app.quickUpdateFollowup('${enquiry.id}', this.value)">
            </td>
            <td><span class="status-badge ${daysClass}">${daysText}</span></td>
            <td>
                <select id="status-${enquiry.id}" class="form-control" style="width: 120px; font-size: 0.8rem;"
                        onchange="app.quickUpdateStatus('${enquiry.id}', this.value)">
                    <option value="new" ${enquiry.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="followup" ${enquiry.status === 'followup' ? 'selected' : ''}>Follow-up</option>
                    <option value="hot" ${enquiry.status === 'hot' ? 'selected' : ''}>Hot</option>
                    <option value="booking" ${enquiry.status === 'booking' ? 'selected' : ''}>Booking</option>
                    <option value="closed" ${enquiry.status === 'closed' ? 'selected' : ''}>Closed</option>
                    <option value="lost" ${enquiry.status === 'lost' ? 'selected' : ''}>Lost</option>
                </select>
             </td>
            <td>
                <textarea id="remarks-${enquiry.id}" rows="2" style="width: 100%; font-size: 0.75rem; padding: 0.25rem;"
                          placeholder="Add remarks..." onblur="app.quickUpdateRemarks('${enquiry.id}', this.value)">${enquiry.remarks || ''}</textarea>
             </td>
            <td>${enquiry.salesManagerName || 'Unassigned'}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="app.viewEnquiry('${enquiry.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="app.showEditEnquiryModal('${enquiry.id}')" title="Full Edit">
                    <i class="fas fa-edit"></i>
                </button>
             </td>
        `;
                    tbody.appendChild(row);
                });
            }

            // Quick update methods for inline editing
            async quickUpdateFollowup(enquiryId, newDate) {
                if (this.blockIfTrialExpired()) return;
                if (!newDate) return;

                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) return;

                const oldDate = enquiry.followupDate;

                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', enquiryId);
                    await window.firebase.updateDoc(enquiryRef, {
                        followupDate: newDate,
                        updatedAt: new Date().toISOString()
                    });

                    // Update local data
                    enquiry.followupDate = newDate;

                    this.showToast(`Follow-up date updated for ${enquiry.customerName}`, 'success');

                    // Refresh the view
                    this.loadNext10Days();
                    this.updateDashboard();

                } catch (error) {
                    console.error('Error updating follow-up date:', error);
                    this.showToast('Error updating date', 'error');
                }
            }

            async quickUpdateStatus(enquiryId, newStatus) {
                if (this.blockIfTrialExpired()) return;
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) return;

                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', enquiryId);
                    await window.firebase.updateDoc(enquiryRef, {
                        status: newStatus,
                        updatedAt: new Date().toISOString()
                    });

                    // If status is booking, prompt for amount
                    if (newStatus === 'booking') {
                        const amount = prompt(`Enter booking amount for ${enquiry.customerName}:`, enquiry.bookingAmount || '');
                        if (amount && !isNaN(amount)) {
                            await window.firebase.updateDoc(enquiryRef, {
                                bookingAmount: parseFloat(amount),
                                bookingDate: new Date().toISOString()
                            });
                            enquiry.bookingAmount = parseFloat(amount);
                        }
                    }

                    // Update local data
                    enquiry.status = newStatus;

                    this.showToast(`Status updated to ${newStatus} for ${enquiry.customerName}`, 'success');

                    // Refresh the view
                    this.loadNext10Days();
                    this.updateDashboard();
                    this.filterEnquiries();

                } catch (error) {
                    console.error('Error updating status:', error);
                    this.showToast('Error updating status', 'error');
                }
            }

            async quickUpdateRemarks(enquiryId, newRemarks) {
                if (this.blockIfTrialExpired()) return;
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) return;

                const oldRemarks = enquiry.remarks || '';

                if (newRemarks === oldRemarks) return;

                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', enquiryId);
                    await window.firebase.updateDoc(enquiryRef, {
                        remarks: newRemarks,
                        updatedAt: new Date().toISOString()
                    });

                    // Save to remarks history
                    try {
                        const historyRef = window.firebase.collection(window.firebase.db, 'enquiries', enquiryId, 'remarksHistory');
                        await window.firebase.addDoc(historyRef, {
                            oldRemarks: oldRemarks,
                            newRemarks: newRemarks,
                            changedBy: document.getElementById('user-name').textContent,
                            changedByUid: this.currentUser?.uid,
                            timestamp: new Date().toISOString(),
                            changeType: 'quick_update'
                        });
                    } catch (historyError) {
                        console.error('Error saving history:', historyError);
                    }

                    // Update local data
                    enquiry.remarks = newRemarks;

                    this.showToast(`Remarks updated for ${enquiry.customerName}`, 'success');

                } catch (error) {
                    console.error('Error updating remarks:', error);
                    this.showToast('Error updating remarks', 'error');
                }
            }

            refreshNext10Days() {
                this.loadNext10Days();
                this.showToast('Next 10 days schedule refreshed!', 'success');
            }

            renderEnquiriesTable() {
                // Reset filters and show all enquiries
                this.filteredEnquiries = [...this.enquiries];
                this.renderFilteredEnquiriesTable();
                this.updateResultsCount();
            }

            renderTodaySchedule() {
                const tbody = document.getElementById('today-list');
                const today = new Date().toDateString();

                const todayItems = this.enquiries.filter(e => {
                    if (!e.followupDate) return false;
                    return new Date(e.followupDate).toDateString() === today;
                });

                tbody.innerHTML = '';

                if (todayItems.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4">No follow-ups today</td></tr>';
                    return;
                }

                todayItems.forEach(enquiry => {
                    const row = document.createElement('tr');
                    const time = new Date(enquiry.followupDate).toLocaleTimeString();

                    let vehicleDisplay = enquiry.isExchange ? 'Exchange' : 'Sale';
                    let modelDisplay = enquiry.isExchange ? (enquiry.exchangeModel || '') : (enquiry.vehicleModel || '');

                    // Check if enquiry is hot or warm
                    const isHotOrWarm = enquiry.status === 'hot' || enquiry.status === 'followup' || enquiry.autoLeadType === 'hot' || enquiry.autoLeadType === 'warm';

                    row.innerHTML = `
            <td>${time}</td>
            <td><strong>${enquiry.customerName || ''}</strong><br><small>${enquiry.phone || ''}</small></td>
            <td>${modelDisplay}</td>
            <td><span class="vehicle-badge ${enquiry.isExchange ? 'exchange' : 'car'}">${vehicleDisplay}</span></td>
            <td><span class="status-badge status-${enquiry.status || 'new'}">${enquiry.status || 'new'}</span></td>
            <td>${enquiry.salesManagerName || 'Unassigned'}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.viewEnquiry('${enquiry.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="event.stopPropagation(); app.showEditEnquiryModal('${enquiry.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                ${isHotOrWarm ? `
                    <button class="btn btn-sm btn-whatsapp" onclick="event.stopPropagation(); app.openWhatsApp('${enquiry.id}')" title="Send WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                ` : ''}
            </td>
        `;
                    tbody.appendChild(row);
                });
            }

            async loadInterventions() {
                const interventions = this.enquiries.filter(e => e.intervention);
                this.renderInterventionsTable(interventions);
                document.getElementById('interventions-badge').textContent = interventions.length;
            }
            async loadTodayHold() {
                console.log('Loading Today\'s Hold data for showroom:', this.showroomData.id);

                try {
                    const holdRef = window.firebase.collection(window.firebase.db, 'followupChanges');
                    const q = window.firebase.query(
                        holdRef,
                        window.firebase.where('showroomId', '==', this.showroomData.id),
                        window.firebase.where('status', '==', 'pending'),
                        window.firebase.orderBy('changedAt', 'desc'),
                        window.firebase.limit(50)
                    );

                    const snapshot = await window.firebase.getDocs(q);
                    this.followupChanges = [];

                    console.log('Found changes for this showroom:', snapshot.size);

                    snapshot.forEach(doc => {
                        this.followupChanges.push({ id: doc.id, ...doc.data() });
                    });

                    console.log('Loaded changes:', this.followupChanges.length);

                    this.renderTodayHold();
                    this.updateTodayHoldBadge();

                } catch (error) {
                    console.error('Error loading Today\'s Hold:', error);

                    // Fallback query without ordering
                    try {
                        console.log('Trying fallback query without ordering...');
                        const holdRef2 = window.firebase.collection(window.firebase.db, 'followupChanges');
                        const q2 = window.firebase.query(
                            holdRef2,
                            window.firebase.where('showroomId', '==', this.showroomData.id),
                            window.firebase.where('status', '==', 'pending')
                        );
                        const snapshot2 = await window.firebase.getDocs(q2);
                        this.followupChanges = [];
                        snapshot2.forEach(doc => {
                            this.followupChanges.push({ id: doc.id, ...doc.data() });
                        });
                        // Sort locally
                        this.followupChanges.sort((a, b) => {
                            return new Date(b.changedAt) - new Date(a.changedAt);
                        });
                        console.log('Fallback loaded changes:', this.followupChanges.length);
                        this.renderTodayHold();
                        this.updateTodayHoldBadge();
                    } catch (error2) {
                        console.error('Error loading Today\'s Hold (fallback):', error2);
                        this.followupChanges = [];
                        this.renderTodayHold();
                    }
                }
            }

            renderTodayHold() {
                console.log('Rendering Today\'s Hold, changes count:', this.followupChanges.length);

                const tbody = document.getElementById('today-hold-list');
                if (!tbody) return;

                tbody.innerHTML = '';

                if (this.followupChanges.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4">No follow-up changes to review</td></tr>';
                    return;
                }

                const pendingChanges = this.followupChanges.filter(c => c.status === 'pending');

                if (pendingChanges.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4">No pending follow-up changes to review</td></tr>';
                    return;
                }

                pendingChanges.forEach(change => {
                    const row = document.createElement('tr');

                    const oldDateFormatted = change.oldFollowupDate ? new Date(change.oldFollowupDate).toLocaleString() : 'Not set';
                    const newDateFormatted = change.newFollowupDate ? new Date(change.newFollowupDate).toLocaleString() : 'Not set';
                    const changedAtFormatted = new Date(change.changedAt).toLocaleString();

                    // Check if the original enquiry is hot or warm
                    const enquiry = this.enquiries.find(e => e.id === change.enquiryId);
                    const isHotOrWarm = enquiry && (enquiry.status === 'hot' || enquiry.status === 'followup' || enquiry.autoLeadType === 'hot' || enquiry.autoLeadType === 'warm');

                    row.innerHTML = `
             <td><strong>${change.customerName || 'Unknown'}</strong></td>
             <td>${change.phone || 'N/A'}</td>
             <td><span class="status-badge status-warning">${oldDateFormatted}</span></td>
             <td><span class="status-badge status-new">${newDateFormatted}</span></td>
             <td><span class="status-badge ${change.changedByRole === 'owner' ? 'status-booking' : 'status-followup'}">${change.changedBy || 'Unknown'} (${change.changedByRole || 'sales'})</span></td>
             <td>${changedAtFormatted}</td>
             <td><small>${change.reason || 'No reason provided'}</small><br><small class="text-muted">Original follow-up was today</small></td>
             <td>
                <button class="btn btn-sm btn-success" onclick="app.resolveHold('${change.id}', '${change.enquiryId}')" title="Mark as Reviewed">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-outline" onclick="app.viewEnquiry('${change.enquiryId}')" title="View Enquiry">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="app.showEditEnquiryModal('${change.enquiryId}')" title="Edit Enquiry">
                    <i class="fas fa-edit"></i>
                </button>
                ${isHotOrWarm ? `
                    <button class="btn btn-sm btn-whatsapp" onclick="app.openWhatsApp('${change.enquiryId}')" title="Send WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                ` : ''}
             </td>
        `;
                    tbody.appendChild(row);
                });
            }

            updateTodayHoldBadge() {
                const badge = document.getElementById('today-hold-badge');
                if (badge) {
                    badge.textContent = this.followupChanges.filter(c => c.status === 'pending').length;
                }
            }

            async resolveHold(changeId, enquiryId) {
                if (!confirm('Mark this follow-up change as reviewed? It will be removed from Today\'s Hold.')) return;

                try {
                    // Update in Firebase
                    const holdRef = window.firebase.doc(window.firebase.db, 'followupChanges', changeId);
                    await window.firebase.updateDoc(holdRef, {
                        status: 'resolved',
                        resolvedAt: new Date().toISOString(),
                        resolvedBy: document.getElementById('user-name').textContent
                    });

                    // Update local data
                    this.followupChanges = this.followupChanges.filter(c => c.id !== changeId);
                    this.renderTodayHold();
                    this.updateTodayHoldBadge();

                    this.showToast('Follow-up change marked as reviewed', 'success');

                } catch (error) {
                    console.error('Error resolving hold:', error);
                    this.showToast('Error marking as reviewed', 'error');
                }
            }

            renderInterventionsTable(interventions) {
                const tbody = document.getElementById('interventions-list');
                if (!tbody) return;

                tbody.innerHTML = '';

                if (interventions.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No interventions found</td></tr>';
                    return;
                }

                interventions.forEach(enquiry => {
                    const row = document.createElement('tr');
                    row.onclick = () => this.viewEnquiry(enquiry.id);

                    // Get assigned person name
                    let assignedToName = 'Unassigned';
                    if (enquiry.intervention?.assignedTo) {
                        const assignedMember = this.team.find(m => m.uid === enquiry.intervention.assignedTo);
                        assignedToName = assignedMember ? assignedMember.name : 'Unknown';
                    }

                    // Get assigner name (created by)
                    const assignerName = enquiry.intervention?.createdBy || 'Owner';

                    row.innerHTML = `
            <td>${enquiry.customerName || ''}</td>
            <td><span class="intervention-priority priority-${enquiry.intervention?.priority || 'medium'}">${(enquiry.intervention?.priority || 'medium').toUpperCase()}</span></td>
            <td>${enquiry.intervention?.message || ''}</td>
            <td>
                <span style="display: block; font-weight: 600;">Assigned to: ${assignedToName}</span>
                <span style="display: block; font-size: 0.75rem; color: var(--text-light);">Created by: ${assignerName}</span>
            </td>
            <td>${enquiry.intervention?.deadline ? new Date(enquiry.intervention.deadline).toLocaleDateString() : 'Not set'}</td>
            <td><span class="status-badge ${enquiry.intervention?.resolved ? 'status-closed' : 'status-intervention'}">${enquiry.intervention?.resolved ? 'Resolved' : 'Pending'}</span></td>
            <td>
                ${!enquiry.intervention?.resolved ? `
                    <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); app.resolveIntervention('${enquiry.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
                <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.viewEnquiry('${enquiry.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
                    tbody.appendChild(row);
                });
            }

            loadAnalytics() {
                const total = this.enquiries.length;
                const closed = this.enquiries.filter(e => e.status === 'closed').length;
                const booking = this.enquiries.filter(e => e.status === 'booking').length;
                const conversion = total > 0 ? Math.round((closed / total) * 100) : 0;

                document.getElementById('analytics-conversion').textContent = conversion + '%';
                document.getElementById('conversion-bar').style.width = conversion + '%';

                // Enquiries by status
                const statusCounts = {
                    new: this.enquiries.filter(e => e.status === 'new').length,
                    followup: this.enquiries.filter(e => e.status === 'followup').length,
                    hot: this.enquiries.filter(e => e.status === 'hot').length,
                    booking: this.enquiries.filter(e => e.status === 'booking').length,
                    closed: this.enquiries.filter(e => e.status === 'closed').length,
                    lost: this.enquiries.filter(e => e.status === 'lost').length
                };

                let statusHtml = '';
                for (const [status, count] of Object.entries(statusCounts)) {
                    if (count > 0) {
                        const percentage = Math.round((count / total) * 100);
                        statusHtml += `
                        <div class="stat-item">
                            <div style="display: flex; justify-content: space-between;">
                                <span class="status-badge status-${status}">${status}</span>
                                <span>${count} (${percentage}%)</span>
                            </div>
                        </div>
                    `;
                    }
                }
                document.getElementById('enquiries-by-status').innerHTML = statusHtml || '<div class="text-muted">No data</div>';

                // Enquiries by vehicle
                const saleCount = this.enquiries.filter(e => !e.isExchange).length;
                const exchangeCount = this.enquiries.filter(e => e.isExchange === true).length;

                let vehicleHtml = '';
                if (saleCount > 0) {
                    const percentage = Math.round((saleCount / total) * 100);
                    vehicleHtml += `
                    <div class="stat-item">
                        <div style="display: flex; justify-content: space-between;">
                            <span class="vehicle-badge car">New Sale</span>
                            <span>${saleCount} (${percentage}%)</span>
                        </div>
                    </div>
                `;
                }
                if (exchangeCount > 0) {
                    const percentage = Math.round((exchangeCount / total) * 100);
                    vehicleHtml += `
                    <div class="stat-item">
                        <div style="display: flex; justify-content: space-between;">
                            <span class="vehicle-badge exchange">Exchange</span>
                            <span>${exchangeCount} (${percentage}%)</span>
                        </div>
                    </div>
                `;
                }
                document.getElementById('enquiries-by-vehicle').innerHTML = vehicleHtml || '<div class="text-muted">No data</div>';
            }

            // ==========================================================================
            // Pamphlet Management - Local Storage Based
            // ==========================================================================

            // Initialize pamphlets from local storage
            initPamphlets() {
                this.pamphlets = [];
                this.selectedPamphlet = null;
                this.currentPamphletEnquiry = null;
                this.loadPamphletsFromStorage();
            }

            // Load pamphlets from local storage
            loadPamphletsFromStorage() {
                try {
                    const showroomId = this.showroomData?.id || 'default';
                    const storageKey = `pamphlets_${showroomId}`;
                    const stored = localStorage.getItem(storageKey);

                    if (stored) {
                        this.pamphlets = JSON.parse(stored);
                    } else {
                        this.pamphlets = [];
                    }

                    console.log(`Loaded ${this.pamphlets.length} pamphlets from local storage`);
                    this.updatePamphletBadge();
                    return this.pamphlets;
                } catch (error) {
                    console.error('Error loading pamphlets from storage:', error);
                    this.pamphlets = [];
                    return [];
                }
            }

            // Save pamphlets to local storage
            savePamphletsToStorage() {
                try {
                    const showroomId = this.showroomData?.id || 'default';
                    const storageKey = `pamphlets_${showroomId}`;
                    localStorage.setItem(storageKey, JSON.stringify(this.pamphlets));
                    console.log(`Saved ${this.pamphlets.length} pamphlets to local storage`);
                    this.updatePamphletBadge();
                    return true;
                } catch (error) {
                    console.error('Error saving pamphlets to storage:', error);
                    this.showToast('Error saving pamphlets. Storage may be full.', 'error');
                    return false;
                }
            }

            // Update pamphlet badge count
            updatePamphletBadge() {
                const badge = document.getElementById('pamphlets-badge');
                if (badge) {
                    badge.textContent = this.pamphlets.length;
                }

                const totalEl = document.getElementById('total-pamphlets');
                if (totalEl) {
                    totalEl.textContent = this.pamphlets.length;
                }

                // Update vehicle models count
                const vehicleModels = new Set(this.pamphlets.map(p => p.vehicleModel).filter(Boolean));
                const vehicleEl = document.getElementById('pamphlet-vehicles');
                if (vehicleEl) {
                    vehicleEl.textContent = vehicleModels.size;
                }

                // Update storage used
                const totalSize = this.pamphlets.reduce((sum, p) => sum + (p.size || 0), 0);
                const sizeEl = document.getElementById('pamphlet-storage');
                if (sizeEl) {
                    const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
                    sizeEl.textContent = sizeMB > 0 ? `${sizeMB} MB` : '0 MB';
                }
            }

            // Load pamphlets for display
            loadPamphlets() {
                this.loadPamphletsFromStorage();
                this.renderPamphletTable();
            }

            // Render pamphlet table
            renderPamphletTable() {
                const tbody = document.getElementById('pamphlet-list');
                if (!tbody) return;

                tbody.innerHTML = '';

                if (this.pamphlets.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No pamphlets uploaded yet. Click "Upload Pamphlet" to add your first one.</td></tr>';
                    return;
                }

                this.pamphlets.forEach((pamphlet, index) => {
                    const row = document.createElement('tr');
                    const uploadDate = pamphlet.uploadedAt ? new Date(pamphlet.uploadedAt).toLocaleDateString() : 'Recently';
                    const fileSize = pamphlet.size ? (pamphlet.size / 1024).toFixed(1) + ' KB' : 'Unknown';

                    row.innerHTML = `
            <td>
                <img src="${pamphlet.dataUrl}" style="width: 60px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);">
            </td>
            <td><strong>${pamphlet.name}</strong></td>
            <td>${pamphlet.vehicleModel || 'All Vehicles'}</td>
            <td>${fileSize}</td>
            <td>${uploadDate}</td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="app.previewPamphlet(${index})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="app.deletePamphlet(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
                    tbody.appendChild(row);
                });
            }

            // Preview pamphlet
            previewPamphlet(index) {
                const pamphlet = this.pamphlets[index];
                if (!pamphlet) return;

                const previewWindow = window.open('', '_blank', 'width=400,height=500');
                previewWindow.document.write(`
        <html>
            <head><title>${pamphlet.name}</title></head>
            <body style="display:flex; justify-content:center; align-items:center; height:100vh; margin:0; background:#f5f5f5;">
                <div style="text-align:center; padding:20px;">
                    <img src="${pamphlet.dataUrl}" style="max-width:100%; max-height:80vh; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                    <h3 style="margin-top:15px; color:#333;">${pamphlet.name}</h3>
                    <p style="color:#666;">${pamphlet.vehicleModel || 'All Vehicles'}</p>
                </div>
            </body>
        </html>
    `);
                previewWindow.document.close();
            }

            // Delete pamphlet
            deletePamphlet(index) {
                const pamphlet = this.pamphlets[index];
                if (!pamphlet) return;

                if (!confirm(`Are you sure you want to delete "${pamphlet.name}"?`)) return;

                this.pamphlets.splice(index, 1);
                this.savePamphletsToStorage();
                this.renderPamphletTable();
                this.showToast('Pamphlet deleted successfully', 'success');
            }

            // Show upload pamphlet modal
            showUploadPamphletModal() {
                // Populate vehicle models from inventory
                const modelSelect = document.getElementById('pamphlet-vehicle-model');
                if (modelSelect) {
                    modelSelect.innerHTML = '<option value="">All Vehicles</option>';
                    const models = new Set();
                    this.inventory.forEach(item => {
                        const model = `${item.brand} ${item.model}`;
                        if (!models.has(model)) {
                            models.add(model);
                            const option = document.createElement('option');
                            option.value = model;
                            option.textContent = model;
                            modelSelect.appendChild(option);
                        }
                    });
                    // Add option for manual entry
                    const manualOption = document.createElement('option');
                    manualOption.value = 'manual';
                    manualOption.textContent = '→ Other (specify in name)';
                    modelSelect.appendChild(manualOption);
                }

                document.getElementById('upload-pamphlet-modal').classList.add('active');
                document.getElementById('upload-pamphlet-form').reset();
                document.getElementById('pamphlet-file-preview').style.display = 'none';
            }

            // Close upload pamphlet modal
            closeUploadPamphletModal() {
                document.getElementById('upload-pamphlet-modal').classList.remove('active');
            }

            // Save pamphlet (local storage)
            async savePamphlet() {
                const name = document.getElementById('pamphlet-name').value.trim();
                const vehicleModel = document.getElementById('pamphlet-vehicle-model').value;
                const message = document.getElementById('pamphlet-message').value.trim();
                const fileInput = document.getElementById('pamphlet-file');

                if (!name || !fileInput.files[0]) {
                    this.showToast('Please fill all required fields', 'error');
                    return;
                }

                const file = fileInput.files[0];

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    this.showToast('Please upload an image file (JPG, PNG)', 'error');
                    return;
                }

                // Validate file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    this.showToast('File size should be less than 2MB', 'error');
                    return;
                }

                this.showLoading(true);

                try {
                    // Read file as base64
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const dataUrl = e.target.result;

                        const pamphlet = {
                            id: 'pamphlet_' + Date.now(),
                            name: name,
                            vehicleModel: vehicleModel || 'All Vehicles',
                            message: message,
                            dataUrl: dataUrl,
                            size: file.size,
                            type: file.type,
                            uploadedAt: new Date().toISOString()
                        };

                        this.pamphlets.push(pamphlet);
                        this.savePamphletsToStorage();
                        this.renderPamphletTable();
                        this.closeUploadPamphletModal();
                        this.showToast('Pamphlet uploaded successfully!', 'success');
                        this.showLoading(false);
                    };

                    reader.onerror = () => {
                        this.showToast('Error reading file', 'error');
                        this.showLoading(false);
                    };

                    reader.readAsDataURL(file);

                } catch (error) {
                    console.error('Error uploading pamphlet:', error);
                    this.showToast('Error uploading pamphlet: ' + error.message, 'error');
                    this.showLoading(false);
                }
            }

            // Show send pamphlet modal
            showSendPamphletModal(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) {
                    this.showToast('Enquiry not found', 'error');
                    return;
                }

                this.currentPamphletEnquiry = enquiry;
                this.selectedPamphlet = null;

                document.getElementById('send-customer-name').textContent = enquiry.customerName || 'Unknown';
                document.getElementById('send-customer-phone').textContent = enquiry.phone || 'N/A';
                document.getElementById('send-vehicle-model').textContent = enquiry.vehicleModel || (enquiry.isExchange ? `Exchange: ${enquiry.exchangeModel}` : 'Not specified');

                // Load pamphlets from local storage
                this.loadPamphletsFromStorage();
                this.renderPamphletGrid(enquiry.vehicleModel);

                // Set default message
                const defaultMessage = this.generateDefaultPamphletMessage(enquiry);
                document.getElementById('send-custom-message').value = defaultMessage;
                document.getElementById('send-message-preview').innerHTML = this.formatMessagePreview(defaultMessage);

                document.getElementById('send-pamphlet-modal').classList.add('active');
            }

            // Close send pamphlet modal
            closeSendPamphletModal() {
                document.getElementById('send-pamphlet-modal').classList.remove('active');
                this.selectedPamphlet = null;
                this.currentPamphletEnquiry = null;
            }

            // Render pamphlet grid for selection
            renderPamphletGrid(vehicleModel) {
                const gridContainer = document.getElementById('pamphlet-grid');
                if (!gridContainer) return;

                // Filter pamphlets by vehicle model
                let filteredPamphlets = this.pamphlets;
                if (vehicleModel) {
                    filteredPamphlets = this.pamphlets.filter(p =>
                        p.vehicleModel === 'All Vehicles' ||
                        p.vehicleModel === vehicleModel ||
                        vehicleModel.includes(p.vehicleModel)
                    );
                }

                if (filteredPamphlets.length === 0) {
                    gridContainer.innerHTML = `
            <div class="text-center text-muted py-4" style="grid-column: 1/-1;">
                <i class="fas fa-exclamation-triangle"></i> No pamphlets available for ${vehicleModel || 'this vehicle'}.<br>
                <small>Upload pamphlets from the Pamphlet Management section.</small>
            </div>
        `;
                    return;
                }

                let html = '';
                filteredPamphlets.forEach((pamphlet, index) => {
                    html += `
            <div class="pamphlet-card" data-pamphlet-index="${index}" onclick="app.selectPamphletForSend(${index})">
                <img src="${pamphlet.dataUrl}" alt="${pamphlet.name}" onerror="this.src='https://placehold.co/150x120?text=No+Image'">
                <div class="pamphlet-name">${pamphlet.name}</div>
                <div style="font-size: 0.6rem; color: var(--text-light);">${pamphlet.vehicleModel}</div>
            </div>
        `;
                });
                gridContainer.innerHTML = html;

                // Store filtered pamphlets for selection
                this.filteredPamphlets = filteredPamphlets;
            }

            // Select pamphlet for sending
            selectPamphletForSend(index) {
                const pamphlet = this.filteredPamphlets[index];
                if (!pamphlet) return;

                this.selectedPamphlet = pamphlet;

                // Update UI
                document.querySelectorAll('.pamphlet-card').forEach(card => {
                    card.classList.remove('selected');
                });
                const cards = document.querySelectorAll('.pamphlet-card');
                if (cards[index]) {
                    cards[index].classList.add('selected');
                }

                // Show preview
                const previewContainer = document.getElementById('pamphlet-preview-container');
                const previewImg = document.getElementById('send-pamphlet-preview');
                previewImg.src = pamphlet.dataUrl;
                previewContainer.style.display = 'block';

                // Update message with pamphlet name
                const customMessage = document.getElementById('send-custom-message');
                const currentMessage = customMessage.value;
                if (!currentMessage.includes(pamphlet.name)) {
                    customMessage.value = currentMessage + `\n\nðŸ“¸ Check out our ${pamphlet.name}!`;
                    document.getElementById('send-message-preview').innerHTML = this.formatMessagePreview(customMessage.value);
                }
            }

            // Generate default pamphlet message
            generateDefaultPamphletMessage(enquiry) {
                const showroomName = this.showroomData?.name || 'Our Showroom';
                const showroomAddress = this.showroomData?.address || '';
                const vehicleModel = enquiry.vehicleModel || (enquiry.isExchange ? enquiry.exchangeModel : 'our vehicles');
                const customerName = enquiry.customerName || 'Valued Customer';

                const now = new Date();
                const hour = now.getHours();
                let greeting = 'Hello';
                if (hour < 12) greeting = 'Good Morning';
                else if (hour < 17) greeting = 'Good Afternoon';
                else greeting = 'Good Evening';

                return `${greeting} {customer_name},

Thank you for your interest in {vehicle_model} at {showroom_name}.

We have special offers and festive discounts available for you!

ðŸ“ž Call us: ${this.showroomData?.phone || ''}
ðŸ“ Visit: ${showroomAddress}

Reply with your convenient time for a test drive.

*Offer valid for limited period!*

- Team ShowroomDesk`;
            }

            // Format message preview (WhatsApp-like)
            formatMessagePreview(message) {
                return message.replace(/\n/g, '<br>');
            }

            // Update message preview on input
            updateSendMessagePreview() {
                const message = document.getElementById('send-custom-message').value;
                document.getElementById('send-message-preview').innerHTML = this.formatMessagePreview(message);
            }

            // Send pamphlet via WhatsApp
            async sendPamphletViaWhatsApp() {
                if (!this.selectedPamphlet) {
                    this.showToast('Please select a pamphlet first', 'error');
                    return;
                }

                if (!this.currentPamphletEnquiry) {
                    this.showToast('No enquiry selected', 'error');
                    return;
                }

                const customerPhone = this.currentPamphletEnquiry.phone;
                if (!customerPhone) {
                    this.showToast('Customer phone number not available', 'error');
                    return;
                }

                let message = document.getElementById('send-custom-message').value;

                // Replace placeholders
                const enquiry = this.currentPamphletEnquiry;
                const showroomName = this.showroomData?.name || 'Our Showroom';
                const showroomAddress = this.showroomData?.address || '';
                const vehicleModel = enquiry.vehicleModel || (enquiry.isExchange ? enquiry.exchangeModel : 'our vehicles');
                const customerName = enquiry.customerName || 'Valued Customer';

                message = message
                    .replace(/{customer_name}/g, customerName)
                    .replace(/{vehicle_model}/g, vehicleModel)
                    .replace(/{showroom_name}/g, showroomName)
                    .replace(/{showroom_address}/g, showroomAddress);

                // Clean phone number
                let cleanPhone = customerPhone.toString().replace(/\s/g, '');
                if (cleanPhone.startsWith('+')) {
                    cleanPhone = cleanPhone.substring(1);
                }
                if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
                    // Already has country code
                } else if (cleanPhone.length === 10) {
                    cleanPhone = '91' + cleanPhone;
                }

                // Create WhatsApp URL with message and image
                const encodedMessage = encodeURIComponent(message);
                const imageUrl = this.selectedPamphlet.dataUrl;

                // Note: wa.me links don't support direct image attachment
                // We'll send the image as a link in the message
                const waLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}%0A%0AðŸ“¸ *Pamphlet:* ${imageUrl}`;

                // Open WhatsApp in new tab
                window.open(waLink, '_blank');

                // Log the send
                await this.logPamphletSent(
                    this.currentPamphletEnquiry.id,
                    this.selectedPamphlet.name,
                    this.selectedPamphlet.vehicleModel
                );

                this.showToast('WhatsApp opened! Send the message from WhatsApp.', 'success');
                this.closeSendPamphletModal();
            }

            // Log pamphlet sent
            async logPamphletSent(enquiryId, pamphletName, vehicleModel) {
                try {
                    const logRef = window.firebase.collection(window.firebase.db, 'pamphletLogs');
                    await window.firebase.addDoc(logRef, {
                        enquiryId: enquiryId,
                        pamphletName: pamphletName,
                        vehicleModel: vehicleModel,
                        sentBy: this.currentUser?.uid,
                        sentByName: document.getElementById('user-name').textContent,
                        sentAt: new Date().toISOString(),
                        showroomId: this.showroomData.id
                    });
                    console.log('Pamphlet send logged');
                } catch (error) {
                    console.error('Error logging pamphlet send:', error);
                }
            }

            // Update WhatsApp button to open pamphlet modal instead of direct send
            openWhatsAppWithPamphlet(enquiryId) {
                const enquiry = this.enquiries.find(e => e.id === enquiryId);
                if (!enquiry) {
                    this.showToast('Enquiry not found', 'error');
                    return;
                }

                // Check if pamphlets exist
                this.loadPamphletsFromStorage();
                if (this.pamphlets.length === 0) {
                    // Fallback to direct WhatsApp without pamphlet
                    this.openWhatsApp(enquiryId);
                    return;
                }

                // Show pamphlet selection modal
                this.showSendPamphletModal(enquiryId);
            }

            // ==========================================================================
            // Reports Section - With actual report generation and download
            // ==========================================================================
            generateReport(type) {
                this.showToast(`Generating ${type} report...`, 'info');

                // Generate report based on type
                let reportData = [];
                let filename = '';
                let headers = [];

                switch (type) {
                    case 'daily':
                        filename = `daily_report_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Customer', 'Phone', 'Source', 'Vehicle', 'Status', 'Booking Amount', 'Follow-up Date', 'Sales Manager', 'Remarks'];
                        reportData = this.generateDailyReport();
                        break;

                    case 'weekly':
                        filename = `weekly_report_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Customer', 'Phone', 'Source', 'Vehicle', 'Status', 'Booking Amount', 'Created Date', 'Sales Manager', 'Week', 'Remarks'];
                        reportData = this.generateWeeklyReport();
                        break;

                    case 'monthly':
                        filename = `monthly_report_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Customer', 'Phone', 'Source', 'Vehicle', 'Status', 'Booking Amount', 'Created Date', 'Sales Manager', 'Month', 'Remarks'];
                        reportData = this.generateMonthlyReport();
                        break;

                    case 'sales':
                        filename = `sales_performance_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Sales Manager', 'Total Enquiries', 'Closed Deals', 'Bookings', 'Total Booking Amount', 'Conversion Rate', 'Hot Leads', 'Exchange Enquiries'];
                        reportData = this.generateSalesReport();
                        break;

                    case 'inventory':
                        filename = `inventory_report_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Brand', 'Model', 'Type', 'Added Date', 'Status'];
                        reportData = this.generateInventoryReport();
                        break;

                    case 'exchange':
                        filename = `exchange_enquiries_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Customer', 'Phone', 'Exchange Model', 'Status', 'Follow-up Date', 'Sales Manager', 'Remarks'];
                        reportData = this.generateExchangeReport();
                        break;

                    case 'booking':
                        filename = `booking_report_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Customer', 'Phone', 'Vehicle', 'Booking Amount', 'Booking Date', 'Sales Manager', 'Status', 'Remarks'];
                        reportData = this.generateBookingReport();
                        break;

                    case 'interventions':
                        filename = `interventions_${new Date().toISOString().split('T')[0]}.csv`;
                        headers = ['Customer', 'Priority', 'Message', 'Assigned To', 'Deadline', 'Status', 'Created By'];
                        reportData = this.generateInterventionsReport();
                        break;
                }

                // Generate and download CSV
                this.downloadCSV(reportData, headers, filename);
                this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} report downloaded!`, 'success');
            }

            // ==========================================================================
            // Report Data Generation Functions
            // ==========================================================================

            generateDailyReport() {
                const today = new Date().toDateString();
                return this.enquiries
                    .filter(e => new Date(e.createdAt).toDateString() === today)
                    .map(e => [
                        e.customerName || '',
                        e.phone || '',
                        e.source || 'N/A',
                        e.isExchange ? `Exchange: ${e.exchangeModel || ''}` : (e.vehicleModel || ''),
                        e.status || '',
                        e.bookingAmount ? `₹${e.bookingAmount}` : '-',
                        e.followupDate ? new Date(e.followupDate).toLocaleDateString() : 'Not set',
                        e.salesManagerName || 'Unassigned',
                        e.remarks || ''
                    ]);
            }

            generateWeeklyReport() {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

                return this.enquiries
                    .filter(e => new Date(e.createdAt) >= oneWeekAgo)
                    .map(e => {
                        const weekNumber = this.getWeekNumber(new Date(e.createdAt));
                        return [
                            e.customerName || '',
                            e.phone || '',
                            e.source || 'N/A',
                            e.isExchange ? `Exchange: ${e.exchangeModel || ''}` : (e.vehicleModel || ''),
                            e.status || '',
                            e.bookingAmount ? `₹${e.bookingAmount}` : '-',
                            new Date(e.createdAt).toLocaleDateString(),
                            e.salesManagerName || 'Unassigned',
                            `Week ${weekNumber}`,
                            e.remarks || ''
                        ];
                    });
            }

            generateMonthlyReport() {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

                return this.enquiries
                    .filter(e => new Date(e.createdAt) >= oneMonthAgo)
                    .map(e => {
                        const month = new Date(e.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
                        return [
                            e.customerName || '',
                            e.phone || '',
                            e.source || 'N/A',
                            e.isExchange ? `Exchange: ${e.exchangeModel || ''}` : (e.vehicleModel || ''),
                            e.status || '',
                            e.bookingAmount ? `₹${e.bookingAmount}` : '-',
                            new Date(e.createdAt).toLocaleDateString(),
                            e.salesManagerName || 'Unassigned',
                            month,
                            e.remarks || ''
                        ];
                    });
            }

            generateSalesReport() {
                const salesMap = new Map();

                this.enquiries.forEach(e => {
                    const manager = e.salesManagerName || 'Unassigned';
                    if (!salesMap.has(manager)) {
                        salesMap.set(manager, {
                            total: 0,
                            closed: 0,
                            booking: 0,
                            bookingAmount: 0,
                            hot: 0,
                            exchange: 0
                        });
                    }

                    const stats = salesMap.get(manager);
                    stats.total++;
                    if (e.status === 'closed') stats.closed++;
                    if (e.status === 'booking') {
                        stats.booking++;
                        stats.bookingAmount += e.bookingAmount || 0;
                    }
                    if (e.status === 'hot') stats.hot++;
                    if (e.isExchange) stats.exchange++;
                });

                return Array.from(salesMap.entries()).map(([manager, stats]) => {
                    const conversionRate = stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0;
                    return [
                        manager,
                        stats.total.toString(),
                        stats.closed.toString(),
                        stats.booking.toString(),
                        `₹${stats.bookingAmount.toLocaleString()}`,
                        conversionRate + '%',
                        stats.hot.toString(),
                        stats.exchange.toString()
                    ];
                });
            }

            generateInventoryReport() {
                return this.inventory.map(item => [
                    item.brand || '',
                    item.model || '',
                    item.type || '',
                    item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown',
                    'Available'
                ]);
            }

            generateExchangeReport() {
                return this.enquiries
                    .filter(e => e.isExchange)
                    .map(e => [
                        e.customerName || '',
                        e.phone || '',
                        e.exchangeModel || '',
                        e.status || '',
                        e.followupDate ? new Date(e.followupDate).toLocaleDateString() : 'Not set',
                        e.salesManagerName || 'Unassigned',
                        e.remarks || ''
                    ]);
            }

            generateBookingReport() {
                return this.enquiries
                    .filter(e => e.status === 'booking' && e.bookingAmount)
                    .map(e => [
                        e.customerName || '',
                        e.phone || '',
                        e.isExchange ? `Exchange: ${e.exchangeModel || ''}` : (e.vehicleModel || ''),
                        `₹${e.bookingAmount}`,
                        e.bookingDate ? new Date(e.bookingDate).toLocaleDateString() : new Date(e.updatedAt || e.createdAt).toLocaleDateString(),
                        e.salesManagerName || 'Unassigned',
                        e.status || '',
                        e.remarks || ''
                    ]);
            }

            generateInterventionsReport() {
                return this.enquiries
                    .filter(e => e.intervention)
                    .map(e => [
                        e.customerName || '',
                        e.intervention.priority || 'medium',
                        e.intervention.message || '',
                        e.intervention.assignedTo ? this.getSalesManagerName(e.intervention.assignedTo) : 'Unassigned',
                        e.intervention.deadline ? new Date(e.intervention.deadline).toLocaleDateString() : 'Not set',
                        e.intervention.resolved ? 'Resolved' : 'Pending',
                        e.intervention.createdBy || 'Unknown'
                    ]);
            }

            // ==========================================================================
            // Helper Functions
            // ==========================================================================

            getWeekNumber(date) {
                const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
                const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
                return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
            }

            getSalesManagerName(uid) {
                const manager = this.team.find(m => m.uid === uid);
                return manager ? manager.name : 'Unknown';
            }

            downloadCSV(data, headers, filename) {
                if (!data || data.length === 0) {
                    this.showToast('No data available for this report', 'warning');
                    return;
                }

                // Create CSV content
                let csvContent = headers.join(',') + '\n';

                data.forEach(row => {
                    const escapedRow = row.map(cell => {
                        // Escape commas and quotes in cell content
                        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
                            return `"${cell.replace(/"/g, '""')}"`;
                        }
                        return cell;
                    }).join(',');
                    csvContent += escapedRow + '\n';
                });

                // Create download link
                const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }); // Add BOM for Excel UTF-8
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);

                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }

            // ==========================================================================
            // Inventory Management - FIXED with better error handling
            // ==========================================================================
            async loadInventory(forceRefresh = false) {
                try {
                    if (!this.showroomData || !this.showroomData.id) {
                        console.error('No showroom data available');
                        this.inventory = [];
                        this.renderInventoryTable();
                        return;
                    }

                    console.log('Loading inventory for showroom:', this.showroomData.id);

                    // Show cached data immediately if available
                    if (!forceRefresh && this.inventory && this.inventory.length > 0) {
                        console.log('Using cached inventory:', this.inventory.length, 'items');
                        this.renderInventoryTable();

                        // Load model dropdown if needed
                        if (document.getElementById('add-enquiry').classList.contains('active')) {
                            this.loadInventoryModels();
                        }
                        return;
                    }

                    // Show loading state only on first load or forced refresh
                    const tbody = document.getElementById('inventory-list');
                    if (tbody) {
                        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Loading inventory...</td></tr>';
                    }

                    // Create query with index hint for better performance
                    const inventoryRef = window.firebase.collection(window.firebase.db, 'inventory');
                    const q = window.firebase.query(
                        inventoryRef,
                        window.firebase.where('showroomId', '==', this.showroomData.id),
                        window.firebase.orderBy('createdAt', 'desc')
                    );

                    // Add timeout to prevent hanging
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Request timeout')), 10000)
                    );

                    const snapshot = await Promise.race([
                        window.firebase.getDocs(q),
                        timeoutPromise
                    ]).catch(async (error) => {
                        // If this is a new user/collection, return empty snapshot
                        if (error.code === 'permission-denied' || error.message.includes('permission') || error.message.includes('missing')) {
                            console.log('No inventory collection yet for new user');
                            return { empty: true, forEach: () => { } };
                        }
                        throw error;
                    });

                    this.inventory = [];
                    if (snapshot && snapshot.forEach) {
                        snapshot.forEach(doc => {
                            const data = doc.data();
                            // Skip system init documents
                            if (data.isSystemInit) return;
                            this.inventory.push({ id: doc.id, ...data });
                        });
                    }

                    console.log('Inventory loaded:', this.inventory.length, 'items');

                    // Cache the data in localStorage for faster subsequent loads
                    try {
                        localStorage.setItem(`inventory_${this.showroomData.id}`, JSON.stringify({
                            data: this.inventory,
                            timestamp: Date.now()
                        }));
                    } catch (e) {
                        console.log('localStorage not available for caching');
                    }

                    this.renderInventoryTable();

                    // Update model dropdown if needed
                    if (document.getElementById('add-enquiry').classList.contains('active')) {
                        this.loadInventoryModels();
                    }

                } catch (error) {
                    console.error('Error loading inventory:', error);

                    // Don't show error for new users - just show empty inventory
                    if (error.code === 'permission-denied' || error.message.includes('permission') || error.message.includes('missing')) {
                        console.log('First time user - inventory will be created when adding first model');
                        this.inventory = [];
                        this.renderInventoryTable();
                        return;
                    }

                    // Try to load from cache on error
                    try {
                        const cached = localStorage.getItem(`inventory_${this.showroomData.id}`);
                        if (cached) {
                            const { data, timestamp } = JSON.parse(cached);
                            const age = Date.now() - timestamp;

                            // Use cache if less than 5 minutes old
                            if (age < 300000) {
                                console.log('Using cached inventory due to error');
                                this.inventory = data;
                                this.renderInventoryTable();
                                this.showToast('Using cached data (offline mode)', 'warning');
                                return;
                            }
                        }
                    } catch (e) {
                        console.log('Could not load from cache');
                    }

                    this.inventory = [];
                    this.renderInventoryTable();
                }
            }

            renderInventoryTable() {
                const tbody = document.getElementById('inventory-list');
                if (!tbody) return;

                tbody.innerHTML = '';

                if (!this.inventory || this.inventory.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No models added yet. Click "Add New Model" to add your first model.</td></tr>';
                    return;
                }

                this.inventory.forEach(item => {
                    const row = document.createElement('tr');
                    const createdDate = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently';

                    row.innerHTML = `
                    <td>${item.brand || ''}</td>
                    <td>${item.model || ''}</td>
                    <td><span class="vehicle-badge ${item.type || 'car'}">${item.type || 'Car'}</span></td>
                    <td><span class="status-badge status-new">Available</span></td>
                    <td>${createdDate}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="app.deleteInventory('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                    tbody.appendChild(row);
                });
            }

            // Replace the showAddTeamModal method with this updated version
            showAddTeamModal() {
                // Check if user is owner
                if (this.userRole !== 'owner') {
                    this.showToast('You don\'t have permission to add team members. This feature is only available to the owner.', 'error');
                    return;
                }

                // If owner, proceed with showing the modal
                document.getElementById('team-modal').classList.add('active');
                document.getElementById('manual-password-info').style.display = 'none';
                document.getElementById('team-form').reset();
                document.getElementById('password-strength').innerHTML = '';
            }

            showAddInventoryModal() {
                document.getElementById('inventory-modal').classList.add('active');
                document.getElementById('inventory-form').reset();
            }

            closeInventoryModal() {
                document.getElementById('inventory-modal').classList.remove('active');
                document.getElementById('inventory-form').reset();
            }

            async saveInventory() {
                if (this.blockIfTrialExpired()) return;
                const status = this.getTrialStatus();
                if (status.status === 'grace') {
                    this.showToast(`⚠️ Grace period active (${status.daysLeft} days left). Please upgrade to add new enquiries.`, 'warning');
                    return;
                }
                const type = document.getElementById('inventory-type').value;
                const brand = document.getElementById('inventory-brand').value.trim();
                const model = document.getElementById('inventory-model').value.trim();

                if (!type || !brand || !model) {
                    this.showToast('Please fill all fields', 'error');
                    return;
                }

                // Validate that the vehicle type is allowed for this showroom
                if (!this.showroomData.vehicleTypes.includes(type)) {
                    this.showToast(`Your showroom does not support ${type} vehicles`, 'error');
                    return;
                }

                const inventoryData = {
                    type: type,
                    brand: brand,
                    model: model,
                    showroomId: this.showroomData.id,
                    createdAt: new Date().toISOString()
                };

                console.log('Saving inventory:', inventoryData);
                this.showLoading(true);

                try {
                    // Try to refresh token before saving
                    if (this.currentUser) {
                        await this.currentUser.getIdToken(true);
                        console.log('Token refreshed before saving');
                    }

                    const inventoryRef = window.firebase.collection(window.firebase.db, 'inventory');
                    const docRef = await window.firebase.addDoc(inventoryRef, inventoryData);
                    console.log('Inventory saved with ID:', docRef.id);

                    this.closeInventoryModal();
                    await this.loadInventory(true); // Force refresh
                    this.showToast('Model added to inventory successfully!', 'success');

                } catch (error) {
                    console.error('Error saving inventory:', error);

                    // Handle specific error codes
                    if (error.code === 'permission-denied') {
                        this.showToast('Permission denied. Please check if you are properly logged in.', 'error');

                        // Try to re-authenticate
                        try {
                            if (this.ownerCredentials.email && this.ownerCredentials.password) {
                                await window.firebase.signInWithEmailAndPassword(
                                    window.firebase.auth,
                                    this.ownerCredentials.email,
                                    this.ownerCredentials.password
                                );
                                this.showToast('Re-authenticated. Please try again.', 'info');
                            }
                        } catch (authError) {
                            console.error('Re-authentication failed:', authError);
                        }
                    } else if (error.message.includes('permission') || error.message.includes('missing')) {
                        this.showToast('Unable to save. Please check Firestore security rules.', 'error');

                        // Add to local array as fallback
                        console.log('Adding to local inventory as fallback');
                        const tempId = 'local_' + Date.now();
                        this.inventory.push({ id: tempId, ...inventoryData });
                        this.renderInventoryTable();
                        this.closeInventoryModal();
                        this.showToast('Model added to local list (will not persist after reload)', 'warning');
                    } else {
                        this.showToast('Error saving model: ' + error.message, 'error');
                    }
                } finally {
                    this.showLoading(false);
                }
            }

            async deleteInventory(id) {
                if (!confirm('Are you sure you want to remove this model?')) return;

                // Check if user has permission
                if (this.userRole !== 'owner' && this.userRole !== 'senior' && this.userRole !== 'sales') {
                    this.showToast('You do not have permission to delete inventory items', 'error');
                    return;
                }

                // If it's a local item (prefixed with local_), just remove from array
                if (id.startsWith('local_')) {
                    this.inventory = this.inventory.filter(item => item.id !== id);
                    this.renderInventoryTable();
                    this.showToast('Model removed from local list', 'success');
                    return;
                }

                this.showLoading(true);

                try {
                    const inventoryRef = window.firebase.doc(window.firebase.db, 'inventory', id);
                    await window.firebase.deleteDoc(inventoryRef);

                    await this.loadInventory(true); // Force refresh
                    this.showToast('Model removed successfully', 'success');

                } catch (error) {
                    console.error('Error deleting inventory:', error);

                    // Handle permission error specifically
                    if (error.code === 'permission-denied') {
                        this.showToast('Permission denied. Only owners and managers can delete inventory.', 'error');
                    } else {
                        this.showToast('Error removing model: ' + error.message, 'error');
                    }
                } finally {
                    this.showLoading(false);
                }
            }

            // ==========================================================================
            // Team Management - UPDATED with Manual Password Entry
            // ==========================================================================
            async loadTeam() {
                try {
                    const usersRef = window.firebase.collection(window.firebase.db, 'users');
                    const q = window.firebase.query(
                        usersRef,
                        window.firebase.where('showroom.id', '==', this.showroomData.id),
                        window.firebase.where('role', '!=', 'owner')
                    );

                    const snapshot = await window.firebase.getDocs(q);
                    this.team = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        this.team.push({
                            id: doc.id,
                            uid: data.uid,
                            ...data
                        });
                    });

                    this.renderTeamTable();

                } catch (error) {
                    console.error('Error loading team:', error);
                    this.team = [];
                    this.renderTeamTable();
                }
            }

            renderTeamTable() {
                const tbody = document.getElementById('team-list');
                tbody.innerHTML = '';

                if (this.team.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4">No team members added yet</td></tr>';
                    return;
                }

                this.team.forEach(member => {
                    const memberEnquiries = this.enquiries.filter(e => e.salesManagerId === member.uid);
                    const closedDeals = memberEnquiries.filter(e => e.status === 'closed').length;
                    const bookings = memberEnquiries.filter(e => e.status === 'booking').length;
                    const bookingAmount = memberEnquiries
                        .filter(e => e.status === 'booking')
                        .reduce((sum, e) => sum + (e.bookingAmount || 0), 0);

                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${member.name || ''}</td>
                    <td>${member.email || ''}</td>
                    <td>${member.phone || 'N/A'}</td>
                    <td>${member.role === 'senior' ? 'Senior Sales Manager' :
                            member.role === 'salesperson' ? 'Sales Person' : 'Sales Manager'}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="app.viewTeamMemberPassword('${member.uid}', '${member.name}')">
                            <i class="fas fa-eye"></i> View Password
                        </button>
                    </td>
                    <td>${memberEnquiries.length}</td>
                    <td>${closedDeals} (${bookings} bookings)</td>
                    <td>₹${bookingAmount.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="app.deleteTeamMember('${member.uid}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                    tbody.appendChild(row);
                });
            }

            viewTeamMemberPassword(uid, name) {
                // Find the team member
                const member = this.team.find(m => m.uid === uid);
                if (!member) {
                    this.showToast('Team member not found', 'error');
                    return;
                }

                this.currentViewPassword = uid;
                this.currentViewPasswordName = name;

                document.getElementById('password-member-name').textContent = name;

                // In a real app, you would retrieve the password securely
                // Since we have the password in memory during creation, we can display it
                // For security, we'll show a masked version with option to reveal
                const passwordDisplay = document.getElementById('view-password-display');

                // Create password display with toggle visibility
                passwordDisplay.innerHTML = `
        <div style="position: relative; margin-bottom: 10px;">
            <input type="password" id="member-password-field" value="${member.password || 'password123'}" 
                   style="width: 100%; padding: 10px; font-family: monospace; font-size: 1.2rem; text-align: center; border: 2px solid var(--primary); border-radius: var(--radius);" readonly>
            <button type="button" onclick="app.toggleViewPasswordVisibility()" 
                    style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--primary); cursor: pointer;">
                <i class="fas fa-eye"></i>
            </button>
        </div>
        <p class="text-muted small">Click the eye icon to show/hide password. Share this password securely with the team member.</p>
    `;

                document.getElementById('view-password-modal').classList.add('active');
            }

            toggleViewPasswordVisibility() {
                const passwordField = document.getElementById('member-password-field');
                const eyeIcon = document.querySelector('#view-password-display button i');

                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    eyeIcon.className = 'fas fa-eye-slash';
                } else {
                    passwordField.type = 'password';
                    eyeIcon.className = 'fas fa-eye';
                }
            }

            closeViewPasswordModal() {
                document.getElementById('view-password-modal').classList.remove('active');
                this.currentViewPassword = null;
                this.currentViewPasswordName = null;
            }

            copyPasswordToClipboard() {
                const passwordField = document.getElementById('member-password-field');
                if (passwordField) {
                    // Temporarily show password to copy it
                    const wasPassword = passwordField.type === 'password';
                    if (wasPassword) {
                        passwordField.type = 'text';
                    }

                    passwordField.select();
                    document.execCommand('copy');

                    if (wasPassword) {
                        passwordField.type = 'password';
                    }

                    this.showToast('Password copied to clipboard!', 'success');
                } else {
                    this.showToast('Password not found', 'error');
                }
            }


            showAddTeamModal() {
                document.getElementById('team-modal').classList.add('active');
                document.getElementById('manual-password-info').style.display = 'none';
                document.getElementById('team-form').reset();
                document.getElementById('password-strength').innerHTML = '';
            }

            closeTeamModal() {
                document.getElementById('team-modal').classList.remove('active');
                document.getElementById('team-form').reset();
                document.getElementById('password-strength').innerHTML = '';
            }

            async saveTeamMember() {
                if (this.blockIfTrialExpired()) return;
                const status = this.getTrialStatus();
                if (status.status === 'grace') {
                    this.showToast(`⚠️ Grace period active (${status.daysLeft} days left). Please upgrade to add new enquiries.`, 'warning');
                    return;
                }
                const name = document.getElementById('team-name').value.trim();
                const email = document.getElementById('team-email').value.trim();
                const phone = document.getElementById('team-phone').value.trim();
                const role = document.getElementById('team-role').value;
                const password = document.getElementById('team-password').value;
                const confirmPassword = document.getElementById('team-password-confirm').value;

                if (!name || !email || !phone || !password) {
                    this.showToast('Please fill all required fields', 'error');
                    return;
                }

                // Validate phone
                if (!/^\d{10}$/.test(phone)) {
                    this.showToast('Please enter a valid 10-digit phone number', 'error');
                    return;
                }

                // Validate email
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    this.showToast('Please enter a valid email address', 'error');
                    return;
                }

                // Validate password
                if (password.length < 6) {
                    this.showToast('Password must be at least 6 characters long', 'error');
                    return;
                }

                if (password !== confirmPassword) {
                    this.showToast('Passwords do not match', 'error');
                    return;
                }

                this.showLoading(true);

                try {
                    // Check if we have owner credentials stored
                    if (!this.ownerCredentials.email || !this.ownerCredentials.password) {
                        // If not stored, try to get from current user
                        if (this.currentUser && this.userRole === 'owner') {
                            const ownerPassword = prompt('For security, please enter your password to continue:');
                            if (!ownerPassword) {
                                this.showToast('Operation cancelled', 'warning');
                                this.showLoading(false);
                                return;
                            }

                            this.ownerCredentials = {
                                email: this.currentUser.email,
                                password: ownerPassword
                            };
                        } else {
                            this.showToast('Owner credentials not found. Please login again.', 'error');
                            this.showLoading(false);
                            return;
                        }
                    }

                    // Store owner email before creating new user
                    const ownerEmail = this.ownerCredentials.email;
                    const ownerPassword = this.ownerCredentials.password;

                    // Create Firebase Auth user with manual password
                    const userCredential = await window.firebase.createUserWithEmailAndPassword(
                        window.firebase.auth,
                        email,
                        password
                    );

                    // Create a clean showroom object with safe defaults
                    const safeShowroomData = {
                        id: this.showroomData.id || 'unknown',
                        name: this.showroomData.name || 'Unknown Showroom',
                        address: this.showroomData.address || '',
                        city: this.showroomData.city || '',
                        state: this.showroomData.state || '',
                        vehicleTypes: this.showroomData.vehicleTypes || [],
                        brands: this.showroomData.brands || [],
                        models: this.showroomData.models || {}
                    };

                    // Add planType and subscription info only if they exist
                    if (this.showroomData.planType) {
                        safeShowroomData.planType = this.showroomData.planType;
                    }
                    if (this.showroomData.paymentStatus) {
                        safeShowroomData.paymentStatus = this.showroomData.paymentStatus;
                    }
                    if (this.showroomData.subscriptionStartDate) {
                        safeShowroomData.subscriptionStartDate = this.showroomData.subscriptionStartDate;
                    }
                    if (this.showroomData.subscriptionEndDate) {
                        safeShowroomData.subscriptionEndDate = this.showroomData.subscriptionEndDate;
                    }

                    // Add subscription object only if it exists
                    if (this.showroomData.subscription) {
                        safeShowroomData.subscription = {
                            status: this.showroomData.subscription.status || 'trial',
                            planType: this.showroomData.subscription.planType || 'trial',
                            paymentStatus: this.showroomData.subscription.paymentStatus || 'unpaid',
                            startDate: this.showroomData.subscription.startDate || new Date().toISOString(),
                            endDate: this.showroomData.subscription.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                        };
                    } else {
                        // Default subscription for new team member
                        safeShowroomData.subscription = {
                            status: 'trial',
                            planType: 'trial',
                            paymentStatus: 'unpaid',
                            startDate: new Date().toISOString(),
                            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                        };
                    }

                    // Save user data to Firestore with safe showroom object
                    const userData = {
                        uid: userCredential.user.uid,
                        name: name,
                        email: email,
                        phone: phone,
                        role: role,
                        password: password,
                        showroom: safeShowroomData,
                        createdAt: new Date().toISOString(),
                        createdBy: this.currentUser.uid,
                        createdByName: document.getElementById('user-name').textContent,
                        status: 'active' // Add status field for consistency
                    };

                    console.log('Saving team member with showroom data:', safeShowroomData);

                    await window.firebase.setDoc(
                        window.firebase.doc(window.firebase.db, 'users', userCredential.user.uid),
                        userData
                    );

                    console.log('Team member created:', userCredential.user.uid);

                    // IMPORTANT: Sign out the new user
                    await window.firebase.signOut(window.firebase.auth);

                    // Sign back in as the owner using stored credentials
                    await window.firebase.signInWithEmailAndPassword(
                        window.firebase.auth,
                        ownerEmail,
                        ownerPassword
                    );

                    this.closeTeamModal();
                    this.showToast('Team member added successfully!', 'success');
                    await this.loadTeam();

                } catch (error) {
                    console.error('Error adding team member:', error);

                    if (error.code === 'auth/email-already-in-use') {
                        this.showToast('Email already in use', 'error');
                    } else if (error.code === 'auth/wrong-password') {
                        this.showToast('Incorrect password. Please try again.', 'error');
                        this.ownerCredentials = { email: null, password: null };
                    } else if (error.code === 'auth/weak-password') {
                        this.showToast('Password is too weak. Please choose a stronger password.', 'error');
                    } else if (error.message && error.message.includes('showroom')) {
                        this.showToast('Error with showroom data. Please refresh and try again.', 'error');
                        console.error('Showroom data issue:', this.showroomData);
                    } else {
                        this.showToast('Error adding team member: ' + error.message, 'error');
                    }

                    // Try to re-authenticate the owner if something went wrong
                    try {
                        if (this.ownerCredentials.email && this.ownerCredentials.password) {
                            await window.firebase.signInWithEmailAndPassword(
                                window.firebase.auth,
                                this.ownerCredentials.email,
                                this.ownerCredentials.password
                            );
                        }
                    } catch (e) {
                        console.error('Re-authentication failed:', e);
                    }

                } finally {
                    this.showLoading(false);
                }
            }

            async deleteTeamMember(uid) {
                if (!confirm('Are you sure you want to remove this team member?')) return;

                this.showLoading(true);

                try {
                    await window.firebase.deleteDoc(window.firebase.doc(window.firebase.db, 'users', uid));
                    await this.loadTeam();
                    this.showToast('Team member removed successfully', 'success');

                } catch (error) {
                    console.error('Error deleting team member:', error);
                    this.showToast('Error removing team member: ' + error.message, 'error');
                } finally {
                    this.showLoading(false);
                }
            }

            // ==========================================================================
            // Enquiry Related Methods
            // ==========================================================================
            async saveEnquiry(e) {
                e.preventDefault();

                if (this.blockIfTrialExpired()) return;
                const status2 = this.getTrialStatus();
                if (status2.status === 'grace') {
                    this.showToast(`⚠️ Grace period active (${status2.daysLeft} days left). Please upgrade to add new enquiries.`, 'warning');
                    return;
                }

                const isExchange = document.querySelector('input[name="is-exchange"]:checked')?.value === 'yes';
                const source = document.getElementById('enquiry-source').value;
                const status = document.getElementById('enquiry-status').value;
                const bookingAmount = document.getElementById('enquiry-booking-amount').value;

                // Validate source
                if (!source) {
                    this.showToast('Please select an enquiry source', 'error');
                    return;
                }

                // Validate booking amount if status is booking
                if (status === 'booking' && !bookingAmount) {
                    this.showToast('Please enter booking amount', 'error');
                    return;
                }

                // Validate phone
                const phoneRaw = document.getElementById('enquiry-phone').value.trim();
                if (!phoneRaw) {
                    this.showToast('Phone number is required', 'error');
                    return;
                }

                // Normalize phone for duplicate check
                const normalizePhone = (p) => p.toString().replace(/\D/g, '');
                const newPhone = normalizePhone(phoneRaw);

                // Check for duplicate active enquiry with same phone
                const existing = this.enquiries.find(e => {
                    const existingPhone = normalizePhone(e.phone);
                    return existingPhone === newPhone &&
                        e.status !== 'closed' &&
                        e.status !== 'lost';
                });
                if (existing) {
                    this.showToast(
                        `An active enquiry (${existing.customerName}) already exists with this phone number. Please update the existing enquiry instead.`,
                        'error'
                    );
                    return;
                }

                // Base enquiry data
                const enquiryData = {
                    customerName: document.getElementById('enquiry-customer-name').value.trim(),
                    phone: phoneRaw, // store as entered, but we normalized for check
                    email: document.getElementById('enquiry-email').value.trim(),
                    source: source,
                    isExchange: isExchange,
                    status: status,
                    followupDate: document.getElementById('enquiry-followup').value,
                    remarks: document.getElementById('enquiry-remarks').value.trim(),
                    showroomId: this.showroomData.id,
                    salesManagerId: this.currentUser.uid,
                    salesManagerName: document.getElementById('user-name').textContent,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                // Add booking amount if status is booking
                if (status === 'booking') {
                    enquiryData.bookingAmount = parseFloat(bookingAmount);
                    enquiryData.bookingDate = new Date().toISOString();
                }

                // Handle vehicle selection - ALWAYS select the vehicle customer is interested in
                const selectedModel = document.getElementById('enquiry-model').value;

                if (selectedModel && selectedModel !== "manual" && selectedModel !== "") {
                    enquiryData.vehicleModel = selectedModel;

                    // Extract type from the selected option if available
                    const selectedOption = Array.from(document.querySelectorAll('#enquiry-model option')).find(
                        opt => opt.value === selectedModel
                    );
                    if (selectedOption && selectedOption.dataset) {
                        enquiryData.vehicleType = selectedOption.dataset.type || 'unknown';
                        enquiryData.vehicleBrand = selectedOption.dataset.brand || '';
                    }
                } else if (selectedModel === "manual") {
                    enquiryData.vehicleModel = "Manual entry";
                    enquiryData.remarks = (enquiryData.remarks ? enquiryData.remarks + "\n" : "") +
                        "Note: Customer interested in a model not in inventory - please specify details.";
                } else {
                    this.showToast('Please select a vehicle model', 'error');
                    return;
                }

                // Handle exchange details if this is an exchange enquiry
                if (isExchange) {
                    const exchangeModel = document.getElementById('enquiry-exchange-model').value.trim();
                    if (!exchangeModel) {
                        this.showToast('Please enter the exchange vehicle details', 'error');
                        return;
                    }
                    enquiryData.exchangeModel = exchangeModel;
                }

                // Validate common required fields
                if (!enquiryData.customerName || !enquiryData.phone) {
                    this.showToast('Customer name and phone are required', 'error');
                    return;
                }

                try {
                    const enquiriesRef = window.firebase.collection(window.firebase.db, 'enquiries');
                    await window.firebase.addDoc(enquiriesRef, enquiryData);

                    this.showToast('Enquiry saved successfully!', 'success');
                    document.getElementById('enquiry-form').reset();
                    // Reset exchange radio to default
                    document.querySelector('input[name="is-exchange"][value="no"]').checked = true;
                    this.toggleExchangeFields();
                    this.toggleBookingFields();
                    await this.loadEnquiries();
                    this.switchSection('enquiries');

                } catch (error) {
                    console.error('Error saving enquiry:', error);
                    this.showToast('Error saving enquiry: ' + error.message, 'error');
                }
            }

            viewEnquiry(id) {
                const enquiry = this.enquiries.find(e => e.id === id);
                if (enquiry) {
                    let details = `
                    <div style="padding: 1rem;">
                        <h3 style="margin-bottom: 1rem;">${enquiry.customerName}</h3>
                        <p><strong>Phone:</strong> ${enquiry.phone}</p>
                        <p><strong>Email:</strong> ${enquiry.email || 'N/A'}</p>
                        <p><strong>Source:</strong> ${enquiry.source || 'N/A'}</p>
                `;

                    if (enquiry.isExchange) {
                        details += `
                        <p><strong>Exchange Vehicle:</strong> ${enquiry.exchangeModel || 'N/A'}</p>
                        <p><strong>Type:</strong> Exchange Enquiry</p>
                    `;
                    } else {
                        details += `
                        <p><strong>Vehicle:</strong> ${enquiry.vehicleModel || 'Not specified'}</p>
                    `;
                    }

                    details += `
                        <p><strong>Status:</strong> <span class="status-badge status-${enquiry.status}">${enquiry.status}</span></p>
                `;

                    if (enquiry.status === 'booking' && enquiry.bookingAmount) {
                        details += `<p><strong>Booking Amount:</strong> ₹${enquiry.bookingAmount.toLocaleString()}</p>`;
                        if (enquiry.bookingDate) {
                            details += `<p><strong>Booking Date:</strong> ${new Date(enquiry.bookingDate).toLocaleDateString()}</p>`;
                        }
                    }

                    details += `
                        <p><strong>Follow-up:</strong> ${enquiry.followupDate ? new Date(enquiry.followupDate).toLocaleString() : 'Not set'}</p>
                        <p><strong>Remarks:</strong> ${enquiry.remarks || 'No remarks'}</p>
                        <p><strong>Sales Manager:</strong> ${enquiry.salesManagerName}</p>
                        <p><strong>Created:</strong> ${enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString() : 'Unknown'}</p>
                        ${enquiry.intervention ? `
                            <div style="margin-top: 1rem; padding: 1rem; background: var(--warning-light); border-left: 4px solid var(--warning);">
                                <h4>Intervention</h4>
                                <p><strong>Message:</strong> ${enquiry.intervention.message}</p>
                                <p><strong>Priority:</strong> ${enquiry.intervention.priority}</p>
                                <p><strong>Status:</strong> ${enquiry.intervention.resolved ? 'Resolved' : 'Pending'}</p>
                            </div>
                        ` : ''}
                    </div>
                `;

                    alert('View enquiry details - ' + enquiry.customerName + '\n\n' +
                        'Phone: ' + enquiry.phone + '\n' +
                        'Source: ' + (enquiry.source || 'N/A') + '\n' +
                        (enquiry.isExchange ? 'Exchange: ' + enquiry.exchangeModel : 'Vehicle: ' + (enquiry.vehicleModel || 'Not specified')) + '\n' +
                        'Status: ' + enquiry.status + '\n' +
                        (enquiry.status === 'booking' && enquiry.bookingAmount ? 'Booking Amount: ₹' + enquiry.bookingAmount.toLocaleString() + '\n' : '') +
                        'Remarks: ' + (enquiry.remarks || 'No remarks'));
                }
            }

            addIntervention(id) {
                this.currentInterventionEnquiry = id;
                this.loadInterventionModal();
            }

            loadInterventionModal() {
                const enquirySelect = document.getElementById('intervention-enquiry');
                if (enquirySelect) {
                    enquirySelect.innerHTML = '<option value="">Select Enquiry</option>';
                    this.enquiries.forEach(e => {
                        if (!e.intervention || !e.intervention.resolved) {
                            const option = document.createElement('option');
                            option.value = e.id;
                            const vehicleInfo = e.isExchange ?
                                `Exchange: ${e.exchangeModel || ''}` :
                                `${e.vehicleModel || ''}`;
                            option.textContent = `${e.customerName} - ${vehicleInfo}`;
                            if (e.id === this.currentInterventionEnquiry) {
                                option.selected = true;
                            }
                            enquirySelect.appendChild(option);
                        }
                    });
                }

                const assigneeSelect = document.getElementById('intervention-assignee');
                if (assigneeSelect) {
                    assigneeSelect.innerHTML = '<option value="">Select Sales Manager</option>';
                    this.team.forEach(member => {
                        const option = document.createElement('option');
                        option.value = member.uid;
                        option.textContent = member.name;
                        assigneeSelect.appendChild(option);
                    });
                }

                document.getElementById('intervention-modal').classList.add('active');
            }

            closeInterventionModal() {
                document.getElementById('intervention-modal').classList.remove('active');
                this.currentInterventionEnquiry = null;
                document.getElementById('intervention-form').reset();
            }

            async saveIntervention() {
                if (this.blockIfTrialExpired()) return;
                const status = this.getTrialStatus();
                if (status.status === 'grace') {
                    this.showToast(`⚠️ Grace period active (${status.daysLeft} days left). Please upgrade to add new enquiries.`, 'warning');
                    return;
                }
                const enquiryId = document.getElementById('intervention-enquiry').value;
                const priority = document.getElementById('intervention-priority').value;
                const message = document.getElementById('intervention-message').value;
                const assignee = document.getElementById('intervention-assignee').value;
                const deadline = document.getElementById('intervention-deadline').value;

                if (!enquiryId || !message) {
                    this.showToast('Please fill all required fields', 'error');
                    return;
                }

                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', enquiryId);
                    await window.firebase.updateDoc(enquiryRef, {
                        intervention: {
                            priority,
                            message,
                            assignedTo: assignee,
                            deadline: deadline || null,
                            createdBy: this.currentUser?.email || 'Owner',
                            createdByName: document.getElementById('user-name').textContent,
                            createdAt: new Date().toISOString(),
                            resolved: false
                        }
                    });

                    this.closeInterventionModal();
                    await this.loadEnquiries();
                    await this.loadInterventions();
                    this.showToast('Intervention created successfully!', 'success');

                } catch (error) {
                    console.error('Error creating intervention:', error);
                    this.showToast('Error creating intervention: ' + error.message, 'error');
                }
            }

            async resolveIntervention(id) {
                try {
                    const enquiryRef = window.firebase.doc(window.firebase.db, 'enquiries', id);
                    await window.firebase.updateDoc(enquiryRef, {
                        'intervention.resolved': true,
                        'intervention.resolvedAt': new Date().toISOString(),
                        'intervention.resolvedBy': this.currentUser.email
                    });

                    await this.loadEnquiries();
                    await this.loadInterventions();
                    this.showToast('Intervention resolved!', 'success');

                } catch (error) {
                    console.error('Error resolving intervention:', error);
                    this.showToast('Error resolving intervention: ' + error.message, 'error');
                }
            }

            createNewIntervention() {
                this.currentInterventionEnquiry = null;
                this.loadInterventionModal();
            }

            updateCurrentDate() {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-IN', options);
            }

            toggleUserMenu(event) {
                event?.stopPropagation();
                const dropdown = document.querySelector('.user-dropdown');
                const profileButton = document.querySelector('.user-profile');
                if (!dropdown) return;

                const shouldOpen = !dropdown.classList.contains('open');
                document.querySelectorAll('.user-dropdown').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.classList.remove('open');
                        menu.querySelector('.user-profile')?.setAttribute('aria-expanded', 'false');
                    }
                });

                dropdown.classList.toggle('open', shouldOpen);
                profileButton?.setAttribute('aria-expanded', String(shouldOpen));
            }

            showEditProfileModal() {
                const modal = document.getElementById('edit-profile-modal');
                if (!modal) return;

                document.querySelector('.user-dropdown')?.classList.remove('open');
                document.querySelector('.user-profile')?.setAttribute('aria-expanded', 'false');

                const userName = this.showroomData?.ownerName || document.getElementById('user-name')?.textContent || '';
                const email = this.currentUser?.email || '';
                const phone = this.showroomData?.ownerPhone || this.showroomData?.phone || this.currentUser?.phoneNumber || '';

                document.getElementById('profile-name').value = userName === 'User' ? '' : userName;
                document.getElementById('profile-email').value = email;
                document.getElementById('profile-phone').value = phone;
                modal.classList.add('active');
            }

            closeEditProfileModal() {
                document.getElementById('edit-profile-modal')?.classList.remove('active');
            }

            async saveEditProfile() {
                const name = document.getElementById('profile-name')?.value.trim();
                const phone = document.getElementById('profile-phone')?.value.trim();

                if (!name || !/^\d{10}$/.test(phone)) {
                    this.showToast('Please enter a name and valid 10-digit phone number', 'error');
                    return;
                }

                if (!this.currentUser) {
                    this.showToast('Please login again to edit your profile', 'error');
                    return;
                }

                this.showLoading(true);
                try {
                    const userRef = window.firebase.doc(window.firebase.db, 'users', this.currentUser.uid);
                    await window.firebase.updateDoc(userRef, { name, phone, updatedAt: new Date().toISOString() });

                    document.getElementById('user-name').textContent = name;
                    if (this.showroomData) {
                        this.showroomData.ownerName = name;
                        this.showroomData.ownerPhone = phone;
                        this.showroomData.phone = phone;
                    }

                    this.closeEditProfileModal();
                    this.showToast('Profile updated successfully!', 'success');
                } catch (error) {
                    console.error('Error updating profile:', error);
                    this.showToast('Error updating profile: ' + error.message, 'error');
                } finally {
                    this.showLoading(false);
                }
            }

            async forgotPassword() {
                const email = prompt('Enter your registered email address:');
                if (email) {
                    try {
                        await window.firebase.sendPasswordResetEmail(window.firebase.auth, email);
                        this.showToast('Password reset email sent!', 'success');
                    } catch (error) {
                        this.showToast('Error sending reset email', 'error');
                    }
                }
            }

            logout() {
                // Clear stored credentials on logout
                this.ownerCredentials = { email: null, password: null };

                window.firebase.signOut(window.firebase.auth).then(() => {
                    this.currentUser = null;
                    this.showroomData = null;
                    this.showLandingPage();
                    this.showToast('Logged out successfully', 'success');
                });
            }

            // ==========================================================================
            // Registration Flow
            // ==========================================================================
            resetRegistration() {
                this.registrationData = {
                    step: 1,
                    showroom: {},
                    vehicleTypes: [],
                    brands: [],
                    models: {},
                    paymentMethod: 'trial'
                };

                document.getElementById('showroom-name').value = '';
                document.getElementById('owner-name').value = '';
                document.getElementById('owner-phone').value = '';
                document.getElementById('owner-email').value = '';
                document.getElementById('owner-password').value = '';
                document.getElementById('showroom-address').value = '';
                document.getElementById('showroom-city').value = '';
                document.getElementById('showroom-state').value = '';

                document.querySelectorAll('.vehicle-card').forEach(card => card.classList.remove('selected'));
                document.getElementById('selected-vehicles').innerHTML = '';

                this.selectPaymentMethod('trial');
                this.goToStep(1);
            }

            goToStep(step) {
                if (step > this.registrationData.step) {
                    if (step === 2) {
                        if (!this.validateStep1()) return;
                    } else if (step === 3) {
                        if (this.registrationData.vehicleTypes.length === 0) {
                            this.showToast('Please select at least one vehicle type', 'error');
                            return;
                        }
                    } else if (step === 4) {
                        const hasNonExchange = this.registrationData.vehicleTypes.some(type => type !== 'exchange');
                        if (hasNonExchange && this.registrationData.brands.length === 0) {
                            this.showToast('Please select at least one brand for your vehicles', 'error');
                            return;
                        }
                    }
                }

                this.registrationData.step = step;

                const progressWidth = ((step - 1) / 3) * 100;
                document.getElementById('progress-fill').style.width = progressWidth + '%';

                for (let i = 1; i <= 4; i++) {
                    const stepEl = document.getElementById(`progress-step-${i}`);
                    if (i < step) {
                        stepEl.classList.add('completed');
                        stepEl.classList.remove('active');
                    } else if (i === step) {
                        stepEl.classList.add('active');
                        stepEl.classList.remove('completed');
                    } else {
                        stepEl.classList.remove('active', 'completed');
                    }
                }

                document.querySelectorAll('.registration-step').forEach(el => el.classList.remove('active'));
                document.getElementById(`step-${step}`).classList.add('active');

                if (step === 3) {
                    this.loadBrands();
                }
            }

            validateStep1() {
                const required = {
                    'showroom-name': 'Showroom Name',
                    'owner-name': 'Owner Name',
                    'owner-phone': 'Phone Number',
                    'owner-email': 'Email',
                    'owner-password': 'Password',
                    'showroom-address': 'Address',
                    'showroom-city': 'City',
                    'showroom-state': 'State'
                };

                for (const [id, label] of Object.entries(required)) {
                    const field = document.getElementById(id);
                    if (!field.value.trim()) {
                        this.showToast(`${label} is required`, 'error');
                        field.focus();
                        return false;
                    }
                }

                const phone = document.getElementById('owner-phone').value;
                if (!/^\d{10}$/.test(phone)) {
                    this.showToast('Please enter a valid 10-digit phone number', 'error');
                    return false;
                }

                const email = document.getElementById('owner-email').value;
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    this.showToast('Please enter a valid email address', 'error');
                    return false;
                }

                const password = document.getElementById('owner-password').value;
                if (password.length < 6) {
                    this.showToast('Password must be at least 6 characters', 'error');
                    return false;
                }

                this.registrationData.showroom = {
                    name: document.getElementById('showroom-name').value,
                    ownerName: document.getElementById('owner-name').value,
                    ownerPhone: phone,
                    ownerEmail: email,
                    address: document.getElementById('showroom-address').value,
                    city: document.getElementById('showroom-city').value,
                    state: document.getElementById('showroom-state').value
                };

                return true;
            }

            toggleVehicleType(type) {
                const card = document.querySelector(`.vehicle-card[data-type="${type}"]`);

                if (this.registrationData.vehicleTypes.includes(type)) {
                    this.registrationData.vehicleTypes = this.registrationData.vehicleTypes.filter(t => t !== type);
                    card.classList.remove('selected');
                } else {
                    this.registrationData.vehicleTypes.push(type);
                    card.classList.add('selected');
                }

                this.updateSelectedVehicles();
                document.getElementById('continue-to-brands').disabled = this.registrationData.vehicleTypes.length === 0;
            }

            updateSelectedVehicles() {
                const container = document.getElementById('selected-vehicles');

                if (this.registrationData.vehicleTypes.length === 0) {
                    container.innerHTML = '';
                    return;
                }

                let html = '';
                const typeNames = {
                    car: 'Cars',
                    bike: 'Bikes',
                    tractor: 'Tractors',
                    threewheeler: '3-Wheelers'
                };

                this.registrationData.vehicleTypes.forEach(type => {
                    const icon = type === 'car' ? 'fa-car' :
                        type === 'bike' ? 'fa-motorcycle' :
                            type === 'tractor' ? 'fa-tractor' : 'fa-truck';

                    html += `
                    <span class="vehicle-badge ${type}">
                        <i class="fas ${icon}"></i>
                        ${typeNames[type]}
                    </span>
                `;
                });

                container.innerHTML = html;
            }

            loadBrands() {
                const container = document.getElementById('brands-container');
                let html = '';

                this.registrationData.vehicleTypes.forEach(type => {
                    const typeNames = { car: 'Cars', bike: 'Bikes', tractor: 'Tractors', threewheeler: '3-Wheelers' };

                    html += `<h4 class="mt-4 mb-3">${typeNames[type]}</h4>`;

                    this.vehicleBrands[type].forEach(brand => {
                        const isSelected = this.registrationData.brands.includes(brand.name);
                        const brandModels = this.registrationData.models[brand.name] || brand.defaultModels || [];

                        html += `
                        <div class="brand-card ${isSelected ? 'selected' : ''}" data-brand="${brand.name}">
                            <div class="brand-header" onclick="app.toggleBrand('${brand.name}')">
                                <div class="brand-logo">
                                    <i class="fas ${brand.logo}"></i>
                                </div>
                                <div class="brand-info">
                                    <strong>${brand.name}</strong>
                                    <small>${brandModels.length} models</small>
                                </div>
                                <i class="fas fa-chevron-down brand-arrow"></i>
                            </div>
                            
                            <div class="brand-models">
                                <div class="models-list" id="models-${brand.name.replace(/\s+/g, '-')}">
                                    ${brandModels.map(model => `
                                        <div class="model-item">
                                            <span>${model}</span>
                                            <button class="btn btn-sm" onclick="event.stopPropagation(); app.removeModel('${brand.name}', '${model}')">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="add-model-section">
                                    <div class="input-group">
                                        <input type="text" id="input-${brand.name.replace(/\s+/g, '-')}" 
                                               class="form-control" placeholder="Enter new model name">
                                        <button class="btn btn-primary" onclick="app.addModel('${brand.name}')">
                                            <i class="fas fa-plus"></i> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    });
                });

                container.innerHTML = html;
            }

            toggleBrand(brandName) {
                if (this.registrationData.brands.includes(brandName)) {
                    this.registrationData.brands = this.registrationData.brands.filter(b => b !== brandName);
                } else {
                    this.registrationData.brands.push(brandName);

                    if (!this.registrationData.models[brandName]) {
                        const brand = this.getBrandDetails(brandName);
                        this.registrationData.models[brandName] = brand ? [...brand.defaultModels] : [];
                    }
                }

                this.loadBrands();
            }

            addModel(brandName) {
                const inputId = `input-${brandName.replace(/\s+/g, '-')}`;
                const input = document.getElementById(inputId);
                const modelName = input.value.trim();

                if (!modelName) {
                    this.showToast('Please enter model name', 'error');
                    return;
                }

                if (!this.registrationData.models[brandName]) {
                    this.registrationData.models[brandName] = [];
                }

                if (this.registrationData.models[brandName].includes(modelName)) {
                    this.showToast('Model already exists', 'warning');
                    return;
                }

                this.registrationData.models[brandName].push(modelName);
                input.value = '';
                this.loadBrands();
                this.showToast(`Added ${modelName} to ${brandName}`, 'success');
            }

            removeModel(brandName, modelName) {
                if (this.registrationData.models[brandName]) {
                    this.registrationData.models[brandName] = this.registrationData.models[brandName].filter(m => m !== modelName);
                    this.loadBrands();
                    this.showToast(`Removed ${modelName}`, 'info');
                }
            }

            getBrandDetails(brandName) {
                for (const type of this.registrationData.vehicleTypes) {
                    const brand = this.vehicleBrands[type]?.find(b => b.name === brandName);
                    if (brand) return brand;
                }
                return null;
            }

            selectPaymentMethod(method) {
                this.registrationData.paymentMethod = method;

                document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
                const selected = document.querySelector(`.payment-method[data-method="${method}"]`);
                if (selected) selected.classList.add('selected');

                document.getElementById('bank-details').style.display = method === 'bank' ? 'block' : 'none';
            }

            async completeRegistration() {
                this.showLoading(true);

                try {
                    if (!this.validateStep1()) {
                        this.showLoading(false);
                        return;
                    }

                    if (this.registrationData.vehicleTypes.length === 0) {
                        this.showToast('Please select vehicle types', 'error');
                        this.showLoading(false);
                        return;
                    }

                    const hasNonExchange = this.registrationData.vehicleTypes.some(type => type !== 'exchange');
                    if (hasNonExchange && this.registrationData.brands.length === 0) {
                        this.showToast('Please select at least one brand for your vehicles', 'error');
                        this.showLoading(false);
                        return;
                    }

                    console.log('Creating user account...');

                    if (this.registrationData.paymentMethod === 'razorpay') {
                        this.showLoading(false);
                        await this.processRazorpayPayment();
                        return;
                    }

                    await this.createUserAccount();

                } catch (error) {
                    console.error('Registration error:', error);

                    if (error.code === 'auth/email-already-in-use') {
                        this.showToast('Email already registered. Please login instead.', 'error');
                        this.showLoginScreen();
                    } else {
                        this.showToast('Registration failed: ' + error.message, 'error');
                    }

                    this.showLoading(false);
                }
            }

            async processRazorpayPayment() {
                try {
                    document.getElementById('payment-modal').style.display = 'flex';

                    const options = {
                        key: this.RAZORPAY_KEY_ID,
                        amount: 10999,
                        currency: 'INR',
                        name: 'ShowroomDesk',
                        description: 'Annual Subscription - Complete Plan (₹10,999/year)',
                        image: 'https://via.placeholder.com/150x50?text=ShowroomDesk',
                        handler: async (response) => {
                            console.log('Payment successful:', response);
                            document.getElementById('payment-modal').style.display = 'none';
                            this.showToast('Payment successful! Creating your account...', 'success');
                            await this.createUserAccount(response.razorpay_payment_id);
                            this.showToast('Registration complete! Welcome to ShowroomDesk!', 'success');
                        },
                        prefill: {
                            name: this.registrationData.showroom.ownerName,
                            email: this.registrationData.showroom.ownerEmail,
                            contact: this.registrationData.showroom.ownerPhone
                        },
                        notes: {
                            address: this.registrationData.showroom.address,
                            showroomName: this.registrationData.showroom.name,
                            city: this.registrationData.showroom.city,
                            state: this.registrationData.showroom.state,
                            vehicleTypes: this.registrationData.vehicleTypes.join(', '),
                            brands: this.registrationData.brands.join(', ')
                        },
                        theme: {
                            color: '#4361ee'
                        },
                        modal: {
                            ondismiss: () => {
                                document.getElementById('payment-modal').style.display = 'none';
                                this.showToast('Payment cancelled. You can try again or choose free trial.', 'info');
                            }
                        },
                        retry: {
                            enabled: true,
                            max_count: 3
                        },
                        remember_customer: true,
                        send_sms_hash: true,
                        redirect: false
                    };

                    const razorpay = new Razorpay(options);
                    razorpay.open();

                    razorpay.on('payment.failed', (response) => {
                        console.error('Payment failed:', response.error);
                        document.getElementById('payment-modal').style.display = 'none';
                        this.showToast('Payment failed: ' + response.error.description, 'error');
                    });

                } catch (error) {
                    console.error('Razorpay error:', error);
                    document.getElementById('payment-modal').style.display = 'none';
                    this.showToast('Unable to process payment. Please try again or choose bank transfer.', 'error');
                }
            }

            async createUserAccount(paymentId = null) {
                this.showLoading(true);

                try {
                    const userCredential = await window.firebase.createUserWithEmailAndPassword(
                        window.firebase.auth,
                        this.registrationData.showroom.ownerEmail,
                        document.getElementById('owner-password').value
                    );

                    console.log('User created:', userCredential.user.uid);

                    const isPaid = paymentId !== null;
                    const subscriptionStatus = isPaid ? 'active' : 'trial';
                    const endDate = new Date();

                    if (isPaid) {
                        endDate.setFullYear(endDate.getFullYear() + 1);
                    } else {
                        endDate.setDate(endDate.getDate() + 30);
                    }

                    const subscription = {
                        plan: 'complete',
                        price: 999,
                        billingCycle: 'annual',
                        amount: 10999,
                        status: subscriptionStatus,
                        startDate: new Date().toISOString(),
                        endDate: endDate.toISOString(),
                        paymentMethod: this.registrationData.paymentMethod
                    };

                    if (paymentId) {
                        subscription.paymentId = paymentId;
                        subscription.paidAt = new Date().toISOString();
                        subscription.paymentGateway = 'Razorpay';
                    }

                    if (!isPaid) {
                        subscription.trialEnds = endDate.toISOString();
                    }

                    const brandModels = {};
                    this.registrationData.brands.forEach(brand => {
                        brandModels[brand] = this.registrationData.models[brand] ||
                            this.getBrandDetails(brand)?.defaultModels || [];
                    });

                    const userData = {
                        uid: userCredential.user.uid,
                        email: this.registrationData.showroom.ownerEmail,
                        name: this.registrationData.showroom.ownerName,
                        phone: this.registrationData.showroom.ownerPhone,
                        role: 'owner',
                        showroom: {
                            id: 'showroom_' + Date.now(),
                            name: this.registrationData.showroom.name,
                            address: this.registrationData.showroom.address,
                            city: this.registrationData.showroom.city,
                            state: this.registrationData.showroom.state,
                            vehicleTypes: this.registrationData.vehicleTypes,
                            brands: this.registrationData.brands,
                            models: brandModels,
                            createdAt: new Date().toISOString()
                        },
                        subscription: subscription,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };

                    await window.firebase.setDoc(
                        window.firebase.doc(window.firebase.db, 'users', userCredential.user.uid),
                        userData
                    );

                    console.log('User document created');

                    // Initialize inventory collection by creating a placeholder document and then deleting it
                    // This ensures the collection exists with proper permissions
                    try {
                        const inventoryRef = window.firebase.collection(window.firebase.db, 'inventory');

                        // Add a test document to initialize collection
                        const testDoc = await window.firebase.addDoc(inventoryRef, {
                            showroomId: userData.showroom.id,
                            type: 'system',
                            brand: 'system',
                            model: 'init',
                            createdAt: new Date().toISOString(),
                            isSystemInit: true
                        });

                        console.log('Inventory collection initialized with test document:', testDoc.id);

                        // Delete the test document (optional, but cleaner)
                        await window.firebase.deleteDoc(window.firebase.doc(window.firebase.db, 'inventory', testDoc.id));
                        console.log('Test document deleted, inventory collection is ready');

                    } catch (e) {
                        console.log('Note: Inventory initialization:', e.message);
                        // This is not critical - collection might already exist or will be created on first save
                    }

                    // Store owner credentials
                    this.ownerCredentials = {
                        email: this.registrationData.showroom.ownerEmail,
                        password: document.getElementById('owner-password').value
                    };

                    // ===== FIX FOR NEW USER UI =====
                    // Set role class on body for new user
                    document.body.classList.add('role-owner');

                    // Force hide owner-only sections initially
                    document.querySelectorAll('.owner-only').forEach(el => {
                        el.style.display = 'none';
                    });

                    // Force navigation to be visible
                    this.ensureNavigationVisible();
                    // ===== END FIX =====

                    if (isPaid) {
                        this.showToast('Payment successful! Your 1-year subscription is now active.', 'success');
                    } else {
                        this.showToast('Registration successful! Your 30-day free trial has started.', 'success');
                    }

                    this.showLoading(false);

                } catch (error) {
                    console.error('Account creation error:', error);
                    this.showLoading(false);
                    throw error;
                }
            }

            // ==========================================================================
            // Utility Functions
            // ==========================================================================
            showLoading(show) {
                const overlay = document.getElementById('loading-overlay');
                if (overlay) {
                    overlay.classList.toggle('active', show);
                }
            }

            showToast(message, type = 'info') {
                const container = document.getElementById('toast-container');
                const toast = document.createElement('div');
                toast.className = `toast ${type}`;

                let icon = 'info-circle';
                if (type === 'success') icon = 'check-circle';
                if (type === 'error') icon = 'exclamation-circle';
                if (type === 'warning') icon = 'exclamation-triangle';

                toast.innerHTML = `
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            `;

                container.appendChild(toast);

                setTimeout(() => {
                    toast.style.animation = 'slideOut 0.3s ease forwards';
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            }
        }

        // Initialize app
        window.app = new ShowroomDeskCRM();
    
