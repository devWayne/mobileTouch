function Pinch(el, fn) {
    this.el = el;
    this.parent = el.parentNode;
    this.fn = fn || function() {};
    this.scale = 1;
    this.lastScale = 1;
    this.pinching = false;
    var self = this;
    el.addEventListener('touchstart', function(e) {
        var touches = e.touches;
        if (!touches || 2 != touches.length) return this;
        e.preventDefault();

        var coords = [];
        for (var i = 0, touch; touch = touches[i]; i++) {
            coords.push(touch.pageX, touch.pageY);
        }
        self.pinching = true;
        self.distance = _distance(coords);
        self.midpoint = _midpoint(coords);
        return this;
    })

    el.addEventListener('touchmove', function(e) {
        var touches = e.touches;
        if (!touches || touches.length != 2 || !self.pinching) return this;
        var coords = [];
        for (var i = 0, touch; touch = touches[i]; i++) {
            coords.push(touch.pageX, touch.pageY);
        }
        var dist = _distance(coords);
        var mid = _midpoint(coords);
        //alert(dist / self.distance + self.scale);
        e.scale = dist / self.distance * self.scale;
        e.x = mid.x;
        e.y = mid.y;
        self.fn(e);
        return this;
    })
}

//module.exports = Pinch;

/**
 * Get the distance between two points
 *
 * @param {Array} arr
 * @return {Number}
 * @api private
 */

function _distance(arr) {
    var x = Math.pow(arr[0] - arr[2], 2);
    var y = Math.pow(arr[1] - arr[3], 2);
    return Math.sqrt(x + y);
}

/**
 * Get the midpoint
 *
 * @param {Array} arr
 * @return {Object} coords
 * @api private
 */

function _midpoint(arr) {
    var coords = {};
    coords.x = (arr[0] + arr[2]) / 2;
    coords.y = (arr[1] + arr[3]) / 2;
    return coords;
}
