import { app } from "./app.js";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`⚙️ Server started at post ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Connection error: ", err);
  });

app.use((req, res) => {
  res.send("Hello from server");
});
