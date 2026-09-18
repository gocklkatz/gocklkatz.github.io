(() => {
  const canvas = document.getElementById("scene");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const rand = mulberry32(20260918);

  const cubes = [];
  for (let z = -11; z <= 10; z++) {
    for (let x = -12; x <= 12; x++) {
      if (rand() < 0.18) continue;
      const jitterX = (rand() - 0.5) * 0.35;
      const jitterZ = (rand() - 0.5) * 0.35;
      const size = 0.72 + rand() * 0.42;
      let height = 0.28 + rand() ** 1.6 * 2.35;
      if (rand() < 0.08) height += 1.1 + rand() * 1.6;
      cubes.push({
        x: x * 1.55 + jitterX,
        z: z * 1.55 + jitterZ,
        w: size,
        d: size,
        h: height,
      });
    }
  }

  const nodes = [];
  for (let i = 0; i < 220; i++) {
    nodes.push({
      x: (rand() - 0.5) * 38,
      y: rand() < 0.12 ? 0.15 + rand() * 1.8 : 0.02 + rand() * 0.08,
      z: (rand() - 0.5) * 34,
      r: 0.7 + rand() * 1.8,
    });
  }
  for (const cube of cubes) {
    if (rand() < 0.45) {
      nodes.push({
        x: cube.x,
        y: cube.h + 0.08,
        z: cube.z,
        r: 1.1 + rand() * 1.4,
      });
    }
  }

  const links = [];
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    const near = [];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;
      const dist = dx * dx + dy * dy + dz * dz;
      if (dist < 18) near.push({ j, dist });
    }
    near.sort((p, q) => p.dist - q.dist);
    for (const n of near.slice(0, 3)) links.push([i, n.j]);
  }

  const cam = {
    yaw: -0.42,
    pitch: 0.72,
    zoom: 26,
    lift: 7.2,
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let t0 = performance.now();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(x, y, z, yaw) {
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    let rx = x * cy - z * sy;
    let rz = x * sy + z * cy;
    const cp = Math.cos(cam.pitch);
    const sp = Math.sin(cam.pitch);
    const ry = y * cp - rz * sp;
    rz = y * sp + rz * cp;
    rz += cam.zoom;
    const focal = Math.max(width, height) * 0.52;
    const scale = focal / Math.max(rz, 0.2);
    return {
      x: width * 0.5 + rx * scale,
      y: height * 0.46 - (ry + cam.lift) * scale * 0.92,
      z: rz,
      scale,
    };
  }

  function shade(normalY, depth) {
    const fog = Math.min(1, Math.max(0, (depth - 14) / 38));
    const light = 0.16 + normalY * 0.55;
    const r = 18 + light * 70;
    const g = 8 + light * 28;
    const b = 42 + light * 140;
    return [
      r * (1 - fog) + 7 * fog,
      g * (1 - fog) + 1 * fog,
      b * (1 - fog) + 15 * fog,
      1 - fog * 0.62,
    ];
  }

  function draw() {
    const now = performance.now();
    const t = (now - t0) / 1000;
    const yaw = cam.yaw + (reduceMotion ? 0 : Math.sin(t * 0.12) * 0.08);
    const pulse = reduceMotion ? 0.6 : 0.5 + Math.sin(t * 1.4) * 0.5;

    ctx.fillStyle = "#07010f";
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(
      width * 0.52,
      height * 0.42,
      20,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.72,
    );
    glow.addColorStop(0, "rgba(88, 20, 150, 0.28)");
    glow.addColorStop(0.45, "rgba(40, 8, 80, 0.12)");
    glow.addColorStop(1, "rgba(7, 1, 15, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const projectedNodes = nodes.map((n) => {
      const p = project(n.x, n.y, n.z, yaw);
      return { ...p, r: n.r };
    });

    ctx.lineCap = "round";
    for (const [ia, ib] of links) {
      const a = projectedNodes[ia];
      const b = projectedNodes[ib];
      if (a.z < 4 || b.z < 4) continue;
      const depth = (a.z + b.z) / 2;
      const fog = Math.min(1, Math.max(0, (depth - 12) / 40));
      const alpha = (0.22 + pulse * 0.08) * (1 - fog);
      ctx.strokeStyle = `rgba(176, 90, 255, ${alpha})`;
      ctx.lineWidth = Math.max(0.6, (1.8 * 28) / depth);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    const faces = [];
    for (const cube of cubes) {
      const x0 = cube.x - cube.w / 2;
      const x1 = cube.x + cube.w / 2;
      const y0 = 0;
      const y1 = cube.h;
      const z0 = cube.z - cube.d / 2;
      const z1 = cube.z + cube.d / 2;
      const v = [
        [x0, y0, z0],
        [x1, y0, z0],
        [x1, y0, z1],
        [x0, y0, z1],
        [x0, y1, z0],
        [x1, y1, z0],
        [x1, y1, z1],
        [x0, y1, z1],
      ];
      const quads = [
        { idx: [4, 5, 6, 7], ny: 1 },
        { idx: [0, 1, 5, 4], ny: 0.18 },
        { idx: [1, 2, 6, 5], ny: 0.42 },
        { idx: [2, 3, 7, 6], ny: 0.12 },
        { idx: [3, 0, 4, 7], ny: 0.32 },
      ];
      for (const quad of quads) {
        const pts = quad.idx.map((i) => project(v[i][0], v[i][1], v[i][2], yaw));
        const depth = (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4;
        faces.push({ pts, depth, ny: quad.ny });
      }
    }
    faces.sort((a, b) => b.depth - a.depth);

    for (const face of faces) {
      if (face.pts.some((p) => p.z < 3)) continue;
      const [r, g, b, a] = shade(face.ny, face.depth);
      ctx.beginPath();
      ctx.moveTo(face.pts[0].x, face.pts[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(face.pts[i].x, face.pts[i].y);
      ctx.closePath();
      ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${a})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.16 + face.ny * 0.2})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }

    for (const n of projectedNodes) {
      if (n.z < 4) continue;
      const fog = Math.min(1, Math.max(0, (n.z - 12) / 40));
      const radius = Math.max(0.7, n.r * (34 / n.z) * (0.85 + pulse * 0.25));
      const alpha = (0.85 - fog * 0.7) * (0.55 + pulse * 0.35);
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 4.2);
      g.addColorStop(0, `rgba(240, 210, 255, ${alpha})`);
      g.addColorStop(0.18, `rgba(192, 96, 255, ${alpha * 0.7})`);
      g.addColorStop(1, "rgba(120, 40, 220, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius * 4.2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion) raf = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    resize();
    if (reduceMotion) draw();
  });
})();
