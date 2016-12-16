const fsbx = require("fuse-box");
const helpers = require("./helpers");
const webpack = require("webpack");
let interations = 1200;
let homeDir = helpers.createFirstCase(interations);
const fsx = new fsbx.FuseBox();


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
runFuseBox().then(time => {
    console.log(`Fusebox ${interations} files to require`, time);
});

runWebPack().then(time => {
    console.log(`Webpack ${interations} files to require`, time);
});