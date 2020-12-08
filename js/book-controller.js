'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(function(book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${formatCurrency(book.price)}</td>
        <td><button class="read-btn" onclick="onReadBook('${book.id}')" data-trans="read">${getTrans('read')}</button></td>
        <td><button class="update-btn" onclick="onUpdateBook('${book.id}')" data-trans="update">${getTrans('update')}</button></td>
        <td><button class="remove-btn" onclick="onRemoveBook('${book.id}')" data-trans="remove">${getTrans('remove')}</button></td>
        <td>${book.rate}</td> 
        </tr>`
    })
    document.querySelector('tbody').innerHTML = strHTML.join(' ');
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.book-details');
    elModal.querySelector('h5').innerText = book.name;
    elModal.querySelector('h6').innerText = 'price: ' + book.price;
    elModal.querySelector('img').src = book.imgURL;
    elModal.querySelector('.rate span').innerText = book.rate;
    var elRate = document.querySelector('.save-rate');
    elRate.innerHTML = `<div><button onclick="onSaveRate('${book.id}')" data-trans="save-rate"</button>Rate</div>`
    elModal.querySelector('p').innerText = book.desc;
    elModal.hidden = false;
}

function onLess() {
    var num = document.querySelector('.rate span');
    console.log(num.innerText);
    if (num.innerText <= 0) return
    else num.innerText--;
}

function onMore() {
    var num = document.querySelector('.rate span');
    if (num.innerText >= 10) return
    else num.innerText++;
}

function onSaveRate(bookId) {
    var rate = +document.querySelector('.rate span').innerText;
    console.log('bookId', bookId);
    updateRate(bookId, rate);
    renderBooks();
}

function onCloseInputs() {
    document.querySelector('.inputs').hidden = true;
    showSuggest();
}

function onCloseModal() {
    document.querySelector('.book-details').hidden = true;
}

function onUpdateBook(bookId) {
    var book = getBookById(bookId);
    openUpdate();
    var elPrice = document.querySelector('.save-price');
    elPrice.innerHTML = `<div><button onclick="onSavePrice('${book.id}')" data-trans="save-price"</button>Change</div>`

}

function onSavePrice(bookId) {
    var newPrice = document.querySelector('input[name=newPrice]');
    console.log(newPrice.innerText);
    if (!newPrice) return
    updateBook(bookId, newPrice.value);
    newPrice.value = '';
    renderBooks();
}

function onCloseUpdate() {
    document.querySelector('.update').hidden = true;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    openInput();
    var bookName = document.querySelector('input[name=name]');
    var bookPrice = document.querySelector('input[name=price]');
    if (!bookName.value || !bookPrice.value) return
    addBook(bookName.value, bookPrice.value);
    bookName.value = '';
    bookPrice.value = '';
    renderBooks();
}

function onSetSorting(sortBy) {
    setSorting(sortBy);
    renderBooks();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    renderBooks();
}