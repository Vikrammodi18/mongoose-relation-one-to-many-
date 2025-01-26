const mongoose = require('mongoose')

main()
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relation')
}

const userSchema = mongoose.Schema({
    username: String,
    email:String,
})
const postSchema = mongoose.Schema({
    content: String,
    likes: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema)

const addData =async ()=>{
        const user1 = new User({
        username:"rahul",
        email:"rahul@gmail.com"
    })

    const post1 = new Post({
        content:"i am software developer",
        likes:200,
    })
    
    post1.user = user1;

    await user1.save()
    await post1.save()
}
addData()
// const addUser =async ()=>{
//     const user1 = new User({
//         username:"Roushan",
//         email:"roushan@gmail.com"
//     })
//     let res = await user1.save();
//     console.log(res)
// }
// addUser()