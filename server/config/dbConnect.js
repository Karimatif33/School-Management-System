const mongoose = require ("mongoose");
// mongoose.set("strictQuery", false);
const dbConnect =async () => {
    try {
        await mongoose.connect('mongodb+srv://karim33:Karim010@cluster0.ryo5x4h.mongodb.net/')
        console.log("DB Conected Successfully");
    } catch (err) {
        console.log("DB Conection failed", err.message);
        console.error(err.message)
    }
}
dbConnect()