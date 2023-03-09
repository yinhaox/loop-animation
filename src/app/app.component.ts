import {AfterViewInit, Component} from '@angular/core';
import {ReplaySubject} from "rxjs";

export type Item = { id: number, color: string, text: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public subject = new ReplaySubject<Item>;

  ngAfterViewInit(): void {
    setInterval(() => {
      let item = this.createItem();
      console.log('create item: ', item);
      this.subject.next(item);
    }, 4000);
  }

  private createColor() {
    return '#' + (Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'));
  }

  private createText = (function (){
    const text = [
      "你的智商不足以点亮一盏小夜灯。",
      "你的脑子像个芝士蛋糕，里面充满了空洞。",
      "你的样子就像是被狗啃过的骨头。",
      "你的脸比月亮还圆，而且没那么好看。",
      "你的思维像个缺氧的飞行员，总是迷失方向。",
      "你就像个小丑，每次说话都是在放屁。",
      "你的声音像是被细小的老鼠啃噬过的。",
      "你的形象就像是被车轮碾过的果酱。"
    ];
    return () => {
      const index = Math.floor(Math.random() * text.length);
      return text[index];
    }
  })()

  private createId = (function (){
    let id = 0;
    return () => id++;
  })()

  private createItem(): Item {
    return {
      id: this.createId(),
      text: this.createText(),
      color: this.createColor()
    }
  }
}
