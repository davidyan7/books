'use strict'
const KEY = 'books';


var gBooks = ['Harry potter', 'A Promised Land', '1984 (Pocket Paperback)', 'Dearly: New Poems ']

var gImgUrls = ['https://cathysbooks.com/wp-content/uploads/shop-book-sorcerers-stone.jpg', 'https://cathysbooks.com/wp-content/uploads/shop-book-obama-a-promise-land.jpg', 'https://cathysbooks.com/wp-content/uploads/shop-book-1984.jpg', 'https://cathysbooks.com/wp-content/uploads/shop-book-margaret-atwood-dearly.jpg']

_createBooks(_createBook())


function addBook(bookName, img, price) {
    var newBook = _createBook(bookName, img, price)
    gBooks.push(newBook)
    _saveBooksToStorage();
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id
    })
    console.log(gBooks);
    gBooks.splice(bookIdx, 1)
    console.log(gBooks);
    _saveBooksToStorage();
}


function getBookById(bookID) {
    var book = gBooks.find(function(book) {
        return bookID === book.id
    })
    return book
}

function updateBook(bookId, price) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id
    })
    gBooks[bookIdx].price = price
    _saveBooksToStorage();
}

function rateBook(elTxt) {
    var currBook = (document.querySelector('select').className);
    var bookIdx = gBooks.findIndex(function(book) {
        return currBook === book.id
    })
    gBooks[bookIdx].rate = elTxt.length
    _saveBooksToStorage()
    return elTxt.length;
}


function _createBook(bookName = 'book', price, img) {
    if (!price) var price = getRandomIntInclusive(1, 200)
    if (!img) var img = 'http://cdn.shopify.com/s/files/1/0064/5342/8271/products/SSLW4-Little-Women-1200-Angle.jpg?v=1575921507'
    return {
        id: makeId(),
        name: bookName,
        price: price,
        img: img,
        desc: makeLorem(),
        rate: 1
    }
}


function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 20; i++) {
            books.push(_createBook(gBooks[i], '', gImgUrls[i]))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}


function getBooks() {
    return gBooks
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}