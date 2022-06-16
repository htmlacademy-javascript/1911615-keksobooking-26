import {createCard} from './card-popup.js';
import {randomObjects} from './data.js';
import {toggleReadOnly} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createCard(randomObjects[0]));

toggleReadOnly();
toggleReadOnly();

