//events module provides EventEmitter class
const EventEmitter = require('events');

//get obj.
const eventEmitter = new EventEmitter();
// console.log(eventEmitter)
//create event/listner named 'start'
eventEmitter.on('start', (start) => { console.log('start', start) });

//create event named 'end'
eventEmitter.on('end', (end) => { console.log('end', end) });

//emit already created events
//1st arguments is name of event and then ...args
eventEmitter.emit('start', 1)
eventEmitter.emit('end', 10);

//once method
//it will emit only one time ,it does not matter you have emiited it more then one time
eventEmitter.once('bar', () => { console.log('bar') });


eventEmitter.emit('bar')
eventEmitter.emit('bar')