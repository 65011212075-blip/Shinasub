# PROMPT — เพิ่ม 3D Animation ให้เว็บ SHINASUB

**วิธีใช้:** เปิด Claude Code ที่ `D:\SNS_web` แล้วคัดลอกตั้งแต่ `=== PROMPT START ===` ถึง `=== PROMPT END ===` ไปวาง
ส่วน "ภาคผนวก" ท้ายไฟล์เป็นข้อมูลอ้างอิงสำหรับคุณ ไม่ต้องวาง

Prompt นี้เขียนสำหรับ **ต่อยอดจากโปรเจกต์ที่มีอยู่แล้ว** (Next.js 16.3.4 + React 19.2.8 + Tailwind 4 + motion 13) ตาม `DESIGN_PLAN.md` ที่ทำไว้
ถ้าจะสร้างเว็บใหม่ทั้งหมด ให้เอาหัวข้อ 2–7 ของไฟล์นี้ไปแทรกเป็นข้อ 6.6 ใน `PROMPT.md`

---

=== PROMPT START ===

## 1. งานที่ต้องทำ

เพิ่ม **3D animation** เข้าไปในเว็บ SHINASUB ที่สร้างไว้แล้วในโปรเจกต์นี้ โดยยังคง `DESIGN_PLAN.md` เดิมทุกข้อ ทั้ง palette, typography, motif "network pulse", กฎ motion และเกณฑ์ accessibility

ใช้ Skill ที่ติดตั้งไว้แล้วในโปรเจกต์ (`frontend-design`, `ui-ux-pro-max`) กำกับการตัดสินใจด้านภาพและ UX ตลอดงาน โดยเฉพาะกฎ "spend boldness in one memorable place" เพราะงานนี้เสี่ยงจะกลายเป็นเว็บอวด 3D ที่ไม่สื่ออะไร

**ข้อบังคับสำคัญ:** 3D ต้องสื่อเนื้อหาจริงของบริษัท (fiber optic, โหนดเครือข่าย, ชั้นอาคาร, rack server) ห้ามเป็นก้อน abstract ลอยหมุนแบบ template ห้ามใส่ 3D ทุก section และห้ามให้ 3D ทำให้เว็บช้าหรือเข้าถึงไม่ได้

ทำงานแบบ autonomous ให้จบ ถ้าติดปัญหาให้แก้เอง แล้วสรุปการตัดสินใจไว้ในรายงานท้ายงาน

## 2. เลือกวิธีทำ 3D (ตัดสินใจก่อน แล้วบันทึกเหตุผล)

| วิธี | เหมาะกับ | ข้อเสีย |
|---|---|---|
| **A. React Three Fiber + drei (แนะนำ)** | สร้าง geometry เองจากโค้ด ควบคุมสี/ขนาด/จำนวน polygon ได้ 100% ไม่ต้องโหลดโมเดล | ต้องเขียน scene เอง ใช้เวลามากกว่า |
| **B. Spline** (embed scene จาก spline.design) | ได้งานสวยเร็ว มี component `Spline Scene` โดย serafimcloud บน 21st.dev | ต้องออกแบบ scene ในเว็บ Spline ก่อน, bundle หนัก (runtime ~1MB+), แก้สีให้ตรง token ยาก |
| **C. CSS 3D transform** (`transform-style: preserve-3d`, `perspective`) | การ์ดเอียงตามเมาส์, layer parallax แบบมีความลึก | ทำ scene จริงไม่ได้ เหมาะเป็นของประกอบเท่านั้น |

**ให้ใช้ A เป็นหลัก** และใช้ C เสริมในส่วนที่ไม่คุ้มกับการเปิด WebGL
ใช้ B เฉพาะกรณีที่หา geometry แบบ A ทำไม่ได้จริง ๆ และถ้าใช้ B ต้องตั้งค่า lazy load + ระบุขนาด bundle ที่เพิ่มขึ้นในรายงาน

บันทึกวิธีที่เลือกและเหตุผลต่อท้าย `DESIGN_PLAN.md` ในหัวข้อใหม่ `## 3D layer`

