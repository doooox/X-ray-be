import { IDentalPractice } from "./dentalPracitce.types"
import { IDoctor } from "./doctor.types"
import { IXrayImage } from "./xRayImage.types"

export type IPatient = {
    firstName: string,
    lastName: string,
    dentalPractice: IDentalPractice,
    doctor: IDoctor,
    xRays: IXrayImage[]
}