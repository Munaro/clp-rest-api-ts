import { Response } from "express";
import { Prisma } from "@prisma/client";

const handleErrors = (err: any, res: Response, statusCode?: number) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
        return res.status(404).json({
            message: 'Registro não encontrado.',
            err: err.toString()
        }).end();
    } else if (
        err instanceof Prisma.PrismaClientKnownRequestError ||
        err instanceof Prisma.PrismaClientUnknownRequestError ||
        err instanceof Prisma.PrismaClientRustPanicError ||
        err instanceof Prisma.PrismaClientInitializationError ||
        err instanceof Prisma.PrismaClientValidationError
    ) {
        return res.status(500).json({
            message: 'Houve uma falha na comunicação com o banco de dados.',
            err: err.toString()
        }).end();
    } else if (err instanceof Error) {
        return res.status(statusCode || 400).json({
            message: err.message,
            err: err.toString()
        }).end();
    } else {
        return res.status(500).json({
            message: 'Ocorreu um erro desconhecido.',
            err: err.toString()
        }).end();
    }
}

export default handleErrors;