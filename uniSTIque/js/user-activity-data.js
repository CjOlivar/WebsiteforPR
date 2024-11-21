// user-activity-data.js
let userActivities = JSON.parse(localStorage.getItem('userActivities')) || {};

// Function to save user activities to local storage
function saveUserActivities() {
    localStorage.setItem('userActivities', JSON.stringify(userActivities));
}

// Function to get user activities from local storage
function getUserActivities() {
    return JSON.parse(localStorage.getItem('userActivities')) || {};
}

// Function to add a new activity for a user
function addActivity(userId, activity) {
    userActivities[userId] = userActivities[userId] || [];
    userActivities[userId].push(activity);
    saveUserActivities();
}

function addActivity(userId, activity) {
    if (!userId) {
        console.error("User  ID is required to add activity.");
        return;
    }
    userActivities[userId] = userActivities[userId] || [];
    userActivities[userId].push(activity);
    saveUserActivities();
}