import Popper from 'popper.js/dist/umd/popper.js'
import queryRoute from 'utils/queryRoute'

/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Array.prototype.merge = function (newArray) {
    for (let i = newArray.length - 1; i > -1; i--) {
        for (let j = 0; j < this.length; j++) {
            if (newArray[i] === this[j]) {
                newArray.splice(i, 1)
            }
        }
    }
    return this.concat(newArray)
}
Array.prototype.removeIfExists = function (array) {
    for (let i = array.length - 1; i > -1; i--) {
        if (this.includes(array[i])) {
            this.splice(i, 1)
        }
    }
    return this
}
Array.prototype.remove = function(from, howmany) {
    this.splice(from, howmany)
}
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
}

window.$ = window.jQuery = require('jquery')
window.Popper = Popper
window.Tether = require('tether')

require('bootstrap')
require('assets/vendor/jquery-ui/jquery-ui.js')

window.dd = function (...logs) {
    /*eslint no-console: ["error", { allow: ["log"] }] */
    console.log('LOG ->', ...logs)
}

window.queryRoute = queryRoute

// JQuery
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body)
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'))
    return $.fn.textWidth.fakeEl.width()
}
