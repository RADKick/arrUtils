// JavaScript Array Utility Functions for everyday use, please copy all or selective functions
// Author: Ritesh Pahwa
// Please refer to links for other authors and contributors

//https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating
// push all elements from other array
if (!Array.prototype.pushAll) {
    Array.prototype.pushAll = function (other_array) {
        if (other_array && other_array.length && Array.isArray(other_array)) {
            other_array.forEach(function (v) { this.push(v) }, this);
        }
        return this;
    };
}

// clears the array
if (!Array.prototype.clear) {
    Array.prototype.clear = function () {
        //# https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        //this.length = 0;
        this.splice(0, this.length);
        return this;
    };
}
// cleans the array, removes the empty string elements
if (!Array.prototype.clean) {
    Array.prototype.clean = function () {
        return this.filter(function (entry) { return entry && entry.trim() !== ''; });
    };
}
// trims the string elements
if (!Array.prototype.trim) {
    Array.prototype.trim = function () {
        return this.map(function (entry) { return entry.trim(); });
    };
}
// removes the duplicate elements, one or more
if (!Array.prototype.removeDups) {
    Array.prototype.removeDups = function () {
        var uniq = [], dupIdx = [], arr = this;
        arr.forEach(function (el, idx) {
            if (uniq.indexOf(el) === -1) {
                uniq.push(el);
            } else {
                dupIdx.unshift(idx);
            }
        });
        dupIdx.forEach(function (idx) { arr.splice(idx, 1); });
        return arr;
    };
}
// check if not exists from other array and returns the not found elements in array
if (!Array.prototype.notExists) {
    Array.prototype.notExists = function (arrChk) {
        var arr = this, arrRet = [];
        arrChk = arrChk || [];
        arrChk.forEach(function (chk) {
            var found = false;
            arr.some(function (match) {
                found = chk === match;
                return found;
            });
            if (!found) { arrRet.push(chk); }
        });
        return arrRet;
    };
}
// check if exists from other array and returns the found elements in array
if (!Array.prototype.exists) {
    Array.prototype.exists = function (arrChk) {
        var arr = this, arrRet = [];
        arrChk = arrChk || [];
        arrChk.forEach(function (chk) {
            var found = false;
            arr.some(function (match) {
                found = chk === match;
                return found;
            });
            if (found) { arrRet.push(chk); }
        });
        return arrRet;
    };
}
// remove an element from array if found
if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
        var idx = this.indexOf(item);
        if (idx > -1) { this.splice(idx, 1); }
        return this;
    };
}
// removes all matching elements from this array after comparing with a passed array
if (!Array.prototype.removeAll) {
    Array.prototype.removeAll = function (items) {
        items = items || [];
        if (items.length) {
            var arr = this;
            items.forEach(function (item) { arr.remove(item); });
        }
        return this;
    };
}
// clones the array using JSON parse and stringify
if (!Array.prototype.clone) {
    Array.prototype.clone = function () {
        var cloned = JSON.parse(JSON.stringify(this));
        return cloned;
    };
}
// syncs the array using diff 
if (!Array.prototype.sync) {
    Array.prototype.sync = function (from, comparator) {
        var diff = this.diff(from, comparator);
        this.removeAll(diff.remove);
        this.pushAll(diff.add.clone());

        return this;
    };
}
// returns the diff of two arrays in object {add:[] and remove:[]}
if (!Array.prototype.diff) {
    Array.prototype.diff = function (from, comparator) {
        var removed = [], added = [], _this = this;
        from = from || [];
        from.forEach(function (f) {
            var found = _this.some(function (t) {
                if (comparator(t, f)) return true;
            });
            !found && added.push(f);
        });
        _this.forEach(function (t) {
            var found = from.some(function (f) {
                if (comparator(t, f)) return true;
            });
            !found && removed.push(t);
        });
        return { add: added, remove: removed };
    };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
// checks if includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function (searchElement, fromIndex) {

            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1. 
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}
