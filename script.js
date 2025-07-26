// Initial load
window.onload = function () {
  displayStudents();
};

// Get DOM elements
const form = document.getElementById("student-form");
const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const tableBody = document.querySelector("#student-table tbody");

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const id = idInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();

  if (!validateInputs(name, id, email, contact)) return;

  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.push({ name, id, email, contact });
  localStorage.setItem("students", JSON.stringify(students));

  form.reset();
  displayStudents();
});

// Validate inputs
function validateInputs(name, id, email, contact) {
  const nameRegex = /^[A-Za-z\s]+$/;
  const idRegex = /^\d+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\d{10,}$/;

  if (!name || !id || !email || !contact) {
    alert("Please fill all fields.");
    return false;
  }

  if (!nameRegex.test(name)) {
    alert("Name should contain only letters.");
    return false;
  }

  if (!idRegex.test(id)) {
    alert("Student ID should contain only numbers.");
    return false;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return false;
  }

  if (!contactRegex.test(contact)) {
    alert("Contact must be at least 10 digits.");
    return false;
  }

  return true;
}

// Display students in table
function displayStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Enable scroll if too many rows
  const displaySection = document.getElementById("display-section");
  if (students.length > 5) {
    displaySection.style.maxHeight = "400px";
    displaySection.style.overflowY = "scroll";
  } else {
    displaySection.style.maxHeight = "none";
    displaySection.style.overflowY = "visible";
  }
}

// Delete student
function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// Edit student
function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const student = students[index];

  nameInput.value = student.name;
  idInput.value = student.id;
  emailInput.value = student.email;
  contactInput.value = student.contact;

  // Remove the old entry before resubmitting
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}
