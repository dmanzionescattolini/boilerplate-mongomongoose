require('dotenv').config();
let mongoose = require('mongoose');
let personSchema = new mongoose.Schema({
  name:{type:String, required:true},
  age:{type:Number},
  favoriteFoods:{type:[String]}
});
let Person = mongoose.model('Person',personSchema);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const createAndSavePerson = (done) => {

let person = new Person({
  name: "John",
  age: 20,
  favoriteFoods: ["pizza", "burgers"]
});
person.save(function(err, data){
  if(err){
    done(err)
  }
  done(null, data)
});
}
const createManyPeople = (arrayOfPeople, done) => {
 
  let people = Person.create(arrayOfPeople,function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
}

const findPeopleByName = (personName, done) => {
  Person.find({name : personName }, function(err, foundPeople){
    if(err) return console.log(err);
    done(null, foundPeople);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},function(err,foundFood){
    if(err) return console.log(err);
    done(null, foundFood);
  })
};

const findPersonById = (personId, done) => {
Person.findById(personId,function(err, foundPerson){
  if(err) return console.log(err);
  done(null, foundPerson);
})};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
 let person = Person.findById(personId, function(err, person){
   if(err) return console.log(err);
   person.favoriteFoods.push(foodToAdd);
   person.save(function(err, person){
     if(err) return console.log(err);
     done(null, person)
   })});
 }
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({name:personName},function(err, person){
    if(err) return console.log(err);
    person.age = 20;
    person.save(function(err, data){
      if(err) return console.log(err);
      done(null, data)
    })
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err, data){
    if(err) return console.log(err);
    done(null, data)
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:"Mary"},function(err, data){
    if(err) return console.log(err);
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch}).sort(
 "name"
  ).limit(2
  ).select(["name","favoriteFoods"]).exec(function(err, data){
    if(err) return console.log(err);
    done(null, data)
  })
  }

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
