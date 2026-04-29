/* 
 * ============================================================
 * RESUME BUILDER - JAVASCRIPT FILE
 * ============================================================
 * 
 * JavaScript is what makes web pages interactive and dynamic.
 * If HTML is the skeleton and CSS is the skin/clothing, then
 * JavaScript is the brain and muscles - it makes things happen!
 * 
 * What this file does:
 * - Adds dynamic functionality (add/remove form entries)
 * - Validates form data before submission
 * - Collects and processes all the form information
 * - Handles user interactions (button clicks, form submission)
 * 
 * Key JavaScript Concepts:
 * - Variables: Store data (like counters)
 * - Functions: Reusable blocks of code that do specific tasks
 * - Events: Actions that trigger code (clicks, form submission)
 * - DOM: The page structure that JavaScript can modify
 */

// ============================================================
// GLOBAL VARIABLES
// ============================================================
// These variables are accessible throughout the entire file.
// They keep track of how many experience/education entries exist.

let experienceCount = 1;
// Tracks the number of work experience entries
// Starts at 1 because we have one entry by default

let educationCount = 1;
// Tracks the number of education entries
// Starts at 1 because we have one entry by default

// ============================================================
// EXPERIENCE SECTION FUNCTIONS
// ============================================================

/**
 * Function: addExperience()
 * 
 * What it does: Creates a new work experience entry form
 * When called: When user clicks "Add Another Experience" button
 * 
 * How it works:
 * 1. Increases the experience counter
 * 2. Creates HTML for a new experience entry
 * 3. Adds it to the page
 * 4. Updates the numbering on all entries
 */
function addExperience() {
    // Step 1: Increase the counter
    experienceCount++;
    // Now experienceCount is 2, 3, 4, etc.
    
    // Step 2: Find the container where we'll add the new entry
    const container = document.getElementById('experienceContainer');
    // document.getElementById() finds an element by its ID
    // We're looking for the div with id="experienceContainer"
    
    // Step 3: Create the HTML for the new experience entry
    // We use a template literal (backticks `) to write multi-line HTML
    const experienceHTML = `
        <div class="experience-item" data-index="${experienceCount - 1}">
            <!-- The new entry with all the same fields as the first one -->
            <div class="section-header">
                <h3>Experience ${experienceCount}</h3>
                <button type="button" class="remove-btn" onclick="removeExperience(${experienceCount - 1})">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Company Name *</label>
                    <input type="text" name="company[]" required>
                </div>
                <div class="form-group">
                    <label>Job Title *</label>
                    <input type="text" name="jobTitle[]" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date *</label>
                    <input type="month" name="startDate[]" required>
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" name="endDate[]">
                    <label class="checkbox-label">
                        <input type="checkbox" name="currentJob[]" value="1"> I currently work here
                    </label>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group full-width">
                    <label>Job Description</label>
                    <textarea name="jobDescription[]" rows="3" placeholder="Describe your responsibilities and achievements in this role..."></textarea>
                </div>
            </div>
        </div>
    `;
    
    // Step 4: Add the new HTML to the container
    container.insertAdjacentHTML('beforeend', experienceHTML);
    // insertAdjacentHTML() adds HTML at a specific position
    // 'beforeend' means "at the end, inside the container"
    
    // Step 5: Update all the experience numbers
    updateExperienceNumbers();
    // This ensures they show "Experience 1", "Experience 2", etc.
}

/**
 * Function: removeExperience(index)
 * 
 * What it does: Removes a specific experience entry
 * When called: When user clicks "Remove" on an experience entry
 * 
 * @param {number} index - Which experience entry to remove (0 = first, 1 = second, etc.)
 */
