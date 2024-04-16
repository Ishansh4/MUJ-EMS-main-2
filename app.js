const express = require("express");
const collection = require("./mongo");
const user = require("./userModel");
const change = require("./userModel2");
const collection2 = require("./mongo2");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }

    } catch (e) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const data = {
        email: email,
        password: password
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
            await collection.insertMany([data]);
        }

    } catch (e) {
        res.json("fail");
    }
});

app.post("/sendData", async (req, res) => {
    try {
        const allData = await collection2.find({});
        res.json(allData);
    } catch (error) {
        res.json("fail");
        console.log(error);
    }
});

app.post("/fetchRelatedData", async (req, res) => {
    try {
        const selectedName = req.body.selectedName;
        const cgpa = req.body.cgpa;
        const relatedData = await collection2.find({
            name: selectedName,
            min_cgpa: { $lte: cgpa }
        });
        res.json(relatedData);
    } catch (error) {
        res.json("fail");
        console.log(error);
    }
});

app.post("/first", async (req, res) => {
    const { name, regno, selectedField, selectedName } = req.body;

    const data2 = {
        name: name,
        regno: regno,
        selectedField: selectedField,
        selectedName: selectedName
    };

    try {
        await user.insertMany([data2]);
        res.json("success");
    } catch (e) {
        res.json("fail");
    }
});

app.post("/sendData2", async (req, res) => {
    try {
        const allData = await user.find({});
        res.json(allData);
    } catch (error) {
        res.json("fail");
        console.log(error);
    }
});

app.post("/sendData3", async (req, res) => {
    try {
        const allData = await change.find({});
        res.json(allData);
    } catch (error) {
        res.json("fail");
        console.log(error);
    }
});

app.post("/sendData4", async (req, res) => {
    try {
        const allData = await collection2.find({});
        res.json(allData);
    } catch (error) {
        res.json("fail");
        console.log(error);
    }
});

app.post("/second", async (req, res) => {
    const { name, newselectedField } = req.body;

    try {
        // Use updateOne() to update the document matching the name
        const result = await user.updateOne({ name: name }, { $set: { selectedField: newselectedField } });

        // Check if the update was successful
        if (result.modifiedCount > 0) {
            res.json("success");
        } else {
            res.json("notfound");
        }
    } catch (error) {
        res.json("fail");
        console.error('Error updating data:', error);
    }
});

app.listen(8000, () => {
    console.log("port connected");
});
