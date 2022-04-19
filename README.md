# What the translate

---

# Prerequisites
- Node 12+
- npm or other package manager installed

Windows will require additional global node-modules when serving locally:
```shell
npm install --global --production windows-build-tools
```
---

# Setup

Clone repository
```shell
git clone https://github.com/mschwebler-tgm/what-the-translate.git
```

Change directory
```shell
cd ./what-the-translate
```
Install packages
```shell
npm install
```

Create .env file
```shell
cp .env.example .env
```

## AWS Setup (mandatory)
1) Create an AWS account
2) Create access keys
3) Add the access and the secret access key to the `.env` file
```dotenv
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
```

## Google Translate setup (optional)
If you want to use Google Translate instead of the default (AWS Translate) service you need this setup.
1) Have a google cloud account
2) Setup basic authentication [documented here](https://cloud.google.com/docs/authentication/getting-started)
3) Add your `service-account-file.json` to your `.env`
```dotenv
GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
```



## Serve locally
Run the `serve-local` script (in root directory)

Linux:
```
./serve-local.sh
```

Windows:
```
./sever-local.bat
```
