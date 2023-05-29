const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const config = require('../database/config');
// const config = require('../database/config');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "0.0.0.0",
    "routes": {
      "cors": true
  }
  });


  await server.register([
    {
      plugin: require('hapi-sequelizejs'),
      options: [
        {
          name: 'aws', // identifier
          models: ['/models/**/*.js'], // paths/globs to model files
          // ignoredModels: [__dirname + '/server/models/**/*.js'], // OPTIONAL: paths/globs to ignore files
          sequelize: config.db, // sequelize instance
          sync: false, // sync models - default false
          forceSync: false, // force sync (drops tables) - default false
        },
      ],
    }
  ]);

  (async () => {
    await config.db.sync();
  })();


  server.route(routes.routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
