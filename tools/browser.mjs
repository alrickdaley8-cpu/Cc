// Shared headless-Chromium launcher (SwiftShader WebGL2) used by the screenshot tool and e2e tests.
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

function ensureLibs() {
  // @sparticuz/chromium ships the NSS libs it needs as a brotli tarball; unpack once to /tmp.
  const dir = '/tmp/marlowe-chromium-libs';
  if (!fs.existsSync(path.join(dir, 'lib', 'libnss3.so'))) {
    fs.mkdirSync(dir, { recursive: true });
    const bin = path.join(path.dirname(new URL(import.meta.resolve('@sparticuz/chromium')).pathname), '..', 'bin');
    for (const f of ['al2023.tar.br', 'swiftshader.tar.br', 'fonts.tar.br']) {
      const p = path.join(bin, f);
      if (!fs.existsSync(p)) continue;
      const tar = path.join(dir, f.replace('.br', ''));
      fs.writeFileSync(tar, zlib.brotliDecompressSync(fs.readFileSync(p)));
      execFileSync('tar', ['xf', tar, '-C', dir]);
    }
  }
  process.env.LD_LIBRARY_PATH = `${dir}/lib:${dir}:${process.env.LD_LIBRARY_PATH || ''}`;
  process.env.FONTCONFIG_PATH = dir;
}

export async function launch({ width = 1280, height = 720 } = {}) {
  ensureLibs();
  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    executablePath, headless: true,
    args: [...chromium.args, '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required', `--window-size=${width},${height}`],
    defaultViewport: { width, height },
  });
  return browser;
}
