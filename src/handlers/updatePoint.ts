import { connect } from "net";
import prisma from "../db";

export const getPointUpdates = async (req, res, next) => {
    try {
        const updates = await prisma.update.findMany({
            where: {
                id: req.body.updateId
            },
            include: {
                updatepoints: true
            }
        })
        res.json({ data: updates })
    } catch (e) {
        next(e)
    }
}
export const getOnePointUpdate = async (req, res, next) => {
    try {
        const update = await prisma.updatePoint.findUnique({
            where: {
                id: req.params.id
            }
        })
        res.json({ data: update })
    } catch (e) {
        next(e)
    }
}
export const createPointUpdates = async (req, res, next) => {
    try {
        //check if the product belongs to the user 
        const update = await prisma.update.findUnique({
            where: {
                id: req.body.updateId
            },
            include: {
                product: {
                    include: {
                        belongsTo: true
                    }
                }
            }

        })

        if (!update || update.product.belongsToId !== req.user.id) {
            //does not belong to user
            return res.json({ message: 'nope' })
        }
        const updated = await prisma.updatePoint.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                update: { connect: { id: (await update).id } }
            }
        })

        res.json({ data: update })
    } catch (e) {
        next(e)
    }
}
export const updatePointUpdates = async (req, res, next) => {
    try {
        const updated = await prisma.update.findMany({
            where: {
                id: req.body.updateId
            },
            include: {
                updatepoints: true
            }
        })

        const updates = updated.reduce((allUpdates, currentUpdated) => {
            return [...allUpdates, ...currentUpdated.updatepoints]
        }, [])

        const match = updates.find(updatePoint => updatePoint.id == req.params.id)

        if (!match) {
            res.json({ message: 'nope' })
        }

        const updatePoint = await prisma.updatePoint.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                description: req.body.description
            }
        })
        res.json({ data: updatePoint })
    } catch (e) {
        next(e)
    }
}
export const deletePointUpdates = async (req, res, next) => {
    try {
        const updated = await prisma.update.findMany({
            where: {
                id: req.body.updateId
            },
            include: {
                updatepoints: true
            }
        })

        const updates = updated.reduce((allUpdates, currentUpdated) => {
            return [...allUpdates, ...currentUpdated.updatepoints]
        }, [])

        const match = updates.find(updatePoint => updatePoint.id == req.params.id)

        if (!match) {
            res.json({ message: 'nope' })
        }

        const deleteupdatePoint = await prisma.updatePoint.delete({
            where: {
                id: req.params.id
            }
        })
        res.json({ data: deleteupdatePoint })
    } catch (e) {
        next(e)
    }
}