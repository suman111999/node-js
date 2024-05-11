const fs = require("fs/promises");
const path = require("path");
const CREATE = 'create';
const DELETE = 'delete';
const RENAME = 'rename';
const APPEND = 'append';

const fileOperations = async () => {
    console.log(path.join(__dirname));//actual directory path
    //__filename

    //open the file as read mode
    const fileHandle = await fs.open(path.join(__dirname, 'command.txt'), 'r')
    // console.log('fh', fileHandle)
    console.log('fd', fileHandle.fd)

    //read the file directly without opening.
    const readDirectly = await fs.readFile(path.join(__dirname, 'textToCopy.txt'), 'utf8');

    console.log('readDirectly', readDirectly)

    const createFile = async (fileName) => {

        try {
            //check if the file already exists
            const existingFilehandle = await fs.open(path.join(__dirname, `${fileName}.txt`), 'r');
            existingFilehandle.close();
            console.log(`${fileName} File already exists`)
        } catch (e) {
            //if file does not exist then create it
            const fileHandle1 = await fs.open(path.join(__dirname, `${fileName}.txt`), 'w');
            fileHandle1.close();
            console.log(`${fileName} File created`)
        }

    }

    fileHandle.on('read', async () => {
        //read the file

        //readFile(encoding)
        //if using fileHande then we do not need to put file path inside readFile as fileHandle already know the file descriptors to read.
        // const data = await fileHandle.readFile('utf-8');
        // console.log('data', data)

        //read(buffer,offset,length,position)
        const stat = await fileHandle.stat()
        //define Buffer
        const buff = Buffer.alloc(stat.size)
        //how many byte want to read,(stat.size or buff.byteLength)
        const length = buff.byteLength;
        const data1 = await fileHandle.read(buff, 0, length, 0)
        console.log('data1', data1)
        //we have stored file content in buffer then we can use it furthure.
        const content = buff.toString('utf-8');
        console.log('content', content)
        //create [fileName]
        if (content.includes(CREATE)) {
            let fileName = content.substring(CREATE.length + 1)
            await createFile(fileName);

        }

        if (content.includes(DELETE)) {
            try {
                const fileName = content.substring(DELETE.length + 1)
                await fs.unlink(path.join(__dirname, `${fileName}.txt`));
                console.log(`${fileName} File deleted`)
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.log(`${fileName} File does not exist`)
                } else {
                    console.log('Error while deleting the file', e)
                }
            }

        }

        //rename oldname to newname
        if (content.includes(RENAME)) {
            try {
                const cont = content.split(' ')
                const oldName = cont.slice(1, 2)
                const newName = cont.slice(-1)[0]
                await fs.rename(path.join(__dirname, `${oldName}.txt`), path.join(__dirname, `${newName}.txt`));
                console.log(`${oldName} File renamed to ${newName}`)
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.log(`${oldName} File does not exist`)
                } else {
                    console.log('Error while renaming the file', e)
                }

            }
        }

        //append <content> to fileName
        if (content.includes(APPEND)) {
            try {
                // const contentToAppend = content.substring(APPEND.length + 1);
                const cont = content.split(' ')
                let indexofTo = cont.indexOf('to')
                const contentToAppend = cont.slice(1, indexofTo)
                const fileName = cont.slice(-1)[0]
                // let fileHandleForAppend = await fs.open(path.join(__dirname, `${fileName}.txt`), 'a')
                // fileHandleForAppend.write(contentToAppend)
                // fileHandleForAppend.close()
                await fs.appendFile(path.join(__dirname, `${fileName}.txt`), contentToAppend);
                console.log(`${contentToAppend} Appended to ${fileName}`)
            } catch (e) {
                console.log('Error while appending content to file', e)
            }
        }
    })

    //watch the file
    const watcher = fs.watch(path.join(__dirname, 'command.txt'));
    console.log(watcher)
    for await (const event of watcher) {
        console.log(event)
        if (event.eventType === 'change') {
            fileHandle.emit('read')
        }
    }



    fileHandle.close();
}
fileOperations()


//open(filename)->return file descriptors a number that uniqly identify the file.
