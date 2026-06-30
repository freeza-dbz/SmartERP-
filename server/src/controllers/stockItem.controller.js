import { PrismaClient } from '@prisma/client';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiErrors.js';

const prisma = new PrismaClient();

/**
 * Create a new Stock Item
 * @route POST /api/v1/items
 */
const createStockItem = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    purchasePrice,
    sellingPrice,
    gstRate,
    openingStock,
    unitId,
    groupId,
    companyId,
  } = req.body;

  if (!name || !unitId || !groupId || !companyId) {
    throw new ApiError(400, 'Name, unitId, groupId, and companyId are required');
  }

  const newItem = await prisma.stockItem.create({
    data: {
      name,
      sku,
      purchasePrice,
      sellingPrice,
      gstRate,
      openingStock,
      currentStock: openingStock, // Initialize currentStock with openingStock
      unitId,
      groupId,
      companyId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newItem, 'Stock item created successfully'));
});

/**
 * Get all Stock Items for a company
 * @route GET /api/v1/items
 */
const getStockItems = asyncHandler(async (req, res) => {
  const { companyId } = req.query;

  if (!companyId) {
    throw new ApiError(400, 'companyId query parameter is required');
  }

  const items = await prisma.stockItem.findMany({
    where: { companyId: parseInt(companyId) },
    include: {
      unit: true,
      stockGroup: true,
    },
    orderBy: { name: 'asc' },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, items, 'Stock items fetched successfully'));
});

/**
 * Update a Stock Item
 * @route PUT /api/v1/items/:id
 */
const updateStockItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const itemId = parseInt(id);
  if (isNaN(itemId)) {
    throw new ApiError(400, 'Invalid Stock Item ID');
  }

  const updatedItem = await prisma.stockItem.update({
      where: { id: itemId },
      data,
    }).catch(error => {
      if (error.code === 'P2025') {
        throw new ApiError(404, 'Stock item not found');
      }
      throw error;
    });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedItem, 'Stock item updated successfully')
    );
});

export { createStockItem, getStockItems, updateStockItem };