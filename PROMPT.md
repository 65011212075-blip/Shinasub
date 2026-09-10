# PROMPT — สร้างเว็บไซต์ SHINASUB ใหม่ (Next.js + Animation + 21st.dev)

**วิธีใช้:** เปิด Claude Code ในโฟลเดอร์โปรเจกต์ (เช่น `D:\SNS_web`) แล้วคัดลอกข้อความตั้งแต่ `=== PROMPT START ===` ถึง `=== PROMPT END ===` ไปวาง
ส่วน "หมายเหตุสำหรับผู้ใช้" ท้ายไฟล์ไม่ต้องวาง

---

=== PROMPT START ===

## 1. บทบาทและเป้าหมาย

คุณคือ Senior Frontend Engineer + Product Designer ที่รับงาน redesign เว็บไซต์องค์กรของ **SHINASUB Company Limited** (ผู้ให้บริการ ICT Infrastructure / System Integrator ในประเทศไทย ก่อตั้งปี 2013 ลูกค้าคือหน่วยงานรัฐและองค์กรเอกชน)

เป้าหมาย:
- **ใช้เนื้อหาเดิมทั้งหมด** จาก https://shinasub.com/ ตามที่ระบุไว้ในหัวข้อ "CONTENT (ต้นฉบับ)" ด้านล่างนี้ ห้ามแต่งข้อความ ตัวเลข บริการ หรือลูกค้าเพิ่มเอง ถ้าจำเป็นต้องมีข้อความใหม่ (เช่น label ปุ่ม, placeholder ฟอร์ม, error message) ให้เขียนสั้น ๆ และแจ้งไว้ในรายงานท้ายงาน
- **ออกแบบ UX/UI ใหม่ทั้งหมด** ไม่ต้องคง layout สี ฟอนต์ หรือสไตล์ terminal (`MOD_01`, `SYSTEM_MANIFEST.LOG`, `READY_FOR_DEPLOYMENT`) ของเว็บเดิม เก็บไว้เฉพาะ "สาระ" (ชื่อบริการ คำอธิบาย ลำดับ 01–08 ตัวเลข ที่อยู่)
- **ธีม Technology** สื่อถึง ICT infrastructure, เครือข่าย, fiber optic, smart building, precision engineering โดยยังดูน่าเชื่อถือแบบบริษัทที่ทำงานกับหน่วยงานรัฐ (ไม่ใช่ gamer neon / crypto)
- **มีลูกเล่น Animation** ที่มีจุดประสงค์ชัดเจน ลื่นไหล 60fps และเคารพ `prefers-reduced-motion`
- สร้างด้วย **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui** และใช้ Component จาก **https://21st.dev/community/components**

ทำงานแบบ autonomous ให้จบทั้งงาน อย่าหยุดถามระหว่างทางถ้าไม่จำเป็น ถ้าติดปัญหาให้แก้เอง แล้วสรุปสิ่งที่ตัดสินใจไว้ในรายงานท้ายงาน

## 2. ขั้นตอนที่ 0 — ติดตั้ง Skill และเครื่องมือก่อนเริ่มงาน (บังคับ)

ทำตามลำดับนี้ก่อนเขียนโค้ดแม้แต่บรรทัดเดียว:

1. ติดตั้ง Skill ด้าน Frontend และ UX/UI ลงในโปรเจกต์:
   ```bash
   npx skills add https://github.com/anthropics/skills --skill frontend-design
   npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
   ```
2. อ่าน `SKILL.md` ของทั้งสอง Skill ให้ครบ แล้วใช้ตามบทบาท:
   - `frontend-design` = ตัวหลักในการกำหนด aesthetic direction, typography, สี, motion และการวิจารณ์งานตัวเอง (self-critique ด้วย screenshot)
   - `ui-ux-pro-max` = สร้าง design system เริ่มต้นและตรวจ UX guideline / accessibility เช่น
     ```bash
     python3 .claude/skills/ui-ux-pro-max/scripts/search.py "ICT infrastructure network system integrator enterprise" --design-system -p "SHINASUB"
     ```
     (ถ้า Python ไม่มีในเครื่อง ให้อ่านไฟล์ข้อมูลใน skill โดยตรงแทน)
