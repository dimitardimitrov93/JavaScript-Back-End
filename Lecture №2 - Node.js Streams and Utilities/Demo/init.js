const pubSub = require('./pubSub');

const names = [];

const onCatsRequest = (name) => {
    if (names.includes(name)) {
        console.log(`Hello ${name} again.`);
    } else {
        console.log(`We have a new user - ${name}.`);
        names.push(name);
    }
}

pubSub.subscribe('onLogin', onCatsRequest);