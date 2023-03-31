import { IDentalPractice } from "./dentalPracitce.types"
import { IPatient } from "./patient.types"

export type IDoctor = {
    firstName: string,
    lastName: string,
    email: string
    dentalPractice: IDentalPractice,
    patients: IPatient[]
}