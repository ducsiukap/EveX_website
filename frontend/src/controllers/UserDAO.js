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

export { checkLogin, addUser };
