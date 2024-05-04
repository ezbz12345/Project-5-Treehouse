//establish the landing pads for the processed data
const mainGallery = document.getElementById('gallery');
const docBody = document.getElementsByTagName('body')[0];
const searchBox = document.getElementById('search-input');
const searchSubmitButton = document.getElementById('search-submit');


let employeesAll = []; //array to hold the json from the fetch request
let employeesFitlered = [];
let placeHolder;
let employeesShowing = []
fetch('https://randomuser.me/api/?results=12&nat=us')
.then(response => response.json()) //with the returned promise from fetch, parse into usable json.
.then(data => employeesAll = data.results) //with the JSON, grab the results array of objects, and store them for use in already declared variable, employeesAll.
.then(generateHTML) 
.then(makeModals)
.catch(error => console.log(error))


//functions not directly for consuming promises 

function createModal(i){
    const person = employeesAll[i]
    let dobString = birthdayToString(person.dob.date);//dob is stored as a string that needs to be parsed out, so we work that out with a helper function
    const modalHTML = `
    <div id="modal-container" class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src=${person.picture.large} alt="profile picture">
        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${person.email}</p>
        <hr>
        <p class="modal-text">${person.cell}</p>
        <p class="modal-text">${person.location.street.number} ${person.location.street.name}</p>
        <p class="modal-text cap">${person.location.city}, ${person.location.state}</p>
        <p class="modal-text cap">${person.location.postcode}</p>
        <p class="modal-text">Birthday: ${dobString}</p>
    </div>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>
    `;
    placeHolder = i;
    //since we build the modal here, we also attached the event listeners. note that placeHolder lets us cycle through the list, modal by modal. 
    docBody.insertAdjacentHTML('beforeend', modalHTML);
    
    document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.getElementById('modal-container').remove();
    })
    document.getElementById('modal-prev').addEventListener('click', () =>{
    document.getElementById('modal-container').remove();
    if (i === 0){
    createModal(11)
    }else{
        createModal((i-1))
    }
    })
    document.getElementById('modal-next').addEventListener('click', () =>{
        document.getElementById('modal-container').remove();
        if (i === 11){
        createModal(0)
        }else{
            createModal((i+1))
        }
        })
}

//build birthday string. the argument will be a string in a not-readily-usable format, so we have to turn it into a Date object, and then run the getXXX() methods to build the usable string. 
function birthdayToString(dob){
    let birthdayString =""
    let birthdayObject = new Date(dob);
    let monthInt = birthdayObject.getMonth();
    let birthdayYear = birthdayObject.getFullYear();
    let birthdayDay = birthdayObject.getDate();
    let month = ""
    switch (monthInt) {
        case 0: 
         month = "January";
         break;
        case 1:
        month = "February";
         break;
        case 2:
        month =  "March";
         break;
        case 3: 
        month =  "April";
         break;
        case 4: 
        month =  "May";
         break;
        case 5: 
        month =  "June";
         break;
        case 6: 
        month =  "July";
         break;
        case 7: 
        month = "August";
         break;
        case 8: 
        month = "September";
         break;
        case 9: 
        month = "October";
         break;
        case 10: 
        month =  "November";
         break;
        case 11: 
        month =  "December";
         break;
    }
    birthdayString = `${month} ${birthdayDay} ${birthdayYear}`;
    return birthdayString;
}

// Functions that will consume promises 

//build the cards, put the cards where they go
function generateHTML(){

    const everybody = employeesAll.map((item) => {

    const html = `
    <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src=${item.picture.medium} alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
                        <p class="card-text">${item.email}</p>
                        <p class="card-text cap">${item.location.city} , ${item.location.state}</p>
                    </div>
                </div>
    `    
    mainGallery.insertAdjacentHTML('beforeend', html)
    });
   

}

//make the modals, they stay hid until called to manifest
function makeModals(){
    let employeeCards = document.getElementsByClassName('card');
    
    for(let i=0 ; i < employeeCards.length ; i++){
        employeeCards[i].addEventListener('click', () => createModal(i));
    }};

// Event listeners



employeesDOM = document.getElementsByClassName('card') 
//searches for matches of whole first, or whole last name. 
searchSubmitButton.addEventListener('click', (e)=>{
    if (searchBox.value !== ""){
        let notEmpty = 0
    for (let i=0 ; i < employeesAll.length ; i++){
        if (employeesAll[i].name.first.toLowerCase() == searchBox.value.toLowerCase() || employeesAll[i].name.last.toLowerCase() == searchBox.value.toLowerCase()){
            employeesDOM[i].style.display = "flex";
            notEmpty = 1
        }else{
            employeesDOM[i].style.display = "none";
        };};
        if (notEmpty===0){
            mainGallery.appendChild(bringEveryoneBack);
         
        }
    }else{ for (let j=0 ; j < employeesAll.length ; j++){
        employeesDOM[j].style.display = "flex";
    }}
    e.preventDefault()  //needs to be at the end of this function to stop page reload. This comment is mostly for me.
})

// Although I made it so you can empty the search input to bring everyone back, I didn't find that to be intuitive enough,
// So I made bringing everyone back hard to get hung up on.  
const bringEveryoneBack = document.createElement('button');
bringEveryoneBack.innerText = "Noone here by that name! Click to bring all the AWESOME STARTUP EMPLOYEES back." ;
bringEveryoneBack.classList.add('bringEveryoneBack');
bringEveryoneBack.addEventListener('click', () => {
    bringEveryoneBack.remove();
    for (let j=0 ; j < 12 ; j++){
        employeesDOM[j].style.display = "flex";
   }});