3. เตรียมช่องทางดึง Component จาก 21st.dev:
   - ทางหลัก: ตั้งค่า **21st MCP** ตามคู่มือที่ https://21st.dev/mcp (ต้อง login / API key) เพื่อใช้ค้นหา component และรับคำสั่งติดตั้งจริง
   - ทางสำรอง (ถ้าตั้ง MCP ไม่ได้): เปิดหน้า component บน https://21st.dev/community/components แล้วใช้คำสั่งติดตั้งรูปแบบ
     ```bash
     npx shadcn@latest add "https://21st.dev/r/{author}/{component-name}"
     ```
   - **ห้ามเดา URL ของ component** ต้องได้ URL จริงจาก MCP หรือจากหน้าเว็บก่อนติดตั้งทุกครั้ง
   - free tier มีโควตาติดตั้งจำกัดต่อวัน ถ้าโควตาหมด ให้คัดลอก source จากหน้า component ด้วยมือ วางไว้ที่ `src/components/ui/` พร้อม comment ระบุที่มา (author + URL)
4. รายงานสั้น ๆ ว่าติดตั้งอะไรสำเร็จ/ไม่สำเร็จ แล้วจึงไปขั้นตอนถัดไป

## 3. Tech Stack (บังคับ)

- Next.js เวอร์ชันล่าสุด (App Router, `src/` directory, TypeScript `strict: true`), React เวอร์ชันที่มากับ Next
- Tailwind CSS v4 + shadcn/ui (`npx shadcn@latest init`) เป็นฐานของ design token
- `motion` (framer-motion) สำหรับ animation หลัก ใช้ CSS animation สำหรับ ambient effect ที่เบา ๆ
- `next/font/google` สำหรับฟอนต์ (เว็บเดิมใช้ Poppins + Prompt โดย Prompt รองรับภาษาไทย ให้เลือกคู่ฟอนต์ใหม่อย่างตั้งใจตาม frontend-design skill แต่ต้องมีฟอนต์ที่รองรับภาษาไทยอย่างน้อย 1 ตัวเผื่อเพิ่มภาษาไทยในอนาคต)
- `lucide-react` สำหรับไอคอน
- `react-hook-form` + `zod` + Server Action สำหรับฟอร์มติดต่อ (ส่งอีเมลผ่าน provider เช่น Resend โดยอ่าน API key จาก `.env` ถ้าไม่มี key ให้ log และแสดงข้อความสำเร็จแบบ mock พร้อมคอมเมนต์ TODO)
- `next/image` สำหรับรูปทุกรูป, `next/link` สำหรับลิงก์ภายใน
- Deploy target: Vercel (ต้องรัน `npm run build` ผ่านโดยไม่มี error/warning ของ TypeScript และ ESLint)

## 4. ทิศทางการออกแบบ (ธีม Technology)

ก่อนเขียนโค้ด ให้ทำ **Design Plan** ตามกระบวนการของ frontend-design skill และบันทึกเป็นไฟล์ `DESIGN_PLAN.md` ประกอบด้วย:

- **Concept 1 บรรทัด** ที่เชื่อมกับตัวตนของบริษัท (เช่น "โครงข่ายที่มองไม่เห็นแต่ทำให้ทุกอย่างทำงาน" — ให้คิดใหม่เองได้)
- **Palette** ระบุ hex ครบ: พื้นหลัง, surface 2–3 ระดับ, ตัวอักษร 2 ระดับ, สี accent หลัก 1 สี + accent รอง 1 สี, สี success/warning สำหรับ status "Ready" / "24/7"
  - ให้เป็น **dark-first** (มืดแต่ไม่ดำสนิท) และผ่าน contrast WCAG AA ทุกคู่สี
  - หลีกเลี่ยง cliché ที่ skill เตือน: near-black + acid green/vermilion, SaaS card kit ที่การ์ดเหมือนกันหมด, ALL-CAPS label + monospace ทุกจุด, hairline rule ทั่วหน้า
