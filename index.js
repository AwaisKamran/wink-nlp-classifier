var Classifier = require( 'wink-naive-bayes-text-classifier' );
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const port = 3000;

const results = [];

var nbc = Classifier();
const winkNLP = require( 'wink-nlp' );
const model = require( 'wink-eng-lite-web-model' );
const nlp = winkNLP( model );
const its = nlp.its;

const prepTask = function ( text ) {
    const tokens = [];
    nlp.readDoc(text)
        .tokens()
        .filter((t) => (t.out(its.type) === 'word' && !t.out(its.stopWordFlag)))
        .each((t) => tokens.push( (t.out(its.negationFlag)) ? '!' + t.out(its.stem) : t.out(its.stem)));
  
    return tokens;
};
nbc.definePrepTasks([ prepTask ]);
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 } );

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/result', (req, res) => {
    console.log(nbc.predict('Site Staking Survey'));
    res.send('Done!');
});

app.get('/train', (req, res) => {
    fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log("Training ...")
        results.forEach((result) => {
            nbc.learn( result["Item"], result["Division"] );
        });
        nbc.consolidate();
        console.log("Training Complete")
    });
    res.send('Training!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
