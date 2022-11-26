
// VARIABLES


let employees = [];
const api = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.getElementById('grid-container')
const employeeList = gridContainer.children;
const overlay = document.querySelector('.overlay');
const focusContainer = document.querySelector('.focus');
const focusBtnClose = document.querySelector('.focus-close');
const searchBar = document.getElementById('search');


// FUNCTIONS


fetchEmployeeData(api)


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
}
function showFocus(i){
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[i];

    let date = new Date(dob.date);

    const html =`
        <div class="focus" data-index="${i}">
            <button class="focus-close focus-btns">X</button>
            <img class="profile-pic" src="${picture.large}" />
            <div class="employee-info">
                <h2 class="employee-name">${name.first} ${name.last}</h2>
                <p class="employee-email">${email}</p>
                <p class="employee-address">${city}</p>
                <button class="next focus-btns">&rArr;</button>
                <button class="back focus-btns">&lArr;</button>
            <hr />
                <p>${phone}</p>
                <p class="employee-location">${street.number}, ${street.name}, ${state} ${postcode}</p>
                <p>Birthday:${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
                `;
    overlay.classList.remove('hidden');
    overlay.innerHTML = html;
    let focusIndex = parseInt(overlay.children[0].getAttribute('data-index'))
    const back = overlay.querySelector('.back');
    const next = overlay.querySelector('.next')
    if(focusIndex === 0){
        back.style.display = 'none';
    }else if (focusIndex === 11){
        next.style.display = 'none'
    }
}
function filterEmployees(value){
    let employeeName = [];
    for (let i = 0; i < employeeList.length; i++) {
        employeeName[i] = employeeList[i].querySelector('.employee-name').textContent;
        if(!employeeName[i].toLowerCase().includes(value.toLowerCase())){
            employeeList[i].style.display = 'none'
        }else{
            employeeList[i].style.display = 'flex'
            
        }
        
    }
}


//  EVENT LISTENERS


gridContainer.addEventListener('click',e=>{

    if (e.target !== gridContainer){
        const employeeBox = e.target.closest(".grid-item");
        const index = employeeBox.getAttribute('data-index');

        showFocus(index);
    }

});

overlay.addEventListener('click',(e) =>{
    if (e.target.className === 'focus-close focus-btns') {
        overlay.classList.add('hidden');        
    }else if(e.target.className === 'back focus-btns'){
        const focusBox = overlay.children[0];
        const index = parseInt(focusBox.getAttribute('data-index'));
        showFocus(index-1);       
    }else if(e.target.className === 'next focus-btns'){
        const focusBox = overlay.children[0];
        const index = parseInt(focusBox.getAttribute('data-index'));
        showFocus(index+1);
    }
})