- **Typography** 1–2 typeface พร้อม scale (display / h1 / h2 / h3 / body / small) และความยาวบรรทัด body ไม่เกิน ~75 ตัวอักษร
- **Layout grid & spacing** (container width, gutter, section padding, border-radius scale)
- **Motif ทางภาพ** ที่ดึงมาจากงานจริงของบริษัท เช่น เส้น fiber optic ที่วิ่งแสง, โหนดเครือข่ายที่เชื่อมกัน, แผนผังชั้นอาคาร, สัญญาณ Wi-Fi, rack server ให้เลือก 1 motif หลักและใช้สม่ำเสมอ
- **"จุดที่กล้า" 1 จุด** (ตาม skill: spend boldness in one memorable place) มักจะเป็น Hero ส่วนที่เหลือให้สงบและมีระเบียบ
- **Motion principles**: ระยะเวลา 200–600ms, easing แบบ ease-out, stagger 60–100ms, animate เฉพาะ `transform` และ `opacity`, entrance animation เล่นครั้งเดียวเมื่อเลื่อนถึง (viewport once), infinite loop อนุญาตเฉพาะ ambient background ใน Hero
- **รายชื่อ 21st.dev component ที่จะใช้** พร้อม URL จริงและหน้าที่จะใช้

ทบทวน plan อีกรอบตาม two-pass process ของ skill (ถ้ามีข้อใดเป็น default ทั่วไป ให้แก้ก่อน) แล้วจึงเริ่มโค้ด

## 5. Site Map

คงโครง 4 หน้าเหมือนเดิม ใช้ path ใหม่ที่สะอาดและทำ redirect จาก path เดิมใน `next.config.ts`:

| หน้า | Path ใหม่ | Redirect จาก |
|---|---|---|
| Home | `/` | — |
| About Us | `/about` | `/About-Us` |
| Services | `/services` | `/Service` |
| Contact Us | `/contact` | `/Contact` |

Navbar: HOME · ABOUT US · SERVICES · CONTACT US (ลำดับเดิม) พร้อมปุ่ม CTA "Contact Us"

## 6. สเปกแต่ละหน้า + Animation + Component จาก 21st.dev

หลักการเลือก component จาก 21st.dev: ใช้เฉพาะที่จำเป็น (ประมาณ 6–8 ตัวทั้งเว็บ) ครอบแต่ละตัวด้วย component ของโปรเจกต์เอง ปรับสี/ฟอนต์ให้เข้ากับ design token ลบ variant ที่ไม่ใช้ ตัวอย่างชื่อ component ที่มีบน 21st.dev ให้ค้นหาเพื่อยืนยัน URL จริงก่อนใช้: **Background Paths** (kokonutd), **Spotlight Card** (jahed), **Container Scroll Animation** (manuarora700), **Animated Hero** (tommyjepsen), **Scroll Morph Hero** (prashantsom75), **Radial Orbital Timeline** (jatin-yadav05), รวมถึงหมวด Navigation Menus, Backgrounds, Texts (text reveal / number ticker), Cards, CTAs, Footers

### 6.1 Global
- **Navbar**: sticky, พื้นหลังโปร่งแสง + blur เมื่อเลื่อน, active indicator เคลื่อนตามเมนู, mobile drawer มี animation เปิด/ปิด, โลโก้ใช้ไฟล์จากเว็บเดิม
- **Footer**: โลโก้ + "Corporate Profile — Innovative Solutions, Future Forward." + ย่อหน้า Empowering..., คอลัมน์ "Our Company" (Overview → /about, Service → /services, Contact & Support → /contact), ที่อยู่ย่อ, อีเมล, FAX
- **Page transition** แบบ fade/slide เบา ๆ ผ่าน `template.tsx` หรือ layout animation
- **Scroll reveal** ใช้ wrapper component เดียว (`<Reveal>`) สำหรับทุก section เพื่อความสม่ำเสมอ
- Cursor/hover effect ทำได้แต่ต้องปิดอัตโนมัติบน touch device

