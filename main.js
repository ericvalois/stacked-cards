import { Pane } from 'tweakpane';
import './style.css';

// Create a Tweakpane instance
const pane = new Pane({
  title: 'Card Controls',
});

// Parameters object
const params = {
  cardSpacing: 20,
  cardRotation: 5,
  cardOpacity: 1,
  backgroundColor: '#1a1a1a',
};

// Add controls to the pane
pane.addBinding(params, 'cardSpacing', {
  min: 0,
  max: 50,
  step: 1,
  label: 'Spacing',
});

pane.addBinding(params, 'cardRotation', {
  min: -15,
  max: 15,
  step: 1,
  label: 'Rotation',
});

pane.addBinding(params, 'cardOpacity', {
  min: 0,
  max: 1,
  step: 0.1,
  label: 'Opacity',
});

pane.addBinding(params, 'backgroundColor', {
  label: 'Background',
});

// Update card styles when parameters change
pane.on('change', () => {
  updateCardStyles();
});

function updateCardStyles() {
  const cards = document.querySelectorAll('.card');
  const container = document.getElementById('card-container');
  
  // Update background color
  document.body.style.backgroundColor = params.backgroundColor;
  
  // Update card styles
  cards.forEach((card, index) => {
    const offset = index * params.cardSpacing;
    const rotation = index * params.cardRotation;
    
    card.style.transform = `translateY(${offset}px) rotate(${rotation}deg)`;
    card.style.opacity = params.cardOpacity;
  });
}

// Initialize styles
updateCardStyles();

console.log('Vite.js app with Tweakpane initialized!');
