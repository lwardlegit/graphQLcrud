const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema.js')
const cors = require('cors')


const app = express();
//allow CORS
app.use(cors)

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true,
}));


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(4000 , ()=>{
 console.log('server is running on port 4000')
});