### 6.2 Home `/`
1. **Hero** (จุดที่กล้า): H1 "Thailand's Technology Infrastructure Leader", subline "Leading wired and wireless ICT — from smart buildings to nationwide digital networks.", CTA "READ MORE" → `/about` และ CTA รอง "View All Services" → `/services` พื้นหลังเป็น ambient animation ตาม motif (เช่น เส้นแสงวิ่งบนเส้นทาง fiber / โหนดเครือข่าย) ใช้ component หมวด Backgrounds/Heroes จาก 21st.dev, H1 มี text reveal ตอนโหลด, โหลด canvas/effect หนักแบบ `dynamic(() => ..., { ssr: false })`
2. **Our Core Services**: heading "OUR CORE SERVICES" + intro "We provide end-to-end ICT solutions, from initial design and professional installation to ongoing management and maintenance with zero-latency targets." + การ์ด 3 ใบ (01 Design & Implementation / 02 Installation & Deployment / 03 Manage & Maintenance ตามข้อความใน CONTENT) ใช้ Spotlight/hover card, stagger reveal, ปุ่ม "VIEW ALL SERVICES" → `/services`
3. **Stats strip** (ตัวเลขทั้งหมดมาจากเนื้อหาเดิม): `2013` Established · `11+` Years of Experience · `99.9%` Uptime · `24/7` Monitoring · `8` Infrastructure Systems ใช้ number ticker ที่นับเมื่อเลื่อนถึง
4. **Corporate Profile band**: "Innovative Solutions, Future Forward." + ย่อหน้า "Empowering businesses with advanced, forward-thinking solutions tailored to your needs. Partner with us today to power your future." + CTA → `/contact`
5. Footer

### 6.3 About `/about`
1. **Header**: "About Our Company" + "Founded in 2013, Shinasub is a leading ICT infrastructure provider in Thailand" + badge "Establishment / 2013"
2. **About Our Journey**: pull quote ย่อหน้าเต็มจาก CONTENT แสดงแบบ text reveal ทีละบรรทัด/คำ ประกอบ timeline สั้น (2013 ก่อตั้ง → ปัจจุบัน 11+ ปี) จะใช้ Radial Orbital Timeline หรือ vertical timeline ก็ได้ถ้าเข้ากับ design
3. **Vision / Mission**: 2 panel เลข 01 / 02 ข้อความตาม CONTENT
4. **Core Services**: "Comprehensive ICT Solutions" + ย่อหน้า, "Specialized Expertise" list 4 ข้อ (CCTV & Surveillance Systems / Access Control & Security / Structured Cabling & Networking / Server Room Design & Implementation), "Client-Focused Approach" + ย่อหน้า
5. **Service Level Commitment**: "Our Commitment" + ย่อหน้า
6. CTA → `/contact`

### 6.4 Services `/services`
1. **Header**: eyebrow "IT Infrastructure & Network Solutions", H1 "Design. Installation. Manage.", subline "End-to-End IT solutions crafted to boost efficiency, security, and growth.", ปุ่ม "Contact Us" → `/contact`, badge "Infrastructure Stability — 99.9% UPTIME", tagline "Engineering the Network backbone of the future."
2. **IT Infrastructure Guide**: quote "We offer comprehensive IT infrastructure services—from design and installation to 24/7 management—ensuring your systems are robust, scalable, and future-ready." + 3 pillar (01 Design & Implement / 02 Installation & Deploy / 03 Manage & Maintenance) แต่ละอันมีลิงก์ "View details" เลื่อนไป section ด้านล่างแบบ smooth scroll
3. **Design & Implementation**: ย่อหน้า intro + grid 8 ระบบ SYS 01–08 (ข้อความตาม CONTENT) แสดง status "Ready" ทุกใบ ใช้ bento grid / hover card ที่มี stagger reveal และไอคอนแทนแต่ละระบบ
4. **Installation & Deployment**: ย่อหน้า intro + 6 รายการ (SYS_LOG_01–06) ทำเป็น scroll-driven section (เช่น Container Scroll / horizontal sticky scroll) หรือ step list ที่ progress ตามการเลื่อน
5. **Managed Operations & Maintenance**: badge "24/7 Monitoring" + ย่อหน้า intro + 5 รายการ (Real-time Monitoring – Wi-Fi / Server Room / Fiber Optic Backbone (FOBB) / Internet Service / Events) แสดงแบบ live-status feel (จุดกะพริบเบา ๆ, live indicator) แต่ไม่รกตา
6. CTA → `/contact`

