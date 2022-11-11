import { _decorator, Component, Node, Prefab, CCInteger } from 'cc';
import { MvcBehavior } from '../MvcBehavior';
const { ccclass, property } = _decorator;

@ccclass('PlayerModel')
export class PlayerModel extends MvcBehavior {
    @property({type:CCInteger})
    private knives;
    public removeKnife(remove)
    {
        this.knives -= remove;
    }
    public getKnives(){
        return this.knives;
    }
    public setKnives(newKnives){
        this.knives= newKnives;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


