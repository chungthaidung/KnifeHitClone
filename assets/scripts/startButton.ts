import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('startButton')
export class startButton extends Component {
    start() {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    
    onMouseDown() {
        director.loadScene('gameplay');
    }
}


