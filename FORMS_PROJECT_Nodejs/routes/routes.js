const router = require('express').Router();
const FormController  = require('../controllers/FormController');
router.post('/create/form',FormController.createForm);
router.get('/form/:slug',FormController.FormBySlug);
router.get('/forms',FormController.getForms);
router.post('/form/response',FormController.saveFormResponse);
router.get('/form/:slug/responses',FormController.getFormResponses);
module.exports = router;
