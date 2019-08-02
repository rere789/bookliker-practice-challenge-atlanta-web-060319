document.addEventListener("DOMContentLoaded", () => {

    const booksAPI = `http://localhost:3000/books/`
    const booksList = document.getElementById('list')
    const bookShowPanel = document.querySelector('#show-panel')
    const user = {"id":1, "username":"pouros"}
    document.addEventListener('click', handleEvents)
  
    function init(){
      fetch(booksAPI)
      .then(res => res.json())
      .then(books => books.map(book => renderBook(book)))
    }
  
    function renderBook(book){
      // make sure you have access to the data you want to render
      // console.log(book)
      // console.log(booksList)
      booksList.innerHTML += `<li class="book-li" data-id=${book.id}>${book.title}</li>`
    }
  
    function handleEvents(e){
      e.preventDefault()
      if(e.target.className === 'book-li'){
        // console.log(e.target.dataset.id)
        getBook(e.target.dataset.id, showMore)
      } else if(e.target.id === 'like-btn'){
        // console.log(e.target.dataset.id)
        getBook(e.target.dataset.id, likeBook)
      }
    }
  
    function getBook(id, callbackFunc){
      // console.log(id)
      // console.log(booksAPI + id)
      // console.log(id, callbackFunc)
      fetch(booksAPI + id)
      .then(res => res.json())
      .then(callbackFunc)
    }
  
    function showMore(book){
      bookShowPanel.innerHTML = `
      <h4>${book.title}</h4>
      <img src=${book.img_url}>
      <p>${book.description}</p>
      <ul id="users-list">
      ${book.users.map(user => `<li class="user-li" data-id=${user.id}>${user.username}</li>`).join("")}
      </ul>
      <button id="like-btn" data-id=${book.id}>${book.users.find(othUser => othUser.username === user.username) ? 'Unlike' : 'Like'}</button>
      `
    }
  
  
  function likeBook(book){
    let newUsers
    console.log(book)
    if(!book.users.find(othUser => othUser.username === user.username)){
      newUsers = [...book.users, user]
    } else {
      newUsers = book.users.filter(othUser => othUser.id !== user.id)
    }
    updateUsers(book, newUsers)
  }
  
  function updateUsers(book, users){
    fetch(booksAPI + book.id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({users: users})
    }).then(res => res.json())
    .then(showMore)
  }
  
  
  
  
  
    init()
  });