### 6.5 Contact `/contact`
1. **Header**: "CONTACT US" + "Take your infrastructure to the next level" + label "Technical Support"
2. **Info cards**: Location HQ (ที่อยู่เต็ม), Contact Number (02-080-9880), Contact Email (sales@shinasub.com เป็น `mailto:`), FAX (02-080-9880) มีปุ่ม copy
3. **Map**: ฝัง Google Maps (iframe แบบ lazy) ที่พิกัด 13.729414872738044° N, 100.53582288994332° E (Silom Edge Building) แสดง "COORD: 13.729414872738044° N, 100.53582288994332° E" และรูป `silom_Edge.jpg` จากเว็บเดิม
4. **Contact form** (ส่วนเสริมด้าน UX ที่อนุญาตให้เพิ่ม): ชื่อ, บริษัท, อีเมล, เบอร์โทร, บริการที่สนใจ (dropdown จากรายการ 8 ระบบ + Installation + Maintenance), ข้อความ มี validation แบบ inline, สถานะ loading/success/error มี animation

## 7. Animation Guideline (สรุป)

- ทุก animation ต้องมีเหตุผล: บอกลำดับการอ่าน, ตอบสนองการกระทำ, หรือสื่อ motif ของแบรนด์
- ใช้ `useReducedMotion` / `@media (prefers-reduced-motion: reduce)` เพื่อปิด ambient effect และลด duration
- Animate เฉพาะ `transform` และ `opacity` ห้ามทำ layout shift (CLS ต้องใกล้ 0)
- Effect หนัก (canvas, WebGL, particle) โหลดแบบ dynamic import + ssr:false และหยุดเมื่ออยู่นอก viewport หรือ tab ไม่ active
- Hero ต้องมี LCP < 2.5s บน mobile (ข้อความ H1 ต้องเป็น HTML จริง ไม่ใช่ canvas)
- ทดสอบบน mobile จริง ๆ (viewport 360px) ว่า animation ไม่กระตุกและไม่กินแบต

## 8. UX / คุณภาพ (บังคับ)

- Responsive 360px → 1920px, mobile-first, touch target ≥ 44px
- Accessibility: semantic HTML, heading order ถูกต้อง, focus-visible ชัด, alt text ทุกรูป, aria-label ปุ่มไอคอน, keyboard navigation ครบรวมถึง mobile menu, contrast ≥ AA
- SEO: `metadata` ต่อหน้า (title template "… | SHINASUB", description ไม่เกิน 160 ตัวอักษร เขียนจากเนื้อหาจริง), `opengraph-image.tsx` สร้าง OG image, `sitemap.ts`, `robots.ts`, JSON-LD `Organization` + `LocalBusiness` (ชื่อ, ที่อยู่, โทร, อีเมล, foundingDate 2013-12-06, geo 13.729414872738044/100.53582288994332), ลบค่า default "Generated by create next app"
- รูป: ดาวน์โหลดจากเว็บเดิมมาไว้ใน `public/` แล้วใช้ `next/image`: `https://shinasub.com/Shinasub_Logo.png`, `https://shinasub.com/Shinasub-Logo-W.png`, `https://shinasub.com/End-to-End.jpg`, `https://shinasub.com/Contact/silom_Edge.jpg` (ถ้าดาวน์โหลดไม่ได้ ให้ทำ placeholder ที่ชัดเจนและแจ้งในรายงาน)
- เนื้อหาทั้งหมดต้องอยู่ในไฟล์เดียว `src/content/site.ts` (typed object) แล้ว component ทุกตัวอ่านจากไฟล์นี้ เพื่อให้แก้ข้อความหรือเพิ่มภาษาไทยภายหลังได้ง่าย
- โครงสร้าง: `src/app/*` (routes), `src/components/ui/*` (shadcn + 21st.dev), `src/components/sections/*` (section ต่อหน้า), `src/components/motion/*` (Reveal, Counter, PageTransition ฯลฯ), `src/lib/*`
- `npm run lint`, `npx tsc --noEmit`, `npm run build` ต้องผ่านทั้งหมด เป้า Lighthouse (mobile) ≥ 90 ทุกหมวด

