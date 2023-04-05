import { Request, Response } from "express"
import DentalPractice from "../../models/DentalPractice/dentalPractice"
import { errorMessage } from "../../utils/helpers"

export const getAllDentalPractices = async (req: Request, res: Response) => {

    const dentalPractice = await DentalPractice.find({})

    if (!dentalPractice) return errorMessage(400, res, "No dental practices found")

    res.status(200).json(dentalPractice)
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

export const getSearchedDentalPractices = async (req: Request, res: Response) => {
    const { search } = req.query;

    const searchedDentalPractices = await DentalPractice.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
        ],
    }).select("_id name address");

    if (!searchedDentalPractices || searchedDentalPractices.length === 0) {
        return errorMessage(404, res, "No dental practice found!");
    }

    return res.status(200).json(searchedDentalPractices);
};

