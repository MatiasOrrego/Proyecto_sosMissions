import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '.css/home.css';
import './home.js';
import './fondo.js';

import RCPCounter from './rcpCounter.js';

const rcpCounter = new RCPCounter();

document.getElementById('startButton').addEventListener('click', () => rcpCounter.start());
document.getElementById('stopButton').addEventListener('click', () => rcpCounter.stop());
document.getElementById('resetButton').addEventListener('click', () => rcpCounter.reset());