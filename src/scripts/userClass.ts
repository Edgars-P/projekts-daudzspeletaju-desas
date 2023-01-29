import { logout, pb } from "./database";

export default class User{
    private name: string|undefined
    public id: string;
    constructor(id: string) {
        this.id = id;
    }
    async getName() {
        if (this.name) {return this.name}
        let user = await pb
            .collection("lietotaji")
            .getOne(this.id, { $autoCancel: false })
            .catch(logout)
        if (!user)
            return false
        this.name = user.username
        return user.username
    
    }
}