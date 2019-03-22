const cleanStringForDb = function(string) {
    return string.replace(/'/g , "\\");
};

const cleanDbString = function(string) {
    return string.replace(/\\/, "'")
};
