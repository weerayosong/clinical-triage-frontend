# Clinical Triage - Frontend Repository

Backend Repository: [Backend](https://github.com/weerayosong/clinical-triage-backend)  
Live Preview: [Demo](https://clinical-triage-frontend.vercel.app/)

โปรเจกต์ต้นแบบแอปพลิเคชัน (Concept Application) สำหรับระบบจัดการคิวและคัดกรองผู้ป่วยเบื้องต้น ที่ได้รับการออกแบบโดยให้ความสำคัญกับความยืดหยุ่นในการแสดงผล (Responsive Design) และโครงสร้างระบบสถาปัตยกรรมระดับองค์กร (Enterprise Architecture)

![clinical-triage-img](https://github.com/weerayosong/weerayosong.github.io/blob/main/images/gif/proj5b.gif?raw=true)

## วัตถุประสงค์ของโปรเจกต์ (Project Objective)

โปรเจกต์นี้เริ่มต้นขึ้นจากความตั้งใจที่จะท้าทายตัวเองในช่วงสุดสัปดาห์ เพื่อพาตัวเองออกจาก Comfort Zone และทดลองสัมผัสกับ Tech Stack ระดับองค์กร ที่ยังไม่เคยมีประสบการณ์ในการพัฒนามาก่อน นั่นคือ **Angular** และ **Java Spring Boot**

ในฐานะมือใหม่ที่เพิ่งเริ่มต้นกับ Stack นี้ ผมตระหนักดีถึงความซับซ้อนและ Learning Curve ที่ค่อนข้างสูง ทั้งในเรื่องของ Strict Typing, โครงสร้างแบบ Reactive และสถาปัตยกรรมหลังบ้านที่รัดกุม ทั้งนี้จึงเลือกใช้วิธีการเรียนรู้แบบลงมือทำ Top-down Approach โดยมี AI เข้ามาเป็นผู้ช่วย เพื่อช่วยอธิบายคอนเซปต์ แนะนำแนวทางปฏิบัติที่ดี (Best Practices) และช่วยเร่งทำความเข้าใจโครงสร้างที่ซับซ้อนให้เห็นภาพชัดเจนขึ้น

แอปพลิเคชัน Clinical Triage ตัวนี้ จึงถูกสร้างขึ้นมาในฐานะ "ตัวต้นแบบเพื่อการศึกษา" ที่มุ่งเน้นทำความเข้าใจการไหลของข้อมูล และการเปลี่ยนสถานะของ State Transition มากกว่าความสมบูรณ์แบบของระบบทั้งหมด ยังคงมีกลไกเชิงลึกอีกมากมายใน Framework เหล่านี้ที่ผมยังต้องศึกษาเพิ่มเติม แต่โปรเจกต์เล็กๆ นี้ก็ถือเป็นก้าวแรกที่สำคัญที่จะช่วยในการพัฒนาตัวเองขึ้นต่อไป

## การออกแบบ & สถาปัตยกรรมระบบ (Architecture & System Design)

[Architecture & System Design Documentation](https://admirable-malasada-3580eb.netlify.app)

## สถาปัตยกรรมระบบฝั่งหน้าบ้าน (Frontend Architecture)

แอปพลิเคชันฝั่ง Client ทำงานในรูปแบบ **Single Page Application (SPA)**โดยมุ่งเน้นที่การแยกส่วนตรรกะทางธุรกิจและการแสดงผลออกจากกัน (Separation of Concerns):

- **Component-Based Architecture:** แบ่งส่วนการทำงานของหน้าจอ (UI) ออกเป็นโมดูลและคอมโพเนนต์ย่อยที่ทำงานเป็นอิสระต่อกัน (เช่น ส่วนฟอร์มรับข้อมูลผู้ป่วย และกระดานคิว)
- **Service-Oriented Data Fetching:** จัดการการเชื่อมต่อข้อมูลแบบรวมศูนย์ผ่าน Angular Service ด้วย `HttpClient` เพื่อลดภาระการทำงานของ Component และทำให้โค้ดมีความเป็นระเบียบ
- **Adaptive & Responsive Layout:** ควบคุมการแสดงผลเลย์เอาต์ด้วย Tailwind CSS v.4 โดยระบบจะปรับการทำงานจากกระดาน Kanban แบบ 3 คอลัมน์บนหน้าจอเดสก์ท็อป เป็นรูปแบบ Accordion (ซ่อน-แสดงทีละสถานะ) โดยอัตโนมัติบนอุปกรณ์เคลื่อนที่

---

## ฟีเจอร์การทำงานหลัก (Key Features)

- **Triage Registration:** ระบบลงทะเบียนผู้ป่วยฉุกเฉิน พร้อมการจัดระดับความเร่งด่วนทางคลินิก (Normal, Urgent, Emergency)
- **Dynamic Queue Board:** กระดานแสดงผลข้อมูลผู้ป่วยแบบ Kanban board แบ่งตามระยะการบริการ: รอรับการรักษา (Waiting), กำลังรักษา (In Treatment), และจำหน่ายกลับ (Discharged)
- **Optimistic UI Updates:** ระบบปรับปรุงสถานะหน้าจอทันทีเมื่อเกิดการโต้ตอบจากผู้ใช้ (Action) โดยไม่ต้องรอผลลัพธ์ตอบกลับจากเซิร์ฟเวอร์ เพื่อประสบการณ์การใช้งานที่ไร้รอยต่อ
- **Skeleton Loading State:** ระบบแสดงผลส่วนโครงร่างแบบแอนิเมชัน (Skeleton) ระหว่างรอข้อมูลจาก API ป้องกันการเกิดเลย์เอาต์กระตุกและเพิ่มคุณภาพด้าน UX

---

## เครื่องมือและเทคโนโลยี (Technology Stack)

**Frontend Environment**

- **Framework:** Angular (TypeScript)
- **Reactivity:** RxJS (Reactive Extensions for JavaScript)
- **Styling:** Tailwind CSS v.4
- **Hosting:** Vercel

**External Dependencies (Backend Integration)**

- **API Service:** Java Spring Boot 3.x (RESTful APIs)
- **Database:** PostgreSQL

---

## การตั้งค่าและการติดตั้ง (Setup & Deployment)

โปรเจกต์นี้ได้รับการปรับแต่งโครงสร้างให้สอดคล้องกับการนำไปประยุกต์ใช้บนแพลตฟอร์มคลาวด์ **Vercel** โดยมีรายละเอียดที่ต้องดำเนินการดังนี้:

### 1. การจัดการ Environment Variables

ระบบรองรับการสลับ URL ของ Backend API ตามสภาพแวดล้อมโดยอัตโนมัติ

- **Development:** ชี้ไปที่ `http://localhost:8080/api/v1/patients`
- **Production:** จำเป็นต้องระบุ URL ของคลาวด์เซิร์ฟเวอร์ Railway ในไฟล์ `src/environments/environment.ts`

### 2. การจัดการ SPA Routing บน Vercel

เพื่อป้องกันปัญหา `404 Not Found` เมื่อผู้ใช้งานรีเฟรชหน้าเว็บ หรือเข้าถึงแอปพลิเคชันผ่าน URL ย่อยโดยตรง โครงสร้างโปรเจกต์จึงได้มีการแนบไฟล์ `vercel.json` ในระดับ Root Directory เพื่อบังคับให้ Vercel ทำการ Rewrite Route ทั้งหมดกลับไปที่ `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## บันทึกการเปลี่ยนแปลง (Changelog)

**[v1.1.0] - 2026-06-07**

- **Added:** นำเสนอระบบ Skeleton Loading UI สำหรับสถานะเรนเดอร์ข้อมูลแบบ Asynchronous
- **Added:** ปรับแต่งโครงสร้างไฟล์สำหรับการ Deploy บน Vercel ผ่านการตั้งค่า `vercel.json` (SPA Routing Rule)
- **Added:** รองรับระบบ Environment Variables เพื่อแยกระหว่างโหมด Development (`ng serve`) และ Production (`ng build`)
- **Refactored:** จัดระเบียบ Control Flow (`@if`, `@else`, `@for`, `@empty`) ตามมาตรฐานโครงสร้างใหม่ของ Angular เพื่อลดปัญหาการ Render แข่งขันกันระหว่าง State
- **Fixed:** แก้ไขข้อผิดพลาดทางไวยากรณ์ `TS1117` จากการระบุชื่อคลาส CSS ซ้ำซ้อนใน `[ngClass]` บริเวณขอบและป้ายสถานะของการ์ดผู้ป่วย
