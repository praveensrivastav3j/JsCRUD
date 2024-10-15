let database = [];
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const userIdInput = document.getElementById('userId');
const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('email');
const userPasswordInput = document.getElementById('password');
const userAddressInput = document.getElementById('address');
const userAgeInput = document.getElementById('userAge');

function create(data) {
    database.push(data);
    renderList();
}

function read() {
    return database;
}

function update(id, updatedData) {
    const index = database.findIndex(item => item.id === id);
    if (index !== -1) {
        database[index] = { ...database[index], ...updatedData };
        renderList();
    }
}

function deleteData(id) {
    const index = database.findIndex(item => item.id === id);
    if (index !== -1) {
        database.splice(index, 1);
        renderList();
    }
}

function editUser (id) {
    const user = database.find(item => item.id === id);
    if (user) {
        userIdInput.value = user.id;
        userNameInput.value = user.username;
        userEmailInput.value = user.email;
        userPasswordInput.value = user.password;
        userAddressInput.value = user.address;
        userAgeInput.value = user.age;
    }
}

// function renderList() {
//     userList.innerHTML = '';
//     const table = document.createElement('table');
//     table.innerHTML = `
//         <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Age</th>
//             <th>Actions</th>
//         </tr>
//     `;
//     read().forEach(user => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${user.id}</td>
//             <td>${user.username}</td>
//             <td>${user.email}</td>
//             <td>${user.address}</td>
//             <td>${user.age}</td>
//             <td>
//                 <button class="btn btn-secondary" onclick="editUser(${user.id})">Edit</button>
//                 <button class="btn btn-danger" onclick="deleteData(${user.id})">Delete</button>
//             </td>
//         `;
//         table.appendChild(row);
//     });
//     userList.appendChild(table);
// }

function renderList() {
    userList.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'table table-sm table-dark table-responsive';
    table.style.marginTop = "50px";
    table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Address</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
    `;
    read().forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.age}</td>
        <td>
          <button class="btn btn-info" onclick="editUser(${user.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteData(${user.id})">Delete</button>
        </td>
      `;
      table.appendChild(row);
    });
    userList.appendChild(table);
  }

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = userIdInput.value;
    const username = userNameInput.value;
    const email = userEmailInput.value;
    const password = userPasswordInput.value;
    const address = userAddressInput.value;
    const age = userAgeInput.value;

    if (id) {
        update(id, { username, email, password, address, age });
        userIdInput.value = '';
    } else {
        create({ id: database.length + 1, username, email, password, address, age });
    }
    userForm.reset();
});