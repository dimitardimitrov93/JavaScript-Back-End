const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
        // minlength: [5, 'must be at least 5 characters long.'],
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

// courseSchema.pre('save', function (next) {
//     this.createdAt = new Date();
//     next();
// });

module.exports = mongoose.model('Course', courseSchema);