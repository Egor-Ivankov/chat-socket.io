const {toTrimAndLowerCase} = require("./utils");
const users = [];

const addUser = (user) => {
    const userName = toTrimAndLowerCase(user.name);
    const userRoom = toTrimAndLowerCase(user.room);

    const isExist = users.find(
        u =>
        toTrimAndLowerCase(u.name) === userName &&
        toTrimAndLowerCase(u.room) === userRoom
    );

    !isExist && users.push(user);

    const currentUser = isExist || user;

    return {
        isExist: !!isExist,
        user: currentUser
    }
}

module.exports = {addUser};