
const firebaseConfig = {
    projectId: "uptac-2ae80",
};


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


async function filterData(category, quota, course, crl) {
    try {
        let queryRef = db.collection('round1')
            .where('category', '==', category)
            .where('quota', '==', quota)
            .where('cr', '>', Number(crl));

        if (course !== "allprograms") {
            queryRef = queryRef.where('program', '==', course);
        }

        const querySnapshot = await queryRef.get();




        const tableBody = document.getElementById('tableDataBody');
        tableBody.innerHTML = '';

        const tableRows = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tableRows.push(`
          <tr>
            <td>${data.college}</td>
            <td>${data.program}</td>
            <td>${data.category}</td>
            <td>${data.cr}</td>
          </tr>
        `);
        });

        // Update the table body with all rows at once for better performance
        tableBody.innerHTML = tableRows.join('');

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
        filterData(formData['category'], formData['quota'], formData['course'], formData['crl']);
    } else {
        alert('No Colleges Found!');
    }
});