## 3. ติดตั้ง (ระวังเรื่องเวอร์ชัน)

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

- ต้องได้ `@react-three/fiber` เวอร์ชัน 9.x ขึ้นไป เพราะโปรเจกต์นี้ใช้ React 19.2.8 (fiber v8 ใช้กับ React 19 ไม่ได้)
- ตรวจว่า `@react-three/drei` เวอร์ชันที่ลงมา peer-dep ตรงกับ fiber v9 ถ้า `npm install` เตือน peer conflict ให้แก้ด้วยการเลือกเวอร์ชันที่ตรงกัน **ห้ามใช้ `--force` หรือ `--legacy-peer-deps`**
- เพิ่มใน `next.config.ts`:
  ```ts
  transpilePackages: ["three"],
  ```
  (จำเป็นสำหรับ add-on ของ three ที่ยัง ship เป็น ESM ไม่ผ่าน transpile)
- ห้ามลบหรือแก้ `experimental.caseSensitiveRoutes` และ `redirects()` ที่มีอยู่
- ถ้ามี component 3D ที่จะดึงจาก 21st.dev ให้ค้นหา URL จริงก่อนทุกครั้ง (ผ่าน 21st MCP หรือเปิดหน้า component) **ห้ามเดา URL** และให้ใส่ comment ระบุ author + URL ต้นทางไว้บนหัวไฟล์

## 4. จุดที่ใส่ 3D (มีแค่ 3 จุด อย่าเพิ่มเอง)

### 4.1 Home Hero — "Fiber Backbone" (จุดหลัก จุดที่กล้าที่สุดของเว็บ)

แทนที่ ambient background เดิมใน `src/components/sections/home/hero-background.tsx` (ปัจจุบันเป็น SVG `BackgroundPaths`) ด้วย 3D scene ที่ยกระดับ motif "network pulse" เดิมให้มีความลึก

สเปก scene:
- **โครงหลัก:** โหนดเครือข่าย 40–70 จุด กระจายในปริมาตรแบบ 3 มิติ (ไม่ใช่ระนาบเดียว) เชื่อมกันด้วยเส้นบาง ๆ เฉพาะคู่ที่อยู่ใกล้กัน ให้ได้ความรู้สึกเป็น topology ของเครือข่าย ไม่ใช่ดาวกระจายมั่ว
- **จุดเด่นที่ต้องมี:** แสงวิ่งไปตามเส้น (สื่อแพ็กเก็ตข้อมูล/สัญญาณในไฟเบอร์) วิ่งพร้อมกันไม่เกิน 6–8 เส้น เส้นอื่นสงบ
- **มุมกล้อง:** perspective camera เอียงเล็กน้อย ให้ scene อยู่ฝั่งขวาของ hero โดยฝั่งซ้ายเว้นให้ H1 อ่านง่าย (ปัจจุบันมี gradient scrim อยู่แล้วที่ `hero.tsx` ให้คงไว้หรือปรับให้เข้ากับ 3D)
- **การเคลื่อนไหว:** หมุนช้ามาก (รอบละไม่น้อยกว่า 60 วินาที) + parallax ตามเมาส์แบบหนืด (`lerp`/`damp` ไม่ใช่ผูกตรง) องศาการเอียงจากเมาส์ไม่เกิน 6 องศา
- **สี:** ใช้ token เดิมเท่านั้น โหนดและเส้นสีฐานจาก `--border`/`--text-secondary` แสงที่วิ่งใช้ `--accent` (`#3FA0FF`) และแทรก `--accent-copper` (`#E8944A`) เป็นส่วนน้อยประมาณ 1 ใน 5 พื้นหลัง scene โปร่งใส (`alpha: true`) ให้เห็นสี `--bg` ของหน้าจริง ห้ามใส่พื้นหลังทึบสีอื่น
- **ห้าม:** bloom แรง ๆ, lens flare, ก้อนแก้ว/ทรงกลม chrome หมุน, ฝุ่นเต็มจอ, `Environment` preset สำเร็จรูปที่ทำให้ภาพดูเป็น 3D demo ทั่วไป

