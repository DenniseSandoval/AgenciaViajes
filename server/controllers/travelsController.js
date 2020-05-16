const Travel = require('../models/Travels');
//el exports permite exportar bastantes pdaos de codigo
exports.showTravels = async (req, res) => {//en el local host
    const viajes = await Travel.findAll()
    res.render('travels', {
        page: 'Póximos Viajes',
        viajes//o solo pasar travels porque ambos tiene el mismo nombre el objeto y el nombre de la variable, esta variable se usa en el .pug de travel
    })
}

exports.showTravel = async (req, res) => {//en el local host
    const travelId = await Travel.findByPk(req.params.id)
    res.render('travel', {
        travelId
    })
}