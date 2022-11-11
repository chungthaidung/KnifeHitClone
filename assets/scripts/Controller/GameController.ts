import { _decorator, Component, Node, find, Collider2D, IPhysics2DContact, director } from 'cc';
import { ModelContainer } from '../ModelContainer';
import { MvcBehavior } from '../MvcBehavior';
import { WoodView } from '../View/WoodView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends MvcBehavior {
    start() {
    }
    public onKnifeSticked(){
        this.getApp().model.playerModel.removeKnife(1);
        if (this.getApp().model.playerModel.getKnives() <= 0 )
        {
            console.log('win')
            this.getApp().view.boardView.onWin();
        }
    }
    public onDefeat(){
        console.log('DEFEAT');
    }
    public restartLevel(){
        this.getApp().model.playerModel.setKnives(5);
    }
    public startNextLevel(){
        this.getApp().model.playerModel.setKnives(5);
    }
    update(deltaTime: number) {

    }
}