function removeExperience(index) {
    // Step 1: Find the container
    const container = document.getElementById('experienceContainer');
    
    // Step 2: Get all experience items
    const items = container.querySelectorAll('.experience-item');
    // querySelectorAll() finds ALL elements with a specific class
    // This gives us an array-like list of all experience entries
    
    // Step 3: Check if we're trying to remove the last entry
    if (items.length <= 1) {
        // If there's only 1 or fewer entries, don't allow removal
        alert('You must have at least one experience entry.');
        // alert() shows a popup message to the user
        return;
        // return stops the function here (doesn't remove anything)
    }
    
    // Step 4: Remove the specific entry
    items[index].remove();
    // .remove() deletes the element from the page
    // items[index] selects which entry to remove based on the index
    
    // Step 5: Update the numbering
    updateExperienceNumbers();
    // After removal, we need to renumber the remaining entries
}

/**
 * Function: updateExperienceNumbers()
 * 
 * What it does: Renumbers all experience entries after add/remove
 * When called: After adding or removing an experience entry
 * 
 * Why we need this: When you remove "Experience 2", we need
 * "Experience 3" to become the new "Experience 2"
 */
function updateExperienceNumbers() {
    // Step 1: Find the container
    const container = document.getElementById('experienceContainer');
    
    // Step 2: Get all experience items
    const items = container.querySelectorAll('.experience-item');
    
    // Step 3: Loop through each item and update its number
    items.forEach((item, index) => {
        // forEach() runs a function for each item in a list
        // item = the current experience entry
        // index = its position (0, 1, 2, etc.)
        
        // Update the "Experience X" text
        const header = item.querySelector('section-header h3');
        // querySelector() finds the FIRST element matching a selector
        // We're looking for the h3 inside the section-header div
        if (header) {
            header.textContent = `Experience ${index + 1}`;
            // textContent changes the text inside the element
            // index + 1 because index starts at 0 but we want "1", "2", etc.
        }
        
        // Update the data-index attribute
        item.setAttribute('data-index', index);
        // setAttribute() changes an HTML attribute
        // This keeps the data-index in sync with the actual position
        
        // Update the remove button's onclick
        const removeBtn = item.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.setAttribute('onclick', `removeExperience(${index})`);
            // Update which index to pass when this button is clicked
        }
    });
    
    // Step 4: Update the global counter
    experienceCount = items.length;
    // Set the counter to match the actual number of items
}

// ============================================================
// EDUCATION SECTION FUNCTIONS
// ============================================================
// These work exactly the same as the experience functions,
// but for education entries instead.

/**
 * Function: addEducation()
 * 
 * What it does: Creates a new education entry form
 * When called: When user clicks "Add Another Education" button
 */
function addEducation() {
    // Increase the counter
    educationCount++;
    
    // Find the container
    const container = document.getElementById('educationContainer');
    
    // Create HTML for new education entry
    const educationHTML = `
        <div class="education-item" data-index="${educationCount - 1}">
            <div class="section-header">
                <h3>Education ${educationCount}</h3>
                <button type="button" class="remove-btn" onclick="removeEducation(${educationCount - 1})">Remove</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>School/University *</label>
                    <input type="text" name="school[]" required>
                </div>
                <div class="form-group">
                    <label>Degree/Certification *</label>
                    <input type="text" name="degree[]" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Field of Study</label>
                    <input type="text" name="fieldOfStudy[]">
                </div>
                <div class="form-group">
                    <label>Graduation Date</label>
                    <input type="month" name="graduationDate[]">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group full-width">
                    <label>Additional Information</label>
                    <textarea name="educationInfo[]" rows="2" placeholder="GPA, honors, relevant coursework, etc."></textarea>
                </div>
            </div>
        </div>
    `;
    
    // Add to container
    container.insertAdjacentHTML('beforeend', educationHTML);
    
    // Update numbering
    updateEducationNumbers();
}

/**
 * Function: removeEducation(index)
 * 
 * What it does: Removes a specific education entry
 * When called: When user clicks "Remove" on an education entry
 * 
 * @param {number} index - Which education entry to remove
 */
function removeEducation(index) {
    // Find container
    const container = document.getElementById('educationContainer');
    
    // Get all education items
    const items = container.querySelectorAll('.education-item');
    
    // Check if trying to remove last entry
    if (items.length <= 1) {
        alert('You must have at least one education entry.');
        return;
    }
    
    // Remove the entry
    items[index].remove();
    
    // Update numbering
    updateEducationNumbers();
}

