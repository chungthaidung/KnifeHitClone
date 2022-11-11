import { _decorator, Component, Node, CCInteger, EventKeyboard, systemEvent, SystemEventType, instantiate, macro, Prefab, Vec3, NodePool } from 'cc';
import { MvcBehavior } from '../MvcBehavior';
import { KnifeView } from './KnifeView';
import { WoodView } from './WoodView';
const { ccclass, property } = _decorator;
const STATE = {
    IDLE: 0,
    FLY: 1,
    STICK: 2,
}
const BOARDSTATE = {
    DEFEAT: 0,
    SUCCESS:1,
    PLAYING:2,

}
@ccclass('BoardView')
export class BoardView extends MvcBehavior {
    @property({ type: Prefab })
    private knifePrefab;
    @property({ type: Prefab })
    private woodPrefab;
    private knifeOnWait;
    private knifeOut = [];
    private wood;
    private state;
    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        this.spawnWood();
        this.spawnKnife();
        this.state=BOARDSTATE.PLAYING;
    }
    public spawnKnife() {
        this.knifeOnWait = instantiate(this.knifePrefab);
        this.knifeOnWait.getComponent(KnifeView).setWood(this.wood.getComponent(WoodView));
        this.knifeOnWait.parent = this.node.parent;
        console.log('spawnKnife');
    }
    public spawnWood() {
        this.wood = instantiate(this.woodPrefab);
        this.wood.parent = this.node.parent;
        console.log('spawnWood');
    }
    onKeyDown(event: EventKeyboard) {
        // if (this.getApp().model.playerModel.getKnives() > 0) {
            switch (event.keyCode) {
                case macro.KEY.space:
                    console.log('Press space key');
                    this.knifeOnWait.getComponent(KnifeView).setState(STATE.FLY);
                    this.knifeOut.push(this.knifeOnWait);
                    console.log(this.knifeOut);
                    // this.knifeOut[this.knifeOut.length] = ;
                    if (this.getApp().model.playerModel.getKnives() > 1) {
                        // this.knife = instantiate(this.knifePrefab);
                        // this.knife.getComponent(KnifeView).setWood(this.wood.getComponent(WoodView));
                        // this.knife.parent = this.node.parent;
                        this.spawnKnife()
                    }
                    break;
            }
        // }
    }
    public onWin(){
        // for (let i = 0;i<this.knifeOut.length; i++){
        //     this.knifeOut[i].active= false;
        // }
        // this.knifeOut= []
        // console.log(this.wood.destroy());
    }
}


