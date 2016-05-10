const ExtensionUtils = imports.misc.extensionUtils;
const extension = ExtensionUtils.getCurrentExtension();
const convenience = extension.imports.convenience;

const HijriDate = extension.imports.HijriDate;

const world = extension.imports.events.world;

const str = extension.imports.strFunctions;

const Schema = convenience.getSettings(extension, 'hijri-calendar');

function Events() {
    this._init();
}

Events.prototype = {

    _init: function () {
        this._eventsList = [];
        if (Schema.get_boolean("event-world")) {
            this._eventsList.push(new world.world);
        }
    },

    getEvents: function (today) {
        this._events = '';
        this._isHoliday = false;
        this._today = [];

        // if it is friday
        if (today.getDay() == 5) this._isHoliday = true;

        // store gregorian date of today
        this._today[0] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];

        // store hijri date of today
        today = HijriDate.HijriDate.toHijri(this._today[0][0], this._today[0][1], this._today[0][2]);
        this._today[1] = [today.year, today.month, today.day];

        this._eventsList.forEach(this._checkEvent, this);
        return [this._events, this._isHoliday];
    },

    _checkEvent: function (el) {
        let type = 0;

        switch (el.type) {
            case 'gregorian':
                type = 0;
                break;
            case 'hijri':
                type = 1;
                break;
        }

        // if event is available, set event
        // and if it is holiday, set today as holiday!
        if (el.events[this._today[type][1]][this._today[type][2]]) {
            this._events += "\n" + el.events[this._today[type][1]][this._today[type][2]][0];
            this._isHoliday = this._isHoliday || el.events[this._today[type][1]][this._today[type][2]][1];
        }
    }
};
