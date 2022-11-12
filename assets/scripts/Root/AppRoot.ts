import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AppRoot')

export class AppRoot extends Component {
    private instance;
    public levelData;
    start() {
        director.addPersistRootNode(this.node);
        this.instance = this;
        this.levelData = this.getComponentInChildren('LevelData');
        director.loadScene('mainmenu');
    }

    update(deltaTime: number) {
        
    }
}


