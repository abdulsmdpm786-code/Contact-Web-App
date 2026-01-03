
let contactArray = [];


async function contactLIst() {
    try {
        let response = await fetch('data.json');
        let data = await response.json();
        console.log(data);
        
        contactArray = data;
        renderList();
    }catch (error) {
        console.log("Error Found", error);
        
    }
}

contactLIst();


// add people
const addBtn = document.getElementById("addBtn");
const addName = document.getElementById("addName");
const addPlace = document.getElementById("addPlace");
const addNumber = document.getElementById("addNumber");

// show list
const showList = document.getElementById("listShow");



// modal function
const openBtnModal = document.getElementById("modalBtn");
const closeBtnModal = document.getElementById("closeModal");
const modalBox = document.getElementById("modalBox");
const modalWrap = document.getElementById("contactWrapper");
const editCont = document.getElementById("editWrapper");
const closeEditModal = document.getElementById("editModal");

// edit and delete modal
const modificationModal = document.getElementById("listBtn");
const editModalName = document.getElementById("editName");
const editModalPlace = document.getElementById("editPlace");
const editModalNumber = document.getElementById("editNumber");
const editModalBtn = document.getElementById("editBtn");
const dltModalBtn = document.getElementById("dltBtn");

// search handling
const searchValue = document.getElementById("searchText");
const searchBtn = document.getElementById("searchBtn");
const searchCloseBtn = document.getElementById("closeBtn");




// modal managing
openBtnModal.addEventListener("click", () => {
    modalWrap.classList.add('open');

})

closeBtnModal.addEventListener("click", closeModal)

function closeModal() {
    modalWrap.classList.remove('open');
    editCont.classList.remove('open');
}




// assign list to HTML
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showList.innerHTML = "";

    const peopleName = addName.value.trim();
    if (peopleName.length > 0) {
        addFunction();
    } else {
        alert("Please fill the information")
    }

});



function addFunction() {
    showList.innerHTML = "";

    const peopleName = addName.value;
    const peoplePlace = addPlace.value;
    const peopleNumber = addNumber.value;


    const contactObj = {
        id: Date.now(),
        name: `${peopleName}`,
        place: `${peoplePlace}`,
        number: `${peopleNumber}`
    }

    contactArray.push(contactObj);
    console.log(contactArray);
    renderList();

    addName.value = "";
    addPlace.value = "";
    addNumber.value = "";
    closeModal()
}


function renderList() {
    showList.innerHTML = "";
    contactArray.forEach((people) => {

        showList.innerHTML +=
            ` <div class="contact" data-id  ="${people.id}" >
                   <ul>
                        <li>${people.name}</li>
                        <li>${people.place}</li>
                        <li>${people.number}</li>
                    </ul>
                </div>
                
`
    })
}


// edit and dlt modal functions
showList.addEventListener('click', (e) => {


    showListFun(e);
    editCont.classList.add('open');

    //  let values = e.target.closest('contact');
    //   console.log(values);
})

closeEditModal.addEventListener("click", closeModal)

// contact id update here
let updateNum;



function showListFun(e) {
    let values = e.target.closest('.contact').dataset.id;
    console.log(values);
    let valueNumber = Number(values);
    const person = contactArray.find(item => item.id === valueNumber);


    // edit(valueNumber) 
    // person.name = "abdul"
    // contactArray.push(person);
    // console.log(contactArray);
    editModalName.value = person.name;
    editModalPlace.value = person.place;
    editModalNumber.value = person.number;
    updateNum = valueNumber
    // return updateNum;

}

editModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let editValidation = editModalName.value.trim();
    if (editValidation.length < 0) {
        alert("Fill it completely")
    } else {
        // let editNum = e.target.closest('.contact').dataset.id;
        // let editValue = Number(editNum);

        let editObj = contactArray.find(item => item.id === updateNum);
        console.log("edit num", editObj);

        console.log(editObj.name);
        console.log(editModalName.value);



        editObj.name = editModalName.value;
        editObj.place = editModalPlace.value;
        editObj.number = editModalNumber.value;
        // contactArray.push(editObj);
        console.log(contactArray);


        renderList();

        // let values = e.target.closest('.contact').dataset.id;
        // console.log(values);
        // let valueNumber = Number(values);
        // const person = contactArray.find(item => item.id === valueNumber);

        editCont.classList.remove('open');
    }



})

dltModalBtn.addEventListener('click', () => {
    contactArray = contactArray.filter(person => person.id !== updateNum);
    renderList();
    editCont.classList.remove('open');
})


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchTxt = searchValue.value.trim();
    if (searchTxt.length > 0) {
        searchLIst();
        searchCloseBtn.classList.add('open');
    } else {
        alert("Enter Value To Search");
    }

})

function searchLIst() {

    let searchTxt = searchValue.value.trim();
    searchArray = contactArray.filter(value => value.name.toLowerCase().includes(searchTxt)
        || value.place.toLowerCase().includes(searchTxt)
        || value.number.toLowerCase().includes(searchTxt));
    console.log(searchArray);


    showList.innerHTML = "";
    searchArray.forEach((people) => {

        showList.innerHTML +=
            ` <div class="contact" data-id  ="${people.id}" >
                   <ul>
                        <li>${people.name}</li>
                        <li>${people.place}</li>
                        <li>${people.number}</li>
                    </ul>
                </div>
                
`
    })

    searchCloseBtn.addEventListener('click', () => {
        renderList();
        searchCloseBtn.classList.remove('open');
    })

}
