const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  console.log("Connecting to MongoDB");
  try {
    await mongoose.connect(db, { useNewUrlParser: true,
				 useCreateIndex: true,
				 useFindAndModify: false,
				 useUnifiedTopology: true  });
    console.log('MongoDB connected');
  } catch (err) {
    console.log("Failed to connect to MongoDB");
    console.error(err.message);
    // Exit Process with failure
    process.exit(1);
  }
}

module.exports = connectDB;
