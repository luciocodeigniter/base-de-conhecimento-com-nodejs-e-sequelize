const router = require('express').Router();
const homeController = require('../controllers/homeController');
const knowledgeController = require('../controllers/knowledgeController');
const { knowledgeDataValidate } = require('../validations/knowledgeValidation');


// Home
router.get('/', homeController.index);

// knowledge
router.get('/knowledge', knowledgeController.index);
router.get('/knowledge/new', knowledgeController.new);
router.post('/knowledge/create',
    knowledgeDataValidate('create'),
    knowledgeController.create
);
router.get('/knowledge/edit/:id', knowledgeController.edit);
router.put('/knowledge/update/:id',
    knowledgeDataValidate('update'),
    knowledgeController.update
);
router.delete('/knowledge/delete/:id', knowledgeController.delete);


// export
module.exports = router;