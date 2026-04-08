#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = "https://myswipe.cc/api/skill";
const API_KEY = process.env.MYSWIPE_API_KEY;

if (!API_KEY) {
  console.error("Error: MYSWIPE_API_KEY environment variable is not set.");
  console.error("Get your key at https://myswipe.cc/settings");
  process.exit(1);
}

const server = new McpServer({
  name: "myswipe",
  version: "1.0.0",
});

// Tool: save_item
server.tool(
  "save_item",
  "Save an item to the user's swipe file. Call this after analyzing a URL or note and filling in the card fields.",
  {
    folder: z.string().describe("The folder/category bucket (e.g. Design, Marketing, Copywriting)"),
    category: z.string().describe("Sub-topic within the folder (e.g. Landing Pages, Launch Threads)"),
    title: z.string().describe("Concise, scannable title for the item"),
    link: z.string().optional().describe("The URL being saved"),
    tags: z.array(z.string()).optional().describe("2-5 lowercase tags without # prefix"),
    description: z.string().describe("1-2 sentences describing what this is"),
    why_saving: z.string().describe("What makes this worth keeping — technique, pattern, or principle it demonstrates"),
    when_to_use: z.string().describe("Specific situations where this reference is useful"),
  },
  async ({ folder, category, title, link, tags, description, why_saving, when_to_use }) => {
    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: API_KEY, folder, category, title, link, tags, description, why_saving, when_to_use }),
    });

    const data = await res.json() as { success?: boolean; error?: string };

    if (!res.ok || data.error) {
      return { content: [{ type: "text", text: `Failed to save: ${data.error}` }] };
    }

    return {
      content: [{
        type: "text",
        text: `Saved "${title}" to ${folder} → ${category}.`,
      }],
    };
  }
);

// Tool: get_items
server.tool(
  "get_items",
  "Retrieve all items from the user's swipe file. Use this to find relevant references for the user's current work.",
  {},
  async () => {
    const res = await fetch(`${API_BASE}/items`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const data = await res.json() as { items?: unknown[]; error?: string };

    if (!res.ok || data.error) {
      return { content: [{ type: "text", text: `Failed to fetch items: ${data.error}` }] };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(data.items, null, 2),
      }],
    };
  }
);

// Tool: list_folders
server.tool(
  "list_folders",
  "List the folder names in the user's swipe file. Use this before saving an item to pick the right folder.",
  {},
  async () => {
    const res = await fetch(`${API_BASE}/items`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const data = await res.json() as { items?: Array<{ folder: string }> ; error?: string };

    if (!res.ok || data.error) {
      return { content: [{ type: "text", text: `Failed to fetch folders: ${data.error}` }] };
    }

    const folders = [...new Set((data.items ?? []).map((i) => i.folder))];

    return {
      content: [{
        type: "text",
        text: folders.length > 0 ? `Folders: ${folders.join(", ")}` : "No folders yet.",
      }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
