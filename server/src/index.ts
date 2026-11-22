import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { Server } from 'socket.io';
import {
  hashString,
  type ClientToServerEvents,
  type ServerToClientEvents,
} from '@wildreach/shared';
import { GameRoom } from './GameRoom.js';

const PORT = Number(process.env.PORT || 3001);
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: '*' },
  pingInterval: 10000,
  pingTimeout: 20000,
});

const rooms = new Map<string, GameRoom>();
const socketToRoom = new Map<string, GameRoom>();

// Always create the flagship live multiplayer island
const DEFAULT_ROOM_ID = 'emerald-archipelago';
rooms.set(
  DEFAULT_ROOM_ID,
  new GameRoom(io, DEFAULT_ROOM_ID, 'Emerald Archipelago (Public)', 42077)
);

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    rooms: Array.from(rooms.values()).map((r) => r.getSummary()),
  });
});

app.get('/api/rooms', (_req, res) => {
  res.json({
    rooms: Array.from(rooms.values()).map((r) => r.getSummary()),
  });
});

// Serve built Three.js client if present (production / preview single-port mode)
const clientDist = path.resolve(process.cwd(), '../client/dist');
const clientDistAlt = path.resolve(process.cwd(), 'client/dist');
const staticDir = fs.existsSync(clientDist)
  ? clientDist
  : fs.existsSync(clientDistAlt)
  ? clientDistAlt
  : null;

if (staticDir) {
  app.use(express.static(staticDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) return next();
    res.sendFile(path.join(staticDir, 'index.html'));
  });
}

io.on('connection', (socket) => {
  socket.on('room:join', (payload, cb) => {
    try {
      // Leave any existing room
      const prev = socketToRoom.get(socket.id);
      if (prev) {
        prev.removePlayer(socket.id);
        socket.leave(prev.id);
        socketToRoom.delete(socket.id);
      }

      const requestedId = (payload.roomId || DEFAULT_ROOM_ID)
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
        .slice(0, 32) || DEFAULT_ROOM_ID;

      let room = rooms.get(requestedId);
      if (!room) {
        const roomName = (payload.roomName || requestedId).trim().slice(0, 32) || requestedId;
        const seed =
          typeof payload.seed === 'number' && Number.isFinite(payload.seed)
            ? Math.abs(Math.floor(payload.seed)) % 999999
            : hashString(requestedId);
        room = new GameRoom(io, requestedId, roomName, seed);
        rooms.set(requestedId, room);
      }

      const init = room.addPlayer(socket, payload);
      socketToRoom.set(socket.id, room);
      cb({ ok: true, init });
    } catch (err) {
      cb({ ok: false, error: err instanceof Error ? err.message : 'Failed to join room' });
    }
  });

  socket.on('player:input', (payload) => socketToRoom.get(socket.id)?.handleInput(socket.id, payload));
  socket.on('player:equip', (slot) => socketToRoom.get(socket.id)?.handleEquip(socket.id, slot));
  socket.on('player:action', (payload) => socketToRoom.get(socket.id)?.handlePrimaryAction(socket.id, payload));
  socket.on('player:dodge', (dir) => socketToRoom.get(socket.id)?.handleDodge(socket.id, dir));
  socket.on('player:interact', (payload) => socketToRoom.get(socket.id)?.handleInteract(socket.id, payload));
  socket.on('player:consume', (slot) => socketToRoom.get(socket.id)?.handleConsume(socket.id, slot));
  socket.on('player:equipArmor', (slot) => socketToRoom.get(socket.id)?.handleEquipArmor(socket.id, slot));
  socket.on('player:swapSlots', (p) => socketToRoom.get(socket.id)?.handleSwapSlots(socket.id, p.from, p.to));
  socket.on('player:dropSlot', (p) => socketToRoom.get(socket.id)?.handleDropSlot(socket.id, p.slotIndex, p.count));
  socket.on('player:craft', (recipeId) => socketToRoom.get(socket.id)?.handleCraft(socket.id, recipeId));
  socket.on('player:build', (payload) => socketToRoom.get(socket.id)?.handleBuild(socket.id, payload));
  socket.on('player:demolish', (id) => socketToRoom.get(socket.id)?.handleDemolish(socket.id, id));
  socket.on('player:chestTransfer', (p) => socketToRoom.get(socket.id)?.handleChestTransfer(socket.id, p));
  socket.on('player:respawn', () => socketToRoom.get(socket.id)?.handleRespawn(socket.id));
  socket.on('player:togglePvp', () => socketToRoom.get(socket.id)?.handleTogglePvp(socket.id));
  socket.on('player:emote', (e) => socketToRoom.get(socket.id)?.handleEmote(socket.id, e));
  socket.on('player:spawnBot', () => socketToRoom.get(socket.id)?.spawnCompanionBot());
  socket.on('chat:send', (text) => socketToRoom.get(socket.id)?.handleChat(socket.id, text));
  socket.on('net:ping', (_clientTime, cb) => cb(Date.now()));

  socket.on('disconnect', () => {
    const room = socketToRoom.get(socket.id);
    if (room) {
      room.removePlayer(socket.id);
      socketToRoom.delete(socket.id);
    }
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log(`[Wildreach Server] Listening on http://${HOST}:${PORT} (static: ${staticDir ?? 'dev-proxy'})`);
});
