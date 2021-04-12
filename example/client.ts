import { Client, Event, Packet } from 'https://deno.land/x/tcp_socket@0.0.2/mods.ts';

const client = new Client({ hostname: "127.0.0.1", port: 8080 });

// Connection open
client.on(Event.connect, (client: Client) => {
  console.log('Connect', client.conn?.remoteAddr);
  client.write('Hello Server');
});

// Receive message
client.on(Event.receive, (client: Client, data: Packet) => {
  console.log('Receive', data.toString());
  client.close();
});

// Connection close
client.on(Event.close, (client: Client) => {
  console.log('Close');
});

// Handle error
client.on(Event.error, (e) => {
  console.error(e);
});

await client.connect();