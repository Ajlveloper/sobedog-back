const express = require('express');
const temperament = express.Router();
const { getTemperament } = require('../controllers/controllerTemperament.js');
 const { Temperament } = require('../db.js')

 temperament.get('/temperaments', async (req, res) => {
    try {
        const temperament = await getTemperament();
        temperament.forEach(t => {
            Temperament.findOrCreate({
                where: {name: t.trim()}
            })
        })
        let temp = await Temperament.findAll();
        res.status(200).json(temp);
    } catch (err) {
        console.log(err)
    }
})

module.exports = temperament;