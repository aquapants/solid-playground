# Solid Playground

This repository is a playground for experimenting with SolidJS.

It contains small demos, UI experiments, and interactive projects used to explore ideas, test libraries, and try different patterns in Solid.

The project also includes a tutorials section with simple examples of common web development concepts implemented in Solid (signals, effects, context, stores, and data fetching).

## Usage

To install dependencies:

```bash
pnpm install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### Development Script

```bash
pnpm dev
```

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building Script

```bash
pnpm build
```

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Counter Balance Analysis Script

The project includes a Node script used to analyze how different operation sets affect gameplay balance.

The script explores possible sequences of operations and tracks:

- reachable numbers
- prime discovery
- scoring potential
- optimal paths

Example: \

```bash
pnpm balance --depth 10 --start 0 --ops "+1,-1,*2,/2"
```

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)

## Troubleshooting

```bash
Error: Cannot find package '...'
```

If you experience an error related to packages try removing the install node modules & reinstalling them from scartch using the following command sequence:

```bash
rm -rf node_modules
pnpm install --force
pnpm dev
```
