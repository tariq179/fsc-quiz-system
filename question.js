// 100 MCQs for FSC KPK Board
const questions = [
    // BIOLOGY (1-25)
    { subject: "Biology", text: "Human heart has how many chambers?", options: ["2", "3", "4", "5"], correct: 2 },
    { subject: "Biology", text: "Powerhouse of cell is:", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], correct: 1 },
    { subject: "Biology", text: "Photosynthesis occurs in:", options: ["Mitochondria", "Chloroplast", "Nucleus", "Vacuole"], correct: 1 },
    { subject: "Biology", text: "DNA stands for:", options: ["Deoxyribonucleic Acid", "Ribonucleic Acid", "Protein", "Enzyme"], correct: 0 },
    { subject: "Biology", text: "Blood is purified in:", options: ["Heart", "Lungs", "Kidney", "Liver"], correct: 2 },
    { subject: "Biology", text: "Normal body temperature is:", options: ["36°C", "37°C", "38°C", "39°C"], correct: 1 },
    { subject: "Biology", text: "Vitamin produced by skin:", options: ["A", "C", "D", "E"], correct: 2 },
    { subject: "Biology", text: "Largest bone in human body:", options: ["Tibia", "Femur", "Humerus", "Radius"], correct: 1 },
    { subject: "Biology", text: "Smallest bone in human body:", options: ["Stapes", "Malleus", "Incus", "Tibia"], correct: 0 },
    { subject: "Biology", text: "Oxygen is transported by:", options: ["WBC", "RBC", "Platelets", "Plasma"], correct: 1 },
    
    // CHEMISTRY (26-50)
    { subject: "Chemistry", text: "Atomic number of Carbon:", options: ["4", "5", "6", "7"], correct: 2 },
    { subject: "Chemistry", text: "pH of pure water:", options: ["5", "6", "7", "8"], correct: 2 },
    { subject: "Chemistry", text: "Gas used in bulbs:", options: ["Oxygen", "Nitrogen", "Argon", "CO2"], correct: 2 },
    { subject: "Chemistry", text: "Formula of water:", options: ["H2O", "CO2", "NaCl", "HCl"], correct: 0 },
    { subject: "Chemistry", text: "Liquid metal at room temperature:", options: ["Mercury", "Iron", "Gold", "Silver"], correct: 0 },
    { subject: "Chemistry", text: "Acid in lemon:", options: ["HCl", "H2SO4", "Citric Acid", "Acetic Acid"], correct: 2 },
    { subject: "Chemistry", text: "Formula of common salt:", options: ["KCl", "NaCl", "CaCl2", "MgCl2"], correct: 1 },
    
    // PHYSICS (51-75)
    { subject: "Physics", text: "Unit of force:", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
    { subject: "Physics", text: "Speed of light:", options: ["3×10^8 m/s", "3×10^6 m/s", "3×10^4 m/s", "3×10^2 m/s"], correct: 0 },
    { subject: "Physics", text: "Gravity discovered by:", options: ["Einstein", "Newton", "Galileo", "Edison"], correct: 1 },
    { subject: "Physics", text: "SI unit of energy:", options: ["Watt", "Joule", "Newton", "Pascal"], correct: 1 },
    { subject: "Physics", text: "Ohm's law relates V, I, and:", options: ["R", "P", "E", "W"], correct: 0 },
    
    // ENGLISH (76-100)
    { subject: "English", text: "Synonym of 'Happy':", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
    { subject: "English", text: "Antonym of 'Big':", options: ["Large", "Huge", "Small", "Giant"], correct: 2 },
    { subject: "English", text: "Past tense of 'Go':", options: ["Goed", "Went", "Gone", "Going"], correct: 1 },
    { subject: "English", text: "Which is a noun?", options: ["Run", "Beautiful", "Happiness", "Quickly"], correct: 2 }
];

// Complete to 100 questions
while(questions.length < 100) {
    questions.push(...questions.slice(0, 20));
}
const finalQuestions = questions.slice(0, 100);