/**
 * Function: updateEducationNumbers()
 * 
 * What it does: Renumbers all education entries after add/remove
 * When called: After adding or removing an education entry
 */
function updateEducationNumbers() {
    // Find container
    const container = document.getElementById('educationContainer');
    
    // Get all education items
    const items = container.querySelectorAll('.education-item');
    
    // Loop through and update each
    items.forEach((item, index) => {
        // Update the "Education X" text
        const header = item.querySelector('section-header h3');
        if (header) {
            header.textContent = `Education ${index + 1}`;
        }
        
        // Update data-index
        item.setAttribute('data-index', index);
        
        // Update remove button
        const removeBtn = item.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.setAttribute('onclick', `removeEducation(${index})`);
        }
    });
    
    // Update global counter
    educationCount = items.length;
}

// ============================================================
// PREVIEW FUNCTION
// ============================================================

/**
 * Function: previewResume()
 * 
 * What it does: Collects all form data and shows a preview
 * When called: When user clicks "Preview Resume" button
 * 
 * This function demonstrates how to gather data from a form
 * and organize it into a structured object.
 */
function previewResume() {
    // Step 1: Find the form
    const form = document.getElementById('resumeForm');
    
    // Step 2: Create a FormData object
    const formData = new FormData(form);
    // FormData is a built-in JavaScript object that collects
    // all the values from form inputs automatically
    
    // Step 3: Validate required fields
    const requiredFields = ['fullName', 'email', 'summary'];
    // These are the fields that MUST be filled out
    let isValid = true;
    // Flag to track if validation passes
    
    // Check each required field
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        // Find the input with this name
        
        if (!input.value.trim()) {
            // .value gets the current text in the input
            // .trim() removes spaces from start/end
            // ! means "if the value is empty"
            
            isValid = false;
            // Mark validation as failed
            
            input.style.borderColor = '#dc3545';
            // Change border to red to show error
            // .style allows us to change CSS with JavaScript
        } else {
            input.style.borderColor = '';
            // Clear the red border if field has content
        }
    });
    
    // Step 4: If validation failed, show alert and stop
    if (!isValid) {
        alert('Please fill in all required fields marked with *');
        return;
        // Stop the function here
    }
    
    // Step 5: Collect all form data into an object
    const resumeData = {
        personalInfo: {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            linkedin: formData.get('linkedin'),
            address: formData.get('address'),
            profession: formData.get('profession'),
            website: formData.get('website')
        },
        summary: formData.get('summary'),
        skills: formData.get('skills'),
        languages: formData.get('languages'),
        certifications: formData.get('certifications'),
        achievements: formData.get('achievements'),
        experience: [],
        education: []
    };
    // We're creating a structured object that organizes
    // all the form data into logical groups
    
    // Step 6: Collect experience data
    // FormData.getAll() gets all values for fields with the same name
    const companies = formData.getAll('company[]');
    const jobTitles = formData.getAll('jobTitle[]');
    const startDates = formData.getAll('startDate[]');
    const endDates = formData.getAll('endDate[]');
    const currentJobs = formData.getAll('currentJob[]');
    const jobDescriptions = formData.getAll('jobDescription[]');
    
    // Loop through each experience and add to our object
    companies.forEach((company, index) => {
        resumeData.experience.push({
            company: company,
            jobTitle: jobTitles[index],
            startDate: startDates[index],
            endDate: endDates[index],
            currentJob: currentJobs.includes('1'),
            // .includes() checks if the array contains this value
            description: jobDescriptions[index]
        });
    });
    
    // Step 7: Collect education data
    const schools = formData.getAll('school[]');
    const degrees = formData.getAll('degree[]');
    const fieldsOfStudy = formData.getAll('fieldOfStudy[]');
    const graduationDates = formData.getAll('graduationDate[]');
    const educationInfos = formData.getAll('educationInfo[]');
    
    schools.forEach((school, index) => {
        resumeData.education.push({
            school: school,
            degree: degrees[index],
            fieldOfStudy: fieldsOfStudy[index],
            graduationDate: graduationDates[index],
            additionalInfo: educationInfos[index]
        });
    });
    
    // Step 8: Show the data (in a real app, this would show a preview)
    console.log('Resume Preview Data:', resumeData);
    // console.log() prints to the browser's developer console
    // Press F12 in your browser to see this
    
    alert('Resume preview data has been logged to the console. In a full implementation, this would open a preview modal or page.');
}

