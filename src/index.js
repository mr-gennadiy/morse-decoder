const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const MORSE_TABLE_ENCODED = newKeys (MORSE_TABLE);

function newKeys (obj) {
    const ZERO_STRING = '0000000000';
    let newKeyObj = {};
    for (let k in obj) {
        let kStr = '';
        let kArr = [];
        let lengthDifference;
        k.split('').forEach ((elem, ind) => {
            if (elem == '.') {
                kArr[ind] = '10';
            } else kArr[ind] = '11';
        });
        kStr = kArr.join('');
        lengthDifference = 10 - kStr.length;
        if (lengthDifference > 0) {
            kStr = ZERO_STRING.substr(0, lengthDifference) + kStr;
        };
        newKeyObj[kStr] = obj[k];
    };
    return newKeyObj;
};

function decode(expr) {
    let result = '';
    let wordArr = expr.split('**********');
    wordArr.forEach(word => {
        let charArr = [];
        let decWord = '';
        for (let i = 0;  i <= word.length; i += 10) {
            charArr.push (word.substr(i, 10));
        };
        charArr.forEach(char => {
            decWord += MORSE_TABLE_ENCODED[char];
        });
        result += decWord.slice(0, -9) + ' ';
    });
    return result.trim();
};

module.exports = {
    decode
};