import { _decorator, Component, Node, Vec3, Collider2D, Contact2DType, IPhysics2DContact, director, CCFloat, math } from 'cc';
import { MvcBehavior } from '../MvcBehavior';
const { ccclass, property } = _decorator;
const STATE = {
    IDLE: 0,
    FLY:1,
    STICK: 2,
}
@ccclass('KnifeView')
export class KnifeView extends MvcBehavior {
    private state;
    @property({type:Vec3})
    private starterVec3;
    @property({type:CCFloat})
    private velocityY;
    private wood;
    angle: number = 0;
    public setWood(newWood)
    {
        this.wood = newWood;
    }
    start() {
        this.state = STATE.IDLE;
        this.node.setSiblingIndex(0);
        this.node.position = this.starterVec3;
        this.angle = -this.wood.node.eulerAngles.z;
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    public setState(newState){
        this.state = newState;
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node.isValid){
            if (this.state == STATE.STICK && otherCollider.tag == 1)
            {
                console.log('LOSE');
                director.loadScene("mainmenu");
            }
            else if (this.state == STATE.FLY && otherCollider.tag == 0.5){
                this.state = STATE.STICK;
                this.getApp().controller.gameController.onKnifeSticked();
                // this.node.removeFromParent();
            }
        }
    }
    update(deltaTime: number) {
        if (this.node.isValid){
            if (this.state ==STATE.STICK)
            {
                // let newPosition = new Vec3(this.wood.radius * Math.cos((this.wood.node.eulerAngles.z + this.angle) * 3.14/180),this.wood.radius * Math.sin((this.wood.node.eulerAngles.z + this.angle) * 3.14/180)+ this.wood.node.position.y, 0);
                let newPosition = new Vec3(this.wood.radius *  Math.cos(math.toRadian((this.wood.node.eulerAngles.z + this.angle))),this.wood.radius * Math.sin(math.toRadian(this.wood.node.eulerAngles.z + this.angle))+ this.wood.node.position.y, 0);
                this.node.position = newPosition;
                this.node.setRotationFromEuler(new Vec3(0, 0, this.wood.node.eulerAngles.z + this.angle + 90 ));
            }
            else if (this.state == STATE.FLY)
            {
                this.node.position = new Vec3(this.node.position.x , this.node.position.y + deltaTime * 1000* this.velocityY, 0);
                this.angle = -this.wood.node.eulerAngles.z-90;
            }
        }
        
    }
}


