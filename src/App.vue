<template>
  <v-app>
    <v-content>
      <v-container>
        <app-description />
        <v-snackbar v-model="showError" top color="error" :timeout="6000">
          {{ errorMessage }}
          <v-btn dark flat @click="showError = false">Close</v-btn>
        </v-snackbar>
        <v-layout row fill-height align-center justify-space-between>
          <v-layout column justify-center>
            <v-textarea class="plainText" :clearable="true" v-model="text" @keyup="encryptText"></v-textarea>
            <v-btn color="primary" @click="encryptText">Encrypt</v-btn>
          </v-layout>
          <v-layout column justify-begin align-center>
            <v-text-field placeholder="a, b" label="Encryption key" prefix="(" suffix=")" v-model="formattedEncryptionKey" @change="calculateDecryptionKey"></v-text-field>
            <v-text-field placeholder="a, b" label="Decryption key" prefix="(" suffix=")" v-model="formattedDecryptionKey" @change="calculateEncryptionKey"></v-text-field>
          </v-layout>
          <v-layout column justify-center>
            <v-textarea class="cipherText" :clearable="true" v-model="cipherText" @keyup="decryptText"></v-textarea>
            <v-btn color="primary" @click="decryptText">Decrypt</v-btn>
          </v-layout>
        </v-layout>
        <v-layout></v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import cipher from "./affineCipher"
  import AppDescription from "./AppDescription"

  const keyRE = /^\s*(\d+),\s*(\d+)\s*$/
  export default {
    name: 'App',
    components: {AppDescription},
    data() {
      return {
        encryptionKey: {a: 7, b: 5},
        decryptionKey: {a: 4, b: 7},
        text: "",
        cipherText: "",
        formattedDecryptionKey: "7,5",
        formattedEncryptionKey: "4,7",
        showError: false,
        errorMessage: "",
      }
    },
    methods: {
      hideError() {
        this.showError = false
        this.errorMessage = ""
      },
      error(message) {
        this.errorMessage = message
        this.showError = true
      },
      encryptText() {
        this.hideError()
        this.text = this.text.toLowerCase()
        let cipherText = cipher.encrypt(this.text, this.encryptionKey)
        if (cipherText === undefined) {
          return this.error('Some characters cannot be encrypted. Make sure you are using the lowercase english alphabet or spaces.')
        }
        this.cipherText = cipherText
      },
      decryptText() {
        this.hideError()
        this.cipherText = this.cipherText.toLowerCase()
        let text = cipher.encrypt(this.cipherText, this.decryptionKey)
        if (text === undefined) {
          return this.error('Some characters cannot be decrypted. Make sure you are using the uppercase english alphabet or spaces.')
        }
        this.text = text
      },
      calculateDecryptionKey() {
        this.hideError()
        let match = this.formattedEncryptionKey.match(keyRE)
        if (!match) {
          return this.error('Invalid format. Please use a,b')
        }
        this.encryptionKey = {a: parseInt(match[1]), b: parseInt(match[2])}
        let decryptionKey = cipher.getDecryptionKey(this.encryptionKey)
        if (!decryptionKey) {
          return this.error(`${match[1]} has a common divisor with 27(the length of the alphabet used). Please try a different value for 'a'!`)
        }
        this.decryptionKey = decryptionKey
        this.formattedDecryptionKey = this.decryptionKey.a + "," + this.decryptionKey.b
        this.encryptText()
      },
      calculateEncryptionKey() {
        this.hideError()
        let match = this.formattedDecryptionKey.match(keyRE)
        if (!match) {
          return this.error('Invalid format. Please use a,b')
        }
        this.decryptionKey = {a: parseInt(match[1]), b: parseInt(match[2])}
        let encryptionKey = cipher.getDecryptionKey(this.decryptionKey)
        if (!encryptionKey) {
          return this.error(`${match[1]} has a common divisor with 27(the length of the alphabet used). Please try a different value for 'a'!`)
        }
        this.encryptionKey = encryptionKey
        this.formattedEncryptionKey = this.encryptionKey.a + "," + this.encryptionKey.b
        this.decryptText()
      },
    },

  }
</script>

<style>
  .plainText textarea {
    text-transform: lowercase;
  }

  .cipherText textarea {
    text-transform: uppercase;
  }
</style>