## 9. ลำดับการทำงานและสิ่งที่ต้องส่งมอบ

1. ติดตั้ง Skill + ตั้งค่า 21st.dev ตามข้อ 2 แล้วรายงานผล
2. เขียน `DESIGN_PLAN.md` ตามข้อ 4 (แสดงสรุปให้ดูสั้น ๆ แล้วทำต่อได้เลย)
3. Scaffold โปรเจกต์ Next.js, ติดตั้ง dependency, `shadcn init`, ติดตั้ง component จาก 21st.dev ตามรายชื่อใน plan
4. สร้าง `src/content/site.ts` จาก CONTENT ด้านล่างให้ครบทุกคำ
5. สร้าง layout (Navbar/Footer/PageTransition) → หน้า Home → Services → About → Contact
6. รัน dev server แล้ว screenshot ทุกหน้าทั้ง desktop และ mobile วิจารณ์งานตัวเองตาม frontend-design skill แล้วแก้จนพอใจ
7. รัน lint / type-check / build ให้ผ่าน
8. เขียน `README.md` (วิธีรัน, env ที่ต้องมี, โครงสร้าง) และรายงานสรุปท้ายงาน: สิ่งที่สร้าง, component จาก 21st.dev ที่ใช้พร้อม URL ที่มา, ข้อความใหม่ที่เพิ่มเอง, สิ่งที่ทำไม่ได้และเหตุผล

## 10. CONTENT (ต้นฉบับจาก shinasub.com — ใช้ตามนี้ทุกคำ)

### ข้อมูลบริษัท
- ชื่อ: SHINASUB / Shinasub Company Limited (บางจุดสะกด "SHINA SUB")
- โลโก้: `/Shinasub_Logo.png` (พื้นสว่าง), `/Shinasub-Logo-W.png` (สีขาว สำหรับพื้นมืด)
- ก่อตั้ง: December 6, 2013 (11+ ปี)
- ที่อยู่เต็ม: Room 2, Units 1501-1504, 15th Floor, Silom Edge Building, Silom Road, Suriyawong Subdistrict, Bang Rak District, Bangkok 10500, Thailand
- ที่อยู่ย่อ (footer): Bangkok, Silom, Bangkok 10500, Thailand
- โทร: 02-080-9880 · FAX: 02-080-9880 · Email: sales@shinasub.com
- พิกัด: 13.729414872738044° N, 100.53582288994332° E
- Navigation: HOME · ABOUT US · SERVICES · CONTACT US

### HOME
- H1: Thailand's Technology Infrastructure Leader
- Subline: Leading wired and wireless ICT — from smart buildings to nationwide digital networks.
- CTA: READ MORE (→ About)
- Section: OUR CORE SERVICES
  - Intro: We provide end-to-end ICT solutions, from initial design and professional installation to ongoing management and maintenance with zero-latency targets.
  - 01 Design & Implementation — We deliver comprehensive IT and network infrastructure solutions from Wi-Fi and CCTV to server rooms and structured cabling.
  - 02 Installation & Deployment — Our expert teams provide professional, on-site installation and deployment of Wi-Fi networks, fiber optics, and various event systems.
  - 03 Manage & Maintenance — We offer ongoing management and proactive support for your networks, ensuring reliable performance and continuous operation.
  - CTA: VIEW ALL SERVICES (→ Services)
- Footer / Corporate Profile: Innovative Solutions, Future Forward.
  - Empowering businesses with advanced, forward-thinking solutions tailored to your needs. Partner with us today to power your future.
  - Our Company: Overview · Service · Contact & Support

