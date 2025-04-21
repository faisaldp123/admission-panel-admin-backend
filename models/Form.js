const mongoose = require ('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

const Form = mongoose.model('Form', formSchema);
module.exports = Form;