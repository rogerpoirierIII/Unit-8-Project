let employees = [];
const api = 'https://randomuser.me/api/';
const employeeListContainer = document.getElementById('grid-container');
const overlay = document.querySelector('.overlay');
const focusContainer = document.querySelector('.focus');
const focusBtnClose = document.querySelector('.focus-close');

function checkLog(mes){
    console.log(mes);
}

fetch(api)
    .then(response => response.json())
    .then(response =>  response.results)
    .then(displayEmployees)
    .catch(error => console.log(error))

function displayEmployees(data){
    employees = data;

    let html ='';

    employees.forEach((employees,i) => {
        let name = employees.name;
        let email = employees.email;
        let city = employees.location.city;
        let picture = employees.picture;
        html +=
        `
            <div class="grid-item" data-index="${i}">
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

employeeListContainer.innerHTML = html;
}
