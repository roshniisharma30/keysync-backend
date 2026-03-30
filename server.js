const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://roshniisharma30_db_user:lNRh5BUKlq6RPqdb@cluster0.fq5gkjs.mongodb.net/?appName=Cluster0')
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch(err => console.error("Connection error", err));

const passwordSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    url: String,
    username: String,
    password: String
});

const Password = mongoose.model('Password', passwordSchema);

app.get('/api/passwords', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).send("Unauthorized");
    const passwords = await Password.find({ userId });
    res.json(passwords);
});

app.post('/api/passwords', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).send("Unauthorized");
    const newPassword = new Password({ ...req.body, userId });
    await newPassword.save();
    res.status(201).send("Saved");
});

app.put('/api/passwords/:id', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).send("Unauthorized");
    await Password.findOneAndUpdate({ _id: req.params.id, userId }, req.body);
    res.send("Updated");
});

app.delete('/api/passwords/:id', async (req, res) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).send("Unauthorized");
    await Password.findOneAndDelete({ _id: req.params.id, userId });
    res.send("Deleted");
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log("Server running on port 3000"));
}
module.exports = app;