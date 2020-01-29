import {App} from './App'


const Port = 8000;

const app = App()

app.listen(Port,()=>{
    console.log(`server is listening on Port ${Port}`)
})
