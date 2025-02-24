const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user',(req,res) =>{
    res.json({
        message: 'okay'
    })
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})