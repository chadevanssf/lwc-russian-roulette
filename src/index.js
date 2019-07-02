import { buildCustomElementConstructor } from 'lwc';
import MyRoulette from 'my/roulette';

customElements.define('my-roulette', buildCustomElementConstructor(MyRoulette));
