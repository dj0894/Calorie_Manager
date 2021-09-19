module.exports.formatDate = (date) => {
    let local = date;
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};