const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Min password length is 6 characters']
    }
});

// function after saved to db
userSchema.post('save', function(doc, next) {
    console.log('new user was created and saved', doc);
    next();
});

// function before saved to db
userSchema.pre('save', function(next) {
    console.log('user about to be created', this)
    next(); 
})

const User = mongoose.model('user', userSchema);

module.exports = User;