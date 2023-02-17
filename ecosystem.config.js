module.exports = {
  apps : [{
    name   : "Multiviewer API",
    script : "node -r dotenv/config www.js dotenv_config_path=./.env.production.local"
  }]
}
