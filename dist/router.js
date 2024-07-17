"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var product_1 = require("./handlers/product");
var update_1 = require("./handlers/update");
var updatePoint_1 = require("./handlers/updatePoint");
var router = (0, express_1.Router)();
//Product
router.get('/product', product_1.getProducts);
router.get('/product/:id', product_1.getOneProduct);
router.put('/product/:id', (0, express_validator_1.body)('name').isString(), product_1.updateProduct);
router.post('/product', (0, express_validator_1.body)('name').isString(), middleware_1.handleInputErrors, product_1.createProduct);
router.delete('/product/:id', product_1.deletedProduct);
//Update
router.get('/update', update_1.getUpdates);
router.get('/update/:id', update_1.getOneUpdate);
router.put('/update/:id', (0, express_validator_1.body)('title').optional(), (0, express_validator_1.body)('body').optional(), (0, express_validator_1.body)('status').isIn([(0, express_validator_1.body)('IN_PROGRESS'), (0, express_validator_1.body)('SHIPPED'), (0, express_validator_1.body)('DEPRECATED')]), (0, express_validator_1.body)('version').optional(), middleware_1.handleInputErrors, function (req, res) { return update_1.updateUpdate; });
router.post('/update', (0, express_validator_1.body)('title').exists().isString(), (0, express_validator_1.body)('body').exists().isString(), (0, express_validator_1.body)('productId').exists().isString(), middleware_1.handleInputErrors, update_1.createUpdate);
router.delete('/update/:id', update_1.deleteUpdate);
//updatePoint
router.get('/updatepoint', updatePoint_1.getPointUpdates);
router.get('/updatepoint/:id', updatePoint_1.getOnePointUpdate);
router.put('/updatepoint/:id', (0, express_validator_1.body)('name').optional().isString(), (0, express_validator_1.body)('description').optional().isString(), middleware_1.handleInputErrors, updatePoint_1.createPointUpdates);
router.post('/updatepoint', (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('description').isString(), (0, express_validator_1.body)('updateId').exists().isString(), middleware_1.handleInputErrors, updatePoint_1.updatePointUpdates);
router.delete('/updatepoint/:id', updatePoint_1.deletePointUpdates);
//handling error
router.use(function (err, req, res, next) {
    console.error(err);
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    }
    else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
//# sourceMappingURL=router.js.map