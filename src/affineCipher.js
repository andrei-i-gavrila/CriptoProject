const math = require("mathjs")
const ALPHABET = " abcdefghijklmnopqrstuvwxyz"

export default {
  getDecryptionKey: ({a, b}) => {
    let xgcd = math.xgcd(a, ALPHABET.length)
    if (xgcd.get([0]) !== 1) {
      return
    }
    let invMod = math.mod(xgcd.get([1]), ALPHABET.length)
    return {a: invMod, b: math.mod(-invMod * b, ALPHABET.length)}
  },
  encrypt: (text, {a, b}) => {
    if (text === '') {
      return ''
    }
    if (text.split("").some(char => char !== ' ' && (char < 'a' || char > 'z'))) {
      return
    }

    return text.split("").map(char => ALPHABET.indexOf(char)).map(ascii => math.mod(ascii * a + b, ALPHABET.length)).map(ascii => ALPHABET.charAt(ascii)).join("")
  },
}