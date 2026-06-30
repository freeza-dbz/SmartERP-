import { PrismaClient, LedgerType } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiErrors.js';

const prisma = new PrismaClient();

const createLedger = asyncHandler(async (req, res) => {
  const { name, type, openingBalance, companyId } = req.body;

  if (!name || !type || !companyId) {
    throw new ApiError(400, 'Name, type, and companyId are required');
  }

  if (!Object.values(LedgerType).includes(type)) {
    throw new ApiError(400, 'Invalid ledger type');
  }

  const newLedger = await prisma.ledger.create({
    data: {
      name,
      type,
      openingBalance: openingBalance || 0,
      currentBalance: openingBalance || 0,
      company: {
        connect: { id: companyId },
      },
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201, 
        newLedger, 
        "Ledger created successfully"
      ));
});

const getLedgers = asyncHandler(async (req, res) => {
  const { companyId, type } = req.query;

  if (!companyId) {
    throw new ApiError(400, 'companyId query parameter is required');
  }

  const where = {
    companyId: parseInt(companyId),
  };

  if (type && Object.values(LedgerType).includes(type)) {
    where.type = type;
  }

  const ledgers = await prisma.ledger.findMany({ where, orderBy: { name: 'asc' } });
  return res.status(200).json(new ApiResponse(200, ledgers, "Ledgers fetched successfully"));
});

const updateLedger = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const ledgerId = parseInt(id);
  if (isNaN(ledgerId)) {
    throw new ApiError(400, "Invalid Ledger ID");
  }

  const updatedLedger = await prisma.ledger.update({
    where: { id: ledgerId },
    data,
  }).catch(error => {
    if (error.code === 'P2025') {
      throw new ApiError(404, 'Ledger not found');
    }
    throw error;
  });

  return res.status(200).json(new ApiResponse(200, updatedLedger, "Ledger updated successfully"));
});

export {
  createLedger,
  getLedgers,
  updateLedger
}
