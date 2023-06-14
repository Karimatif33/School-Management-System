const mongoose = require ("mongoose");
// mongoose.set("strictQuery", false);
const dbConnect =async () => {
    try {
<<<<<<< HEAD
        await mongoose.connect('mongodb+srv://karim33:Karim010@cluster0.ryo5x4h.mongodb.net/')
=======
        await mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://karimatif:123456**@cluster0.ryo5x4h.mongodb.net/ssm')
>>>>>>> 009fff3b1f610fde9ac42e3160a9c41c692af03a
        console.log("DB Conected Successfully");
    } catch (err) {
        console.log("DB Conection failed", err.message);
        console.error(err.message)
    }
}
dbConnect()