const express = require('express');
const {PrismaClient} = require("@prisma/client");
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
const prisma =  new PrismaClient();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', async (req,res) =>{
    // const data = await prisma.user.findMany();
    const data = await prisma.$queryRaw `select id, username, cardid from user`;
    //const finalDAta = await data.map(record =>{
        //console.log('record', record)
        //dalete record.password;
        //return record;
    //});
    res.json({
        message: 'okay',
        //data: finalDAta
        data
    })
});

app.post('/user', async (req, res) =>{
    console.log(req.body)
    const response = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password, //{} => req.body ---> if all fill match
            cardId: req.body.cardId
        }
    });
    if(response){
        res.json({
            message: "add successfully"
        })
    }else{
        res.json9({
            message: "failed"
        })
    }
});

app.put('/user', async (req, res) => {
    const response = await prisma.user.update({
        select: {
            password: true,
            id: true
        },
        where: {
            id: req.body.id
        },
        data: {
            password: req.body.password
        }
    });
    if (response) { 
        res.json({
            message: "update sucessfully"
        })
    } else { 
        res.json({
            message: "update fail"
    })}
});

app.delete('/user', async (req, res) => {
   const response = await prisma.user.delete({
    where: {
        id: req.body.id
    },
    select:{
        username: true
    }
   });
   if (response) { 
    res.json({
        message: "dalete sucessfully"
         })
    } else { 
        res.json({
            message: "dalete fail"
    })}
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})