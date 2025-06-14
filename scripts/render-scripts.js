'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const sh = require('shelljs');
const { minify } = require('terser');

module.exports = async function renderScripts() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');

    sh.cp('-R', sourcePath, destPath)

    const srcFile = upath.resolve(upath.dirname(__filename), '../src/js/scripts.js');
    const outFile = upath.resolve(upath.dirname(__filename), '../dist/js/scripts.js');

    const sourceCode   = fs.readFileSync(srcFile, 'utf8');
    const { code }     = await minify(sourceCode, { format: { comments: false } });
    fs.writeFileSync(outFile, code, 'utf8');
};
