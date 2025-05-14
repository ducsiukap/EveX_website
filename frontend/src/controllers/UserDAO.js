import User from "../models/User";

const users = [
    {
        "id": 1,
        "name": "Linh Nguyễn",
        "email": "linh123@gmail.com",
        "password": "12345678",
        "phone": "0912345678",
        "status": "active",
        "role": "P"
    },
    {
        "id": 2,
        "name": "Minh Trần",
        "email": "minhtran@gmail.com",
        "password": "12345678",
        "phone": "0909876543",
        "status": "active",
        "role": "P"
    },
    {
        "id": 3,
        "name": "Thanh Nguyễn",
        "email": "thanhnguyen@gmail.com",
        "password": "12345678",
        "phone": "0967456789",
        "status": "ban",
        "role": "P"
    },
    {
        "id": 4,
        "name": "Hoàng Huy",
        "email": "huyhoang@gmail.com",
        "password": "12345678",
        "phone": "0923456789",
        "status": "active",
        "role": "P"
    },
    {
        "id": 5,
        "name": "Thu Anh",
        "email": "anhthu@gmail.com",
        "password": "12345678",
        "phone": "0987654321",
        "status": "active",
        "role": "P"
    },
    {
        "id": 6,
        "name": "EventHub Org",
        "email": "eventhub@gmail.com",
        "password": "org12345",
        "phone": "0933333333",
        "status": "active",
        "role": "O"
    },
    {
        "id": 7,
        "name": "Tech Conference",
        "email": "techconf@gmail.com",
        "password": "org12345",
        "phone": "0944444444",
        "status": "active",
        "role": "O"
    },
    {
        "id": 8,
        "name": "Youth Club",
        "email": "youthclub@gmail.com",
        "password": "org12345",
        "phone": "0955555555",
        "status": "ban",
        "role": "O"
    },
    {
        "id": 9,
        "name": "Open Stage",
        "email": "openstage@gmail.com",
        "password": "org12345",
        "phone": "0966666666",
        "status": "active",
        "role": "O"
    },
    {
        "id": 10,
        "name": "Green Team",
        "email": "greenteam@gmail.com",
        "password": "org12345",
        "phone": "0977777777",
        "status": "active",
        "role": "O"
    },
    {
        "id": 11,
        "name": "Admin One",
        "email": "admin@123",
        "password": "123456",
        "phone": "0988888888",
        "status": "active",
        "role": "A"
    },
    {
        "id": 12,
        "name": "Admin Two",
        "email": "admin2@evex.com",
        "password": "adminpass",
        "phone": "0999999999",
        "status": "ban",
        "role": "A"
    },
    {
        "id": 13,
        "name": "Quang Huy",
        "email": "quanghuy@gmail.com",
        "password": "12345678",
        "phone": "0911223344",
        "status": "active",
        "role": "P"
    },
    {
        "id": 14,
        "name": "Kiên Lê",
        "email": "kienle@gmail.com",
        "password": "12345678",
        "phone": "0922334455",
        "status": "ban",
        "role": "P"
    },
    {
        "id": 15,
        "name": "Dream Org",
        "email": "dreamorg@gmail.com",
        "password": "org12345",
        "phone": "0933445566",
        "status": "active",
        "role": "O"
    },
    {
        "id": 16,
        "name": "Test PersonalUser",
        "email": "psn@123",
        "password": "123456",
        "phone": null,
        "status": "active",
        "role": "P"
    },
    {
        "id": 17,
        "name": "Test Org",
        "email": "org@123",
        "password": "123456",
        "phone": null,
        "status": "active",
        "role": "O"
    }
]


const checkLogin = (u) => {
    const found = users.find(user => user.email === u.email && user.password === u.password);
    if (!found) return false;

    // gọi setter
    u.id = found.id;
    u.name = found.name;
    u.phone = found.phone;
    u.status = found.status;
    u.role = found.role;
    return true;
};

const addUser = (u) => {
    if (users.find(user => user.email === u.email)) return false;

    u.id = users[users.length - 1].id + 1;
    u.status = 'active';
    users.push(u);
    // console.log(u);
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
            users[i].status = u.status;
            return true;
        }
    }
    console.log(u);
    return false;
}

const searchByName = (key) => {
    const result = users
        .filter(user => user.name.toLowerCase().includes(key));
    const response = result.map(user => {
        const u = new User(user.name, user.email, user.password, user.phone, user.status, user.role);
        u.id = user.id;
        return u;
    });
    // console.log(response);
    return response;
}

const getUserById = (id) => {
    try {
        const uid = Number(id);
        const result = users.find(user => user.id === uid);
        const u = new User(result.name, result.email, result.password, result.phone, result.status, result.role);
        u.id = result.id;
        return u;
    } catch (error) { return null; }
}

export { checkLogin, addUser, updateUser, searchByName, getUserById };
