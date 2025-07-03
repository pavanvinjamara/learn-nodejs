// PascalCase (UpperCamelCase) for file names: User.js, Order.js
// Model name (in code) should match the singular version of the entity.

// File: User.js
// Description: Mongoose model for User entity supporting roles like customer, vendor, delivery, and admin.

// Import mongoose from mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


/**
 * @typedef {Object} User
 * Mongoose schema for managing user information across different roles: customer, vendor, delivery, and admin.
 */
// Defining the user schema to save the data we need for user
// variable = newKeyword mongoose.Schema() 
const userSchema = new mongoose.Schema({
    // ===== Basic Identity Fields =====

    // Common user fields

    /**
     * User's full name. Alphabets and spaces only.
    */
    name: {
        type: String, 
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name must be at least 50 characters'],
        match: [/^[A-Za-z\s]+$/, 'Name should only contain alphabets and spaces']
    },

    /**
     * Unique user email address. Must be a valid format.
    */
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },

    /**
     * User password. Required for local provider only.
    */
    password: {
        type: String,
        required: function () {
            return this.provider === 'local';
        },
        trim: true,
        minlength: [6, 'Password must be at least 6 characters'],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(value);
            },
            message:
            'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character',
        }
    },

    /**
     * Confirm password. Must match the password value.
    */
    confirmPassword:{
        type: String,
        required: function () {
            return this.provider === 'local';
        },
        trim: true,
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match',
        },
    },

    /**
     * Gender of the user.
    */
    gender: {
        type: String,
        enum: [ 'male', 'female', 'other'],
        default: 'male'
    },

    /**
     * 10-digit phone number (India format).
     */
    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 10,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    },

    emailVerified: { 
        type: Boolean, 
        default: false 
    },
    phoneVerified: { 
        type: Boolean, 
        default: false 
    },

    /**
     * Array of user addresses. Includes coordinates and default status.
     */
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

    /**
     * Profile image URL. Optional with default fallback.
    */
    profileImage: {
        type: String,
        default: '', // i need to give default image
    },

    /**
     * Indicates how user joined: self, admin-created, or referral.
     */
    joinedAs: {
        type: String,
        enum: ['self', 'admin', 'referral'],
        default: 'self'
    },

    /**
     * Reference to user who referred this user.
     */
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }

    

    // ============= Customer-Specific =============
    cart: [
        {
            foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem'},
            restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
            quantity: {type: Number, default: 1},
            notes: { type: String, default: ''}
        }
    ],
    favoriteRestaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ],

    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }

    ],
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    walletBalance: {
        type: Number,
        default: 0
    },


    // ========= Vendor-specific =========
    vendorDetails: {
        businessName: {
            type: String
        },
        type: {
            type: String,
            enum: [ 'restaurant', 'canteen', 'hotel'],
            default: 'restaurant'
        },
        fssaiLicense: {
            type: String
        },
        fssaiLicenseFile:{ type: String,
        },
        openingHours: {
            open: String,
            close: String,
        },
        address: { street, city, state, zip, country},
        location: {
            lat: Number,
            lng: Number,
        },

        logo: String,

    },

    vendorStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'suspended'],
        default: 'pending'
    },

    totalOrdersServed: {
        type: Number,
        default: 0,
    },

    totalRevenue: {
        type: Number,
        default: 0,
    },

    // =========== Delivery-Specific ======
    deliveryDetails: {
        vehicleType: {
            type: String,
            enum:['bike', 'cycle', 'walk', 'auto'],
            default: 'bike'
        },
        vehicleNumber: String,
        drivingLicenseNumber: String,
        drivingLicenseFile: String,
        idProofNumber: {
            type: String,
        },
        idProofFile: {
            type: String,
        },
        photo: String,
        
    },

    isAvailable: {
        type: Boolean,
        default: false
    },

    currentLocation :{
        lat: Number,
        lng: Number,
    },

    totalDeliveries: {
        type: Number, 
        default: 0
    },

    rating: {
        type: Number,
        default: 5,
    },

    
    /**
     * GeoJSON point for delivery tracking.
     */
    lastKnownLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [lng, lat]
            default: [0, 0]
        }
    },


    // ======== Auth and Security management =====
    otpCode: {
        type: String,
        default: null,
    },
    
    otpType: {
        type: String,
        default: null,

    },

    otpTarget: {
        type: Date,
        default: null,
    },

    otpExpires: {
        type: String,
        default: null,
    },

    isOtpVerified: {
        type: Boolean,
        default: false,
    },
    
    isTwoFactorEnabled: {
        type: Boolean,
        default: false,
    },

    twoFactorSecret: {
        type: String,
        default: null
    },


    // ========= Access control =======
    /**
     * Role used for access control and permissions.
    */
    role: {
        type: String,
        enum: ['customer', 'admin', 'delivery', 'vendor'],
        default: 'customer',
    },

    approvedByAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    isVerified: {
        type: Boolean,
        default: function (){
            return this.role === 'customer';
        }
    },
    
    /**
     * Provider used for signup (local or OAuth).
    */
    provider: {
        type: String,
        enum: ['local', 'google', 'apple', 'microsoft'],
        default: 'local'
    },


    // ======= Session / Security =====
    lastLogin: {
        type: Date,
    },

    loginAttempts: {
        type: Number,
        default: 0
    },

    lockUntil: {
        type: Date
    },


    // ======== App meta ========
    profileCompleted: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true,
    },
    
    isDeleted: {
        type: Boolean,
        default: false,
    },

    deletedAt: {
        type: Date,
        default: null
    },

}, { timestamps: true });

