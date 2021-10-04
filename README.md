<h1 align="center">Tess Music Bot</h1>

Discord Music Bot

## Table of contents

[Requirements](#requirements)

[Contributing](#contributing)

## Requirements

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Discord Application](https://discord.com/developers/applications)

## Contributing

### Setup development environment

#### Discord developer portal

- Head over to [Discord Developer Portal](https://discord.com/developers/applications)
- Click on the button "New Application", give it a name and click create
- Click on the tab labelled "Bot", click on the button "Add Bot"
- Under "Token", click on the button labelled "Copy" to copy the bot token
- Open file named configexample.js and paste the bot token in the variable "token"
- Rename the file "config.js.example" to "config.js"
- Download [Lavalink](https://github.com/freyacodes/Lavalink) and paste the file into the main directory

<hr>

#### Adding the bot to your server

- Head over to [Discord Developer Portal](https://discord.com/developers/applications)
- Open the application you created earlier
- Click on the tab labelled "OAuth2"
- Under "Scopes", check the box next to "bot"
- Copy and paste the link that appears in a new tab
- Login again to your discord account if prompted
- Select your server and click "Authorize"

### Managing code branches

**1.** Fork the repository

**2.** Clone repository

```
git clone https://github.com/<your-username>/Tess-Discord-Music-Bot
```

**3.** Navigate to project folder

```
cd Tess-Discord-Music-Bot
```

**4.** Create new branch

```
git checkout -b <insert_branch_name>
```

**5.** Turn on chage tracking and begin coding!

```
git add .
```

**6.** Start debugging

```bash
# run the following command in the terminal to start the bot
node ./src/bot.js
# or
npm start
# or if you have nodemon installed, run:
npm run dev
```

**7.** Commit changes once you are finished

```
git commit -m "Commit message"
```

**8.** Push changes to remote repository

```
git push -u origin <insert_branch_name>
```

**9.** Head to [GitHub](https://github.com/itsksquare/Tess-Discord-Music-Bot/pulls) to make pull request
