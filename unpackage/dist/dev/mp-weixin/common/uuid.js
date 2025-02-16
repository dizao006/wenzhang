"use strict";
function generateArticleId() {
  const crypto = window.crypto || require("crypto");
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map((b) => b.toString(16).padStart(2, "0")).join("");
}
exports.generateArticleId = generateArticleId;
