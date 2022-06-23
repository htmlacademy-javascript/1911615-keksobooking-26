import {createCard} from './card-popup.js';
import {generateAds} from './data.js';
import {toggleReadOnly} from './form.js';
import './form.js';

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createCard(generateAds()[0]));

toggleReadOnly();
toggleReadOnly();

