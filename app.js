
const fs = require('fs');
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
// const {OpenAI} =require('openai') ;
// const openai = new OpenAI({
//   apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
// });
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


// io.on('connection', socket => {
//   socket.on('event',async data => { 
// console.log(data)
    
//     const params = openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           "role": "user",
//           "content": `Como responder essa frase em inglês? ${data}`
//         }
//       ],
    
//     }).then(o=>{
//       console.log(o.choices[0].message.content)
//        socket.emit('content',o.choices[0].message.content)
//     })
   
//    });
   
// }); 
app.get('/',express.urlencoded({extended:true}),express.json(), (req,res)=>{
        res.render('index')
      })




app.listen(3000,(error)=>{
  if(error){
    console.log(error)
  }else{
    console.log('running')
  }
});
