export class Users {
    private id: number;
    private userName: string;

    constructor(id: number, name: string){
        this.id = id;
        this.userName = name;
    }

    public getId = (): number  => {
    return this.id;
    }

    public setId = (id: number): void => {
        this.id = id;
    }

    public setUserName = (name: string): void => {
        this.userName = name;
    }

    public getUserName = (): string => {
        return this,this.userName;
    }

}

export abstract class UsersList {
    private static  usersList: Array<Users> = new Array<Users>();
    constructor(){
        UsersList.usersList = new Array<Users>();
        UsersList.usersList.push( new Users(1, 'Tirth'))
        UsersList.usersList.push( new Users(2, 'Rahul'))
        UsersList.usersList.push( new Users(3, 'Gaurav'))
        UsersList.usersList.push( new Users(4, 'Pramod'))
    }

    public static getUsersList = (): Array<Users> => {
        return UsersList.usersList;
    }


}

export class List extends UsersList{
    constructor(){
        super();

    }
    public  getUsersList = (): Array<Users> => {
        return UsersList.getUsersList();
    }
}

export interface Transactions {
    userId: number,
    transactionType: number,
    amount: number,
    date: Date
}

