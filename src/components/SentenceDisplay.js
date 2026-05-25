import React from "react";

import styles from "../styles/SentenceDisplay.module.css";

// ======================================================
// 🔊 Озвучка слова
// ======================================================

function speakWord(word) {

  // останавливаем предыдущую озвучку

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(word);

  utterance.lang = "ru-RU";

  // 👇 немного медленнее
  // для людей с речевыми трудностями

  utterance.rate = 0.85;

  utterance.pitch = 1;

  utterance.volume = 1;

  speechSynthesis.speak(utterance);
}

export default function SentenceDisplay({
  content,
  highlightedIndexes,
  onWordListen,
  activeWordIndex
}) {

  return (

    <div className={styles.wrapper}>

      {content.map((item, index) => {

        // ==================================================
        // punctuation
        // ==================================================

        if (item.type !== "word") {

          return (
            <span key={index}>
              {item.word}
            </span>
          );
        }

        const isHighlighted =
          highlightedIndexes.includes(index);

        const isActive =
  activeWordIndex === index &&
  !isHighlighted;

        return (

          <div
            key={index}
            className={styles.wordBlock}
          >

            {/* 👂 СЛУШАТЬ СЛОВО */}

            {/* <button
              className={styles.listenButton}
              onClick={() => speakWord(item.word)}
              title="Прослушать слово"
            >
              👂
            </button> */}

              {!isHighlighted && (

  <button
    className={styles.listenButton}
    onClick={() => speakWord(item.word)}
    title="Прослушать слово"
  >
    👂
  </button>

)}
            

            {/* СЛОВО */}

            <span
              className={`
                ${styles.word}
                ${isHighlighted ? styles.highlighted : ""}
                ${isActive ? styles.active : ""}
              `}
            >
              {item.word}
            </span>

            {/* 🎤 ДОЧИТАТЬ */}

            {!isHighlighted && (

              <button
                className={styles.miniMic}
                onClick={() => onWordListen(index)}
                title="Прочитать слово"
              >
                🎤
              </button>

            )}

          </div>
        );
      })}
    </div>
  );
}