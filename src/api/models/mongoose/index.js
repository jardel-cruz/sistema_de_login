const mongoose = require("mongoose");

const securiteSchema = new mongoose.Schema(
    {
        senha: { type: String, require: true }
    },
    {
        versionKey: false
    }
);

const securite = mongoose.model("securite", securiteSchema);

module.exports = securite