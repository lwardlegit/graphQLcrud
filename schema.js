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

var customers =[
    {id: 1, name: 'polly whirl', email: 'lwardle@mail.com', age:35},
    {id: 2, name: 'steve smith', email: 'ssmith@mail.com', age:30},
    {id: 3, name: 'the main mayne', email: 'itme@mail.com', age:29},
    {id: 4, name: 'jojo mojo', email: 'jmojo@mail.com', age:14}   
]


//customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () =>({
        id: {type:GraphQLInt},
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
                id: {type:GraphQLInt}
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
    name: 'mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLInt)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
                
            },
            resolve(parentValue,args){
               // console.log(args,'making new customer')
                // add to the list
                console.log('args',args)
                customers.push(args)
              return customers
            }
        },
        deleteCustomer:{
            type:CustomerType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue,args){
               customers = customers.filter(cust => cust.id !== args.id)
               return customers
        }
    },
        editCustomer:{
            type:CustomerType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                name:{type: GraphQLString},
                email:{type:GraphQLString},
                age:{type: GraphQLInt}
            },
            resolve(parentValue,args){
                for(let i=0; i<customers.length; i++){
                    if(customers[i].id == args.id){
                        if(args.name.length > 0){
                            customers[i].name = args.name 
                        }
                        if(args.email.length > 0){
                            customers[i].email = args.email 
                        }
                        if(args.age.length > 0){
                            customers[i].age = args.age 
                        }
                        return  customers
                    }
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});