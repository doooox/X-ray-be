import { IDoctor } from "./doctor.types"

export type IDentalPractice = {
    name: string,
    address: string
    doctors: IDoctor[]
}