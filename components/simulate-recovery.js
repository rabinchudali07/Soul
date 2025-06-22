// simulate-recovery.js
const fs = require("fs");
const path = require("path");

// ✅ Adjust this path if your delete.tsx is elsewhere (e.g., pages/)
const filePath = path.join(__dirname, "src", "delete.tsx");

let count = 1;
const maxWords = 60;
const wordPrefix = "word";

function updateParagraph() {
  console.log("📂 Reading file:", filePath);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("❌ Error reading file:", err);
      return;
    }

    // Log original file contents
    console.log("🧾 Original content:\n", data);

    const regex = /<p>([\s\S]*?)<\/p>/;

    const match = data.match(regex);
    if (!match) {
      console.error("❌ No <p> tag found.");
      return;
    }

    const original = match[1].trim();
    const newContent = `${original} ${wordPrefix}${count}`;
    const updated = data.replace(regex, `<p>${newContent}</p>`);

    // Log updated content
    console.log("✍️ Updated content:\n", updated);

    fs.writeFile(filePath, updated, "utf8", (err) => {
      if (err) {
        console.error("❌ Error writing to file:", err);
        return;
      }

      console.log(`✅ Successfully wrote word${count}`);
      count++;

      if (count > maxWords) {
        clearInterval(interval);
        console.log("🎉 Done simulating.");
      }
    });
  });
}

console.log("🚀 Starting simulation...");
updateParagraph();
const interval = setInterval(updateParagraph, 5000);
