const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb+srv://taunkishansh:c0AiWU5njC64WjY5@manage.zwvngo6.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected assign");
})
.catch((error) => {
  console.error("MongoDB connection failed:", error);
});

const assignmentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;