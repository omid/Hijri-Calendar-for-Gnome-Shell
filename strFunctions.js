const ExtensionUtils = imports.misc.extensionUtils;
const extension = ExtensionUtils.getCurrentExtension();
const convenience = extension.imports.convenience;

const Schema = convenience.getSettings(extension, 'hijri-calendar');

function format(str) {
    let enums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let hnums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    if (Schema.get_boolean('arab-numerals')) {
        return `${str}`
    }

    return replace(enums, hnums, str);
}

function replace (search, replace, subject) {
    let length = search.length;
    subject = subject.toString();

    for (let i=0; i<length; i++) {
        subject = subject.split(search[i]).join(replace[i]);
    }

    return subject;
}
