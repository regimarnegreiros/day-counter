import CardRepository from "../repositories/card.repository.ts";

export default class CardService{
    private constructor(){}

    static async deleteCard(id:Number) {
        //calls repository to run a delete;
    }
    
    static async getCardById(id: Number) {
        //calls repository to run a select;
    }
    
    static async getAllUserCards() {
        //calls repository to run a select;
    }
    static async updateCard(id:Number, title:string, icon:string, type:string, start_date:string, end_date:string, hue:string, description:string, notify_interval:string) {
        //calls repository to run a update;
    }
    
    static async createCard(title:string, icon:string, type:string, start_date:string, end_date:string, hue:string, description:string, notify_interval:string){
        //calls repository to run a insert;
    }   
}