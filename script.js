// Get contacts from Local Storage
let contacts =
JSON.parse(localStorage.getItem("contacts"))
|| [];

// DOM Elements
const contactForm =
document.getElementById("contactForm");

const contactList =
document.getElementById("contactList");

const search =
document.getElementById("search");

// Save Contacts
function saveContacts(){

localStorage.setItem(
"contacts",
JSON.stringify(contacts)
);

}

// Display Contacts
function displayContacts(list = contacts){

contactList.innerHTML = "";

list.forEach((contact,index)=>{

const card =
document.createElement("div");

card.classList.add("contact-card");

card.innerHTML = `
<h3>${contact.name}</h3>

<p><strong>Email:</strong>
${contact.email}</p>

<p><strong>Phone:</strong>
${contact.phone}</p>

<p><strong>Company:</strong>
${contact.company}</p>

<div class="actions">

<button onclick="editContact(${index})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteContact(${index})">
Delete
</button>

</div>
`;

contactList.appendChild(card);

});

}

// Add Contact
contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

const contact = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

phone:
document.getElementById("phone").value,

company:
document.getElementById("company").value

};

contacts.push(contact);

saveContacts();

displayContacts();

contactForm.reset();

});

// Delete Contact
function deleteContact(index){

if(confirm("Delete this contact?")){

contacts.splice(index,1);

saveContacts();

displayContacts();

}

}

// Edit Contact
function editContact(index){

const contact = contacts[index];

document.getElementById("name").value =
contact.name;

document.getElementById("email").value =
contact.email;

document.getElementById("phone").value =
contact.phone;

document.getElementById("company").value =
contact.company;

// Remove old contact
contacts.splice(index,1);

saveContacts();

displayContacts();

}

// Search Contacts
search.addEventListener("keyup",()=>{

const value =
search.value.toLowerCase();

const filteredContacts =
contacts.filter(contact =>

contact.name
.toLowerCase()
.includes(value)

||

contact.email
.toLowerCase()
.includes(value)

);

displayContacts(filteredContacts);

});

// Initial Load
displayContacts();