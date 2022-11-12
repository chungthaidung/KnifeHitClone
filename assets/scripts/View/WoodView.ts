import { _decorator, Component, Node, Vec3, CCFloat, CCInteger, systemEvent, SystemEventType, EventKeyboard, macro, instantiate, Prefab, Acceleration, Collider2D, Contact2DType, IPhysics2DContact, math } from 'cc';
import { KnifeView } from './KnifeView';
const { ccclass, property } = _decorator;

@ccclass('WoodView')
export class WoodView extends Component {
    @property({ type: CCFloat })
    private speed;
    @property({ type: CCInteger })
    private direction = 1;
    @property({ type: CCFloat })
    public radius;
    @property({ type: Vec3 })
    public startPos;
    private currentSpeed;

    private startSpeed: number;
    private endSpeed: number;
    private middleSpeed: number;

    private deltatime1;
    private deltatime2;
    private deltatime3;
    private deltatime = 0;

    private state;
    public inIt(_startspeed, _deltatime1, _middleSpeed, _deltaTime2, _endSpeed, _deltaTime3) {
        this.state = 1;
        this.startSpeed = _startspeed;
        this.endSpeed = _endSpeed ? _endSpeed : _startspeed;
        this.middleSpeed = _middleSpeed;
        this.currentSpeed = _startspeed;
        this.deltatime = 0;
        this.deltatime1 = _deltatime1;
        this.deltatime2 = _deltaTime2;
        this.deltatime3 = _deltaTime3;
    }
    start() {
        this.node.position = this.startPos;
    }
    update(deltaTime: number) {
        this.stateCheck()
        switch (this.state) {
            case 1:
                this.currentSpeed += (this.middleSpeed - this.startSpeed) / (this.deltatime1 / deltaTime);
                this.deltatime += deltaTime;
                break;
            case 2:
                this.currentSpeed += (this.endSpeed - this.middleSpeed) / (this.deltatime2 / deltaTime);
                this.deltatime += deltaTime;
                break;
            case 3:
                this.currentSpeed += (this.startSpeed - this.endSpeed) / (this.deltatime3 / deltaTime);
                this.deltatime += deltaTime;
                break;

        }
        let newRotation = (this.node.eulerAngles.z + (this.currentSpeed) * deltaTime);
        this.node.eulerAngles = new Vec3(0, 0, newRotation);
    }
    public stateCheck() {
        if (this.state == 1 && this.deltatime >= this.deltatime1) {
            this.state = 2;
            this.deltatime = 0;
        }
        else if (this.state == 2 && this.deltatime >= this.deltatime2) {
            this.state = 3;
            this.deltatime = 0;
        }
        else if (this.state == 3 && this.deltatime >= this.deltatime3) {
            this.state = 1;
            this.deltatime = 0;
        }
    }
}


