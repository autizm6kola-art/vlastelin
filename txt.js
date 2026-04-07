const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'txt без номеров.txt');
const outputFile = path.join(__dirname, 'output.txt');

const START_NUMBER = 1; // 👈 здесь задаёшь начальное число

const text = fs.readFileSync(inputFile, 'utf8');

const lines = text
  .split(/\r?\n/)
  .filter(line => line.trim() !== '');

const result = lines
  .map((line, index) => `${START_NUMBER + index} | ${line}`)
  .join('\n');

fs.writeFileSync(outputFile, result, 'utf8');

console.log(`Готово ✅ Нумерация с ${START_NUMBER}`);
