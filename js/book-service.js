'use strict'
const KEY = 'books';
const PAGE_SIZE = 3;
var gSortBy = 'name'

var gBooks;
var gNames = ['Learning Laravel', 'Beginning with Laravel', 'Java for developers'];
var gPrices = [18.90, 6.65, 7.20];
var gPageIdx = 0;

_createBooks();

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

//LIST
function getBooks() {
    gBooks.sort(function(book1, book2) {
        if (book1[gSortBy] > book2[gSortBy]) return 1
        if (book1[gSortBy] < book2[gSortBy]) return -1
        return 0
    })
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}

function setSorting(sortBy) {
    gSortBy = sortBy;
}

//DELETE
function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

//READ
function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id
    })
    return book;
}

//CREATE
function addBook(name, price) {
    if (isNaN(price) || !isNaN(name)) {
        return
        // _errorInput();
    } else {
        var book = _createBook(name, price);
        gBooks.unshift(book)
    }
    _saveBooksToStorage();
}

//UPDATE
function updateBook(bookId, bookPrice) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    console.log(book);
    console.log('book.price', book.price);
    book.price = bookPrice;
    _saveBooksToStorage();
}

function updateRate(bookId, bookRate) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    book.rate = bookRate;
    _saveBooksToStorage();
}

function openUpdate() {
    document.querySelector('.update').hidden = false;
}

function openInput() {
    document.querySelector('.inputs').hidden = false;
    hideSuggest();
}

function hideSuggest() {
    var elAdding = document.querySelector('.adding');
    elAdding.innerText = ' ';
}

function showSuggest() {
    var elAdding = document.querySelector('.adding');
    elAdding.innerText = 'Create new book';
}

function getImg() {
    var random = getRandomIntInclusive(1, 8);
    return '/img/' + random + '.jpg';
}


function _createBook(theName, thePrice) {

    return {
        id: getId(),
        name: theName,
        price: thePrice,
        actions: false,
        desc: makeLorem(),
        rate: getRandomIntInclusive(0, 10),
        imgURL: getImg()
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 3; i++) {
            var theName = gNames[getRandomIntInclusive(0, gNames.length - 1)]
            var thePrice = gPrices[getRandomIntInclusive(0, gPrices.length - 1)]
            books.push(_createBook(theName, thePrice));
        }
        gBooks = books;
        _saveBooksToStorage();
    }
    gBooks = books;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


// function _errorInput() {
//     var bookPrice = document.querySelector('input[name=price]');
//     console.log(bookPrice.value);
//     bookPrice.value = 'ERROR INPUT';
// }