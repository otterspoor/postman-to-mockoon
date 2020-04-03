const Item = require('./item');

module.exports = class Mockoon {
    source = "postman-to-mockoon:v0.0.1";
    data = [];

    addEnvironment = environment=>{
        this.data.push(environment);
    }
};