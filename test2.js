const fsbx = require("fuse-box");
const helpers = require("./helpers");
const webpack = require("webpack");
let interations = 1000;
let homeDir = helpers.createSecondCase(interations);
const fsx = new fsbx.FuseBox();
const utils = require("realm-utils");
const each = utils.each;

let runFuseBox = () => {
    return new Promise((resolve, reject) => {
        let start = new Date().getTime();
        let fuseBox = new fsbx.FuseBox({
            homeDir: homeDir,
            outFile: __dirname + "/out.js",
            log: false
        });
        fuseBox.bundle(">file_0.js").then(out => {
            return resolve(new Date().getTime() - start)

        });
    });
}
let runWebPack = () => {
    let start = new Date().getTime();
    return new Promise((resolve, reject) => {
        webpack({
            entry: `${homeDir}/file_0.js`,
            output: { path: __dirname, filename: 'bundle.js' },

        }, function(err, stats) {
            return resolve(new Date().getTime() - start)
        });
    });
}

let times = []
for (let i = 0; i < 10; i++) {
    times.push(i)
}

const runFuseBox10Times = () => {
    let start = new Date().getTime();
    return each(times, () => runFuseBox())
        .then(() => {
            return new Date().getTime() - start;
        });
}

const runWebPack10Times = () => {
    let start = new Date().getTime();
    return each(times, () => runWebPack())
        .then(() => {
            return new Date().getTime() - start;
        });
}





runWebPack10Times().then(time => {
    console.log(`Webpack 10 times/${interations} files to require`, time);
});

runFuseBox10Times().then(time => {
    console.log(`FuseBox 10 times/${interations} iterations files to require`, time);
});