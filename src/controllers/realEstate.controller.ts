import { Request, Response } from 'express';
import { TRealEstatReq } from '../interfaces/realEstate.interfaces';
import { createRealEstateService } from '../services/realEstate/createRealEstate.service';
import { readRealEstateService } from '../services/realEstate/readRealEstate.service';
import { RealEstate } from '../entities';

const createRealEstateController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const realEstateData: TRealEstatReq = req.body;

  const newRealEstate = await createRealEstateService(realEstateData);

  return res.status(201).json(newRealEstate);
};

const readRealEstateController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const realEstates: RealEstate[] = await readRealEstateService();

  return res.json(realEstates);
};

export { createRealEstateController, readRealEstateController };
