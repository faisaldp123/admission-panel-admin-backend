const mongoose =  require ('mongoose');

const SpecializationSchema = new mongoose.Schema({
    name: { type: String, required: true} ,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true},

    image1: { type: String },
    image2: { type: String },
    image3: { type: String },

    contentHtml: { type:String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Specialization', SpecializationSchema);