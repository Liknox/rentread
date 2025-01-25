# The development guide

Happy to see you interested in this project.

## How to try it out locally

1. Clone the project: `git clone https://github.com/Liknox/rentread.git`. `cd` into the directory. All of the following
   commands are executed from the root directory of the project.
2. Make sure you're on the node version prescribed in `.nvmrc`; check with `node -v`, you might need to run `nvm use` if
   that's not being run on changing directories in your setup.
3. Install dependencies: `npm i`
4. Now, to the meat of it: you would like to start an app localy and also browse it around on your mobile device. So you
   - Run `npm run dev` - this will first build the project locally, and then displays it in the browser locally.

```
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   VITE v5.4.11  ready in * ms                    │
   │                                                  │
   │   - Local:            http://localhost:3000      │
   │   - Network:          http://172.50.0.41:3000    │
   │   - Network:          http://192.168.2.10:3000   │
   │   - Network:          http://172.82.128.5:3000   │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

The bottom URL should work on your mobile device if it's on the same network as your computer.

6. Tweak the library in `packages/rentread/src`. To see the changes, stop the server with `CTRL-C` and do `npm run dev`
   again. Yeah, that's tedious. 😉

7. If you like the changes you made, create a branch, commit the changes, make a fork of the project in your personal
   GitHub account, push the changes to a branch in your personal account, and create a merge request from that branch to
   https://github.com/Liknox/rentread.

## Releasing

Currently a manual process handled by the maintainer, to be automated.
