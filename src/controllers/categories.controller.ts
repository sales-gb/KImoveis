import { Request, Response } from 'express';
import { TCategoryReq } from '../interfaces/categories.interfaces';
import { createCategoryService } from '../services/categories/createCategory.service';
import { readCategoriesService } from '../services/categories/readCategory.service';
import { Category } from '../entities';
import { readRealEstateByCategoryIdService } from '../services/categories/readRealEstateByCategoryId.service';

const createCategoryController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const categoryData: TCategoryReq = req.body;

  const newCategory = await createCategoryService(categoryData);

  return res.status(201).json(newCategory);
};

const readCategoriesController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const categories = await readCategoriesService();

  return res.json(categories);
};

const readRealEstateByCategoryIdController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const categoryId = parseInt(req.params.id);

  const realEstates: Category = await readRealEstateByCategoryIdService(
    categoryId,
  );

  return res.json(realEstates);
};

export {
  createCategoryController,
  readCategoriesController,
  readRealEstateByCategoryIdController,
};
