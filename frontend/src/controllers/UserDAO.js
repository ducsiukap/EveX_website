import User from "../models/User";

const users = [];

users.push(new User("Duc", "test@gmail.com", "123456", "1234567890", "active", "P"));
users.push(new User("A Group", "org@gmail.com", "123456", "0987654321", "active", "O"));
users.push(new User("admin", "admin@123", "admin", null, "active", "A"));
users.push(new User("Duc2", "ban@gmail.com", "123456", "1234567890", "ban", "P"));
users.push(new User("A Group2", "ban2@gmail.com", "123456", "0987654321", "ban", "O"));
users.push(new User("admin", "admin@123", "admin", null, "active", "A"));

users.forEach((u, index) => {
    u.id = index + 1;
});

const checkLogin = (u) => {
    const found = users.find(user => user.email === u.email && user.password === u.password);
    if (!found) return false;

    u.id = found.id;
    u.name = found.name;
    u.phone = found.phone;
    u.status = found.status;
    u.role = found.role;
    return true;
};

const addUser = (u) => {
    if (users.some(user => user.email === u.email)) return false;

    u.id = users.length + 1;
    u.status = 'active';
    users.push(u);
    console.log(users);
    return true;
};

const updateUser = (u) => {
    if (users.find(user => user.email === u.email && user.id !== u.id)) return false;
    for (let i = 0; i < users.length; ++i) {
        if (users[i].id === u.id) {
            users[i].name = u.name;
            users[i].email = u.email;
            users[i].password = u.password;
            users[i].phone = u.phone;
            return true;
        }
    }
    return false;
}

const searchByName = (key) => {
    const result = users
        .filter(user => user.name.toLowerCase().includes(key));
    return result;
}

const getUserById = (id) => {
    try {
        const uid = Number(id);
        const result = users.find(user => user.id === uid);
        return result;
    } catch (error) { return null; }
}

export { checkLogin, addUser, updateUser, searchByName, getUserById };
