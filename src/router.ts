import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middleware';
import { createProduct, deletedProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { createPointUpdates, deletePointUpdates, getOnePointUpdate, getPointUpdates, updatePointUpdates } from './handlers/updatePoint';
const router = Router();

//Product
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').isString(), updateProduct);
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deletedProduct);


//Update
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')]),
    body('version').optional(),
    handleInputErrors,
    (req, res) => updateUpdate);
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleInputErrors, createUpdate);
router.delete('/update/:id', deleteUpdate);

//updatePoint
router.get('/updatepoint', getPointUpdates);
router.get('/updatepoint/:id', getOnePointUpdate);
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleInputErrors, createPointUpdates);
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    handleInputErrors, updatePointUpdates);
router.delete('/updatepoint/:id', deletePointUpdates);

//handling error
router.use((err, req, res, next) => {
    console.error(err); 
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
export default router;