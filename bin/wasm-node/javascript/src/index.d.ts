// Smoldot
// Copyright (C) 2019-2021  Parity Technologies (UK) Ltd.
// SPDX-License-Identifier: GPL-3.0-or-later WITH Classpath-exception-2.0

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

declare class SmoldotError extends Error {
  constructor(message: string);
}

export interface SmoldotClient {
  addChain(options: SmoldotAddChainOptions): Promise<SmoldotChain>;
  terminate(): void;
}

export interface SmoldotChain {
  sendJsonRpc(rpc: string): void;
  remove(): void;
}

export type SmoldotJsonRpcCallback = (response: string) => void;
export type SmoldotLogCallback = (level: number, target: string, message: string) => void;

export interface SmoldotOptions {
  maxLogLevel?: number;
  logCallback?: SmoldotLogCallback;
  forbidTcp?: boolean;
  forbidWs?: boolean;
  forbidWss?: boolean;
}

export interface SmoldotAddChainOptions {
  chainSpec: string;
  potentialRelayChains?: SmoldotChain[];
  jsonRpcCallback?: SmoldotJsonRpcCallback;
}

export interface SmoldotHealth {
  isSyncing: boolean;
  peers: number;
  shouldHavePeers: boolean;
}

export interface HealthChecker {
  start(sendRequest: (request: string) => void, healthCallback: (health: SmoldotHealth) => void): void;
  stop(): void;
  responsePassThrough(response: string): string | null;
}

export interface Smoldot {
  start(options?: SmoldotOptions): Promise<SmoldotClient>;
  healthChecker(): HealthChecker;
}

export const smoldot: Smoldot;

export default smoldot;
