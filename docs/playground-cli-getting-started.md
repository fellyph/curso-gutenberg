# Get Started with Playground CLI

## In this article
- [Quick start](#quick-start)
- [Set up Node.js](#set-up-nodejs)
- [Install and run Playground CLI](#install-and-run-playground-cli)
- [Where to run Playground CLI](#where-to-run-playground-cli)
- [Advanced usage](#advanced-usage)
- [Uninstall or reset Playground CLI](#uninstall-or-reset-playground-cli)
- [Troubleshooting](#troubleshooting)

The [@wp-playground/cli](https://www.npmjs.com/package/@wp-playground/cli) package lets you set up a local WordPress environment for building and testing plugins and themes in seconds, without any additional configuration like Docker.

Before following this guide, install Node.js development tools if you have not already done so.

## Quick start

1. **Install Node.js** following the instructions for your operating system (version 20.18 or higher required).
2. **Navigate** to an existing plugin directory, theme directory, or a new working directory in the terminal.
3. **Run** `npx @wp-playground/cli@latest server` in the terminal to start the local WordPress environment.
4. **Access** your site at http://localhost:9400 and log into the WordPress dashboard using username `admin` and password `password`.

For plugin or theme development, use the `--auto-mount` flag:
```bash
cd my-plugin-or-theme-directory
npx @wp-playground/cli@latest server --auto-mount
```

## Set up Node.js

The Playground CLI requires Node.js 20.18 or higher, which is the recommended Long-Term Support (LTS) version. Unlike wp-env, Playground CLI doesn't require Docker, making it lighter and easier to set up.

Download and install Node.js for your operating system:
- [Node.js for Mac](https://nodejs.org/en/download)
- [Node.js for Windows](https://nodejs.org/en/download)  
- [Node.js for Linux](https://nodejs.org/en/download)

After installation, verify Node.js is installed by running `node --version` in your terminal. You should see a version number 20.18 or higher.

## Install and run Playground CLI

The Playground CLI creates a local WordPress environment without requiring Docker or additional setup. Open the terminal and run:

```bash
npx @wp-playground/cli@latest server
```

This command will:
- Download and install the Playground CLI (if not already installed)
- Set up a fresh WordPress environment
- Start a local server on port 9400

To confirm the environment is running, navigate to http://localhost:9400. You can log into the WordPress dashboard using:
- **Username:** `admin`
- **Password:** `password`

### For plugin and theme development

When developing a plugin or theme, navigate to your project directory and use the `--auto-mount` flag:

```bash
cd my-plugin-directory
npx @wp-playground/cli@latest server --auto-mount
```

This automatically mounts and activates your plugin or theme in the WordPress environment.

## Where to run Playground CLI

The Playground CLI is flexible and can run from practically anywhere:

### Single plugin development
When run from a plugin directory, Playground CLI will automatically mount and activate the plugin:
```bash
cd my-plugin-directory
npx @wp-playground/cli@latest server --auto-mount
```

### Theme development  
When run from a theme directory, Playground CLI will automatically mount and activate the theme:
```bash
cd my-theme-directory
npx @wp-playground/cli@latest server --auto-mount
```

### Generic WordPress environment
Running from any other directory creates a clean WordPress installation:
```bash
npx @wp-playground/cli@latest server
```

### Custom mounting
For specific project structures, you can manually mount directories:
```bash
npx @wp-playground/cli@latest server --mount=.:/wordpress/wp-content/plugins/my-plugin
```

## Advanced usage

### Choosing WordPress and PHP versions
Specify your preferred versions using the `--wp` and `--php` flags:
```bash
npx @wp-playground/cli@latest server --wp=6.8 --php=8.3 --auto-mount
```

### Using Blueprints
Blueprints allow you to configure the initial state of your WordPress environment. Create a blueprint file:

**my-blueprint.json:**
```json
{
  "landingPage": "/wp-admin/plugins.php",
  "login": true,
  "plugins": [
    "hello-dolly"
  ],
  "steps": [
    {
      "step": "setSiteOptions",
      "options": {
        "blogname": "My Development Site"
      }
    }
  ]
}
```

Then run:
```bash
npx @wp-playground/cli@latest server --blueprint=my-blueprint.json --auto-mount
```

### Custom port
Change the default port (9400) using the `--port` flag:
```bash
npx @wp-playground/cli@latest server --port=8080 --auto-mount
```

### Multiple directory mounting
Mount multiple directories for complex setups:
```bash
npx @wp-playground/cli@latest server \
  --mount=./my-plugin:/wordpress/wp-content/plugins/my-plugin \
  --mount=./my-theme:/wordpress/wp-content/themes/my-theme
```

## Uninstall or reset Playground CLI

Since Playground CLI runs via `npx`, there's no global installation to uninstall. However, here are some helpful commands:

- **Clear npx cache:** `npx clear-npx-cache`
- **Force fresh download:** `npx @wp-playground/cli@latest --help` (adds `@latest` to ensure newest version)
- **Stop running server:** Use `Ctrl+C` in the terminal where the server is running

## Troubleshooting

### Common errors

**Error: "Port 9400 is already in use"**
- Another Playground CLI instance might be running
- Try using a different port: `npx @wp-playground/cli@latest server --port=8080`
- Or stop other processes using that port

**Error: "Node.js version not supported"**
- Ensure you have Node.js 20.18 or higher installed
- Run `node --version` to check your current version
- Update Node.js from [nodejs.org](https://nodejs.org)

**Plugin/Theme not mounting automatically**
- Ensure you're running the command from the correct directory
- Try using explicit mounting: `--mount=.:/wordpress/wp-content/plugins/my-plugin-name`
- Check that your directory structure matches WordPress plugin/theme conventions

**Slow initial startup**
- The first run downloads WordPress and PHP, which may take time
- Subsequent runs will be much faster
- Ensure you have a stable internet connection

### Getting help

Use the `--help` flag to see all available options:
```bash
npx @wp-playground/cli@latest --help
```

For verbose output and debugging:
```bash
npx @wp-playground/cli@latest server --verbosity=debug
```

## Additional resources

- [@wp-playground/cli npm package](https://www.npmjs.com/package/@wp-playground/cli)
- [WordPress Playground Documentation](https://wordpress.github.io/wordpress-playground/)
- [Blueprints Documentation](https://wordpress.github.io/wordpress-playground/blueprints/getting-started/)
- [Node.js Official Website](https://nodejs.org/)

## Comparison with wp-env

| Feature | Playground CLI | wp-env |
|---------|----------------|---------|
| **Setup Requirements** | Node.js only | Node.js + Docker |
| **Startup Time** | Seconds | Minutes (first run) |
| **Resource Usage** | Lightweight | Heavy (Docker containers) |
| **Offline Usage** | Limited | Full offline support |
| **Configuration** | Simple flags/blueprints | .wp-env.json files |
| **Best For** | Quick testing, prototyping | Production-like environments |