const { getDogsApi } = require('./controllerDogs.js');

const getTemperament = async () => {
    try {
        const dogs = await getDogsApi();
        const temperament = await dogs.map(t => t.temperaments).join().split(',');
        return temperament;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getTemperament
};