### 4.2 Services → Design & Implementation — "Rack / Layer View" (จุดรอง)

เพิ่ม 3D ประกอบ section ที่มีการ์ด SYS 01–08 ใน `src/components/sections/services/design-implementation.tsx`

- แสดงเป็น **ชั้นซ้อน (layered stack)** 3–4 แผ่นแทน layer ของ infrastructure (cabling → network → wireless → applications) หรือเป็น **rack server** แบบเรียบง่ายที่มีไฟ status กะพริบเบา ๆ
- ผูกกับการเลื่อนหน้า: เลื่อนลงแล้ว layer แยกออกจากกัน (explode view) หรือกล้องค่อย ๆ ลดมุมลง ใช้ scroll progress เป็นตัวขับ ไม่ใช่ animation loop
- ขนาดจำกัด สูงไม่เกิน 60vh บน desktop และ **ซ่อนทั้งก้อนบน mobile** (แสดงเป็นภาพนิ่งหรือไม่แสดงเลย) เพราะ section นี้มีการ์ด 8 ใบให้อ่านอยู่แล้ว
- ถ้าประเมินแล้วว่าทำให้ section รกกว่าเดิม ให้ตัดออกและอธิบายเหตุผลในรายงาน ดีกว่าใส่แล้วเสียการอ่าน

### 4.3 Contact — "HQ Marker" (จุดเล็ก)

ใน `src/components/sections/contact/map.tsx` เพิ่มความลึกให้ตำแหน่งสำนักงาน

- ตัวเลือกที่ 1: globe 3D wireframe เล็ก ๆ หมุนช้า มีหมุดเรืองแสงที่พิกัด 13.729414872738044° N, 100.53582288994332° E
- ตัวเลือกที่ 2: ใช้ CSS 3D (วิธี C) ทำการ์ดแผนที่/รูปตึกให้เอียงตามเมาส์เล็กน้อย พร้อมหมุดที่ลอยอยู่เหนือระนาบ
- **ให้เลือกตัวเลือกที่ 2 ถ้าตัวเลือกที่ 1 จะทำให้ต้องเปิด WebGL context เพิ่มอีกตัวในหน้าเดียว** โดยหลักคือ 1 หน้าไม่ควรมี WebGL canvas เกิน 1 ตัวทำงานพร้อมกัน
- ห้ามแทนที่ Google Maps iframe และห้ามลบข้อความพิกัดที่แสดงอยู่

## 5. กฎด้าน Performance (บังคับ ตัวเลขต้องผ่านจริง)

