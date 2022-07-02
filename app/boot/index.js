const connectDB = require("./db");

const startDB = async () => {
    await connectDB(process.env.MONGO_URI);
};

startDB();
