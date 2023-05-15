import express from "express";
const os = require('os');

const app = express();
const PORT = 8000;

app.get("/", async function (req, res) {
  res.send("Hello from Greg IO");
});

app.get('/env', (req, res) => {
  const envVariables = process.env;
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(envVariables, null, 2));
});

app.get('/info', (req, res) => {
  // Get server hostname, IP address, and uptime
  const serverInfo = {
    hostname: os.hostname(),
    ipAddress: getIPAddress(),
    uptime: formatUptime(process.uptime()),
    time: new Date().toISOString() ,
    headers: req.headers,
  };
  //res.json(serverInfo);
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(serverInfo, null, 2));
});

// Helper function to get the server's IP address
function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interface2 = interfaces[interfaceName];
    for (let i = 0; i < interface2.length; i++) {
      const { address, family, internal } = interface2[i];
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return 'Unknown';
}

// Helper function to format uptime in a human-readable format
function formatUptime(uptime:number) {
  const duration = {
    days: Math.floor(uptime / (60 * 60 * 24)),
    hours: Math.floor((uptime / (60 * 60)) % 24),
    minutes: Math.floor((uptime / 60) % 60),
    seconds: Math.floor(uptime % 60),
  };

  const isoDuration = `P${duration.days}DT${duration.hours}H${duration.minutes}M${duration.seconds}S`;
  return isoDuration;
}

app.listen(PORT, async function () {
  console.log(`App runnint on ${PORT}`);
});

