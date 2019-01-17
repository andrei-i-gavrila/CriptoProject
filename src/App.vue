<template>
  <v-app>
    <v-content>
      <v-container fill-height>
        <v-layout column>
          <v-layout row align-center justify-space-between>

            <v-layout column>
              <v-text-field v-model="p" label="Prime p" :rules="[validatePrime]"></v-text-field>
              <v-btn @click="generateRandomPrime">Generate random</v-btn>
            </v-layout>

            <v-spacer></v-spacer>

            <v-layout column>
              <v-select :disabled="disableGenerators" label="Generator g" :items="generators" v-model="g"></v-select>
              <v-btn :disabled="disableGenerators || !generators" @click="generateRandomGenerator">Select random</v-btn>
            </v-layout>

            <v-spacer></v-spacer>

            <v-layout column>
              <v-text-field :disabled="disablePrivateKey" label="Private key a" v-model="a" :rules="[validatePrivateKey]"></v-text-field>
              <v-btn :disabled="disablePrivateKey" @click="generateRandomA">Generate random</v-btn>
            </v-layout>

            <v-spacer></v-spacer>

            <v-layout column>
              <v-text-field :disabled="disablePrivateKey" v-model='k' label="Private key k" :rules="[validatePrivateKey]"></v-text-field>
              <v-btn :disabled="disablePrivateKey" @click="generateRandomK">Generate random</v-btn>
            </v-layout>
          </v-layout>

          <v-layout row align-center justify-space-between>
            <v-spacer></v-spacer>
            <v-layout column>
              <v-text-field label="Public key" readonly :value="publicKey"></v-text-field>
              <v-btn @click="allRandom">All random</v-btn>

            </v-layout>
            <v-spacer></v-spacer>

          </v-layout>

          <v-layout row align-center justify-space-between>
            <v-layout column justify-center>
              <v-textarea :disabled="!canEncrypt" placeholder="plain text" class="plainText" clearable v-model="plainText" @keyup="encryptText" :rules="[validText]"></v-textarea>
              <v-btn :disabled="!canEncrypt" color="primary" @click="encryptText">Encrypt</v-btn>
            </v-layout>
            <v-spacer />
            <v-layout column justify-center>
              <v-textarea :disabled="!canDecrypt" placeholder="cipher text" class="cipherText" clearable v-model="cipherText" @keyup="decryptText" :rules="[validText]"></v-textarea>
              <v-btn :disabled="!canDecrypt" color="primary" @click="decryptText">Decrypt</v-btn>
            </v-layout>
          </v-layout>
        </v-layout>

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import elgamal from "./ElGamal"
  import AppDescription from "./AppDescription"

  export default {
    name: 'App',
    components: {AppDescription},
    mounted() {
      elgamal.populatePrimeNumbers()
    },
    data() {
      return {
        p: '',
        g: '',
        ga: '',
        a: '',
        k: '',
        generators: [],

        plainText: '',
        cipherText: '',
      }
    },
    methods: {
      generateRandomPrime() {
        this.p = elgamal.getRandomPrime()
      },
      validatePrime() {
        if (!this.validPrime) {
          this.g = ''
          this.generators = []
          this.ga = ''
          this.a = ''
          this.k = ''
          return "Must be a prime number"
        }
        if (this.p !== '') {
          setTimeout(() => {
            elgamal.getRoots(this.p).then((roots) => this.generators = roots)
          }, 0)
        }
        return true
      },
      generateRandomGenerator() {
        this.g = elgamal.generateRandomGenerator(this.generators)
        this.ga = elgamal.fastPow(this.g, this.a, this.p)
      },
      generateRandomA() {
        this.a = elgamal.generateRandomPrivateKey(this.p)
        this.ga = elgamal.fastPow(this.g, this.a, this.p)
      },
      generateRandomK() {
        this.k = elgamal.generateRandomPrivateKey(this.p)
      },
      validatePrivateKey(v) {
        if (!elgamal.isValidPrivateKey(this.p, v)) {
          return "Invalid private key"
        }
        return true;
      },
      encryptText() {
        this.cipherText = elgamal.isValidText(this.plainText) ? elgamal.encrypt(this.plainText, this.p, this.g, this.ga, this.k) : ''

      },
      decryptText() {
        this.plainText = elgamal.isValidText(this.cipherText) ? elgamal.decrypt(this.cipherText, this.p, this.g, this.ga, this.a) : ''
      },
      validText(text) {
        if (text && !elgamal.isValidText(text)) {
          return "Only letters and spaces please"
        }
        return true
      },
      async allRandom() {
        this.generateRandomPrime()
        this.generators = await elgamal.getRoots(this.p)
        this.generateRandomGenerator()
        this.generateRandomA()
        this.generateRandomK()
      }
    },
    computed: {
      publicKey() {
        if (this.p === '' || this.g === '' || this.a === '') {
          return "Not yet calculable"
        }
        return `(${this.p}, ${this.g}, ${this.ga})`
      },
      validPrime() {
        return this.p === null || this.p === '' || elgamal.isPrime(this.p)
      },
      disableGenerators() {
        return this.p === '' || !this.validPrime
      },
      disablePrivateKey() {
        return this.p === '' || !this.validPrime
      },
      canEncrypt() {
        return this.p !== '' && this.g !== '' && this.ga !== '' && this.k !== ''
      },
      canDecrypt() {
        return this.p !== '' && this.g !== '' && this.ga !== '' && this.a !== ''
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