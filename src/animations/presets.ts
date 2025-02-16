import { TransitionConfig } from '@motify/core';

export const fadeIn = {
  from: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};

export const slideInRight = {
  from: {
    opacity: 0,
    translateX: 100,
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
  exit: {
    opacity: 0,
    translateX: -100,
  },
};

export const springTransition: TransitionConfig = {
  type: 'spring',
  damping: 10,
  mass: 0.8,
  stiffness: 100,
};

export const timingTransition: TransitionConfig = {
  type: 'timing',
  duration: 300,
};
