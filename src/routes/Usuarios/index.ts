import { Router } from "express";
import { Usuarios, IdUsuarios } from "@server/libs/Usuarios";

const router= Router(); 
const userInstance= new Usuarios(); 

router.get('/', async (_req, res) => {
    try {
        res.json(await userInstance.getAllUsers());
    } catch (ex) {
        console.error(ex);
        res.status(503).json({error:ex});
    }
});

router.get('/byindex/:index', async (req, res)=> {
    try {
        const { index }= req.params;
        res.json(await userInstance.getUserByIndex(+index));
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al obtener el registro del usuario'});
    }
});

router.post('/new', async (req, res)=> {
    try {
        const newUser= req.body as unknown as IdUsuarios;
        const newUserIndex= await userInstance.addUser(newUser);
        res.json(newUserIndex);
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

router.put('/update/:index', async (req, res)=> {
    try {
        const { index }= req.params;
        const userUpdate= req.body as IdUsuarios;
        await userInstance.updateUser(+index, userUpdate);
        res.status(200).json({'msg': 'Registro Actualizado'});
    } catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
});

router.delete('/delete/:index', (req, res)=> {
    try {
        const { index } = req.params; 
        if(userInstance.deleteUser(+index)){
            res.status(200).json({'msg': 'Registro de usuario Eliminado'});
        } else {
            res.status(500).json({'msg': 'Error al eliminar el registro de usuario'});
        }
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({'msg': 'Error al eliminar el registro de usuario'});
    }
});

export default router;