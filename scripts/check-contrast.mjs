import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const luminance = (hex) => {
  const rgb = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255);
  return rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0);
};
function check(label, foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  const ratio = (values[0] + 0.05) / (values[1] + 0.05);
  assert(ratio >= 4.5, `${label}: ${ratio.toFixed(2)}:1 is below 4.5:1`);
  console.log(`${label}: ${ratio.toFixed(2)}:1`);
}
for (const theme of ['dark', 'light']) {
  const block = css.match(new RegExp(`:root\\[data-theme=${theme}\\]\\s*\\{([^}]+)`))[1];
  const tokens = Object.fromEntries([...block.matchAll(/--color-([\w-]+):\s*(#[a-f\d]{6})/gi)].map(match => [match[1], match[2]]));
  for (const background of ['background', 'surface', 'surface-soft']) {
    for (const text of ['text-primary', 'text-secondary', 'accent-primary']) {
      check(`${theme} ${text} on ${background}`, tokens[text], tokens[background]);
    }
  }
  for (const text of ['accent-secondary', 'accent-tertiary']) {
    check(`${theme} ${text}`, tokens[text], tokens.background);
  }
  check(`${theme} filled badge`, '#ffffff', tokens['accent-fill']);
  check(`${theme} selected text`, tokens.background, tokens['accent-primary']);
}
