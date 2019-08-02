document.addEventListener("DOMContentLoaded", setUpPage)

const booksApi = `http://localhost:3000/books/`
const booksList = document.getElementById("list")
const bookShowPanel = document.querySelector("#show-panel")
const user = {"id":1, "username":"pouros"}
document.addEventListener("click", handleEvent)

function setUpPage(){
    fetch(booksApi)
    .then(res => res.json())
    .then(books => books.map(book => renderBook(book))) 
}

function renderBook(book){
    console.log("list of books", book)
    booksList.innerHTML += `<li class="book-li" data-id=${book.id}>${book.title}</li>`
}

function handleEvent(e){
    e.preventDefault()
    if(e.target.className === "book-li"){
        console.log(e.target.dataset.id)
         getAllBooks(e.target.dataset.id, showMore)
    } else if (e.target.id === "like-btn"){
        getAllBooks(e.target.dataset.id, likeBook)
     }
}

function getAllBooks(id, callbackFunc){
    fetch(booksApi + id)
    .then(res => res.json())
    .then(callbackFunc)
}

function showMore(book){
    bookShowPanel.innerHTML =
    `<h4>${book.title}</h4> 
    <img src=${book.img_url}>
    <p> ${book.description}</p>
    <ul id="users-list>
    ${book.users.map(user => `<li class="user-li" data-id=${user.id}>${user.username}</li>`).join("")}
    </ul>
    <button id="like-btn" data-id={book.id}>Read Book</button> `
}

function likeBook(){
    
}
