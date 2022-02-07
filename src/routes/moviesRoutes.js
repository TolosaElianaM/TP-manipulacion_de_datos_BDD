const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);


//Rutas exigidas para la creación del CRUD
router.get('/add', moviesController.add);
router.post('/create', moviesController.create);
/* router.???('/', moviesController.edit); */
/* router.???('/', moviesController.update); */
/* router.???('/', moviesController.delete); */
/* router.???('/', moviesController.destroy); */

module.exports = router;