const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    projectDescription: {
        type: String,
        required: true,
        trim: true,
    },
    composition: {
        type: String,
        required: true,
    },
    targetGroup: {
        type: String,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    offer: {
        type: String,
        required: true,
    },
    /**Radio button */
    projectOption: {
        type: String,
        required: true,
    },
    projectStatus: {
        type: String,
        required: true,
    },
    business: {
        type: String,
        required: true,
        trim: true
    },
    pattern: {
        type: String,
        required: true,
        trim: true
    },
    /********************************************** */

    /**message  */
    notes: {
        type: String,
        required: true,
        trim: true
    },
    /*********************************************** */

    /**checkbox */
    checkboxes: {
        type: Array,
        required: true,
        trim: true
    },
    typeLogo: {
        type: Array,
        required: true,
        trim: true
    }
    /***************************************** */
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);