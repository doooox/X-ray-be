import { Request, Response } from "express";
import { errorMessage } from "../../utils/helpers";
import xRayImage from "../../models/DentalPractice/xRayImage";
import Patient from "../../models/DentalPractice/patient";

export const uploadXRayImage = async (req: Request, res: Response) => {
    const { filename } = req.file;
    const { _id } = req.params;
    const url = req.protocol + '://' + req.get('host')

    if (!req.file) return errorMessage(400, res, "No file received");

    if (!filename) return errorMessage(400, res, "No filename receved")

    const singlePatient = await Patient.findById(_id).populate("xRays")

    const newXrayImage = await xRayImage.create({
        xRay: url + '/xrays/' + filename,
        patient: singlePatient._id
    });

    if (!newXrayImage) return errorMessage(400, res, "Failed to upload image");

    singlePatient.xRays.push(newXrayImage)
    await singlePatient.save()

    return res.status(201).json(newXrayImage);
};

export const getXRayImage = async (req: Request, res: Response) => {
    const { _id } = req.params

    const singleXRayImage = await xRayImage.findById(_id).populate("patient")

    if (singleXRayImage) return res.status(200).json(singleXRayImage)
}