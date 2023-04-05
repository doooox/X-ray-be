import { Request, Response } from "express";
import DentalPractice from "../../models/DentalPractice/dentalPractice";
import Doctor from "../../models/DentalPractice/doctor";
import { errorMessage } from "../../utils/helpers";

export const getAllDoctors = async (req: Request, res: Response) => {
    const doctors = await Doctor.find({})

    if (!doctors) return errorMessage(400, res, "No doctors found!")

    res.status(200).json(doctors)
}

export const getDoctor = async (req: Request, res: Response) => {
    const { _id } = req.params

    if (!_id) return errorMessage(400, res, "Id is required!")

    const getSingleDoctor = await Doctor.findOne({ _id }).populate('patients').populate("dentalPractice")
    if (getSingleDoctor) return res.status(200).json(getSingleDoctor)
    errorMessage(400, res, "No doctro with that ID found!")
}

export const addDoctor = async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body
    const { _id } = req.params

    if (!_id) return errorMessage(400, res, "Dental practice id required")

    const dentalPractice = await DentalPractice.findById(_id)

    if (!dentalPractice) return errorMessage(400, res, "No dental practice found")

    const doctorExists = await Doctor.findOne({ email })
    if (doctorExists) return errorMessage(200, res, "Doctor already added!")

    const newDoctor = await Doctor.create({
        firstName,
        lastName,
        email,
        dentalPractice: _id
    })

    dentalPractice.doctors.push(newDoctor)
    await dentalPractice.save()

    if (newDoctor) return res.status(200).json(newDoctor);

}
export const getSearchedDoctor = async (req: Request, res: Response) => {
    const { search } = req.query

    const seachedDoctrod = await Doctor.find({
        $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
        ]
    }).select("_id firstName lastName")

    res.status(200).json(seachedDoctrod)
}