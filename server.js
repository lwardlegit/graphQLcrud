const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema.js')
const cors = require('cors')
const port = process.env.PORT || 3000


const app = express();
//allow CORS
app.use(cors())


app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true,
}));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.listen(port, ()=>{
 console.log(`server is running on port ${port}`)
});





