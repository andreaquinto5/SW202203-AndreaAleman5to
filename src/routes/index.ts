import { Router} from 'express';

import CashFlowRouter  from './CashFlows';
import UsuariosRouter from './Usuarios';

const router  = Router();

/****************** http://localhost:3001/cashflow/byindex/1 ***********************/

router.use('/cashflow', CashFlowRouter);

router.use('/usuarios', UsuariosRouter);

export default router;
