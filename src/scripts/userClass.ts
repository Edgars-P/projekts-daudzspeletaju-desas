import { logout, pb } from "./database";

export default class User {
    // Lietotāja objekts
    private user: Record<string, any> | undefined
    public id: string | undefined
    constructor(id: string | undefined) {
        this.id = id;
    }

    // Dabū lietotāja objektu
    async getUser() {
        // ja lietotājs ir saglabāts, tad atgriež to
        if (this.user)
            return this.user

        // ja id nav definēts, tas atgriež false
        if (this.id == undefined)
            return false

        // atrod vāŗdu pēc lietotāja ID (nākamās 4 rindas)
        let user = await pb
            .collection("lietotaji")
            .getOne(this.id, { $autoCancel: false })
            .catch(logout)

        // ja lietotājs neeksistē datubāzē, tad atgriež false
        if (!user)
            return false

        return user
    }

    // Dabū lietotāja vārdu no lietotāja objekta
    async getName() {
        // Izmanto getUser
        let user = await this.getUser()
        // ja lietotājs neeksistē datubāzē, tad tas atgriež false
        if (!user)
            return false

        // atgriež lietotājvārdu
        return user.username
    }

}
