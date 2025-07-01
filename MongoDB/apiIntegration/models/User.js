// PascalCase (UpperCamelCase) for file names: User.js, Order.js
// Model name (in code) should match the singular version of the entity.

// Import mongoose from mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defining the user schema to save the data we need for user
// variable = newKeyword mongoose.Schema() 
const userSchema = new mongoose.Schema({
    // name , email , password, phone , address, profileImage,  cart, favoriteRestaurants, orders, role, isActive, createdAt
    name: {
        type: String, 
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 6,
    },

    confirmPassword:{
        type: String,
        required: [ true, 'Please confirm your Password'],
        trim: true,
        validate: {
            validator: function (value) {
                return value === this.password;
            }
        },
        message: 'Passwords do not match',
    },

    gender: {
        type: String,
        enum: [ 'male', 'female', 'other'],
        default: 'male'
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
    },

    address: [
        {
            label: {
                type: String // e.g. Home, Work, Office
            },
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String,
            coordinates: {
                lat: Number,
                lng: Number
            },
            isDefault: {
                type: Boolean,
                default: false
            }
        }
    ],

    profileImage: {
        type: String,
        default: '',
    },

    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ],

    cart: [
        {
            foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'},
            restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Resturant'},
            quantity: {type: Number, default: 1},
            notes: { type: String, default: ''}
        }
    ],

    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }

    ],

    role: {
        type: String,
        enum: ['customer', 'admin', 'delivery'],
        default: 'customer',
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash password
userSchema.pre('save', async function (next){
    // Do not proceed if user is inactive
    if(!this.Active){
        const err = new Error('Inactive users cannot be saved');
        return next(err);
    }

    // Only hash if password is modified
    if(!this.isModified('password')) return next();

    // Hash password
    this.password = await bcrypt.hash(this.password , 10);

    // Remove confirmPassword from being saved in DB
    this.confirmPassword = undefined;

    next();
})

// Method to compare password
userSchema.methods.matchPassword = function ( enteredPassword ) {
    return bcrypt.compare( enteredPassword, this.password );
}

//  Export the user Schema
//  module.exports = mongoose.model( name, controllers ); 
    module.exports = mongoose.model( 'User', userSchema );

