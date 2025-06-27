const mongoose =  require ('mongoose');

const SpecializationSchema = new mongoose.Schema({
    name: { type: String, required: true} ,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true},

    image1: { type: String },
    image2: { type: String },
    image3: { type: String },

    metaTitle: { type: String },
metaDescription: { type: String },
canonicalUrl: { type: String },

ogTitle: { type: String },
ogDescription: { type: String },
ogImage: { type: String },

twitterCard: { type: String },
twitterTitle: { type: String },
twitterDescription: { type: String },
twitterImage: { type: String },

    contentHtml: { type:String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Specialization', SpecializationSchema);