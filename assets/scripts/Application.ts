import { _decorator, Component, Node, ModelComponent, find } from 'cc';
import { ControllerContainer } from './ControllerContainer';
import { ModelContainer } from './ModelContainer';
import { ViewContainer } from './ViewContainer';
const { ccclass, property } = _decorator;

@ccclass('Application')
export class Application extends Component {
    public model : ModelContainer;
    public view : ViewContainer;
    public controller : ControllerContainer;
    start() {
        this.model = find('Application/Model').getComponent(ModelContainer);        
        this.view = find('Application/View').getComponent(ViewContainer);
        this.controller = find('Application/Controller').getComponent(ControllerContainer);
    }

    update(deltaTime: number) {
        
    }
}


