const fs = require("fs");
const fsP = require("fs/promises");

//Copy file-----------------------------------------------------------------------
async function copyFile(filePath, destination) {
    try {
        const a = await fsP.copyFile(filePath, destination);
        console.log('a', a);//undefiled(does not return anything)
    } catch (e) {
        console.log('e', e)
    }
}

copyFile('./filesystem/textToCopy.txt', './filesystem/copy-textToCopy.txt');

//copyFile(src,dest,mode,cb)
// mode is optional integer to specify the behaviour of copy operations.we can use bitwise operator.
//eg.fs.constants.COPYFILE_EXCL ->if dest is already exist then copy operations will fail.
function copyFileCb(filePath, destination) {
    fs.copyFile(filePath, destination, fs.constants.COPYFILE_EXCL, (err, contents) => {
        if (err) throw err;
        console.log('contents', contents);
    });
}

// copyFileCb('./filesystem/textToCopy.txt', './filesystem/copyCb-textToCopy.txt');

function copyFileSync(filePath, destination) {

    fs.copyFileSync(filePath, destination, fs.constants.COPYFILE_EXCL);

}

// copyFileSync('./filesystem/textToCopy.txt', './filesystem/copysync-textToCopy.txt');
//-----------------------------------------------------
