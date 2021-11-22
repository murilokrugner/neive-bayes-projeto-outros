//Author: Murilo A Krugner A Leite && Luis Coradi
var bayes = require('bayes')

var classifier = bayes()

async function traine() {

    // No corpo
    await classifier.learn('chuva', 'positive')
    await classifier.learn('chuva', 'positive')

    await classifier.learn('sol', 'positive')
    await classifier.learn('sol', 'positive')
    await classifier.learn('sol', 'positive')

    await classifier.learn('nublado', 'positive')
    await classifier.learn('nublado', 'positive')
    await classifier.learn('nublado', 'positive')
    await classifier.learn('nublado', 'positive')
    
    //negative
    await classifier.learn('sol', 'negative')
    await classifier.learn('sol', 'negative')

    await classifier.learn('chuva', 'negative')
    await classifier.learn('chuva', 'negative')
    await classifier.learn('chuva', 'negative')

    execute();
}

async function execute() {
    // now ask it to categorize a document it has never seen before
    const result = await classifier.categorize('sol');
    
    // serialize the classifier's state as a JSON string.
    var stateJson = classifier.toJson()
    
    // load the classifier back from its JSON representation.
    var revivedClassifier = bayes.fromJson(stateJson);

    const negative = ((revivedClassifier.wordFrequencyCount.negative.chuva + revivedClassifier.wordFrequencyCount.negative.sol) / 14).toFixed(4); //nublado = 0
    const positive = ((revivedClassifier.wordFrequencyCount.positive.chuva + revivedClassifier.wordFrequencyCount.positive.sol + revivedClassifier.wordFrequencyCount.positive.nublado) / 14).toFixed(4); 
    
    console.log('total negative: ' + negative)
    console.log('total positive: ' + positive)
    console.log('resultado: ' + result);
}

traine();
