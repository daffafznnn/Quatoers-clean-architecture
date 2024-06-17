import mongoose from "mongoose";
const { Schema } = mongoose;

const quoteSchema = new Schema({
  uuid: {
    type: String,
    default: () => mongoose.Types.ObjectId().toString(),
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
