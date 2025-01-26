const mongoose = require('mongoose')

main()
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relation')
}

const orderSchema = mongoose.Schema({
    item:String,
    price:Number,
})
const customerSchema = new mongoose.Schema({
    name:String,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },]
})
const Order = new mongoose.model("order",orderSchema);
const Customer = new mongoose.model("customer",customerSchema)

const addCustomer = async ()=>{
    let cust1 = new Customer({
        name:"Shivam Kumar",
    });
    let order1 = await Order.findOne({item:"chocolate"})
    let order2 = await Order.findOne({item:"samosa"})
    cust1.orders.push(order1);
    cust1.orders.push(order2);
    let res = await cust1.save()
    console.log(res)
    
}
addCustomer()
// const addOrder = async ()=>{
//     const res = await Order.insertMany([
//         {item:"samosa",price:10},
//         {item:"coke",price:20},
//         {item:"chocolate",price:40},
//     ])
//     console.log(res)
// }

// addOrder();