# Train Vocal

An open source app that helps you to train your singing skills.

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
