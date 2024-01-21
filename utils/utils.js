function capitalizeEachWord(str) {
    return str.split(' ')
        .map(word => word.split('-')
            .map(subWord => subWord.split('(')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                .join('('))
            .join('-'))
        .join(' ');
}

module.exports = capitalizeEachWord;