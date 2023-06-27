// const dogs = require("../routes/dogs");
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;
const axios = require('axios');

const getDogsApi = async () => {
    try {
        const aDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        let dogs = aDogs.data.map(({ id, name, image, temperament, weight, life_span, height }) => {
            return {
                id: id,
                name: name,
                image: image.url,
                temperaments: temperament,
                height_min: parseInt(height.metric.slice(0, 2).trim()),
                height_max: parseInt(height.metric.slice(4).trim()),
                weight_min: parseInt(weight.metric.slice(0, 2).trim()),
                weight_max: parseInt(weight.metric.slice(4).trim()),
                life_span: life_span
            }
        })
        dogs = dogs.filter(d => d.temperaments !== undefined)
        dogs = dogs.filter(d => d.weight_min && d.weight_max).filter(d => d.height_min && d.height_max)
        
        return dogs;
    } catch (err) {
        console.log(err)
        return [];
    }
}

const getDogsDb = async () => {
    try {
        return await Dog.findAll({
            include: [{
                model: Temperament,
                atributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        })
    } catch (err) {
        console.log(err);
        return [];
    }
}

const getAllDogs = async () => {
    try {
        const dogApi = await getDogsApi();
        const dogDb = await getDogsDb();
        const dogsAll = await dogApi.concat(dogDb);
        return dogsAll;
    } catch (err) {
        console.log(err)
        return [];
    }
}

module.exports = {
    getDogsApi,
    getDogsDb,
    getAllDogs
}