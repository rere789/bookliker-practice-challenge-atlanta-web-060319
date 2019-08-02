const books ="http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", setUpPage)


function setUpPage(){
    console.log("hi")
    getAllBooks()
}

function getAllBooks(){
    fetch(books)
    .then(res => res.json())
    .then(data => listOfBooks(data))
}

function listOfBooks(books){
    let book = books.forEach(bookList)
}

function bookList(book){
    const div = document.querySelector("div")

    let li = document.createElement("li")
    li.innerText = book.title 
    li.id = book.id
    li.addEventListener("click", handleBookDetails)

    div.appendChild(li)
}

function handleBookDetails(e){
     let bookId = e.target.id
     e.preventDefault()

     fetch(`http://localhost:3000/books/${bookId}`)
    .then(res => res.json())
    .then(data => bookDetails(data))

}

function bookDetails(book){

    // let users = book.user.forEach(`<li>${username}</li>`)
    // console.log("here", users)

    const div = document.querySelector("#show-panel")

    let bookDiv = document.createElement("div")
    bookDiv.id = book.id

    let bookHeader = document.createElement("header")
    bookHeader.innerText = book.title


    let bookImg = document.createElement("img")
    bookImg.src = book.img_url
    bookImg.className = "bookImage"

    let description = document.createElement("p")
    description.innerText = book.description

    

    let likeButton = document.createElement("button")
    likeButton.innerText = "Read me"
    likeButton.addEventListener("click", handleLike)

    book.users.forEach(function(users) {
        let usersP = document.createElement("p")
        usersP.innerText = users.username
        description.appendChild(usersP)
        usersP.className = "usersName"
        }    )

    


    div.appendChild(bookDiv)
    bookDiv.appendChild(bookHeader)
    bookDiv.appendChild(bookImg)
    bookDiv.appendChild(description)
    bookDiv.appendChild(likeButton)

}

function handleLike(e){
    const book = e.target.parentElement.id
    let allUsers =  e.target.parentElement.querySelectorAll(".usersName")
    // itterate forEach each users id and username 
    // add my user details on the array 

    fetch(`http://localhost:3000/books/${book}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
                "users": [
                  {"id":2, "username":"auer"},
                  {"id":8, "username":"goodwin"},
                  {"id":1, "username":"pouros"}
                ]
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))

}

// function liked(user){
//     const bookImg = document.querySelector(".bookImage")

//     let p = document.createElement("p")
//     p.innerText = user.name

//     bookImg.appendChild(p)
// }
