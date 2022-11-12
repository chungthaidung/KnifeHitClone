import { _decorator, Component, Node, find, Collider2D, IPhysics2DContact, director } from 'cc';
import { Application } from '../Application';
import { ModelContainer } from '../ModelContainer';
import { MvcBehavior } from '../MvcBehavior';
import { AppRoot } from '../Root/AppRoot';
import { BoardView } from '../View/BoardView';
import { WoodView } from '../View/WoodView';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends MvcBehavior {
    start() {
        this.loadLevel(0)
    }
    public onKnifeSticked(){
        this.getApp().model.playerModel.removeKnife(1);
        if (this.getApp().model.playerModel.getKnives() <= 0 )
        {
            console.log('win');
            this.getApp().view.boardView.onWin();
            console.log('LOADING NEW LEVEL');
            setTimeout(() => {
                let levels = find('Root')?.getComponent(AppRoot).levelData.getLevels()
                if (levels.length-1 > this.getApp().model.playerModel.level){
                    this.getApp().model.playerModel.level +=1;
                    this.loadLevel(this.getApp().model.playerModel.level)
                } else {
                    console.log('YOU WIN THE GAME');
                    director.loadScene('mainmenu');
                }
            }, 2000);
           
            // this.getApp().model.playerModel.setKnives(5);
        }
    }
    public onDefeat(){
        console.log('DEFEAT');
    }
    public loadLevel(id){
        let level = find('Root')?.getComponent(AppRoot).levelData.getLevel(id)
        this.getApp().model.playerModel.setKnives(level.knivesNumber);
        let boardView =  this.getApp().view.boardView;
        boardView.spawnWood(level.woodData.startSpeed,level.woodData.middleSpeed,level.woodData.endSpeed,level.woodData.deltaTime1,level.woodData.deltaTime2,level.woodData.deltatime3);
        boardView.spawnKnife();
        if (level.apples.length > 0) {
            level.apples.forEach(apple => {
                boardView.spawnApple(apple)
            });
        }
    }
    update(deltaTime: number) {
    }
}


