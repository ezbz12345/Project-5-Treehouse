//establish the landing pads for the processed data
const mainGallery = document.getElementById('gallery');
const docBody = document.getElementsByTagName('body')[0];
const searchBox = document.getElementById('search-input');
const searchSubmitButton = document.getElementById('search-submit');


let employeesAll = [];
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
    let dobString = birthdayToString(person.dob.date);
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

// Functions that will consuime promises 

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

function makeModals(){
    let employeeCards = document.getElementsByClassName('card');
    
    for(let i=0 ; i < employeeCards.length ; i++){
        employeeCards[i].addEventListener('click', () => createModal(i));
    }};

// Event listeners



employeesDOM = document.getElementsByClassName('card') 
searchSubmitButton.addEventListener('click', (e)=>{

    e.preventDefault
    if (searchBox.value !== ""){
        let notEmpty = 0
    for (let i=0 ; i < employeesAll.length ; i++){
        if (employeesAll[i].name.first == searchBox.value || employeesAll[i].name.last == searchBox.value){
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

})

const bringEveryoneBack = document.createElement('button');
bringEveryoneBack.innerText = "Noone here by that name! Click to bring all the AWESOME STARTUP EMPLOYEES back." ;
bringEveryoneBack.classList.add('bringEveryoneBack');
bringEveryoneBack.addEventListener('click', () => {
    bringEveryoneBack.remove();
    for (let j=0 ; j < 12 ; j++){
        employeesDOM[j].style.display = "flex";
   }})




// ##################################Trash Bin################################

// function showModal(i){
// const modalArray = document.getElementsByClassName('modal');
// modalContainer.style.display = "block";
// modalArray[i].style.display = "block";
// };

   //html.addEventListener('click', ()=> {alert('test')})
    //docBody.insertAdjacentHTML('beforeend', modals)
   // html.addEventListener('click', modalBuilder(everything));

      //const arrayed = data.results;
    
    // everything.push = {
    //     name: `${item.name.title} ${item.name.first} ${item.name.last}`, 
    //     email: `${item.email}`, 
    //     picBig: `${item.picture.large}`,
    //     birthDay: `${item.dob.date}`, //will probly need to parse this into a readable form
    //     city: `${item.location.city}`,
    //     state: `${item.location.state}`,
    //     phone: `${item.phone}`,
    //     address: `${item.location.street.number} ${item.location.street.name}`
    // }




//.then(res => console.log(res))
//.then(generateHTML)
//.then(data => holder = data)





//test that you can properly grab, process, and inject

// function generateHTML(data){
//     const arrayed = data.results;
//     const everybody = arrayed.map(item => {
//     const name = `${item.name.title} ${item.name.first} ${item.name.last}`
//     const email = `${item.email}`
//     const picture = `${item.picture.thumbnail}`
//     const city = `${item.location.city}`
//     const state = `${item.location.state}`
//     const html = `
//     <div class="card">
//                     <div class="card-img-container">
//                         <img class="card-img" src=${picture} alt="profile picture">
//                     </div>
//                     <div class="card-info-container">
//                         <h3 id="name" class="card-name cap">${name}</h3>
//                         <p class="card-text">${email}</p>
//                         <p class="card-text cap">${city}, ${state}</p>
//                     </div>
//                 </div>
//     `
//     });
//     mainGallery.insertAdjacentHTML('beforeend', html)
// }
// function modalBuilder (person){
// // const modalHTML = `
// // <div class="modal">
// //                     <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
// //                     <div class="modal-info-container">
// //                         <img class="modal-img" src=${person.picBig} alt="profile picture">
// //                         <h3 id="name" class="modal-name cap">${person.name}</h3>
// //                         <p class="modal-text">${person.email}</p>
// //                         <p class="modal-text cap">${person.city}</p>
// //                         <hr>
// //                         <p class="modal-text">${person.phone}</p>
// //                         <p class="modal-text">${person.address}</p>
// //                         <p class="modal-text">B${person.birthDay}</p>
// //                     </div>
// //                 </div>
// // `
// modalContainer.innerHTML = modalHTML;
// }


// function findMatch(value){
//     if (value.name.first == searchBox.value || value.name.last == searchBox.value){
//   return value;
//     }
// }

   // employeesFitlered = employeesAll.filter(findMatch);
    


// searchBox.addEventListener('onkeyup', () => {
//     if (searchBox.value == ""){
//     for (let j=0 ; j < employeesAll.length ; j++){
//         employeesDOM[j].style.display = "flex";
//    }}})

// const modals = `
// <div id="modal-container" class="modal-container">
//         <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src=${item.picture.large} alt="profile picture">
//             <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
//             <p class="modal-text">${item.email}</p>
//             <p class="modal-text cap">${item.location.city}</p>
//             <hr>
//             <p class="modal-text">${item.phone}</p>
//             <p class="modal-text">${item.location.street.number} ${item.location.street.name}</p>
//             <p class="modal-text">Birthday: ${dobString}</p>
//         </div>
//         </div>
//         <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//         </div>
//         </div>
// `
//fetch('https://randomapi.com/api/?key=6EUV-Y8JP-WSIQ-VAKI')

// mainGallery.id = "gallery";
// mainGallery.classList.add('gallery');
// docBody.appendChild('mainGallery');
// //const modalContainer = document.getElementById('modal-container');