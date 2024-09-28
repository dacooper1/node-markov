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
    // TODO
    this.chains = {};
    for (let word of this.words) {
      this.chains[word] = [];
    }
    for (let key in this.chains) {
      for (let i = 0; i < this.words.length - 1; i++) {
        if (key === this.words[i]) {
          if ((i+1) < this.words.length){
            this.chains[key].push(this.words[i+1])
          } else {
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
        if (values.length === 0) {
          console.log(markovArr.join(" "))
          return;
        } else {
          let randomValIdx = Math.floor(Math.random() * values.length)
          let randomVal = values[randomValIdx]
          markovArr.push(randomVal)
          randomKey = randomVal
        }
      }
      console.log(markovArr.join(" "))
    }
    
  }


  module.exports =  MarkovMachine;