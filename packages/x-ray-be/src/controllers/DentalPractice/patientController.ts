import { Request, Response } from "express";
import DentalPractice from "../../models/DentalPractice/dentalPractice";
import Doctor from "../../models/DentalPractice/doctor";
import Patient from "../../models/DentalPractice/patient";
import { errorMessage } from "../../utils/helpers";


export const getAllPatients = async (req: Request, res: Response) => {
    const patients = await Patient.find({})

    if (!patients) return errorMessage(400, res, "No patients found!")

    res.status(200).json(patients)
}

export const getPatietnt = async (req: Request, res: Response) => {
    const { _id } = req.params

    if (!_id) return errorMessage(400, res, "Id is required")

    const getSinglePatient = await Patient.findById({ _id })
        .populate('doctor')
        .populate('dentalPractice')
        .populate({
            path: "xRays",
            options: { sort: { createdAt: "desc" } }
        })

    if (getSinglePatient) return res.status(200).json(getSinglePatient);
    errorMessage(400, res, "No Patient found")
}

export const addPatient = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body
    const { _id } = req.params

    const doctor = await Doctor.findById({ _id }).populate('patients').populate('dentalPractice')
    if (!doctor) return errorMessage(400, res, "No doctor found")

    const dentalPracitce = await DentalPractice.findById(doctor.dentalPractice)

    const newPatient = await Patient.create({
        firstName,
        lastName,
        dentalPractice: {
            _id: dentalPracitce._id,
            name: dentalPracitce.name,
            address: dentalPracitce.address
        },
        doctor: {
            _id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            email: doctor.email,
        }
    })

    doctor.patients.push(newPatient)
    await doctor.save()

    if (newPatient) return res.status(201).json(newPatient)
}

export const getSerchedPatient = async (req: Request, res: Response) => {
    const { search } = req.query

    const seachedPatient = await Patient.find({
        $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
        ]
    }).select("_id firstName lastName")

    res.status(200).json(seachedPatient)
}