// ============================================================
// BROWSER STORAGE FUNCTIONALITY
// ============================================================

/**
 * Function: saveResumeData()
 * 
 * What it does: Saves all form data to browser localStorage
 * When called: When user submits the form
 * 
 * This function stores the resume data so it can be retrieved
 * later to generate the printable resume.
 */
function saveResumeData(resumeData) {
    try {
        // Convert the resume data object to a JSON string
        const resumeJSON = JSON.stringify(resumeData);
        
        // Save to localStorage with a timestamp
        const timestamp = new Date().toISOString();
        localStorage.setItem('resumeData', resumeJSON);
        localStorage.setItem('resumeTimestamp', timestamp);
        
        console.log('Resume data saved to browser storage');
        return true;
    } catch (error) {
        console.error('Error saving resume data:', error);
        alert('Failed to save resume data. Please try again.');
        return false;
    }
}

/**
 * Function: loadResumeData()
 * 
 * What it does: Loads resume data from browser localStorage
 * When called: When generating the printable resume
 * 
 * Returns: The resume data object or null if none exists
 */
function loadResumeData() {
    try {
        const resumeJSON = localStorage.getItem('resumeData');
        if (resumeJSON) {
            return JSON.parse(resumeJSON);
        }
        return null;
    } catch (error) {
        console.error('Error loading resume data:', error);
        return null;
    }
}

/**
 * Function: clearResumeData()
 * 
 * What it does: Clears saved resume data from browser storage
 * When called: When user wants to clear saved data
 */
function clearResumeData() {
    try {
        localStorage.removeItem('resumeData');
        localStorage.removeItem('resumeTimestamp');
        console.log('Resume data cleared from browser storage');
    } catch (error) {
        console.error('Error clearing resume data:', error);
    }
}

/**
 * Function: populateFormWithData(data)
 * 
 * What it does: Fills the form with saved resume data
 * When called: When page loads if saved data exists
 * 
 * This allows users to edit their previously saved resume.
 */