### ABOUT US
- Heading: About Our Company
- Subheading: Founded in 2013, Shinasub is a leading ICT infrastructure provider in Thailand
- Badge: Establishment / 2013
- About Our Journey:
  "Established on December 6, 2013, Shinasub began with a clear vision: to become a trusted leader in delivering comprehensive ICT solutions. Over the past 11 years, we have transformed that vision into reality, building skilled professional team and deep expertise in designing, installing, and maintaining modern ICT systems. Our capabilities span network infrastructure, telecommunications, and cybersecurity, enabling us to support organizations across Thailand with reliable, future-ready solutions. Today, Shinasub stands as a proven technology partner for leading government agencies and private enterprises, driving innovation and strengthening competitiveness in the digital era."
- 01 Our Vision: As a trusted system integrator in Thailand, we focus on customer-centric design, seamless implementation, and advanced technology management.
- 02 Our Mission: We create future-proof ICT and security ecosystems that enable smart living and digital innovation. With end-to-end expertise, we connect properties and cities through intelligent wired and wireless solutions to enable effective communication and a competitive advantage to our customers.
- Core Services
  - Comprehensive ICT Solutions: We provide end-to-end ICT system design, installation, and maintenance services.
  - Specialized Expertise: CCTV & Surveillance Systems · Access Control & Security · Structured Cabling & Networking · Server Room Design & Implementation
  - Client-Focused Approach: We work closely with clients to understand their unique needs and deliver tailored solutions. Our collaborative approach ensures every project is aligned with their goals, providing personalized service and measurable results.
- Service Level Commitment — Our Commitment: Our team is committed to delivering exceptional results—offering full-service ICT solutions, from consultation to installation and maintenance. We integrate cutting-edge technology with professional project management to ensure timely, cost-effective, and outstanding outcomes.

### SERVICES
- Eyebrow: IT Infrastructure & Network Solutions
- H1: Design. Installation. Manage.
- Subline: End-to-End IT solutions crafted to boost efficiency, security, and growth.
- CTA: Contact Us
- Badge: Infrastructure Stability — 99.9% UPTIME
- Tagline: Engineering the Network backbone of the future.
- IT Infrastructure Guide: "We offer comprehensive IT infrastructure services—from design and installation to 24/7 management—ensuring your systems are robust, scalable, and future-ready."
  - 01 Design & Implement — Network architecture designed to support your operations. (View details)
  - 02 Installation & Deploy — Reliable network deployment and integration. (View details)
  - 03 Manage & Maintenance — 24/7 monitoring and system optimization. (View details)
- Design & Implementation — intro: We design IT infrastructure and network systems tailored to your business to enhance efficiency and security. Our team combines careful planning with engineering expertise to deliver reliable, future-ready solutions.
  - SYS 01 Wi-Fi System — High-density wireless design with predictive RF planning, roaming optimization, and secure access control. (Status: Ready)
  - SYS 02 Network System — Layered LAN architecture with redundancy, segmentation, and performance-driven design. (Status: Ready)
  - SYS 03 CCTV System — IP surveillance systems with centralized monitoring, recording, and secure access. (Status: Ready)
  - SYS 04 Internet HSIA — Carrier-grade high-speed internet access for hospitality, malls, and large commercial sites. (Status: Ready)
  - SYS 05 Switch Management — Core, aggregation, and access switching with VLAN, QoS, and scalable topology design. (Status: Ready)
  - SYS 06 Server Room — Secure server rooms with structured racks, power redundancy, cooling, and monitoring. (Status: Ready)
  - SYS 07 Cabling Infra — Fiber and UTP structured cabling compliant with performance and reliability standards. (Status: Ready)
  - SYS 08 BOH Systems — Back-of-house network systems supporting operational workflows and internal services. (Status: Ready)
