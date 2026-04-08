#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const CONFIG_PATH = path.join(
  process.env.HOME,
  "Library/Application Support/Claude/claude_desktop_config.json"
);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Paste your API key from myswipe.cc/settings: ", (apiKey) => {
  rl.close();

  apiKey = apiKey.trim();
  if (!apiKey) {
    console.error("No API key provided. Get yours at https://myswipe.cc/settings");
    process.exit(1);
  }

  // Read existing config or start fresh
  let config = {};
  try {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  } catch {
    // File doesn't exist or is invalid — start fresh
  }

  if (!config.mcpServers) config.mcpServers = {};

  config.mcpServers.myswipe = {
    command: "node",
    args: [path.join(__dirname, "dist/index.js")],
    env: { MYSWIPE_API_KEY: apiKey },
  };

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log("\nDone! Restart Claude Desktop and myswipe will appear under Connectors.");
  console.log("Then just say: \"Add https://example.com to my swipe file\"");
});
