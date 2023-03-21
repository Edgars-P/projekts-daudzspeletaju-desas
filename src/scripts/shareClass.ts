// Definē Share klasi, lai izveidotu koplietošanas saiti un to kopētu uz starpliktuvi
export class Share {
  // Privāts spelesID atribūts, kas glabā spēles identifikatoru
  private spelesID: string;
  // Konstruktors, kas pieņem spelesId kā argumentu un iestata to kā spelesID atribūtu
  constructor(spelesId: string) {
    this.spelesID = spelesId;
  }
  // Metode, kas atgriež spēles koplietošanas saiti
  public getLink() {
    return "https://desas.0xff.lv/game/#" + this.spelesID;
  }
  // Metode, kas kopē spēles koplietošanas saiti uz starpliktuvi
  public copyLink() {
    const link = this.getLink();
    navigator.clipboard.writeText(link);
  }
}

// Izveido jaunu Share objektu ar "spelesId" kā argumentu
new Share("spelesId");
