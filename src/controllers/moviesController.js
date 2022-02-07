const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {
                    movies
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {
                    movie
                });
            })
            .catch(err => {
                console.log(err)
            })
    },
    'new': (req, res) => {
        db.Movie.findAll({
                order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            })
            .then(movies => {
                res.render('newestMovies', {
                    movies
                });
            })
            .catch(err => {
                console.log(err)
            })
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
                where: {
                    rating: {
                        [db.Sequelize.Op.gte]: 8
                    }
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            .then(movies => {
                res.render('recommendedMovies.ejs', {
                    movies
                });
            })
            .catch(err => {
                console.log(err)
            })
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd')
    },
    create: function (req, res) {
        db.Movie.create(req.body)
            .then(result => {
                res.redirect(`/movies/detail/${result.id}`)
            })
            .catch(err => {
                console.log(err)
            })
    },
    edit: function (req, res) {
        db.Movie.findByPk(+req.params.id)
            .then(movies => {
                if (movies) {

                    res.render('moviesEdit', {
                        Movie: movies
                    })

                } else {
                    res.send('No existe esa pelicula')
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    update: function (req, res) {
        db.Movie.update(req.body, {
                where: {
                    id: +req.params.id
                }
            })
            .then(movie => {
                if (movie[0] != 0) {
                    res.redirect(`/movies/detail/${result.id}`)
                } else {
                    res.send('No habia nada para editar')
                }

            })
            .catch(err => {
                console.log(err)
            })
    },
    delete: function (req, res) {
        db.Movie.findByPk(+req.params.id)
            .then(movies => {
                if (movies) {

                    res.render('moviesDelete', {
                        Movie: movies
                    })

                } else {
                    res.send('No existe esa pelicula')
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    destroy: function (req, res) {
        db.Movie.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(result => {
                if (result === 1) {
                    res.send('La pelicula fue eliminada')
                } else {
                    res.send('No existe la pelicula con ese ID')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

}

module.exports = moviesController;