const express = require('express');
const {PrismaClient} = require("@prisma/client");

const app = express()
const prisma =  new PrismaClient();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', async (req,res) =>{
    const data = await prisma.user.findMany();
    res.json({
        message: 'okay',
        data
    })
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})