- Installation & Deployment — intro: Professional installation and deployment of designed systems, ensuring quality and compliance with industry standards. Our technicians work diligently to deliver seamless implementation that meets your business requirements.
  - 01 Enterprise Wi-Fi Deployment — Install the designed Wi-Fi networks to provide efficient coverage across target areas.
  - 02 Network Configuration — Complete installation of network systems and related equipment for optimal performance.
  - 03 Wireless Network — Setup wireless networks to ensure convenient, fast and secure connectivity.
  - 04 Fiber Optic and Cable Wiring — Perform precise and secure fiber optic and cable wiring with a neat finish.
  - 05 Data Center — Install and configure equipment and systems within server rooms, ensuring proper setup and functionality.
  - 06 Internet at Events — Provide reliable internet installation services for events and temporary setups.
- Managed Operations & Maintenance — badge: 24/7 Monitoring — intro: Ongoing management and maintenance services to keep your network and equipment running smoothly while minimizing risks of failure. We provide monitoring, troubleshooting, and proactive maintenance tailored to your systems.
  - Real-time Monitoring (Wi-Fi) — Monitor and maintain Wi-Fi networks to ensure continuous, high-quality performance.
  - Server Room — Manage and maintain the server room environment and systems for optimal reliability.
  - Fiber Optic Backbone (FOBB) — Maintain the core fiber optic cabling systems to guarantee stability and long-term performance.
  - Internet Service — Ensure internet connectivity remains stable and performs optimally.
  - Events — Provide support and maintenance for internet usage during various events and temporary setup.

### CONTACT US
- Heading: CONTACT US
- Subline: Take your infrastructure to the next level
- Label: Technical Support
- Location HQ — Address: Room 2, Units 1501-1504, 15th Floor, Silom Edge Building, Silom Road, Suriyawong Subdistrict, Bang Rak District, Bangkok 10500, Thailand
- Contact Number — Phone: 02-080-9880
- Contact Email — Email: sales@shinasub.com
- Bangkok Headquarters — COORD: 13.729414872738044° N, 100.53582288994332° E (Silom Edge Building)
- รูป: `/Contact/silom_Edge.jpg`

=== PROMPT END ===

---

## หมายเหตุสำหรับผู้ใช้ (ไม่ต้องวางลง Claude Code)

**สิ่งที่พบจากการสำรวจ shinasub.com (9 ก.ย. 2026)**
- เว็บเดิมสร้างด้วย Next.js อยู่แล้ว (meta description ยังเป็นค่า default "Generated by create next app") ใช้ฟอนต์ Poppins + Prompt เนื้อหาเป็นภาษาอังกฤษล้วน ไม่มีเวอร์ชันภาษาไทย
- มี 4 หน้า: `/`, `/About-Us`, `/Service`, `/Contact` ไม่มีฟอร์มติดต่อ ไม่มี social link ไม่มีโลโก้ลูกค้า ไม่มีส่วนทีมงาน
- รูปที่ดึงมาใช้ต่อได้: โลโก้ 2 แบบ, `End-to-End.jpg`, `Contact/silom_Edge.jpg`

**เรื่องเครื่องมือ**
- Skill ทั้งสองติดตั้งผ่าน `npx skills add ...` (คำสั่งอยู่ในข้อ 2 ของ Prompt) ตัว `frontend-design` เป็นของ Anthropic เอง ส่วน `ui-ux-pro-max` เป็นของชุมชน
- 21st.dev free tier จำกัดจำนวนติดตั้ง component ต่อวัน และ 21st MCP ต้อง login/API key ถ้าจะให้งานลื่น แนะนำสมัครและตั้งค่าตาม https://21st.dev/mcp ก่อนเริ่ม
- ถ้าต้องการเพิ่มภาษาไทยในอนาคต โครงสร้าง `src/content/site.ts` ที่บังคับไว้ในข้อ 8 จะช่วยให้ทำ i18n ได้ง่าย

**จุดที่ควรตัดสินใจเพิ่ม (แก้ใน Prompt ได้เลย)**
- ต้องการฟอร์มติดต่อหรือไม่ (ข้อ 6.5 ข้อ 4) ถ้าไม่ต้องการให้ลบออก
- ต้องการ light mode ด้วยหรือไม่ (ตอนนี้กำหนด dark-first อย่างเดียว)
- ต้องการเวอร์ชันภาษาไทยเลยหรือไม่ (ตอนนี้คงภาษาอังกฤษตามต้นฉบับ)
