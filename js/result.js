const firebaseConfig = {
    projectId: "uptac-2024",
};


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// document.getElementById('table-div').disiplay = 'none';

function CalculateProbability(rank, or,cr){
    if (rank/or < 0.8){
        return '<span class="probability veryhigh">Very High Probability</span>';
    }
    else if (rank < or){
        return '<span class="probability high">High Probability</span>';
    }
    else if (rank > or && rank < cr){
        return '<span class="probability moderate">Moderate Probability</span>';
    }
    else if (rank/cr < 1.1) {
        return '<span class="probability low">Low Probability</span>';
    }
    else if (rank > cr) {
        return '<span class="probability verylow">Very Low Probability</span>';
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
        
        console.log(querySnapshot.size);
        if(querySnapshot.size == 0){
            document.getElementById("no-results").style.display = "block";
            return;
        }
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tableRows.push(`
                <tr>
                <td data-label="College">${data.name}</td>
                <td data-label="Program">${data.branch}</td>
                <td data-label="Category">${data.category}</td>
                <td data-label="Opening Rank">${data.or}</td>
                <td data-label="Closing Rank">${data.cr}</td>
                <td data-label="Probability">${CalculateProbability(Number(crl), Number(data.or), Number(data.cr))}</td>
                </tr>
                `);
            });
            
            tableBody.innerHTML = tableRows.join('');
            document.getElementById("results-header").style.display = "block";
            document.getElementById("results-container").style.display = "block";
            document.getElementById("results-footer").style.display = "block";

        } catch (error) {
            console.error("Error filtering data: ", error);
        }
    }

const formData = JSON.parse(sessionStorage.getItem('formData'));
    
if (formData){
    document.getElementById("roundTag").innerText ="Round " + formData['round'];
    document.getElementById("categoryTag").innerText =formData['category'];
    document.getElementById("quotaTag").innerText = formData['quota'];
    if (formData['course'] == 'allprograms'){
        document.getElementById("branchTag").innerText = "All Programs";
    } else {
        document.getElementById("branchTag").innerText = formData['course'];
    }
    filterData(formData['round'],formData['category'], formData['quota'], formData['course'], formData['crl']);
} else {
    document.getElementById("no-results").style.display = "block";
}


