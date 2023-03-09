import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Item} from "../app.component";
import {gsap} from "gsap";

@Component({
  selector: 'app-gsap-demo',
  templateUrl: './gsap-demo.component.html',
  styleUrls: ['./gsap-demo.component.scss']
})
export class GsapDemoComponent implements OnInit {

  @Input() limit: number = 7;

  @Input() set subject(subject: Subject<Item>) {
    subject.subscribe(item => this.addItem(item));
  }

  items: Item[] = [];

  currentItem?: Item;


  ngOnInit(): void {
    gsap.defaults( { duration: 1, ease: 'ease-in-out' })
  }

  addItem(item: Item) {
    this.items.push(item);
    setTimeout(() => {
      const timeline = gsap.timeline();
      timeline.to('.content', { opacity: 0, onComplete: () => {
        this.currentItem = item;
      }});

      if (this.items.length > this.limit) {
        timeline.add([
          gsap.to('.rolling .round:first-child', { opacity: 0}),
          gsap.to('.rolling .round', { x: '-3em' })
        ])
        timeline.call(() => {
          this.items.shift();
          gsap.set('.rolling .round', { x: 0 });
        })
      }

      timeline.add([
        gsap.to('.rolling .round:last-child', { opacity: 1}),
        gsap.to('.content', { opacity: 1 })
      ])
    }, 0);
  }

  trackFn(index: number, item: Item) {
    return item.id;
  }
}
