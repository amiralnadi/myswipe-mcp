# myswipe-mcp

The MCP connector brings your swipe file into Claude Desktop chat. Instead of switching to the web app or running commands, you just talk to Claude naturally:                                                   
                                                                                                                                                                                                                     
  - **Save anything:** "Add https://stripe.com/pricing to my swipe file — great example of a SaaS pricing page"
  - **Find references while working:** "I'm writing a launch email, check my swipe file for relevant examples"                                                                                                       
  - **Browse your library:** "What do I have saved about copywriting?"                                                                                                                                             
                                                                                                                                                                                                                     
  Claude handles the analysis, categorization, and retrieval — your swipe file becomes a live knowledge base inside every chat.                                                                                      
                                                                                                                                                                                                                     
  ## Setup                                                                                                                                                                                                           
                                                                                                                                                                                                                     
  **Prerequisites:** [Node.js](https://nodejs.org) installed and a [myswipe.cc](https://myswipe.cc) account with a connected repo.                                                                                 
                                                                                                                                                                                                                     
  **1. Get your API key**
                                                                                                                                                                                                                     
  Sign in at [myswipe.cc](https://myswipe.cc), go to **Settings**, and copy your API key.                                                                                                                          
                                                                                                                                                                                                                     
  **2. Run the setup command**                                                                                                                                                                                     
                                                                                                                                                                                                                     
  Paste this into your terminal — it clones the connector, builds it, and configures Claude Desktop automatically:                                                                                                 
                                                                                                                                                                                                                     
  ```bash
  git clone https://github.com/amiralnadi/myswipe-mcp ~/myswipe-mcp && cd ~/myswipe-mcp && npm install && npm run build && node setup.js                                                                             
                                                                                                                                                                                                                   
  Paste your API key when prompted. The script updates your Claude Desktop config automatically — no manual JSON editing needed.                                                                                     
                                                                                                                                                                                                                     
  3. Restart Claude Desktop                                                                                                                                                                                          
                                                                                                                                                                                                                     
  Fully quit (Cmd+Q) and reopen. You'll see myswipe appear under Connectors in any chat.                                                                                                                             
  
  That's it — start a chat and tell Claude what to save.   
