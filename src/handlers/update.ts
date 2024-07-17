import prisma from "../db";

//Get all
export const getUpdates = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        })

        //to calcualte all the updates of each product and give me all updates eventually
        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, [])

        res.json({ data: updates })
    } catch (e) {
        next(e)
    }
}

export const getOneUpdate = async (req, res, next) => {
    try {
        const update = await prisma.update.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.json({ data: update })
    } catch (e) {
        next(e)
    }
}
export const createUpdate = async (req, res, next) => {
    try {
        //check if the product belongs to the user 
        const product = prisma.product.findUnique({
            where: {
                id: req.body.productId
            }
        })

        if (!product) {
            //does not belong to user
            return res.json({ message: 'nope' })
        }
        const update = await prisma.update.create({
            data: {
                title: req.body.title,
                body: req.body.body,
                product: { connect: { id: (await product).id } }
            }
        })

        res.json({ data: update })
    } catch (e) {
        next(e)
    }
}
export const updateUpdate = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        })

        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, [])

        const match = updates.find(update => update.id == update.params.id)

        if (!match) {
            res.json({ message: 'nope' })
        }

        const updateUpdate = await prisma.update.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.json({ data: updateUpdate })
    } catch (e) {
        next(e)
    }
}
export const deleteUpdate = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        })

        const updates = products.reduce((allUpdates, product) => {
            return [...allUpdates, ...product.updates]
        }, [])

        const match = updates.find(update => update.id == update.params.id)

        if (!match) {
            res.json({ message: 'nope' })
        }

        const deleted = await prisma.update.delete({
            where: {
                id: req.params.id
            }
        })

        res.json({ data: deleted })
    } catch (e) {
        next(e)
    }
}