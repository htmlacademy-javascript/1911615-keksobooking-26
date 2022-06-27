import createCardNode from './card-popup.js';
import generateAds from './data.js';
import './ad-constraints.js';
// import {toggleDisabled} from './util.js';


const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createCardNode(generateAds()[0]));

// toggleDisabled('ad-form', true);


