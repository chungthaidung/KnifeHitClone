import { _decorator, Component, Node, Vec3, CCFloat, CCInteger, systemEvent, SystemEventType, EventKeyboard, macro, instantiate, Prefab, Acceleration, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { KnifeView } from './KnifeView';
const { ccclass, property } = _decorator;

@ccclass('WoodView')
export class WoodView extends Component {
    @property({ type: CCFloat })
    private speed;
    @property({ type: CCInteger })
    private direction = 1;
    @property({type:Prefab})
    private knifePrefab;
    @property({type: CCFloat})
    public radius;
    @property({type: Vec3})
    public startPos;
    public
    start() {
        this.node.position = this.startPos;
    }
    update(deltaTime: number) {
        // this.speed += acceleration;
        let newRotation = (this.node.eulerAngles.z + (this.speed ) * deltaTime * this.direction);
        this.node.eulerAngles = new Vec3(0, 0, newRotation);
    }
}


