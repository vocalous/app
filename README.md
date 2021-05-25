# Vocalous

An open source web app that help to practice singing by tracking the pitch.

## Building
```bash
# Build wasm
# Prerequisite: cargo and wasm-pack
cd wasm
wasm-pack build --target web

# Build the visualization
cd ../display
npm install
npm run build

# Start the app
cd ../client
npm install
npm run start
```

## Credits

This app is built on excellent [pitch detection app](https://alesgenova.github.io/pitch-detection-app/)
by Alessandro Genova and Jason Siefken.
