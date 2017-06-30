let products = [
    {
        "key": 1,
        "name" : "TV",
        "price" : 500,
        "currency" : "USD"
    },
    {
        "key": 2,
        "name" : "SSD",
        "price" : 100,
        "currency" : "EUR"
    },
    {
        "key": 3,
        "name" : "Mobile Phone",
        "price" : 600,
        "currency" : "BGN"
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
    { id: 14, name: 'rd', password:'asd', 'permissions' : ['READ', 'DELETE'] },
    { id: 15, name: 'ud', password:'asd', 'permissions' : ['UPDATE', 'DELETE'] }
]

const fetchUser = ({name, password}) => {
  const user = users.filter(user => {
    return user.name === name && user.password === password;
  }).reduce((acc, user) => acc = user, {});
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return user.name ? resolve(user) : reject('User/Password combination is incorrect!');
    }, 500);
  })
}

const fetchProduct = (id) => {
  const product = products.filter(product => {
    return product.key === id;
  }).reduce((acc, product) => acc = product, {});
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      return product ? resolve(product) : reject('There is no such product!');
    }, 500);
  })
}

const fetchAllProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(products);
    }, 500);
  })
}

const updateProduct = (data) => {
  //FIXME: Here we are updating event with same values which will be filtered out with a real database
  products = products.map(product => product.key === data.key ? data : product);
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(products);
    }, 500);
  })
}

const createProduct = (product) => {
  products.push(product);
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(products);
    }, 500);
  })
}

const deleteProduct = (id) => {
  products = products.filter(product => {
    return product.key !== id;
  })
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(products);
    }, 500);
  })
}


export default {
  fetchUser,
  fetchProduct,
  fetchAllProducts,
  updateProduct,
  createProduct,
  deleteProduct
}
