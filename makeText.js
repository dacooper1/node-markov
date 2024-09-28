/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process')
const axios = require('axios')
const MarkovMachine = require('./markov')
const argv = process.argv;
const path = argv[2]

async function readData(path, callback) {
    if (path.startsWith('http')) {
        try {
            let res = await axios.get(path)
            callback(res.data)
        } catch (e) {
            console.log(e)
        }
    } else {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) {
                console.log(err)
                process.exit(1)
             } else {
                callback(data)
             }
        })
    }
}

readData(path, (data) => {
    let chains = new MarkovMachine(data); // Create the MarkovMachine with the data
    chains.makeText(10); // Generate 10 words
});

console.log(argv)

// if (path.startsWith("http")) {
//     readFile(path, outputFileName)
// } else {
//     readURL(path, outputFileName)
// }