import { Usuarios } from "../entities/Usuarios";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class UsuariosDao extends AbstractDao<Usuarios>{
        public constructor(db: sqlite.Database) {
            super('USUARIOS',db as sqlite.Database);
            super.exec('CREATE TABLE IF NOT EXISTS USUARIOS ('
            + ' _id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
            + ' email TEXT,'
            + ' password TEXT,'
            + ' primerNombre TEXT,'
            + ' segundoNombre TEXT);').then().catch(e => console.error(e));
        }


        public async getUsuarios() {
            return super.findAll();
        }

        public async getUserById(identifier: Partial<Usuarios>) {
            try {
                const result= await super.findByID(identifier);
                return result;
            } catch (ex: unknown) {
                console.log("UsuariosDao sqlite: ", (ex as Error).message);
                throw ex;
            }
        }

        public async insertNewUsuario(newUser: Usuarios) {
            try {
                const result= await super.createOne(newUser);
                return result;
            } catch (ex) {
                console.log("UsuariosDao sqlite: ", (ex as Error).message);
                throw ex;
            }
        }


        public async updateNewUser (updateUser: Usuarios) {
            try {
                const {_id, ...updateObject}= updateUser;
                const result= await super.update({_id}, updateObject);
                return result
            } catch (ex: unknown) {
                console.log('UsuariosDao sqlite: ', (ex as Error).message);
                throw ex;
            }
        }

        public async deleteUser(deleteUser: Partial<Usuarios>) {
            try {
                const {_id} = deleteUser; 
                const result= await super.delete({_id});
                return result;
            } catch (ex: unknown) {
                console.log('UsuarioDao sqlite: ', (ex as Error).message);
                throw ex;
            }
        }
        
}