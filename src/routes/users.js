import express from 'express';
import getAllUser from '../api/member/all';
import getDetailUser from '../api/member/detail';
import updateUser from '../api/member/update/update';
import deleteUser from '../api/member/delete';
import { checkPermission } from '../middleware/checkPermission';

const router = express.Router();

router.get('/',getAllUser)
router.get('/:id',getDetailUser)
router.delete('/:id',deleteUser)
router.patch('/:id',updateUser)

export default router