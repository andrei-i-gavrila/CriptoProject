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