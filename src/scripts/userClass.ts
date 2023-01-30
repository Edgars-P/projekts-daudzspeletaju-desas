import { logout, pb } from "./database";

export default class User{
    private name: string|undefined
    public id: string;
    constructor(id: string) {
        this.id = id;
    }
    async getName() {
        // ja vārds ir saglabāts, tad atgriež lietotājvārdu
        if (this.name) {return this.name}
        // atrod vāŗdu pēc lietotāja ID (nākamās 4 rindas)
        let user = await pb
            .collection("lietotaji")
            .getOne(this.id, { $autoCancel: false })
            .catch(logout)
        // ja lietotājs neeksistē, tad tas atgriež false
        if (!user)
            return false
        // saglabā lietotājvārdu nākamajai reizei
        this.name = user.username
        // atgriež lietotājvārdu
        return user.username
    
    }
}