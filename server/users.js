const { toTrimAndLowerCase } = require("./utils");
let users = [];

const findUser = (user) => {
    const userName = toTrimAndLowerCase(user.name);
    const userRoom = toTrimAndLowerCase(user.room);

    return users.find(
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

const getRoomUsers = (room) => users.filter((u) => u.room === room);

const removeUser = (user) => {
    const foundUser = findUser(user);

    if (foundUser) {
        users = users.filter(({ room, name }) => room === foundUser.room &&
            name !== foundUser.name);
    }
    return foundUser;
}

module.exports = { addUser, findUser, getRoomUsers, removeUser };