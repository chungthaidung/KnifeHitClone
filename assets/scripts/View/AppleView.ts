import { _decorator, Component, Node, Vec3, math, CCFloat, Collider2D, systemEvent, Contact2DType, IPhysics2DContact } from 'cc';
import { MvcBehavior } from '../MvcBehavior';
const { ccclass, property } = _decorator;

@ccclass('AppleView')
export class AppleView extends MvcBehavior {
    private angle = 0;
    private wood;
    @property({type: CCFloat})
    public radius;

    public setWood(newWood)
    {
        this.wood = newWood;
    }
    public setAngle(newAngle)
    {
        this.angle = newAngle
    }
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node.isValid){
            if (otherCollider.tag == 1 ){
                setTimeout(() => {
                    this.node.destroy();
                }, 1);
            }
        }
       
    }
    
    update(deltaTime: number) {
        if (this.node.isValid){
            this.node.position = new Vec3((this.wood.radius+this.radius) *  Math.cos(math.toRadian((this.wood.node.eulerAngles.z + this.angle))),(this.wood.radius+this.radius) * Math.sin(math.toRadian(this.wood.node.eulerAngles.z + this.angle))+ this.wood.node.position.y, 0);
            this.node.setRotationFromEuler(new Vec3(0, 0, this.wood.node.eulerAngles.z + this.angle -90 ));
        }
       
    
    }
}


