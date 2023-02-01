export class Share {   
    private spelesID:string
    constructor(spelesId:string) {
        this.spelesID=spelesId
    }
    public getLink(){
        return "https://desas.0xff.lv/game/#" + this.spelesID
    }
    public copyLink(){
        const link=this.getLink()
        navigator.clipboard.writeText(link)
    }
}

new Share("spelesId")

