'use strict';
const form = document.querySelector('#calculator');
const ipInput = document.querySelector('#ip');
const subnetInput = document.querySelector('#subnet');
const error = document.querySelector('#error');
const results = document.querySelector('#results');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const animations = new Map();
function scrambleText(element, finalValue, delay = 0) {
  if (animations.has(element)) cancelAnimationFrame(animations.get(element));
  const target = String(finalValue);
  element.setAttribute('aria-label', target);
  if (motion.matches) { element.textContent = target; animations.delete(element); return; }
  const start = performance.now() + delay;
  const charset = '0123456789ABCDEF';
  function frame(now) {
    const progress = Math.min(1, Math.max(0, (now - start) / 420));
    const locked = Math.floor(progress * target.length);
    element.textContent = Array.from(target, (char, index) => index < locked || /[^a-zA-Z0-9]/.test(char) ? char : charset[Math.floor(Math.random() * charset.length)]).join('');
    if (progress < 1) animations.set(element, requestAnimationFrame(frame));
    else animations.delete(element);
  }
  animations.set(element, requestAnimationFrame(frame));
}
function submit(event) {
  if (event) event.preventDefault();
  try {
    const value = IPv4.calculate(ipInput.value, subnetInput.value, document.querySelector('#parent').value);
    if (ipInput.value.includes('/')) subnetInput.value = '/' + value.prefix;
    error.hidden = true;
    ipInput.removeAttribute('aria-invalid');
    subnetInput.removeAttribute('aria-invalid');
    results.hidden = false;
    document.querySelector('#result-status').textContent = 'CALCULATED';
    document.querySelectorAll('[data-value]').forEach((element, index) => scrambleText(element, value[element.dataset.value], index * 55));
    document.querySelector('#host-note').textContent = value.note;
    document.querySelector('#announcement').textContent = `Calculated network ${value.cidr}, subnet mask ${value.mask}.`;
  } catch (exception) {
    for (const id of animations.values()) cancelAnimationFrame(id);
    animations.clear();
    results.hidden = true;
    error.textContent = exception.message;
    error.hidden = false;
    document.querySelector('#announcement').textContent = '';
  }
}
form.addEventListener('submit', submit);
form.addEventListener('input', () => {
  if (!results.hidden) document.querySelector('#result-status').textContent = 'INPUT CHANGED · RECALCULATE';
  error.hidden = true;
});
submit();
