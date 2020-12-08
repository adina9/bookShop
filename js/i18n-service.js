'use strict'

var gLangs = {
    en: 'USD',
    he: 'ILS'
}

var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        es: 'Bienvenido a mi librería',
        he: 'חנות הספרים שלי'
    },
    new: {
        en: 'Create new book',
        es: 'Crear nuevo libro',
        he: 'צור ספר חדש'
    },
    'book-name': {
        en: 'book-name',
        es: 'el nombre del libro',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'book-price',
        es: 'El precio del libro',
        he: 'מחיר הספר'
    },
    'name-place': {
        en: 'Enter a name',
        es: 'Ingresa un nombre',
        he: 'הכנס/י שם'
    },
    'price-place': {
        en: 'Enter a price',
        es: 'Ingrese un precio',
        he: 'הכנס/י מחיר'
    },
    save: {
        en: 'Save',
        es: 'Preservar',
        he: 'שמור'
    },
    done: {
        en: 'Done',
        es: 'terminado',
        he: 'סיים'
    },
    'new-price': {
        en: 'The new price',
        es: 'El nuevo precio',
        he: 'המחיר החדש'
    },
    'price-place-change': {
        en: 'Enter the price',
        es: 'Ingrese el precio',
        he: 'הכנס/י את המחיר'
    },
    'done-change': {
        en: 'Close',
        es: 'Cerrar',
        he: 'סגור'
    },
    id: {
        en: 'id',
        es: 'carné de identidad',
        he: 'מס זיהוי'
    },
    'table-title': {
        en: '🔗 Title',
        es: '🔗 título',
        he: '🔗 שם'
    },
    'table-price': {
        en: '🔗 price',
        es: '🔗 precio',
        he: '🔗 מחיר'
    },
    actions: {
        en: 'Actions',
        es: 'Comportamiento',
        he: 'פעולות'
    },
    rate: {
        en: 'Rate',
        es: 'La tarifa',
        he: 'דירוג'
    },
    read: {
        en: 'Read',
        es: 'Leer',
        he: 'קרא/י'
    },
    update: {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכן/י'
    },
    remove: {
        en: 'Remove',
        es: 'Eliminar',
        he: 'הסר/י'
    },
    'save-rate': {
        en: 'Rate',
        es: 'Actualizar',
        he: 'דרג/י'
    },
    'save-price': {
        en: 'Change',
        es: 'Cambiar',
        he: 'עדכן/י'
    },
    'close-modal': {
        en: 'Close',
        es: 'Cerrar',
        he: 'סגור'
    },
    'next-page': {
        en: 'Next Page',
        es: 'Siguiente página',
        he: 'לעמוד הבא'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;

}

function formatCurrency(num) {
    var sign = gLangs[gCurrLang]
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: sign }).format(num);
}