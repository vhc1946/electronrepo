//Another utility function, could be moved
function toTitleCase(str) {
    var lcStr = str.toLowerCase();
    return lcStr.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
    });
}

module.exports={
    toTitleCase
}