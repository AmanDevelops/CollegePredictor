
const firebaseConfig = {
    projectId: "uptac-2024",
};


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function CalculateProbability(rank, or,cr){
    if (rank/or < 0.8){
        return '<p style="color: green; ">Very High Probability</p>';
    }
    else if (rank < or){
        return '<p style="color: green;">High Probability</p>';
    }
    else if (rank > or && rank < cr){
        return '<p style="color: yellow; text-shadow: color: white; -webkit-text-stroke-width: 0.40px; -webkit-text-stroke-color: red;">Moderate Probability</p>';
    }
    else if (rank/cr < 1.1) {
        return '<p style="color: red; ">Low Probability</p>';
    }
    else if (rank > cr) {
        return '<p style="color: red;">Very Low Probability</p>';
    }
    
}

async function filterData(round,category, quota, course, crl) {
    try {
        let queryRef = db.collection('btech')
            .where('round', '==', round)
            .where('category', '==', category)
            .where('quota', '==', quota)
            .where('cr', '>', Number(crl)*0.9);

        if (course !== "allprograms") {
            queryRef = queryRef.where('branch', '==', course);
        }

        const querySnapshot = await queryRef.get();

        const tableBody = document.getElementById('tableDataBody');
        tableBody.innerHTML = '';

        const tableRows = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tableRows.push(`
          <tr>
            <td>${data.name}</td>
            <td>${data.branch}</td>
            <td>${data.category}</td>
            <td>${data.or}</td>
            <td>${data.cr}</td>
            <td>${CalculateProbability(Number(crl), Number(data.or), Number(data.cr))}</td>
          </tr>
        `);
        });

        // Update the table body with all rows at once for better performance
        tableBody.innerHTML = tableRows.join('');
        document.getElementById('resultsheader').innerText = "Showing Results for Round "+ round;

    } catch (error) {
        console.error("Error filtering data: ", error);
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    // Retrieve data from session storage
    const formData = JSON.parse(sessionStorage.getItem('formData'));

    if (formData) {
        const responseDiv = document.getElementById('response');
        event.preventDefault();
        filterData(formData['round'],formData['category'], formData['quota'], formData['course'], formData['crl']);
    } else {
        alert('No Colleges Found!');
    }
});