const express = require("express");
const app = express();
const port = 3000;
const Tours = require("./routes/Tours.js");
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => {
    res.json({ message: "ok" });
});
app.use("/tour-posts", programmingLanguagesRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});