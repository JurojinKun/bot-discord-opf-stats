function capitalizeEachWord(str) {
    return str.split(' ')
        .map(word => word.split('-')
            .map(subWord => subWord.charAt(0).toUpperCase() + subWord.slice(1).toLowerCase())
            .join('-'))
        .join(' ');
}

module.exports = capitalizeEachWord;