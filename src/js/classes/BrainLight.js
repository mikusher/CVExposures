// use the brainjs lib
//https://cdnjs.cloudflare.com/ajax/libs/brain/0.6.3/brain.js

function BrainLight() {
}

const network = new brain.NeuralNetwork();

network.train([{
    input: [1, 2],
    output: [1]
}, {
    input: [1, 3],
    output: [1]
}, {
    input: [2, 3],
    output: [0]
}, {
    input: [2, 4],
    output: [1]
}, {
    input: [1, 2],
    output: [0]
}, {
    input: [1, 3],
    output: [0]
}, {
    input: [3, 4],
    output: [0]
}]);

BrainLight.output = function (values) {
    return network.run(values);
};


