document.addEventListener("DOMContentLoaded", setUpPage)

const books = "http://localhost:3000/books"
const me = {id: 1, username: "pouros"}

function setUpPage(){

    getAllBooks()
}

function getAllBooks(){
    fetch(books)
    .then(res => res.json())
    .then(books => createlist(books))
}

function createlist(books){
    books.forEach(createBookCard)
}

function createBookCard(book){
    // console.log(book)
   const ul =  document.querySelector("#list")

   let li = document.createElement("li")
   li.innerText = book.title
   li.dataset.id = book.id 
//    li.setAttribute("data-id", book.id)
    li.addEventListener("click", handleBoodDetails)

   ul.appendChild(li)
}

function handleBoodDetails(e){
    const books = "http://localhost:3000/books/"
    const bookId = (e.target.dataset.id)
    fetch(books + bookId)
    .then(res => res.json())
    .then(bookDetails => bookDetailCard(bookDetails))
}

function bookDetailCard(book){
    const show = document.querySelector("#show-panel")
    show.innerHTML = null
    
    let title = document.createElement("h3")
    title.innerText = book.title
    show.appendChild(title)

    let image = document.createElement("img")
    debugger
    image.src = book["img_url"]
    show.appendChild(image)

    let description = document.createElement("p")
    description.textContent = book.description
    show.appendChild(description)
    description.className = description

   
    book.users.forEach(function(user){
        let users = document.createElement("h3")
        users.innerText = user.username  
        show.appendChild(users)

        
    })

    let userBtn = document.createElement("button")
    userBtn.innerText = "Read Me"
    userBtn.dataset.id = book.id
    // userBtn.setAttribute("data-id", book.id)
    show.appendChild(userBtn) 
    userBtn.addEventListener("click", handleAdd)
}

function handleAdd(e){
   let id = e.target.dataset.id
   const books = "http://localhost:3000/books/"

   fetch(books + id)
   .then(res => res.json())
   .then(book => renderMyself(book))
}

function renderMyself(book){
    // console.log(book.users)
    
    if(!book.users.find(othUser => othUser.username === me.username)){
        newUsers = [...book.users, me]
    } else {
        alert("Read this already")
    }
        updateUsers(book, newUsers)  
}

function updateUsers(book, newUsers){
    console.log(newUsers)
    let bookId = book.id
    const books = "http://localhost:3000/books/"

    fetch(books + bookId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            users: newUsers
    })
    })
    .then(res => res.json())
    .then(data => bookDetailCard(data))
}