import { _decorator, Component, Node, CCInteger, EventKeyboard, systemEvent, SystemEventType, instantiate, macro, Prefab, Vec3, NodePool, math, find, Root } from 'cc';
import { MvcBehavior } from '../MvcBehavior';
import { AppRoot } from '../Root/AppRoot';
import { AppleView } from './AppleView';
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
    SUCCESS: 1,
    PLAYING: 2,

}
@ccclass('BoardView')
export class BoardView extends MvcBehavior {
    @property({ type: Prefab })
    private knifePrefab;
    @property([Prefab])
    private woodPrefab;
    @property({ type: Prefab })
    private applePrefab;
    // private knife;
    // private knivesPool;
    private knivesOut = [];
    private apples = []
    private wood;
    // private state;
    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        // this.knivesPool = new NodePool('Knife');
        // this.woodPool = new NodePool('Wood');
        // let firstlevel = find('Root')?.getComponent(AppRoot).levelData.getLevel(0);
        // this.spawnWood();
        // this.spawnKnife();
        // this.spawnApple();
        // this.state=BOARDSTATE.PLAYING;
    }

    public spawnKnife() {
        let knife = instantiate(this.knifePrefab);
        knife.getComponent(KnifeView).setWood(this.wood.getComponent(WoodView));
        knife.parent = this.node.parent;
        this.knivesOut[this.knivesOut.length]= knife;
        console.log('spawnKnife');
    }
    public spawnApple(angle?) {
        let apple = instantiate(this.applePrefab);
        apple.getComponent(AppleView).setWood(this.wood.getComponent(WoodView));
        apple.parent = this.node.parent;
        apple.getComponent(AppleView).setAngle(angle ?? 90);
        this.apples[this.apples.length] = apple;
        console.log('spawnApple');
    }
    public spawnWood(startspeed,middlespeed,endspeed,time1,time2,time3) {
        this.wood = instantiate(this.woodPrefab[math.randomRangeInt(0,2)]);
        this.wood.parent = this.node.parent;
        this.wood.getComponent(WoodView).inIt(startspeed,time1,middlespeed,time2,endspeed,time3);
        console.log('spawnWood');
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.space:
                if (this.getApp().model.playerModel.getKnives() > 0) {
                    console.log(this.getApp().model.playerModel.getKnives());
                    this.knivesOut[this.knivesOut.length-1].getComponent(KnifeView).setState(STATE.FLY);
                    if (this.getApp().model.playerModel.getKnives() > 1) {
                        this.spawnKnife()
                    }
                }
                break;
        }

    }
    public onWin() {
        setTimeout(() => {
            this.knivesOut.forEach(element => {
                element.destroy();
            });
            this.apples.forEach(element => {
                if (element.isValid)
                element.destroy();
            });
            this.wood.destroy();
        },2);
    }
}


