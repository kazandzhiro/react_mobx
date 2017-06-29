const products = [
    {
        "key": 1,
        "name" : "TV",
        "price" : 1000,
        "currency" : "USD"
    },
    {
        "key": 2,
        "name" : "SSD",
        "price" : 100,
        "currency" : "USD"
    },
    {
        "key": 3,
        "name" : "Mobile Phone",
        "price" : 600,
        "currency" : "USD"
    },
    {
        "key": 4,
        "name" : "16GB RAM",
        "price" : 200,
        "currency" : "USD"
    }
]

const users = [
    { id: 1, name: 'admin', password: 'admin', 'permissions' : ['CREATE', 'READ', 'UPDATE', 'DELETE'] },
    { id: 2, name: 'c', password:'asd', 'permissions' : ['CREATE'] },
    { id: 3, name: 'r', password:'asd', 'permissions' : ['READ'] },
    { id: 4, name: 'u', password:'asd', 'permissions' : ['UPDATE'] },
    { id: 5, name: 'd', password:'asd', 'permissions' : ['DELETE'] },
    { id: 6, name: 'cr', password:'asd', 'permissions' : ['CREATE', 'READ'] },
    { id: 7, name: 'cu', password:'asd', 'permissions' : ['CREATE', 'UPDATE'] },
    { id: 8, name: 'cd', password:'asd', 'permissions' : ['CREATE', 'DELETE'] },
    { id: 9, name: 'cru', password:'asd', 'permissions' : ['CREATE', 'READ', 'UPDATE'] },
    { id: 10, name: 'crd', password:'asd', 'permissions' : ['CREATE', 'READ', 'DELETE'] },
    { id: 11, name: 'cud', password:'asd', 'permissions' : ['CREATE', 'UPDATE', 'DELETE'] },
    { id: 12, name: 'rud', password:'asd', 'permissions' : ['READ', 'UPDATE', 'DELETE'] },
    { id: 13, name: 'ru', password:'asd', 'permissions' : ['READ', 'UPDATE'] },
    { id: 14, name: 'ru', password:'asd', 'permissions' : ['READ', 'DELETE'] },
    { id: 15, name: 'ud', password:'asd', 'permissions' : ['UPDATE', 'DELETE'] },
    { id: 16, name: 'ban', password:'asd', 'permissions' : [] },
]

const fetchUser = ({name, password}) => {
  const user = users.filter(user => {
    return user.name === name && user.password === password;
  }).reduce((acc, user) => acc = user, {});
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return user.name ? resolve(user) : reject('User/Password combination is incorrect!');
    }, 1000);
  })
}

const fetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(products);
    }, 1000);
  })
}


export default {
  fetchUser,
  fetchAllProducts
}
