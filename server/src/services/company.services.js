import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiErrors.js";

const MAX_COMPANIES_PER_USER = 5;


const createCompany = async (companyData, userId) => {
    const companyCount = await prisma.companies.count({
        where: {
            user_id: userId,
        },
    });

    if (companyCount >= MAX_COMPANIES_PER_USER) {
        throw new ApiError(403, `A user can create a maximum of ${MAX_COMPANIES_PER_USER} companies.`);
    }

    const { company_name, address, gst_number, state, financial_year } = companyData;

    const company = await prisma.companies.create({
        data: {
            company_name,
            address,
            gst_number,
            state,
            financial_year,
            user_id: userId,
        },
    });

    return company;
};


const getCompaniesByUserId = async (userId) => {
    return prisma.companies.findMany({
        where: {
            user_id: userId,
        },
    });
};


const updateCompany = async (companyId, updateData, userId) => {
    const company = await prisma.companies.findFirst({
        where: {
            id: companyId,
            user_id: userId,
        },
    });

    if (!company) {
        throw new ApiError(404, "Company not found or user not authorized.");
    }

    const { company_name, address, gst_number, state, financial_year } = updateData;

    return prisma.companies.update({
        where: {
            id: companyId,
        },
        data: {
            company_name,
            address,
            gst_number,
            state,
            financial_year,
        },
    });
};


const deleteCompany = async (companyId, userId) => {
    const company = await prisma.companies.findFirst({
        where: { id: companyId, user_id: userId },
    });

    if (!company) {
        throw new ApiError(404, "Company not found or user not authorized.");
    }

    return prisma.companies.delete({
        where: { id: companyId },
    });
};

export {
    createCompany,
    getCompaniesByUserId,
    updateCompany,
    deleteCompany
};