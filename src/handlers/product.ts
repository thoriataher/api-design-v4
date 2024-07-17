import prisma from "../db";
//Get all
export const getProducts = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            include: {
                products: true
            }
        })
        res.json({ data: user.products })
    } catch (e) {
        next(e)
    }
}

//Get One 
export const getOneProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await prisma.product.findFirst({
            where: {
                id,
                belongsToId: req.user.id
            }
        })
        res.json({ data: product })
    } catch (e) {
        next(e)
    }
}

//create product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.json({ data: product })
    } catch (e) {
        next(e)
    }
}

//update product
export const updateProduct = async (req, res, next) => {
    try {
        const updated = await prisma.product.update({
            where: {
                id: req.params.id,
                belongsToId: req.user.id
            },
            data: {
                name: req.body.name,
            }
        })
        res.json({ data: updated })
    } catch (e) {
        next(e)
    }
}

//delete product
export const deletedProduct = async (req, res, next) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        })

        res.json({ data: deleted })
    } catch (e) {
        next(e)
    }
}