/**
 * Pre-save middleware to:
 * - Prevent saving inactive users.
 * - Hash password if modified.
 * - Remove confirmPassword from DB.
 * - Remove vendor/delivery details if not relevant.
 */

// Pre-save hook to hash password
userSchema.pre('save', async function (next){
    // Do not proceed if user is inactive
    if(!this.isActive){
        const err = new Error('Inactive users cannot be saved');
        return next(err);
    }

    // Only hash if password is modified
    if(!this.isModified('password')) return next();

    // Hash password
    this.password = await bcrypt.hash(this.password , 10);

    // Remove confirmPassword from being saved in DB
    this.confirmPassword = undefined;

    if (this.role !== 'vendor') this.vendorDetails = undefined;
    if (this.role !== 'delivery') this.deliveryDetails = undefined;

    next();
})

/**
 * Automatically filter out soft-deleted users in all find queries.
*/

// Middleware to automatically exclude soft-deleted users from all find queries
userSchema.pre(/^find/, function(next) {
    this.where({ isDeleted: false });
    next();
});

/**
 * Helper method to check if user is a vendor/delivery / customer.
 */
// Helper method to check if user has 'vendor' role
userSchema.methods.isVendor = function () {
    return this.role === 'vendor';
};

// Helper method to check if user has 'delivery' role
userSchema.methods.isDeliveryAgent = function () {
    return this.role === 'delivery';
};

// Helper method to check if user has 'customer' role
userSchema.methods.isCustomer = function () {
    return this.role === 'customer';
};


/**
 * Compare provided password with the hashed password.
 * @param {string} enteredPassword
 * @returns {Promise<boolean>}
 */
// Password comparison method
userSchema.methods.matchPassword = function ( enteredPassword ) {
    return bcrypt.compare( enteredPassword, this.password );
}

/**
 * Virtual property to check if account is locked due to too many login attempts.
 */
// Lock status virtual
// Locking user upto today ex:- lock account after 5 failed attempts
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Geo index for location-based search (e.g., delivery range)
userSchema.index({ lastKnownLocation: '2dsphere' });

/**
 * toJSON transform to remove sensitive fields before sending response.
 */
// toJSON: Hide sensitive fields
// Safe return of user object to client
userSchema.set('toJSON', {
    transform : function (doc, ret, options) {
        delete ret.password;
        delete ret.confirmPassword;
        delete ret.twoFactorSecret;
        delete ret.otpCode;
        delete ret.__v;
        return ret;
    }
})

/**
 * Export the User model.
 */
//  Export the user Schema
//  module.exports = mongoose.model( name, controllers ); 
    module.exports = mongoose.model( 'User', userSchema );