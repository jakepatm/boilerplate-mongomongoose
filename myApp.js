require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let personSchema = new mongoose.Schema( {
	name : {
		type : String,
		required: true
	},
	age : Number,
	favoriteFoods : [String]
	
})

let Person = mongoose.model('Person',personSchema)

let newPerson = new Person({
	name : "Rodger Clemens",
	age : 22,
	favoriteFoods : ["apples", "papas"]
});

const createAndSavePerson = (done) => {
	let personB = new Person ({
		name : "Document",
		age : 99,
		favoriteFoods : ["rodger", "example"]
	})
	personB.save(function(err,data) {
		if (err) return console.error(err);
		done(null,data);
	})

};

let arrayOfPeople = [{name : "John", age : 22, favoriteFoods : ["apple", "oranges"]},
					 {name : "Cindy", age : 23, favoriteFoods : ["bananas", "strawberries"]},
					 {name : "John22", age : 232, favoriteFoods : ["appsle", "oranges"]}]

const createManyPeople = (arrayOfPeople, done) => {
  	Person.create(arrayOfPeople, (function(err,data) {
		if (err) return console.error(err);
		done(null,data);
})
)};

const findPeopleByName = (personName, done) => {
	Person.find({name : personName}, (function(err,data) {
		if (err) return console.error(err);
		done(null,data);
	}))
	
};

const findOneByFood = (food, done) => {
  	Person.findOne({favoriteFoods : food}, (function(error,data) {
		if (error) return console.error(error);
		done(null,data);
}))
};

const findPersonById = (personId, done) => {
  	Person.findById({_id : personId}, function (err,data) {
		if (err) return console.error(err);
		done(null,data);
})
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
	Person.findById({_id : personId}, function (err,person) {
		if(err) return console.error(err);
		
		person.favoriteFoods.push(foodToAdd);
		
		person.save((err,updatedPerson) => {
			if (err) return console.error(err);
			done(null,updatedPerson);
		})
	})
	
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
	Person.findOneAndUpdate({name : personName}, {age : ageToSet}, {new : true}, function (err,personVar) {
		if (err) return console.error(err);
		done(null,personVar);
	})  
	
};

const removeById = (personId, done) => {
	
	Person.findOneAndRemove({_id : personId}, function(err,removedVal) {
		if (err) return console.error(err);
		done(null,removedVal);
	})
	
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

	Person.remove({name : nameToRemove}, function(err,removedPeople) {
		if (err) return console.error(err);
		done(null,removedPeople);
	})

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

	let mutatePerson = Person.find({favoriteFoods : foodToSearch}, {name : 1, favoriteFoods : 1})
	
	mutatePerson.sort({name : 1}).limit(2).exec(function(err, personRecord) {
		if (err) return console.error(err);
		done(null,personRecord);
	})
	
  
};

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
