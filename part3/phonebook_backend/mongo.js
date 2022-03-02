const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.rwfjk.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

const Phone = mongoose.model('Phone', phoneSchema);

if (process.argv.length < 4) {
  console.log('phonebook:');
  Phone.find({}).then((result) => {
    result.forEach((phone) => {
      console.log(phone.name, phone.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  const phone = new Phone({
    name: name,
    number: number,
    id: Math.ceil(Math.random() * 12000),
  });

  phone.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
