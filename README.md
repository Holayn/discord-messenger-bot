# discord-messenger-bot

Microservice to send DMs to a configured user.

## Configuration

Ensure a `.env` file is created.

This file should contain users (can be any string) mapped to Discord user ids. These are used to notify the appropriate Discord user when calling the API - the Discord user id will be notified according to the passed user.
