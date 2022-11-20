// =========================================================================
// ------------------------------VARIABLES----------------------------------
//  ========================================================================
let employees = [];
const api = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
let employeeContainer = document.querySelectorAll('.grid-item');
const gridContainer = document.getElementById('grid-container')
const overlay = document.querySelector('.overlay');
const focusContainer = document.querySelector('.focus');
const focusBtnClose = document.querySelector('.focus-close');
let counter = 0;

// =========================================================================
// ------------------------------FUNCTIONS----------------------------------
//  ========================================================================

function fetchEmployeeData(url){
    fetch(url)
    .then(response => response.json())
    .then(response =>  response.results)
    .then(displayEmployees)
    .catch(error => console.log(error))

}
function displayEmployees(data){
    employees = data;

    let html ='';

    employees.forEach((employees,index) => {
        let name = employees.name;
        let email = employees.email;
        let city = employees.location.city;
        let picture = employees.picture;
        html +=
        `
            <div class="grid-item" data-index="${index}">
                <div class = "employee-image">
                    <img src="${picture.large}" alt="" class="profile-pic"/>
                </div>
                    <ul class="employee-info">
                        <li class="employee-name">${name.first} ${name.last}</li>
                        <li class="employee-email">${email}</li>
                        <li class="employee-address">${city}</li>
                    </ul>
                </div>
        `
})

gridContainer.innerHTML = html;

counter++;
}
function showFocus(i){
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[i];

    let date = new Date(dob.date);

    const html =`
        <button class="focus-close">X</button>
        <img class="profile-pic" src="${picture.large}" />
        <div class="employee-info">
            <h2 class="employee-name">${name.first} ${name.last}</h2>
            <p class="employee-email">${email}</p>
            <p class="employee-address">${city}</p>
        <hr />
            <p>${phone}</p>
            <p class="employee-location">${street.number}, ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
                `;
    overlay.classList.remove('hidden');
    focusContainer.innerHTML = html;
}


    fetchEmployeeData(api)

// =========================================================================
// -----------------------------EVENT LISTENERS-----------------------------
//  ========================================================================

gridContainer.addEventListener('click',e=>{

    if (e.target !== gridContainer){
        const employeeBox = e.target.closest(".grid-item");
        const index = employeeBox.getAttribute('data-index');

        showFocus(index);
    }

});

focusContainer.addEventListener('click',(e) =>{
    if (e.target.className === 'focus-close') {
        overlay.classList.add('hidden');        
    }
})