function populateFormWithData(data) {
    // Populate personal information
    if (data.personalInfo) {
        const fields = ['fullName', 'email', 'phone', 'linkedin', 'address', 'profession', 'website'];
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input && data.personalInfo[field]) {
                input.value = data.personalInfo[field];
            }
        });
    }
    
    // Populate summary
    if (data.summary) {
        const summaryInput = document.getElementById('summary');
        if (summaryInput) {
            summaryInput.value = data.summary;
        }
    }
    
    // Populate skills
    if (data.skills) {
        const skillsInput = document.getElementById('skills');
        if (skillsInput) {
            skillsInput.value = data.skills;
        }
    }
    
    // Populate additional information
    if (data.languages) {
        const languagesInput = document.getElementById('languages');
        if (languagesInput) {
            languagesInput.value = data.languages;
        }
    }
    
    if (data.certifications) {
        const certificationsInput = document.getElementById('certifications');
        if (certificationsInput) {
            certificationsInput.value = data.certifications;
        }
    }
    
    if (data.achievements) {
        const achievementsInput = document.getElementById('achievements');
        if (achievementsInput) {
            achievementsInput.value = data.achievements;
        }
    }
    
    // Populate experience entries
    if (data.experience && data.experience.length > 0) {
        const container = document.getElementById('experienceContainer');
        container.innerHTML = ''; // Clear default entry
        
        data.experience.forEach((exp, index) => {
            const experienceHTML = `
                <div class="experience-item" data-index="${index}">
                    <div class="section-header">
                        <h3>Experience ${index + 1}</h3>
                        <button type="button" class="remove-btn" onclick="removeExperience(${index})">Remove</button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Company Name *</label>
                            <input type="text" name="company[]" value="${escapeHTMLAttr(exp.company || '')}" required>
                        </div>
                        <div class="form-group">
                            <label>Job Title *</label>
                            <input type="text" name="jobTitle[]" value="${escapeHTMLAttr(exp.jobTitle || '')}" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Start Date *</label>
                            <input type="month" name="startDate[]" value="${exp.startDate || ''}" required>
                        </div>
                        <div class="form-group">
                            <label>End Date</label>
                            <input type="month" name="endDate[]" value="${exp.endDate || ''}">
                            <label class="checkbox-label">
                                <input type="checkbox" name="currentJob[]" value="1" ${exp.currentJob ? 'checked' : ''}> I currently work here
                            </label>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group full-width">
                            <label>Job Description</label>
                            <textarea name="jobDescription[]" rows="3">${escapeHTMLAttr(exp.description || '')}</textarea>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', experienceHTML);
        });
        experienceCount = data.experience.length;
    }
    
    // Populate education entries
    if (data.education && data.education.length > 0) {
        const container = document.getElementById('educationContainer');
        container.innerHTML = ''; // Clear default entry
        
        data.education.forEach((edu, index) => {
            const educationHTML = `
                <div class="education-item" data-index="${index}">
                    <div class="section-header">
                        <h3>Education ${index + 1}</h3>
                        <button type="button" class="remove-btn" onclick="removeEducation(${index})">Remove</button>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>School/University *</label>
                            <input type="text" name="school[]" value="${escapeHTMLAttr(edu.school || '')}" required>
                        </div>
                        <div class="form-group">
                            <label>Degree/Certification *</label>
                            <input type="text" name="degree[]" value="${escapeHTMLAttr(edu.degree || '')}" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Field of Study</label>
                            <input type="text" name="fieldOfStudy[]" value="${escapeHTMLAttr(edu.fieldOfStudy || '')}">
                        </div>
                        <div class="form-group">
                            <label>Graduation Date</label>
                            <input type="month" name="graduationDate[]" value="${edu.graduationDate || ''}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group full-width">
                            <label>Additional Information</label>
                            <textarea name="educationInfo[]" rows="2">${escapeHTMLAttr(edu.additionalInfo || '')}</textarea>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', educationHTML);
        });
        educationCount = data.education.length;
    }
    
    // Populate photo if exists
    if (data.photo) {
        const previewImage = document.getElementById('previewImage');
        const photoPlaceholder = document.querySelector('.photo-placeholder');
        const removePhotoBtn = document.getElementById('removePhotoBtn');
        
        previewImage.src = data.photo;
        previewImage.style.display = 'block';
        photoPlaceholder.style.display = 'none';
        removePhotoBtn.style.display = 'block';
    }
}

/**
 * Function: escapeHTMLAttr(str)
 * 
 * What it does: Escapes HTML special characters for safe attribute insertion
 * When called: When populating form fields with saved data
 */
function escapeHTMLAttr(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&')
        .replace(/"/g, '"')
        .replace(/'/g, '&#39;')
        .replace(/</g, '<')
        .replace(/>/g, '>');
}

// ============================================================
// PHOTO UPLOAD FUNCTIONALITY
// ============================================================

/**
 * Function: handlePhotoUpload()
 * 
 * What it does: Handles when user selects a photo file
 * When called: When user selects a file in the photo upload input
 * 
 * This function:
 * 1. Gets the selected file
 * 2. Validates file type and size
 * 3. Creates a preview image
 * 4. Shows/hides appropriate elements
 */
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    // event.target is the file input element
    // files[0] gets the first (and only) selected file
    
    if (!file) {
        return; // No file selected
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, PNG, or GIF).');
        event.target.value = ''; // Clear the file input
        return;
    }
    
    // Validate file size (max 2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('File size must be less than 2MB.');
        event.target.value = ''; // Clear the file input
        return;
    }
    
    // Create a FileReader to read the file
    const reader = new FileReader();
    
    // Set up what happens when the file is loaded
    reader.onload = function(e) {
        // e.target.result contains the data URL of the image
        
        // Get DOM elements
        const previewImage = document.getElementById('previewImage');
        const photoPlaceholder = document.querySelector('.photo-placeholder');
        const removePhotoBtn = document.getElementById('removePhotoBtn');
        
        // Show the image and hide the placeholder
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        photoPlaceholder.style.display = 'none';
        
        // Show the remove button
        removePhotoBtn.style.display = 'block';
        
        // Add a small animation
        previewImage.style.opacity = '0';
        setTimeout(() => {
            previewImage.style.opacity = '1';
        }, 100);
    };
    
    // Read the file as a data URL
    reader.readAsDataURL(file);
}

