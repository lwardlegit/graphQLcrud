const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
 } = require('graphql')


//hardcoded data

const customers =[
    {id: '1', name: 'luther wardle', email: 'lwardle@mail.com', age:35},
    {id: '2', name: 'steve smith', email: 'ssmith@mail.com', age:30},
    {id: '3', name: 'the main mayne', email: 'itme@mail.com', age:29},
    {id: '4', name: 'jojo mojo', email: 'jmojo@mail.com', age:14}   
]


//customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () =>({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        email: {type:GraphQLString},
        age: {type: GraphQLInt}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer: {
            type:CustomerType,
            args:{
                id: {type:GraphQLString}
            },
            resolve(parentValue,args){
               
                for(let i =0; i<customers.length; i++){
                    if(customers[i].id == args.id){
                        return  customers[i]
                    }
                }
           
              
            }
        },

        customers:{
            type: new GraphQLList(CustomerType),
                resolve(parentValue,args){
                    return customers
                }   
        }
    }
    
});
//mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
                
            },
            resolve(parentValue,args){
                return axios.post('http://localhost:3000/customers',{
                    name:args.name,
                    email:args.email,
                    age:args.age
                })
                .then(res => res.data)
            }
        },
        deleteCustomer:{
            type:CustomerType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue,args){
                return axios.delete('http://localhost:3000/customers/'+args.id)
                .then(res => res.data);
            }
        },
        editCustomer:{
            type:CustomerType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)},
                name:{type: GraphQLString},
                email:{type:GraphQLString},
                age:{type: GraphQLString}
            },
            resolve(parentValue,args){
                return axios.patch('http://localhost:3000/customers/'+args.id,args)
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});