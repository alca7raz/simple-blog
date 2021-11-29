const express = require('express');
const router = express.Router();

// Error
router.get('/:id', (req, res) => {
    res.status(req.params.id).render('error/'+req.params.id, {
        siteName: 'myTestWeb',
        name: 'sxh',
        url: 'http://localhost:8000'
    });
});

module.exports = router;