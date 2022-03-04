import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

export function createStore(store) {
  return create(subscribeWithSelector(store));
}
