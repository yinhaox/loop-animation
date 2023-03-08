import {AfterViewInit, Component, OnInit, ViewChildren} from '@angular/core';
import { gsap } from "gsap";

type Item = { id: number, color: string, text: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public items!: Item[];

  public currentItem!: Item;

  ngOnInit(): void {
    this.items = [
      "你的智商不足以点亮一盏小夜灯。",
      "你的脑子像个芝士蛋糕，里面充满了空洞。",
      "你的样子就像是被狗啃过的骨头。",
      "你的脸比月亮还圆，而且没那么好看。",
      "你的思维像个缺氧的飞行员，总是迷失方向。",
      "你就像个小丑，每次说话都是在放屁。",
      "你的声音像是被细小的老鼠啃噬过的。",
      "你的形象就像是被车轮碾过的果酱。"
    ].map((text, id) => ({ text, id, color: this.coloring()}));
    this.currentItem = this.items[this.items.length - 2];
  }

  ngAfterViewInit(): void {
    gsap.defaults({ duration: 1, ease: 'ease-in-out' })
    setInterval(() => {
      gsap.to('.rolling-container .round', { x: '-3em' })
      gsap.to('.rolling-container .round:first-child', { opacity: 0})
      gsap.to('.content', { opacity: 0, onComplete: () => {
          this.currentItem = this.items[this.items.length - 1];
          gsap.to('.rolling-container .round:last-child', { opacity: 1, delay: 0.5 });
          gsap.to('.content', { opacity: 1, delay: 0.5, onComplete: () => {
              let item = this.items.shift();
              if (item) {
                this.items.push(item);
              }
              gsap.set('.rolling-container .round:first-child', {opacity: 1});
              gsap.set('.rolling-container .round:last-child', {opacity: 0});
              gsap.set('.rolling-container .round', {x: 0});
          }});
      }});
    }, 3000);
  }

  private coloring() {
    return '#' + (Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0'))
  }

  trackFn(index: number, item: Item) {
    return item.id;
  }
}
