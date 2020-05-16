const Testimonial = require('../models/Testimonials');
exports.showTestimonials = async (req, res) => {//en el local host
    const testimoniales = await Testimonial.findAll()
    res.render('testimonial', {
        page: 'Testimoniales',
        testimoniales
    })
}
exports.addTestimonial = async (req, res) => {
    //console.log(req.body);
    //Validar que todos los campos esten llenos
    let { nombre, correo, mensaje } = req.body;//destructuring
    let errors = [];
    if (!nombre) {
        errors.push({ 'mensaje': 'Agrega tu nombre' })
    }
    if (!correo) {
        errors.push({ 'mensaje': 'Agrega tu correo' })
    }
    if (!mensaje) {
        errors.push({ 'mensaje': 'Agrega tu mensaje' })
    }
    //Revisar por errores
    if (errors.length > 0) {
        //muestra la vista con errores
        const testimonials = await Testimonial.findAll();
        res.render('testimonial', {
            //para que se pas elo que el usuario haya llenado en el form
            errors,
            nombre,
            correo,
            mensaje,
            page: 'Testimoniales',
            testimonials
        })
    } else {
        //almacenarlo en la bd
        await Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        res.redirect('/testimonials')
    }
}