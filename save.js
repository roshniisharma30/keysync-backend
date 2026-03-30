const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://mitanshu:w3dO7xq8IRqg7f2o@cluster0.ff3p1fv.mongodb.net/?appName=Cluster0';

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to Database');
        saveData();
    })
    .catch((error) => console.error('Connection failed:', error));

const credentialSchema = new mongoose.Schema({
    url: String,
    username: String,
    password: String
});

const Credential = mongoose.model('Credential', credentialSchema);

async function saveData() {
    try {
        const newEntry = new Credential({
            url: 'github.com',
            username: 'admin_user',
            password: 'securepassword123'
        });

        await newEntry.save();
        console.log('Data successfully saved to MongoDB!');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error saving data:', error);
    }
}