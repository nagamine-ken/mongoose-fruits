const mongoose = require("mongoose")
// const uri = "mongodb+srv://kennagamine:lXUj9tcglLvJ1ud7@nodetodoapp.tksna.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true})

// In order to insert data we first need to create a Schema of the data:
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please check your entry data, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

//Then we create a collection (Fruit) with the Schema:
const Fruit = mongoose.model("Fruit", fruitSchema)

const mandarin = new Fruit ({
    name: "Mandarin",
    rating: 9,
    review: "Delicious too!"
})

// const peach = new Fruit ({
    
//     rating: 6,
//     review: "Meety!"
// })

// const lemon = new Fruit ({
//     name: "Lemon",
//     rating: 8,
//     review: "Vitamin C!"
// })

mandarin.save()
// Insert function, data array into the collection:
// Fruit.insertMany([mandarin, peach, lemon])

// Read function with Mongoose
async function getData() {
    // Filter search with atomic operator $gte:
    const arr = await Fruit.find({ rating: { $gte: 5 } });
    // Console.log only the name field:
    arr.forEach(function(e){
        console.log(e.name)
    })
    // console.log(arr)
}
getData()




// Establishing a Relationship
// We first need to create a Schema of the data:
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please check your entry data, no name specified!"]
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    favouriteFruit: fruitSchema
})


//Then we create a collection (Fruit) with the Schema:
const Person = mongoose.model("Person", personSchema)

const pineapple = new Fruit ({
    name: "Pineapple",
    rating: 8,
    review: "Simply yummy!"
})

// pineapple.save()

const person = new Person ({
    name: "Adri",
    age: 18,
    favouriteFruit: pineapple
})

person.save()


// Update function with Mongoose
async function deleteData() {
    await Person.deleteMany({ name: "Adri"});
    // console.log(arr)
}
// deleteData()


// Update function with Mongoose
async function updateData() {
    await Person.updateOne({ name: "Carolina" },{$set: { favouriteFruit: mandarin }});
    // console.log(arr)
}
updateData()