/**
 * Function: removePhoto()
 * 
 * What it does: Removes the currently selected photo
 * When called: When user clicks "Remove Photo" button
 */
function removePhoto() {
    // Get DOM elements
    const photoUpload = document.getElementById('photoUpload');
    const previewImage = document.getElementById('previewImage');
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    
    // Clear the file input
    photoUpload.value = '';
    
    // Hide the image and show the placeholder
    previewImage.style.display = 'none';
    previewImage.src = '';
    photoPlaceholder.style.display = 'flex';
    
    // Hide the remove button
    removePhotoBtn.style.display = 'none';
}

// ============================================================
// FORM INITIALIZATION
// ============================================================
// This code runs when the page finishes loading.
// It sets up event listeners for form submission and other interactions.

document.addEventListener('DOMContentLoaded', function() {
    // document.addEventListener() listens for events on the page
    // 'DOMContentLoaded' fires when the HTML is fully loaded
    // The function() is what runs when the event happens
    
    // Step 1: Find the form
    const form = document.getElementById('resumeForm');
    
    // Step 1.5: Check if there's saved data and populate the form
    const savedData = loadResumeData();
    if (savedData) {
        populateFormWithData(savedData);
        
        // Show a notification that data was loaded
        const notification = document.createElement('div');
        notification.style.cssText = 'background: #d4edda; color: #155724; padding: 15px; margin-bottom: 20px; border-radius: 5px; text-align: center; font-weight: 600; border: 1px solid #c3e6cb;';
        notification.textContent = '✓ Previous resume data loaded. You can edit and regenerate.';
        form.insertBefore(notification, form.firstChild);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            notification.style.transition = 'opacity 0.5s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
    
    // Step 2: Add submit event listener
    form.addEventListener('submit', function(e) {
        // This runs when the form is submitted (Generate Resume clicked)
        
        e.preventDefault();
        // preventDefault() stops the form from actually submitting
        // We handle it ourselves with JavaScript instead
        
        // Step 3: Validate required fields (same as preview)
        const requiredFields = ['fullName', 'email', 'summary'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Step 4: Collect form data (same as preview)
        const formData = new FormData(form);
        const resumeData = {
            personalInfo: {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                linkedin: formData.get('linkedin'),
                address: formData.get('address'),
                profession: formData.get('profession'),
                website: formData.get('website')
            },
            summary: formData.get('summary'),
            skills: formData.get('skills'),
            languages: formData.get('languages'),
            certifications: formData.get('certifications'),
            achievements: formData.get('achievements'),
            experience: [],
            education: []
        };
        
        // Collect experience data
        const companies = formData.getAll('company[]');
        const jobTitles = formData.getAll('jobTitle[]');
        const startDates = formData.getAll('startDate[]');
        const endDates = formData.getAll('endDate[]');
        const currentJobs = formData.getAll('currentJob[]');
        const jobDescriptions = formData.getAll('jobDescription[]');
        
        companies.forEach((company, index) => {
            resumeData.experience.push({
                company: company,
                jobTitle: jobTitles[index],
                startDate: startDates[index],
                endDate: endDates[index],
                currentJob: currentJobs.includes('1'),
                description: jobDescriptions[index]
            });
        });
        
        // Collect education data
        const schools = formData.getAll('school[]');
        const degrees = formData.getAll('degree[]');
        const fieldsOfStudy = formData.getAll('fieldOfStudy[]');
        const graduationDates = formData.getAll('graduationDate[]');
        const educationInfos = formData.getAll('educationInfo[]');
        
        schools.forEach((school, index) => {
            resumeData.education.push({
                school: school,
                degree: degrees[index],
                fieldOfStudy: fieldsOfStudy[index],
                graduationDate: graduationDates[index],
                additionalInfo: educationInfos[index]
            });
        });
        
        // Step 5: Save to browser storage
        const saved = saveResumeData(resumeData);
        if (!saved) {
            return;
        }
        
        console.log('Generated Resume:', resumeData);
        
        // Step 6: Show success message with option to view printable resume
        const viewResume = confirm('Resume generated successfully! Click OK to view printable resume, or Cancel to stay on this page.');
        if (viewResume) {
            // Open the printable resume in a new window
            window.open('resume.html', '_blank');
        }
    });
    
    // Step 3: Add reset event listener
    form.addEventListener('reset', function() {
        // This runs when the "Clear Form" button is clicked
        
        // Reset counters
        experienceCount = 1;
        educationCount = 1;
        
        // Find containers
        const experienceContainer = document.getElementById('experienceContainer');
        const educationContainer = document.getElementById('educationContainer');
        
        // Remove extra experience items (keep only the first one)
        while (experienceContainer.children.length > 1) {
            // .children gives us all child elements
            // .length tells us how many there are
            // We loop while there's more than 1 child
            experienceContainer.removeChild(experienceContainer.lastChild);
            // .lastChild is the last element
            // .removeChild() deletes it
        }
        
        // Remove extra education items
        while (educationContainer.children.length > 1) {
            educationContainer.removeChild(educationContainer.lastChild);
        }
        
        // Update numbers
        updateExperienceNumbers();
        updateEducationNumbers();
        
        // Clear validation styles
        form.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = '';
        });
    });
    
    // Step 4: Add photo upload event listener
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handlePhotoUpload);
    }
    
    // Step 5: Add real-time validation
    // This gives immediate feedback as users type
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    // Find all required inputs and textareas
    
    inputs.forEach(input => {
        // Add blur event (when user clicks away from field)
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                // If field is empty when user leaves it
                this.style.borderColor = '#dc3545';
                // Show red border
            } else {
                this.style.borderColor = '';
                // Clear border if has content
            }
        });
        
        // Add input event (when user types)
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                // If field has content
                this.style.borderColor = '';
                // Clear any red border
            }
        });
    });
});

