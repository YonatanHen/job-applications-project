import Status from "src/enums/status"

export class CRUDApplicationDto {
    id: number
    role: string
    location: string
    date: Date
    status: Status
}