- **Canvas ต้องมาทีหลัง:** โหลด scene ด้วย `dynamic(() => import(...), { ssr: false, loading: () => <fallback /> })` เสมอ H1 กับ CTA ต้องเป็น HTML จริงที่แสดงได้ก่อน canvas พร้อม
- **หยุดเมื่อไม่เห็น:** ใช้ `frameloop="demand"` หรือหยุด render loop เมื่อ canvas ออกนอก viewport (IntersectionObserver) และเมื่อ tab ไม่ active (`document.visibilityState`) ห้ามปล่อย loop วิ่งทิ้ง
- **จำกัดต้นทุน:** `dpr={[1, 1.75]}`, `antialias: false` แล้วชดเชยด้วย dpr, `powerPreference: "high-performance"` ห้ามเปิดเงา (`shadows`) ถ้าไม่จำเป็นจริง
- **จำนวน draw call:** ใช้ `InstancedMesh` สำหรับโหนดทั้งหมด และรวมเส้นเป็น geometry เดียว เป้าหมาย draw call ของ hero scene ไม่เกิน 10
- **ห้าม allocate ใน render loop:** ห้ามสร้าง `new THREE.Vector3()` หรือ array ใหม่ใน `useFrame` ให้สร้าง object ไว้ล่วงหน้าแล้วใช้ซ้ำ
- **คืนทรัพยากร:** dispose geometry/material/texture เมื่อ component unmount
- **โหลดบนมือถือ:** ลดจำนวนโหนดลงประมาณครึ่งหนึ่งเมื่อจอแคบกว่า 768px หรือเมื่อ `navigator.hardwareConcurrency` ต่ำ
- **ตรวจ WebGL ก่อน:** ถ้าเบราว์เซอร์ไม่รองรับ WebGL ให้ fallback เป็นภาพนิ่ง/SVG เดิมเงียบ ๆ ห้าม error หรือจอว่าง
- **งบประมาณที่ต้องวัดและรายงานเป็นตัวเลข:**

  | ตัวชี้วัด | เกณฑ์ |
  |---|---|
  | First Load JS ของหน้า Home | เพิ่มขึ้นจากเดิมไม่เกิน 180 KB (gzip) |
  | LCP บน mobile (throttle 4G) | ไม่เกิน 2.5 วินาที |
  | CLS | ไม่เกิน 0.02 (ต้องจอง aspect ratio ของ canvas ไว้ก่อน) |
  | FPS ของ hero บน desktop | 55 ขึ้นไป |
  | Lighthouse mobile ทุกหมวด | 90 ขึ้นไป (ต้องไม่ต่ำกว่าคะแนนก่อนใส่ 3D) |

  ให้วัดคะแนน Lighthouse และขนาด bundle **ก่อน** เพิ่ม 3D เก็บไว้เปรียบเทียบ แล้ววัดอีกครั้งหลังทำเสร็จ แสดงตารางเทียบก่อน/หลังในรายงาน

## 6. Accessibility และ Reduced Motion (บังคับ)

- ทุก canvas ต้อง `aria-hidden="true"` และไม่รับ focus เพราะเป็นของประดับ ไม่มีข้อมูลที่ผู้ใช้ต้องเข้าถึง
- ห้ามใส่ข้อมูลสำคัญไว้ใน 3D อย่างเดียว ทุกอย่างที่สื่อความหมายต้องมีในข้อความ HTML ด้วย
- `prefers-reduced-motion: reduce` ต้องได้ภาพนิ่ง: render frame เดียวแล้วหยุด (`frameloop="never"` หลัง frame แรก) หรือแสดงภาพนิ่งแทน ห้ามแค่ลดความเร็ว
- 3D ต้องไม่ขัดขวางการเลื่อนหน้าหรือการแตะบนมือถือ ตั้ง `pointer-events: none` ที่ canvas ถ้าไม่ต้องรับ input
- Contrast ของข้อความที่วางทับ scene ต้องยังผ่าน WCAG AA ในทุกเฟรมของ animation ไม่ใช่เฉพาะเฟรมแรก ถ้าแสงที่วิ่งทำให้ contrast ตก ให้เพิ่ม scrim หรือย้าย scene ให้ไม่ทับข้อความ
- ห้าม flash เร็วเกิน 3 ครั้งต่อวินาที

## 7. ลำดับงานและสิ่งที่ต้องส่งมอบ

1. รัน `npm run build` และ Lighthouse บนหน้า Home เก็บค่าตั้งต้นไว้ก่อน
2. เลือกวิธี (ข้อ 2) แล้วเขียนต่อท้าย `DESIGN_PLAN.md` หัวข้อ `## 3D layer` ระบุ scene, สีที่ใช้จาก token, และ budget ที่ตั้งไว้
3. ติดตั้ง dependency + แก้ `next.config.ts` (ข้อ 3)
4. สร้าง 3D ไว้ที่ `src/components/three/` โดยแยก 3 ส่วนชัดเจน คือ wrapper ที่ dynamic import, `<Canvas>` scene, และ mesh/geometry ย่อย
5. ทำ 4.1 Hero ให้เสร็จและวัดผลก่อน ถ้า budget ไม่ผ่านให้ปรับจนผ่าน **ก่อน** เริ่ม 4.2 และ 4.3
6. ทำ 4.2 และ 4.3
7. ทดสอบ: desktop 1440px, tablet 768px, mobile 360px, เปิด reduced motion, ปิด WebGL, throttle CPU 4x screenshot ทุกกรณีแล้ววิจารณ์งานตัวเองตาม `frontend-design` skill แล้วแก้
8. รัน `npm run lint`, `npx tsc --noEmit`, `npm run build` ให้ผ่านหมด
9. อัปเดต `README.md` (dependency ใหม่, วิธีปิด 3D ถ้าต้องการ) และรายงานท้ายงานประกอบด้วย
   - ตารางเทียบ Lighthouse และ First Load JS ก่อน/หลัง
   - scene ที่สร้าง แต่ละอันใช้ polygon/draw call เท่าไร
   - component จาก 21st.dev ที่ใช้พร้อม URL ต้นทาง (ถ้ามี)
   - สิ่งที่ตัดออกและเหตุผล

