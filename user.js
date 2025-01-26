const mongoose = require('mongoose')

main().then(()=>console.log("connection to db")).catch((err)=>console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

const userSchema = new mongoose.Schema({
    userName : String,
    address :[
        {
            _id : false,
            location:String,
            city:String,
        },
        
    ],
})

const User = mongoose.model('user',userSchema)

const addUser = async ()=>{
    const user1 = new User({
        userName:"Vikram Kumar Modi",
        address: [{location:"sector63 block D-35",city:"noida"}]
    })
       user1.address.push({location:"sidroll joda Manidr",city:"Ranchi"})
       const result = await user1.save()
       console.log(result)
}

addUser();