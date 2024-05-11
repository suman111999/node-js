const { Buffer } = require('buffer');

//just think like array initilization with fixed size
// 10 byte ->think->[[00000000],[00000000],....10times],1 byte=8 bit,0 to 255 in decimal
//initilize with 0
// like array we can acess and write or modify(but in hexa).
const buffer = Buffer.alloc(10);
console.log(buffer)

buffer[0] = 0xf4;//write in hexa
console.log(buffer[0])//gives us in decimal format

//we can even loop like array

for (let i = 0; i < buffer.length; i++) {
    buffer[i] = 0xf4;
}
console.log(buffer)

const buffer1 = Buffer.alloc(10);
buffer1.write('mohan', 'utf-8')
console.log('bf1', buffer1)//<Buffer ...hexa>
let x = buffer1.toString('utf-8')//characters encoding should be same as whatever used while writing in buffer to get exact value.
console.log('bf2', x)

//think like dynamic size list if using from
const buffer2 = Buffer.from([0x45, 0x67]);
console.log('bf3', buffer2)
console.log('bf4', buffer2.toString('hex'))

const buffer3 = Buffer.from('4567', 'utf-8');
console.log('bf5', buffer3)
console.log('bf6', buffer3.toString('utf-8'));