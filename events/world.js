function world() {
    this._init();
}

world.prototype = {
    name: '',
    type: 'gregorian',
    /* [month][day] = [title, isHoliday] */
    events: [[], [], [], [], [], [], [], [], [], [], [], [], []],

    _init: function () {
    }
};
