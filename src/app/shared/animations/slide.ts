import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const slide = trigger('slide', [
  state('expanded', style({ height: '*' })),
  state('collapsed', style({ height: 0 })),
  state('void', style({ height: 0 })),
  state('*', style({ height: '*' })),
  transition(':enter', [animate('200ms')]),
  transition(':leave', [animate('200ms')]),
  transition('expanded <=> collapsed', animate(250))
]);

export const slideHorizontal = trigger('slideHorizontal', [
  state('void', style({ width: 0 })),
  state('*', style({ width: '*' })),
  transition(':enter', [animate('200ms')]),
  transition(':leave', [animate('200ms')])
]);

export const slideMobileNav = trigger('slideMobileNav', [

  state('expanded', style({ height: '100vh' })),

  state('collapsed', style({ height: 0 })),

  transition('expanded <=> collapsed', animate('300ms'))
]);

const collapsedStyle = style({ marginLeft: '-{{ sidebarWidth }}' });
const expandedStyle = style({ marginLeft: '0' });
const options = { params: { sidebarWidth: '*' } };

export const slideSidebar = trigger('slideSidebar', [

  transition('expanded => collapsed',
    group
    (
      [
        query('@*', animateChild()),
        query('.sidebar-collapsible', expandedStyle, options),
        query('.sidebar-collapsible', animate('300ms ease-in-out', collapsedStyle))
      ],
    )),

  transition('collapsed => expanded',
    group
    (
      [
        query('@*', animateChild()),
        query('.sidebar-collapsible', collapsedStyle),
        query('.sidebar-collapsible', animate('300ms ease-in-out', expandedStyle), options)
      ]
    ))
]);

export const slideSidebarPadding = trigger('slideSidebarPadding', [
  state('hidden', style({ paddingLeft: 0 })),
  state('shown', style({ paddingLeft: '{{ collapsedSidebarWidth }}' }), { params: { collapsedSidebarWidth: '*' } }),
  state('expanded', style({ paddingLeft: '{{ totalSidebarWidth }}' }), { params: { totalSidebarWidth: '*' } }),
  transition('hidden <=> shown', [animate('200ms')]),
  transition('hidden <=> expanded', [animate('200ms')]),
  transition('shown <=> expanded', [animate('200ms')]),
]);
