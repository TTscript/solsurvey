module.exports = {
  apps: [
    {
      name: "solsurvey-web",
      cwd: "/var/www/solsurvey.site",
      script: "server.js",
      interpreter: "node",
      node_args: "--env-file=.env.local",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
