import { Request, Response, NextFunction } from 'express';
import teams from '../database/models/Teams';

function matchMiddleware(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    ).end();
  }

  next();
}

async function validateTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  const tHome = await teams.findByPk(homeTeam);
  const tAway = await teams.findByPk(awayTeam);

  if (!tHome || !tAway) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' }).end();
  }

  return next();
}

export { matchMiddleware, validateTeams };
