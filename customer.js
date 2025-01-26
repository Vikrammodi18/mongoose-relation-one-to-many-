const mongoose = require('mongoose')

main()
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relation')
}

const orderSchema = new mongoose.Schema({
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
const Order =  mongoose.model("Order",orderSchema);
const Customer = mongoose.model("customer",customerSchema)

// const addCustomer = async ()=>{
//     let cust1 = new Customer({
//         name:"Shivank Kumar",
//     });
//     let order1 = await Order.findOne({item:"chocolate"})
//     let order2 = await Order.findOne({item:"samosa"})
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);
//     let res = await cust1.save()
//     console.log(res)
    
// }


const findCustomer = async ()=>{
    try{
        const cust = await Customer.find({name:"Shivam Kumar"}).populate("orders");
        console.log(cust[0])
    } catch(err){
        console.log(err.message);
    }
}
// const addOrder = async ()=>{
//     const res = await Order.insertMany([
//         {item:"samosa",price:10},
//         {item:"coke",price:20},
//         {item:"chocolate",price:40},
//     ])
//     console.log(res)
// }

// addOrder();
findCustomer()