# Affine cipher documentation

The affine cipher related functions are implemented in the affineCipher.js file.

The getDecryptionKey takes an object containing a and b.
It will use the extended euclid algorithm implemented in math.js(external library) to calculate a^-1 (mod n) and check if gcd(a, n) == 1
Then it returns back the decryption key.

The encrypt function takes the plaintext and the a,b pair.
First it handles the empty string case separately and returns an error if any character is not in the alphabet.
Finally it applies the cipher and returns the ciphertext.
The return will still be lowercase and the representation in UPPERCASE is made strictly at display time.
You can also use this function to decrypt the cipher text by passing in the decryption key instead of the encryption key.

The app itself consists of 2 textareas(plain text, ciphertext), 2 text inputs(encryption key, decryption key) and 2 buttons (encrypt, decrypt)
The encryption key will be initially set to (4,7). Whenever you update the input, it validates the key and calculates the decryption key.
When you update the decryption key, the encryption key will be automatically updated.

When you enter text in the left text area(plaintext) the right text area(ciphertext) will be automatically computed with the given encryption key.
It updates live and if you enter a wrong character, an error will pop up.
The reverse happens for the cipher text area.

The encrypt and decrypt buttons are there just in case you feel the need to press something, to make sure the result is correct.
The text should always be updated no matter what way you choose to input the text (paste it in, enter it manually)

### Functions used:
* **Utils** 
1. *isPrime(x)* - returns whether or not a number x is prime
2. *populatePrimeNumbers()* - populates a list of prime numbers in the range 27 at the encrypted length power (how many characters should one character be encryped in)
3. *getRandomPrime()* - gets a random number from the list of primes
4. *isPrimitiveRoot(g,p)* - returns whether or not p is a root of g
5. *fastPow(base,exp,mod)* - gets the number resulted from raising base at the exp modulo mod
6. *getRoots(p)* - puts all primitive roots of number p in a list of roots
7. *isValidText(text)* - parses the text and checks whether or not there are only letters and spaces
8. *encryptedToLetters(number)* - given a number, take the letters from the alphabet coresponding to the number modulo n position, until the number is <= 0 
9. *lettersToEncrypted(letters)* - given some letters, return the number  resulted from raising each letter possition in the string at the pover 27 * index of letter (indexes are taken from right to left)
10. *isValidPrivateKey(p,k)* - returns whether or not k is in the range 1 <=k <= p-2
11. *generateRandomGenerator(generators)* -  gets a random generator 
          
* **El Gamal** 
1. *encrypt(text,p,g,ga,k)* - encrypts a given text having access to the public key (p,g,ga mod p). Computes alpha and beta for each letter and  the cipher text will be the result of alpha number tranformed into letters, and beta number transformed into letters
2. *decrypt(text,p,g,ga,a)* - decrypts a given text gaving acces to the public key (p,g,ga mod p). Gets the text and splits is so that it takes alpha and beta that are encrypted into 2 caracters each. After having alpha and beta it can preceed with the final computation => gets plain text.
