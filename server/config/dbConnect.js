const mongoose = require ("mongoose");
// mongoose.set("strictQuery", false);
const dbConnect =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://karimatif:123456**@cluster0.ryo5x4h.mongodb.net/ssm')
        console.log("DB Conected Successfully");
    } catch (err) {
        console.log("DB Conection failed", err.message);
        console.error(err.message)
    }
}
dbConnect()