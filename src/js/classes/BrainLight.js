// use the brainjs lib
//https://cdnjs.cloudflare.com/ajax/libs/brain/0.6.3/brain.js
//<script src="https://unpkg.com/brain.js@1.0.0-rc.3/browser.js"></script>
//https://scrimba.com/playlist/pX7ZHD
// dica: https://cdn.sisense.com/wp-content/uploads/Machine-Learning-with-Javascript.pdf

function BrainLight() {
}

//let hiddenLayers = {hiddenLayers: [2,2]};
let composition = {
    activation: 'sigmoid', // activation function
    hiddenLayers: [2,2],
    iterations: 20000,
    learningRate: 0.5 // global learning rate, useful when training using streams
};

const network = new brain.NeuralNetwork(composition);

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


