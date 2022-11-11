import { _decorator, Component, Node } from 'cc';
import { GameController } from './Controller/GameController';
import { MvcBehavior } from './MvcBehavior';
const { ccclass, property } = _decorator;

@ccclass('ControllerContainer')
export class ControllerContainer extends MvcBehavior {
    public gameController;
    start(){
        this.gameController = this.getComponent(GameController);
    }
  
}


