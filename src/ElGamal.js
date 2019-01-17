const math = require("mathjs")
const ALPHABET = " abcdefghijklmnopqrstuvwxyz"

export default {
  ENCRYPTED_LENGTH: 2,
  primeNumbers: [],

  isPrime(x) {
    return math.isPrime(x)
  },

  populatePrimeNumbers() {
    const maxPrime = math.pow(ALPHABET.length, this.ENCRYPTED_LENGTH) - 1;
    for (let x = 29; x <= maxPrime; x += 2) {
      if (this.isPrime(x)) {
        this.primeNumbers.push(x)
      }
    }
  },

  getRandomPrime() {
    return this.primeNumbers[math.floor(math.random(this.primeNumbers.length))]
  },

  isPrimitiveRoot(g, p) {
    let o = 1
    let k = g % p;
    while (k > 1) {
      o++;
      k = (k * g) % p;
    }
    return o === (p - 1);
  },

  fastPow(base, exp, mod) {
    if (exp === 0) return 1;
    if (exp % 2 === 0) {
      return math.pow(this.fastPow(base, exp / 2, mod), 2) % mod;
    }
    return (base * this.fastPow(base, exp - 1, mod)) % mod;
  },

  async getRoots(p) {
    const roots = [];

    for (let r = 2; r < p; r += 1) {
      if (this.isPrimitiveRoot(r, p)) {
        roots.push(r);
      }
    }

    return roots;
  },

  isValidText(text) {
    const letterSet = new Set(ALPHABET.split(''))
    for (let letter of text.toLowerCase()) {
      if (!letterSet.has(letter)) {
        return false;
      }
    }
    return true;
  },

  encryptedToLetters(number) {
    let letters = ""
    for (let i = 0; i < this.ENCRYPTED_LENGTH; i++) {
      letters = ALPHABET[number % ALPHABET.length] + letters
      number = Math.floor(number / 27)
    }
    return letters
  },

  lettersToEncrypted(letters) {
    let pow = 1
    let value = 0;
    for (let letter of letters.toLowerCase().split('').reverse().join('')) {
      value += ALPHABET.indexOf(letter) * pow
      pow *= ALPHABET.length
    }
    return value
  },

  encrypt(text, p, g, ga, k) {
    let encryptedText = ""
    for (let letter of text.toLowerCase()) {
      let alpha = this.fastPow(g, k, p)
      let beta = math.mod(this.fastPow(ga, k, p) * ALPHABET.indexOf(letter), p)
      encryptedText += this.encryptedToLetters(alpha) + this.encryptedToLetters(beta)
    }
    return encryptedText
  },

  decrypt(text, p, g, ga, a) {
    while (text.length % (2 * this.ENCRYPTED_LENGTH) !== 0) {
      text += " "
    }

    let decrypted = ""
    for (let i = 0; i < text.length; i += 2 * this.ENCRYPTED_LENGTH) {
      let alpha = this.lettersToEncrypted(text.slice(i, i + this.ENCRYPTED_LENGTH))
      let beta = this.lettersToEncrypted(text.slice(i + this.ENCRYPTED_LENGTH, i + 2 * this.ENCRYPTED_LENGTH))

      let m = math.mod(beta * this.fastPow(alpha, p - 1 - a, p), p)
      decrypted += ALPHABET[m]
    }
    return decrypted
  },

  generateRandomPrivateKey: (p) => {
    return math.floor(math.random(1, p - 1))
  },

  isValidPrivateKey: (p, k) => {
    return k > 0 && k < p - 1;
  },

  generateRandomGenerator(generators) {
    return generators[math.floor(math.random(generators.length))]
  },


}