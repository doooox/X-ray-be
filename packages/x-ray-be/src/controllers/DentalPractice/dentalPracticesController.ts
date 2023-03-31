import { Request, Response } from "express"
import DentalPractice from "../../models/DentalPractice/dentalPractice"
import { errorMessage } from "../../utils/helpers"

export const getAllDentalPractices = async (req: Request, res: Response) => {
    const dentalPractices = await DentalPractice.find({})
    if (dentalPractices) return res.status(200).json(dentalPractices)
    errorMessage(400, res, "No dental practices found")
}

export const getSingleDentalPractice = async (req: Request, res: Response) => {
    const { _id } = req.params

    const dentalPractice = await DentalPractice.findOne({ _id }).populate('doctors')

    if (dentalPractice) return res.status(200).json(dentalPractice)
    errorMessage(400, res, "No dental practice with that ID")
}

export const addDentalPractice = async (req: Request, res: Response) => {
    const { name, address } = req.body

    const dentalPracticeExists = await DentalPractice.exists({ name })
    if (dentalPracticeExists) return errorMessage(403, res, "Dental pracice already added")

    const newDentalPractice = await DentalPractice.create({
        name,
        address,
    })

    if (newDentalPractice) return res.status(200).json(newDentalPractice)
    errorMessage(400, res, "Invalid data")
}