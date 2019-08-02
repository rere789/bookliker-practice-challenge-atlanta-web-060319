document.addEventListener("DOMContentLoaded", setUpPage)

const booksUrl = "http://localhost:3000/books/"
const users = "http://localhost:3000/users/"
const me = {id:1, username:"pouros"}

function setUpPage(){

    getAllBooks()
}

function getAllBooks(){
    fetch(booksUrl)
    .then(res => res.json())
    .then(data => bookList(data))
}

function bookList(books){
    books.forEach(createList)
}

function createList(book){
    const ul = document.querySelector("#list")

    let li = document.createElement("li")
    li.innerText = book.title
    ul.appendChild(li)
    li.dataset.id = book.id 
    // li.addEventListener('click', function (e) { return handleDetails(e, book) })
    li.addEventListener("click", () => {
        createDetails( book)
    })
    
}

function createDetails(book){
    console.log("New Association: ", book)
    const bookDetails = document.querySelector("#show-panel")
    bookDetails.innerText = null

    let title = document.createElement("h1")
    title.innerText = book.title
    bookDetails.appendChild(title)

    let image = document.createElement("img")
    image.src = book.img_url
    bookDetails.appendChild(image)

    let description = document.createElement("p")
    description.innerText = book.description
    bookDetails.appendChild(description)

    book.users.forEach(user => {
        let users = document.createElement("h3")
        users.innerText = user.username
        description.appendChild(users)
    })

    let readBtn = document.createElement("button")
    readBtn.innerText = "Read Book"
    readBtn.dataset.id = book.id 
    bookDetails.appendChild(readBtn)
    readBtn.addEventListener("click", (e) => {
        createUsers(e, book)
    })
}

function createUsers(e, book){
    const users = book.users.map(user => {
        return user.username
    } )
        if(users.includes(me.username)){
            alert("Read This Book")
        } else {
            let newArray = [...book.users, me]
            newUsers(e, newArray, book)
        }

}

function newUsers(e, newArray, book){
    // console.log(newArray)
    console.log("Event: " , e)

    fetch(booksUrl + book.id,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            users: newArray
        })
    })
    .then(res => res.json())
    .then(data => createDetails(data))
}


