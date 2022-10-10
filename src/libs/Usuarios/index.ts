import { getConnection } from "@server/dao/models/sqlite/SqliteConn";
import { UsuariosDao } from "@server/dao/models/sqlite/UsuariosDao";

export interface IdUsuarios {
    email: String; 
    password: String; 
    primerNombre: String; 
    segundoNombre: String;
};

export class Usuarios {
    private dao: UsuariosDao;
    public constructor() {
        getConnection().then(conn => {
            this.dao= new UsuariosDao(conn);
        }).catch(ex => 
            {
                console.error(ex);
            })
    }

    public getAllUsers() {
        return this.dao.getUsuarios();
    }

    public getUserByIndex(index: number) {
        return this.dao.getUserById({_id:index});
    }

    public addUser(user: IdUsuarios) {
        return this.dao.createOne(user);
    }

    public updateUser(index: number,user: IdUsuarios) {
        return this.dao.update({_id:index}, user);
    }

    public deleteUser(index:number) {
        return this.dao.delete({_id:index});
    }
}