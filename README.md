ngrok-file-receiver
-------------------

A small tool for receiving files from anywhere, useful for e.g. debugging remote files locally.

# Installation
```shell
npm install -g ngrok-file-receiver
```

# Usage
```shell
# On your local machine
ngrok-file-receiver
# ...outputs the command to use in the format: curl -XPOST https://<NGROK-UNIQUE-ADDRESS>/upload -F "file=@<FILENAME>"

# On the remove machine
curl -XPOST https://<NGROK-UNIQUE-ADDRESS>/upload -F "file=@<FILENAME>"
```
