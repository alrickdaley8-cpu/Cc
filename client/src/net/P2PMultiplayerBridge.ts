import { joinRoom as joinTrysteroRoom } from 'trystero';

export type P2PMessage =
  | { type: 'who_is_host'; peerId: string }
  | { type: 'host_here'; peerId: string; roomName: string; seed: number; playerCount: number }
  | { type: 'join_req'; peerId: string; payload: unknown }
  | { type: 'join_res'; targetPeerId: string; ok: boolean; init?: unknown; error?: string }
  | { type: 'client_event'; peerId: string; event: string; data: unknown }
  | { type: 'server_event'; targetPeerId?: string; event: string; data: unknown }
  | { type: 'ping'; peerId: string; t: number }
  | { type: 'pong'; targetPeerId: string; t: number };

export interface P2PBridgeCallbacks {
  onMessage: (msg: P2PMessage, fromPeerId: string) => void;
  onPeerLeave: (peerId: string) => void;
}

/**
 * Dual-transport serverless P2P bridge:
 *  1) WebRTC DataChannels via Trystero (decentralized Nostr relays — works across the internet on GitHub Pages!)
 *  2) Same-origin BroadcastChannel fast-path (instant <5ms multiplayer across local browser tabs even offline!)
 */
export class P2PMultiplayerBridge {
  readonly peerId: string;
  private roomId: string;
  private callbacks: P2PBridgeCallbacks;
  private bc: BroadcastChannel | null = null;
  private trysteroRoom: ReturnType<typeof joinTrysteroRoom> | null = null;
  private sendWire: ((data: string, opts?: { target?: string }) => Promise<void>) | null = null;
  private knownPeers = new Set<string>();
  private closed = false;

  constructor(roomId: string, callbacks: P2PBridgeCallbacks) {
    this.roomId = roomId;
    this.callbacks = callbacks;
    this.peerId = `peer_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    // 1. Same-origin BroadcastChannel (works instantly across tabs & offline!)
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        this.bc = new BroadcastChannel(`wildreach-p2p-${roomId}`);
        this.bc.onmessage = (ev) => {
          if (this.closed) return;
          const env = ev.data as { from?: string; msg?: P2PMessage };
          if (!env || !env.from || env.from === this.peerId || !env.msg) return;
          this.knownPeers.add(env.from);
          this.callbacks.onMessage(env.msg, env.from);
        };
      }
    } catch {
      this.bc = null;
    }

    // 2. WebRTC P2P Mesh via Trystero (works worldwide on GitHub Pages with ZERO backend!)
    try {
      if (typeof window !== 'undefined' && typeof RTCPeerConnection !== 'undefined') {
        const room = joinTrysteroRoom(
          {
            appId: 'wildreach-survival-archipelago-v2',
            identity: 'none',
          },
          `wr-${roomId}`
        );
        this.trysteroRoom = room;
        const action = room.makeAction<string>('wr-msg');
        this.sendWire = (data, opts) =>
          action.send(data, opts).catch(() => {
            // Swallow transient async WebRTC send failures cleanly
          });

        action.onMessage((raw, ctx) => {
          if (this.closed || typeof raw !== 'string') return;
          try {
            const env = JSON.parse(raw) as { from?: string; msg?: P2PMessage };
            if (!env?.msg) return;
            const sender = env.from || ctx.peerId;
            if (sender === this.peerId) return;
            this.knownPeers.add(sender);
            this.callbacks.onMessage(env.msg, sender);
          } catch {
            // Ignore malformed packets
          }
        });

        room.onPeerLeave(({ peerId }) => {
          this.knownPeers.delete(peerId);
          this.callbacks.onPeerLeave(peerId);
        });
      }
    } catch {
      // Fallback cleanly to BroadcastChannel / solo host if WebRTC is unavailable
      this.trysteroRoom = null;
    }
  }

  send(msg: P2PMessage): void {
    if (this.closed) return;
    const envelope = { from: this.peerId, msg };
    try {
      this.bc?.postMessage(envelope);
    } catch {
      // Ignore closed BroadcastChannel
    }
    if (this.sendWire) {
      try {
        void this.sendWire(JSON.stringify(envelope));
      } catch {
        // Ignore transient WebRTC errors
      }
    }
  }

  getPeerCount(): number {
    return this.knownPeers.size;
  }

  close(): void {
    this.closed = true;
    try {
      this.bc?.close();
    } catch {
      // ignore
    }
    this.bc = null;
    try {
      void this.trysteroRoom?.leave();
    } catch {
      // ignore
    }
    this.trysteroRoom = null;
    this.sendWire = null;
  }
}

/**
 * Creates a Web Worker 20Hz clock so a browser P2P Host NEVER throttles to 1Hz when backgrounded!
 * Falls back cleanly to window.setInterval in environments without Worker/Blob support (e.g. Node/Vitest).
 */
export function startUnthrottledInterval(cb: () => void, intervalMs: number): () => void {
  try {
    if (typeof Worker !== 'undefined' && typeof Blob !== 'undefined' && typeof URL !== 'undefined') {
      const code = `setInterval(() => postMessage(0), ${Math.max(16, Math.round(intervalMs))});`;
      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      worker.onmessage = () => cb();
      return () => {
        worker.terminate();
        URL.revokeObjectURL(url);
      };
    }
  } catch {
    // Fallback below
  }
  const id = setInterval(cb, intervalMs);
  return () => clearInterval(id);
}
