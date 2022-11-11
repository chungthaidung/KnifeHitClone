import { _decorator, Component, Node, find } from 'cc';
import { Application } from './Application';
const { ccclass, property } = _decorator;

@ccclass('MvcBehavior')
export class MvcBehavior extends Component {
    private app;
    public getApp(){
        if (!this.app) {
            this.app = find('Application').getComponent(Application);
        }
        return this.app; 
    }
}


