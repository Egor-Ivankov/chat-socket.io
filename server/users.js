const {toTrimAndLowerCase} = require("./utils");
const users = [];

const findUser = (user) => {
    const userName = toTrimAndLowerCase(user.name);
    const userRoom = toTrimAndLowerCase(user.room);

    return  users.find(
        u =>
            toTrimAndLowerCase(u.name) === userName &&
            toTrimAndLowerCase(u.room) === userRoom
    );
}
const addUser = (user) => {
    const isExist = findUser(user);

    !isExist && users.push(user);

    const currentUser = isExist || user;

    return {
        isExist: !!isExist,
        user: currentUser
    }
}

module.exports = {addUser, findUser};