/* 
 * ============================================================
 * JAVASCRIPT SUMMARY
 * ============================================================
 * 
 * This JavaScript file adds interactivity to our resume form:
 * 
 * 1. DYNAMIC ENTRIES: Users can add/remove experience and education
 *    - addExperience() / addEducation() create new entries
 *    - removeExperience() / removeEducation() delete entries
 *    - Update functions renumber entries after changes
 * 
 * 2. FORM VALIDATION: Ensures required fields are filled
 *    - Checks fullName, email, and summary
 *    - Shows red borders on empty required fields
 *    - Prevents submission if validation fails
 * 
 * 3. DATA COLLECTION: Gathers all form data into an object
 *    - Uses FormData API to collect values
 *    - Organizes data into logical groups
 *    - Handles multiple entries (arrays of experiences/education)
 * 
 * 4. EVENT HANDLING: Responds to user actions
 *    - Form submission (Generate Resume button)
 *    - Form reset (Clear Form button)
 *    - Real-time validation (as users type)
 *    - Preview button
 * 
 * 5. DOM MANIPULATION: Changes the page dynamically
 *    - Adds new HTML elements
 *    - Removes elements
 *    - Updates text and attributes
 *    - Changes CSS styles
 * 
 * Key JavaScript Concepts Used:
 * - Variables: Store data (counters, elements)
 * - Functions: Reusable code blocks
 * - Arrays: Lists of items
 * - Objects: Grouped data (key-value pairs)
 * - Loops: forEach() for iterating
 * - Events: addEventListener() for interactions
 * - DOM: document.getElementById(), querySelector(), etc.
 * - Conditionals: if/else for decision making
 */