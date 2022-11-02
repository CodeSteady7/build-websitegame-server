const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const HASH_ROUND = 10;
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "nama harus diisi"],
      maxLength: [255, "Panjang nama harus antara 3 - 225 karakter"],
      minLength: [3, "Panjang nama harus antara 3 - 225 karakter"],
    },
    username: {
      type: String,
      require: [true, "nama harus diisi"],
      maxLength: [255, "Panjang username harus antara 3 - 225 karakter"],
      minLength: [3, "Panjang username harus antara 3 - 225 karakter"],
    },
    password: {
      type: String,
      require: [true, "password harus diisi"],
      maxLength: [255, "Panjang password maksinmal 225 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: { type: String },

    fileName: { type: String },

    phoneNumber: {
      type: String,
      require: [true, "nomor telepon harus diisi"],
      maxLength: [12, "Panjang username harus antara 9 - 13 karakter"],
      minLength: [9, "Panjang username harus antara 9 - 13 karakter"],
    },

    favorit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
