import { _decorator, Component, Node } from 'cc';
import { MvcBehavior } from './MvcBehavior';
import { BoardView } from './View/BoardView';
import { KnifeView } from './View/KnifeView';
import { WoodView } from './View/WoodView';
const { ccclass, property } = _decorator;

@ccclass('ViewContainer')
export class ViewContainer extends MvcBehavior {
    public boardView:BoardView;
    start(){
        this.boardView = this.getComponentInChildren(BoardView);
    }
}


