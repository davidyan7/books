'use strict'

function onInit() {
    renderbooks()
}

function renderbooks() {
    var books = getBooks();
    var strHtmls = books.map(function(book) {
        return `
        <article class="book-preview">
            <img class="card-img-top" src="${book.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">Book Name: <br> ${book.name}<br></h5>
                <p class="card-text">Price: ${book.price}$</p>
                <span class="read-btn" onclick="onReadBook('${book.id}')">Read</span>
                <span class="update-btn" onclick="onUpdateBook('${book.id}')">Update</span>
                <span class="remove-btn" onclick="onRemoveBook('${book.id}')">Remove</span>
            </div>
        </article> 
        `
    })
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}


function onAddBook() {
    addBook(prompt('Book Name:'), prompt('Price:'))
    renderbooks()
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderbooks()
}

function onUpdateBook(bookId) {
    updateBook(bookId, prompt('Price:'))
    renderbooks()
}

function onRateBook(elTxt) {
    var rate = rateBook(elTxt)
    document.querySelector('h4').innerText = 'Rating : ' + rate
    renderbooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('select').classList.add(bookId)
    elModal.querySelector('h2').innerText = book.name
    elModal.querySelector('h3').innerText = book.price + '$'
    elModal.querySelector('h4').innerText = 'Rating : ' + book.rate
    elModal.querySelector('.book-img').innerHTML = `<img src="${book.img}" alt="">`
    elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false

}


function onCloseModal() {
    document.querySelector('.modal').hidden = true
}