=== PROMPT END ===

---

## ภาคผนวก (ไม่ต้องวางลง Claude Code)

### ทำไมต้องระบุเวอร์ชันในข้อ 3
โปรเจกต์นี้ใช้ React 19.2.8 ซึ่งต้องใช้ `@react-three/fiber` เวอร์ชัน 9 ขึ้นไป ถ้าปล่อยให้ agent ลงเองอาจได้เวอร์ชัน 8 แล้วเจอ peer-dependency error หรือแก้ด้วย `--legacy-peer-deps` ซึ่งจะพังตอน build ส่วน `transpilePackages: ["three"]` เป็นข้อกำหนดของ Next.js สำหรับ add-on ในระบบนิเวศ three.js

### ทำไมจำกัด 3D ไว้ 3 จุด
Design Plan ที่ทำไว้เลือกหลักการ "กล้าที่เดียว" คือ Hero ถ้าใส่ 3D ทุก section จะขัดกับหลักการนั้นเองและทำให้เว็บของบริษัทที่ขายความน่าเชื่อถือกลายเป็น showcase เทคนิค นอกจากนี้ WebGL context หลายตัวในหน้าเดียวคือสาเหตุอาการกระตุกบนมือถือที่พบบ่อยที่สุด

### ตัวเลข budget ในข้อ 5 ปรับได้
ค่าที่ใส่ไว้เป็นเกณฑ์ที่ผ่านได้จริงสำหรับ scene ระดับนี้ ถ้าคุณรับได้ว่าเว็บหนักขึ้นเพื่อความสวย ให้แก้เลข First Load JS ขึ้น แต่ไม่แนะนำให้ผ่อนเกณฑ์ LCP และ CLS เพราะกระทบคะแนน SEO โดยตรง

### ถ้าจะใช้ Spline (วิธี B)
ต้องออกแบบ scene ที่ spline.design ก่อน แล้ว export เป็น URL ของ scene จากนั้นจึงใช้ component `Spline Scene` โดย serafimcloud บน 21st.dev มาครอบ ข้อควรระวังคือ runtime ของ Spline หนักกว่าการเขียน geometry เองมาก และแก้สีให้ตรง token ในไฟล์ `globals.css` ได้ยาก เพราะสีถูกฝังมาใน scene แล้ว

### จุดที่ควรตัดสินใจเพิ่ม
- อยากให้ 3D ตอบสนองการเลื่อนหน้า (scroll-driven) หรือแค่หมุนเองเงียบ ๆ (ambient) ตอนนี้ Prompt ให้ Hero เป็น ambient และให้ Services เป็น scroll-driven
- รับได้ไหมถ้า mobile ไม่เห็น 3D บาง section ตอนนี้ Prompt สั่งซ่อน 3D ของ Services บนมือถือ
- มีโมเดล 3D ของอุปกรณ์จริงหรือโลโก้แบบ 3D อยู่แล้วหรือไม่ ถ้ามีไฟล์ `.glb` ให้บอก agent เพิ่มว่าให้ใช้ไฟล์นั้นและบีบอัดด้วย Draco
