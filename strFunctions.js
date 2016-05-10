function format(str) {
    let enums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let hnums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

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
