export const products = [
    {
        "name" : "TV",
        "price" : 1000,
        "currency" : "USD"
    },
    {
        "name" : "SSD",
        "price" : 100,
        "currency" : "USD"
    },
    {
        "name" : "Mobile Phone",
        "price" : 600,
        "currency" : "USD"
    },
    {
        "name" : "16GB RAM",
        "price" : 200,
        "currency" : "USD"
    }
]

export const users = [
    { id: 1, name: 'admin', 'permissions' : ['CREATE', 'READ', 'UPDATE', 'DELETE'] },
    { id: 2, name: 'c', 'permissions' : ['CREATE'] },
    { id: 3, name: 'r', 'permissions' : ['READ'] },
    { id: 4, name: 'u', 'permissions' : ['UPDATE'] },
    { id: 5, name: 'd', 'permissions' : ['DELETE'] },
    { id: 6, name: 'cr', 'permissions' : ['CREATE', 'READ'] },
    { id: 7, name: 'cu', 'permissions' : ['CREATE', 'UPDATE'] },
    { id: 8, name: 'cd', 'permissions' : ['CREATE', 'DELETE'] },  
    { id: 9, name: 'cru', 'permissions' : ['CREATE', 'READ', 'UPDATE'] },
    { id: 10, name: 'crd', 'permissions' : ['CREATE', 'READ', 'DELETE'] },
    { id: 11, name: 'cud', 'permissions' : ['CREATE', 'UPDATE', 'DELETE'] },
    { id: 12, name: 'rud', 'permissions' : ['READ', 'UPDATE', 'DELETE'] },
    { id: 13, name: 'ru', 'permissions' : ['READ', 'UPDATE'] },
    { id: 14, name: 'ru', 'permissions' : ['READ', 'DELETE'] },
    { id: 15, name: 'ud', 'permissions' : ['UPDATE', 'DELETE'] },
    { id: 16, name: 'ban', 'permissions' : [] },
]
