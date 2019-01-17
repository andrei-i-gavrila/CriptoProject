# El Gamal documentation
ElGamal encryption system is an asymmetric key encryption algorithm for public-key cryptography which is based on the Diffie–Hellman key exchange. The system provides an additional layer of security by asymmetrically encrypting keys previously used for symmetric message encryption.

### How to use?
1. When the page is first loaded, you will see a screen having multiple texts and buttons that are disabled.
2. To acctualy make the app work, you need to give a public key which is formed by a generator g, a private key a, and a private key k.
3. You can manually add them, one by one, or push the center button *ALL RANDOM*, which will generate random values for p,g,a,and k.
4. After having the public and private numbers, you will be able to enter text for decryption or encryption.
5. The text will be automatically computed and updated the moment you .
6. You can encrypt and decrypt a text using the same key. Changing the key will result into having an undefined result.

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

## Algorithm
* **Key Generation - create a public key and a private key**
1. Generate a large random prime *p* and a generator *g*
2. Select a random integer *a* 0 < k < p-1
3. Compute (g^a) mod p
4. The public key is (p,g,g^a mod p) and the private key is a
          
* **Encryption**
1. Get the public key (p,g,g^a mod p)
2. Represent the message (text) as a sequence of numbers m between 0 and p-1
3. Select a random *k* 0 < k < p-1
4. Compute alpha and beta: alpha = g^k mod p, beta = m*(m^a)^k mod p
5. Cipher test is the transformation of alpha into letters and beta into letters (each having an encryption length)
* **Decryption** 
1. Use the private key *a* to get the sequence of messages m such as: m = (alpha^(p-1-a)) * beta mod p
