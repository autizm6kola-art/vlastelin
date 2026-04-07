const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.json");

// читаем файл
const text = fs.readFileSync(inputPath, "utf-8");

// функция разбивки строки на слова и пунктуацию
function tokenize(line) {
  const tokens = [];

  // слова (с дефисами) или отдельные знаки препинания
  const regex = /[А-Яа-яЁёA-Za-z0-9]+(?:-[А-Яа-яЁёA-Za-z0-9]+)*|[.,!?;:–—-]/g;

  const matches = line.match(regex) || [];

  for (const match of matches) {
    const isWord = /[А-Яа-яЁёA-Za-z0-9]/.test(match);
    tokens.push({
      word: match,
      type: isWord ? "word" : "punctuation"
    });
  }

  return tokens;
}

// основной парсинг
const result = text
  .split("\n")
  .map(line => line.trim())
  .filter(Boolean)
  .map(line => {
    const [idPart, contentPart] = line.split("|").map(s => s.trim());

    return {
      id: Number(idPart),
      content: tokenize(contentPart)
    };
  });

// записываем JSON
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");

console.log("✅ Готово! Файл output.json создан.");
