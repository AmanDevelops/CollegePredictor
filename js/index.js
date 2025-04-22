const categorySelection = document.getElementById('category');
const branchSelection = document.getElementById('program');

const fwBranches = [
    "Computer Science and Engineering (FW)",
    "Computer Science And Engineering(Artificial Intelligence & Machine Learning) (FW)",
    "Electronics and Communication Engineering (FW)",
    "Information Technology (FW)",
    "Computer Science And Engineering(Data Science) (FW)",
    "Computer Science & Engineering (Cyber Security) (FW)",
    "Computer Science And Engineering(Internet Of Things) (FW)",
    "Artificial Inelligence (AI) And Data Science (FW)",
    "Mechanical Engineering (FW)",
    "Computer Science and Engineering (Artificial Intelligence) (FW)",
    "Computer Science Information Technology (FW)",
    "Electrical Engineering (FW)",
    "Electronics Engineering (FW)",
    "Civil Engineering (FW)",
    "Computer Science (FW)",
    "Computer Science And Design (FW)",
    "Computer Science (Hindi) (FW)",
    "Computer Science And Business System (FW)",
    "Electrical & Electronics Engineering (FW)",
    "Artificial Intelligence And Machine Learning (FW)",
    "Computer Science and Engineering(Self Finance) (FW)",
    "Chemical Engineering (FW)",
    "Industrial Production Engineering (FW)",
    "Instrumentation and Control Engineering (FW)",
    "Electronics and Communication (Advanced Communication Technology) (FW)",
    "Electronics Engineering (VLSI Design and Technology) (FW)",
    "Electronic And Computer Engineering (FW)",
    "Plastic Engineering (FW)",
    "Electrical & Computer Engg. (FW)"
  ];

const nonFwBranches = [
    "Electronics and Communication Engineering",
    "Computer Science and Engineering",
    "Electronics & Instrumentation Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Renewable Engineering",
    "Mechanical Engineering",
    "Computer Science And Engineering(Artificial Intelligence & Machine Learning)",
    "Computer Science and Engineering (Data Science)",
    "Civil Engineering",
    "Textile Chemistry",
    "Textile Engineering",
    "Textile Technology",
    "Man Made Fibre Technology",
    "Computer Science And Engineering(Internet Of Things)",
    "Computer Science & Engineering (Cyber Security)",
    "Computer Science and Engineering (Artificial Intelligence)",
    "Electrical & Electronics Engineering",
    "Computer Science And Design",
    "Artificial Inelligence (AI) And Data Science",
    "Bio Medical Engineering",
    "Artificial Intelligence And Machine Learning",
    "Computer Science Information Technology",
    "Electronics Engineering",
    "Mining Engineering",
    "Food Technology",
    "Chemical Engineering",
    "Computer Science",
    "Electronic And Computer Engineering",
    "Computer Science (Hindi)",
    "M Tech (Integrated) Computer Science and Engineering",
    "Electronics Engineering (VLSI Design and Technology)",
    "Computer Science and Engineering (Collaboration & Twining Program)",
    "Computer Science And Engineering(Artificial Intelligence & Machine Learning)(Collaboration & Twining Program)",
    "Information Technology (Collaboration & Twining Program)",
    "Computer Science and Engineering (Artificial Intelligence)(Collaboration & Twining Program)",
    "Computer Science And Business System",
    "Computer Engineering And Information Technology",
    "Data Sciences",
    "Cyber Security",
    "Electronics and Telecommunication Engineering",
    "Computer Science & Engineering (Artificial Intelligence)",
    "Computer Science & Engineering (Artificial Intelligence & data Science)",
    "Automotion & Robotics",
    "Electrical & Computer Engg.",
    "Computer Engineering",
    "Bioinformatics",
    "Automobile Engineering",
    "Electronics and Communication (Advanced Communication Technology)",
    "Computer Science and Engineering(Self Finance)",
    "Instrumentation and Control Engineering",
    "Industrial Production Engineering",
    "Handloom & Textile Technology",
    "Carpet & Textile Technology",
    "Aeronautical Engineering",
    "Computer Science & Engineering (AI & Finance Managemnet)",
    "Manufacturing Technology",
    "Plastic Engineering",
    "Food Engineering & technology"
  ];

const categoryValues = [
    "Select Category", "OPEN", "OPEN(TF)", "OPEN(GIRL)", "SC", "BC(AF)", "BC", "EWS(OPEN)", 
    "OPEN(AF)", "EWS(GL)", "BC(Girl)", "SC(AF)", "OPEN(PH)", "SC(Girl)", "ST", "ST(Girl)", 
    "SC(PH)", "EWS(AF)", "BC(PH)", "EWS(PH)", "OPEN(FF)", "BC(FF)"
  ];
  
categoryValues.forEach(category => {
  categorySelection.add(new Option(category, category));
})

categorySelection.addEventListener('change', function() {
    const selectedValue = categorySelection.value;
    branchSelection.innerHTML = "";
    branchSelection.add(new Option("All Programs", "allprograms"));
    
    if (selectedValue == "OPEN(TF)") {
      fwBranches.forEach(branch => {
        branchSelection.add(new Option(branch, branch));
    });
    } else {
      nonFwBranches.forEach(branch => {
        branchSelection.add(new Option(branch, branch));
    });
    }
    
});

document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });
  sessionStorage.setItem('formData', JSON.stringify(data));
  window.location.href = 'results.html';
});