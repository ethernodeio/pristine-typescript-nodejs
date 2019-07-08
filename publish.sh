npm run generator-client
cd build/typescript && npm publish --access=public
cd -
cd build/rust && cargo package && cargo publish --token $CARGO_TOKEN
