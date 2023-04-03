import { IPatient } from "./patient.types";

export interface IXrayImage {
    xRay: string
    patient: IPatient
}