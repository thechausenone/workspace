
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  SlideToLeft('login => signup'),
  SlideToRight('signup => login'),
  SlideToRight('login => account'),
  SlideToLeft('account => login'),
  FadeInAndOut('main => *')
])

function SlideToLeft(state:string){
  return transition(state, [
            query(':enter, :leave', style({ position: 'fixed', width:'100%', height: '{{height}}'})
              , { optional: true }),
            group([
              query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
              ], { optional: true }),
              query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
              ], { optional: true })
            ])
          ])
}

function SlideToRight(state:string){
  return transition(state, [
          query(':enter, :leave', style({ position: 'fixed', width:'100%', height: '{{height}}'})
            , { optional: true }),
          group([
            query(':enter', [
              style({ transform: 'translateX(-100%)' }),
              animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
              style({ transform: 'translateX(0%)' }),
              animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
            ], { optional: true })
          ])
        ])
}

function FadeInAndOut(state:string){
  return transition(state, [
          query(':enter, :leave', style({ position: 'fixed', height: '{{height}}'})
            , { optional: true }),
          group([
            query(':enter', [
              style({ opacity:0 }),
              animate('0.25s ease', style({ opacity:1 }))
            ], { optional: true }),
            query(':leave', [
              style({ opacity:1 }),
              animate('0.25s ease', style({ opacity:0 }))
            ], { optional: true })
          ])
        ])
}
