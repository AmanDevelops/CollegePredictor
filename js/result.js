// Firebase Configuration
const firebaseConfig = {
    projectId: "uptac-2024",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- DOM Element Caching ---
const tableDataBody = document.getElementById('tableDataBody');
const noResultsDiv = document.getElementById("no-results");
const resultsHeaderDiv = document.getElementById("results-header");
const resultsContainerDiv = document.getElementById("results-container");
const resultsFooterDiv = document.getElementById("results-footer");
const roundTagSpan = document.getElementById("roundTag");
const categoryTagSpan = document.getElementById("categoryTag");
const quotaTagSpan = document.getElementById("quotaTag");
const branchTagSpan = document.getElementById("branchTag");

/**
 * Calculates the admission probability based on user rank and college ranks.
 * @param {number} userRank - The user's CRL rank.
 * @param {number} openingRank - The opening rank for the college/program.
 * @param {number} closingRank - The closing rank for the college/program.
 * @returns {string} HTML string representing the probability.
 */
function calculateProbability(userRank, openingRank, closingRank) {
    let probabilityClass = '';
    let probabilityText = '';

    if (userRank / openingRank < 0.8) {
        probabilityClass = 'veryhigh';
        probabilityText = 'Very High Probability';
    } else if (userRank < openingRank) {
        probabilityClass = 'high';
        probabilityText = 'High Probability';
    } else if (userRank >= openingRank && userRank <= closingRank) { // Adjusted logic slightly for clarity
        probabilityClass = 'moderate';
        probabilityText = 'Moderate Probability';
    } else if (userRank / closingRank < 1.1) { // userRank > closingRank is implied
        probabilityClass = 'low';
        probabilityText = 'Low Probability';
    } else { // userRank > closingRank and userRank/closingRank >= 1.1
        probabilityClass = 'verylow';
        probabilityText = 'Very Low Probability';
    }
    
    // Return null or an empty string if no condition is met (though the logic covers all cases)
    if (!probabilityClass) return ''; 

    return `<span class="probability ${probabilityClass}">${probabilityText}</span>`;
}

/**
 * Fetches and displays college prediction data based on user criteria.
 * @param {string} round - Selected round.
 * @param {string} category - Selected category.
 * @param {string} quota - Selected quota.
 * @param {string} course - Selected course/branch ('allprograms' for all).
 * @param {number} userRank - User's CRL rank.
 */
async function filterData(round, category, quota, course, userRank) {
    try {
        // --- Build Firestore Query ---
        let queryRef = db.collection('btech')
            .where('round', '==', round)
            .where('category', '==', category)
            .where('quota', '==', quota)
            // Pre-filter based on rank to reduce documents fetched
            // Fetch colleges where closing rank is somewhat close to user rank
            .where('cr', '>', userRank * 0.8); // Example: fetch if CR > 80% of user rank

        if (course !== "allprograms") {
            queryRef = queryRef.where('branch', '==', course);
        }

        // --- Execute Query ---
        const querySnapshot = await queryRef.get();
        console.log(`Fetched ${querySnapshot.size} documents.`);

        // --- Process Results ---
        if (querySnapshot.empty) {
            noResultsDiv.style.display = "block";
            // Ensure other sections are hidden
            resultsHeaderDiv.style.display = "none";
            resultsContainerDiv.style.display = "none";
            resultsFooterDiv.style.display = "none";
            return;
        }

        const tableRows = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Ensure ranks are numbers for calculation
            const openingRank = Number(data.or);
            const closingRank = Number(data.cr);
            const probabilityHtml = calculateProbability(userRank, openingRank, closingRank);

            // Only add rows if probability could be calculated
            if (probabilityHtml) {
                 tableRows.push(`
                    <tr>
                        <td data-label="College">${data.name || 'N/A'}</td>
                        <td data-label="Program">${data.branch || 'N/A'}</td>
                        <td data-label="Category">${data.category || 'N/A'}</td>
                        <td data-label="Opening Rank">${openingRank || 'N/A'}</td>
                        <td data-label="Closing Rank">${closingRank || 'N/A'}</td>
                        <td data-label="Probability">${probabilityHtml}</td>
                    </tr>
                `);
            }
        });

        // --- Update DOM ---
        if (tableRows.length > 0) {
            tableDataBody.innerHTML = tableRows.join('');
            resultsHeaderDiv.style.display = "block";
            resultsContainerDiv.style.display = "block";
            resultsFooterDiv.style.display = "flex"; // Use flex as defined in CSS
            noResultsDiv.style.display = "none";
        } else {
            // If all fetched results were filtered out by probability calculation
            noResultsDiv.style.display = "block";
            resultsHeaderDiv.style.display = "none";
            resultsContainerDiv.style.display = "none";
            resultsFooterDiv.style.display = "none";
        }


    } catch (error) {
        console.error("Error filtering data: ", error);
        // Display an error message to the user
        tableDataBody.innerHTML = '<tr><td colspan="6">Error loading data. Please try again later.</td></tr>';
        resultsContainerDiv.style.display = "block"; // Show the container to display the error
        noResultsDiv.style.display = "none";
        resultsHeaderDiv.style.display = "none";
        resultsFooterDiv.style.display = "none";
    }
}

// --- Main Execution ---
// Retrieve form data from session storage
const formData = JSON.parse(sessionStorage.getItem('formData'));

if (formData && formData.crl) { // Check if formData and rank exist
    const userRank = Number(formData.crl); // Convert rank to number once

    // Update summary tags
    roundTagSpan.innerText = "Round " + (formData.round || 'N/A');
    categoryTagSpan.innerText = formData.category || 'N/A';
    quotaTagSpan.innerText = formData.quota || 'N/A';
    branchTagSpan.innerText = (formData.course === 'allprograms' || !formData.course) ? "All Programs" : formData.course;

    // Fetch and display the data
    filterData(
        formData.round,
        formData.category,
        formData.quota,
        formData.course,
        userRank // Pass the numeric rank
    );
} else {
    console.log("Form data not found in session storage or rank is missing.");
    // Show the 'no results' section if no form data is available
    noResultsDiv.style.display = "block";
    resultsHeaderDiv.style.display = "none";
    resultsContainerDiv.style.display = "none";
    resultsFooterDiv.style.display = "none";
}