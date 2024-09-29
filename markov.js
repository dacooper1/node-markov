/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    // loop through words, add each word as a key in chains with the value of an empty  array
    for (let word of this.words) {
      this.chains[word] = [];
    }
    // loop through keys in chain
    for (let key in this.chains) {
      for (let i = 0; i < this.words.length - 1; i++) {
        if (key === this.words[i]) {
          // checks if there is another word after i 
          if ((i+1) < this.words.length){
            // adds followiing word in previous word's array value 
            this.chains[key].push(this.words[i+1])
          } else {
            // if there is no following word, push null 
            this.chains[key].push(null)
          }
        }
      }
    }
  }


  /** return random text from chains */

   makeText(numWords) {
    // TODO
    let keys = Object.keys(this.chains)
    let markovArr = [];
    let randomKeyIdx = Math.floor(Math.random() * keys.length)
    let randomKey = keys[randomKeyIdx] 
    markovArr.push(randomKey)

    for (let i = 0; i < numWords - 1; i++ ) {
        let values = this.chains[randomKey]
        // checks in key has an empty array, if it does, add the key and return string 
        if (values.length === 0) {
          console.log(markovArr.join(" "))
          return;
          // if the key does not have an empty array, it will randomally select a value and add it to the final output
        } else {
          let randomValIdx = Math.floor(Math.random() * values.length)
          let randomVal = values[randomValIdx]
          markovArr.push(randomVal)
          // sets the next value as the random value selected so the chain continues 
          randomKey = randomVal
        }
      }
      console.log(markovArr.join(" "))
    }
    
  }


  module.exports =  MarkovMachine;