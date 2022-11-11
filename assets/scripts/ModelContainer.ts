import { _decorator, Component, Node } from 'cc';
import { PlayerModel } from './Model/PlayerModel';
import { MvcBehavior } from './MvcBehavior';
const { ccclass, property } = _decorator;

@ccclass('ModelContainer')
export class ModelContainer extends MvcBehavior {
    public playerModel;
    start() {
        this.playerModel = this.getComponent(PlayerModel);
    }

    update(deltaTime: number) {
        
    }
}


