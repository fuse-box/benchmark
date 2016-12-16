const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

let root = `${__dirname}/cases/`;
mkdirp.sync(root);
const createFirstCase = (iterations) => {

    let dir = `${root}/test_${new Date().getTime()}`;
    mkdirp.sync(dir);
    iterations = iterations || 100;

    for (let i = 0; i < iterations; i++) {
        let contents = "";
        let name = `${dir}/file_${i}.js`;
        if (i !== iterations - 1) {
            contents = `require("./file_${i+1}.js")`
        }
        fs.writeFileSync(name, contents)
    }
    return path.normalize(dir);
}
const createSecondCase = (iterations) => {

    let dir = `${root}/test_${new Date().getTime()}`;
    mkdirp.sync(dir);
    iterations = iterations || 100;

    for (let i = 0; i < iterations; i++) {
        let contents = "";
        let name = `${dir}/file_${i}.js`;
        if (i !== iterations - 1) {
            contents = `require("./file_${i+1}.js"); require("lodash");`
        }
        fs.writeFileSync(name, contents)
    }
    return path.normalize(dir);
}

module.exports = {
    createFirstCase: createFirstCase,
    createSecondCase: createSecondCase
}