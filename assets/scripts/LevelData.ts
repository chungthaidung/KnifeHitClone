import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelData')
export class LevelData extends Component {
    private levelList;
    start() {
        this.levelList = [];
        this.addLevel(this.createLevel(200,200,200,1,1,1,7));
        this.addLevel(this.createLevel(100,250,-500,5,5,5,9));
        let newLevel = this.createLevel(-100,200,200,2,5,3,10);
        newLevel.apples.push(45);
        newLevel.apples.push(90);
        newLevel.apples.push(120);
        this.addLevel(newLevel);
        // this.addLevel(this.createLevel(200,200,200,1,1,1,7));
    }
    public getLevels(){
        return this.levelList;
    }
    public getLevel(levelid:number){
        return this.levelList[levelid];
    }
    public createLevel(startSpeed,middleSpeed,endSpeed,deltaTime1,deltaTime2,deltatime3,knivesNumber){
        let newlevel = {
            woodData: {
                startSpeed,
                middleSpeed,
                endSpeed,
                deltaTime1,
                deltaTime2,
                deltatime3
            },
            knivesNumber,
            apples:[],
            knives:[],
        }
        return newlevel
    }
    public addLevel(level){
        this.levelList[this.levelList.length] = level
    }
}
