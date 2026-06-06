# Clinical Triage - Frontend Repository

Backend Repository: [Backend](https://github.com/weerayosong/clinical-triage-backend)

โปรเจกต์ทดลองสร้างระบบจัดการคิวและคัดกรองผู้ป่วยเบื้องต้น (Concept Application) ที่ออกแบบโดยคำนึงถึงความยืดหยุ่นในการแสดงผลแบบ Responsive และโครงสร้างระบบแบบ Enterprise

![clinical-triage-img](https://github.com/weerayosong/weerayosong.github.io/blob/main/images/gif/proj5.gif?raw=true)

## วัตถุประสงค์ของโปรเจกต์ (Project Objective)

โปรเจกต์นี้เริ่มต้นขึ้นจากความตั้งใจที่จะท้าทายตัวเองในช่วงสุดสัปดาห์ เพื่อพาตัวเองออกจาก Comfort Zone และทดลองสัมผัสกับ Tech Stack ระดับองค์กรที่ผมยังไม่เคยมีประสบการณ์มาก่อน นั่นคือ **Angular** และ **Java Spring Boot**

ในฐานะมือใหม่ที่เพิ่งเริ่มต้นกับ Stack นี้ ผมตระหนักดีถึงความซับซ้อนและ Learning Curve ที่ค่อนข้างสูง ทั้งในเรื่องของ Strict Typing, โครงสร้างแบบ Reactive และสถาปัตยกรรมหลังบ้านที่รัดกุม ผมจึงเลือกใช้วิธีการเรียนรู้แบบลงมือทำ Top-down Approach โดยมี AI เข้ามาเป็นผู้ช่วย เพื่อช่วยอธิบายคอนเซปต์ แนะนำแนวทางปฏิบัติที่ดี (Best Practices) และช่วยเร่งทำความเข้าใจโครงสร้างที่ซับซ้อนให้เห็นภาพชัดเจนขึ้น

แอปพลิเคชัน Clinical Triage ตัวนี้ จึงถูกสร้างขึ้นมาในฐานะ "ตัวต้นแบบเพื่อการศึกษา" ที่มุ่งเน้นทำความเข้าใจการไหลของข้อมูล และการเปลี่ยนสถานะของ State Transition มากกว่าความสมบูรณ์แบบของระบบทั้งหมด ผมยอมรับอย่างตรงไปตรงมาว่ายังคงมีกลไกเชิงลึกอีกมากมายใน Framework เหล่านี้ที่ผมยังต้องศึกษาเพิ่มเติม แต่โปรเจกต์เล็กๆ นี้ก็ถือเป็นก้าวแรกที่สำคัญที่จะช่วยให้ผมได้พัฒนาตัวเองขึ้นต่อไป

## สถาปัตยกรรมระบบ (System Architecture)

[Architecture & System Design Documentation](https://admirable-malasada-3580eb.netlify.app)

ระบบนี้ทำงานอยู่บนพื้นฐานของ **Client-Server Architecture** โดยแยกส่วนการแสดงผล User Interface ออกจากตรรกะทางธุรกิจ Business Logic และการจัดการข้อมูลอย่างชัดเจน:

- **Presentation Layer (ฝั่งหน้าบ้าน - Client):** พัฒนาเป็น Single Page Application (SPA) ด้วย Angular ทำหน้าที่จัดการ UI, การรับส่งข้อมูลจากผู้ใช้, และทำงานแบบ Responsive โดยเชื่อมต่อกับส่วนหลังบ้านผ่าน HTTP RESTful APIs เท่านั้น
- **Application Layer (ฝั่งหลังบ้าน - Server):** ใช้ Java Spring Boot ทำหน้าที่เป็นหัวใจหลักในการประมวลผล (Business Logic) ตรวจสอบความถูกต้องของข้อมูล (Validation) และเตรียม REST Endpoints ที่ปลอดภัยให้หน้าบ้านเรียกใช้งาน
- **Data Access Layer:** ใช้ Spring Data JPA (Hibernate) เป็นตัวกลางในการทำ ORM (Object-Relational Mapping) เพื่อแปลง Object ในภาษา Java (Entity) ให้ผูกกับตารางในฐานข้อมูล ช่วยลดความซับซ้อนของการเขียน SQL โดยตรง
- **Data Persistence (ฐานข้อมูล):** จัดเก็บข้อมูลผู้ป่วย ระดับความเร่งด่วน และสถานะคิวลงใน PostgreSQL

## รูปแบบการออกแบบซอฟต์แวร์ (Software Design Patterns)

### Backend (Spring Boot: โครงสร้างแบบ N-Tier Architecture)

โครงสร้างหลังบ้านถูกแบ่งเลเยอร์อย่างเป็นระเบียบ (Separation of Concerns) เพื่อให้โค้ดดูแลรักษาง่ายและพร้อมสำหรับการขยายตัว:

1. **Controller Layer:** เป็นด่านหน้าสำหรับรับ HTTP Requests จากหน้าบ้าน, อ่านค่าพารามิเตอร์, และส่ง Response กลับไปพร้อม HTTP Status Code ที่เหมาะสม
2. **Service Layer:** ชั้นที่บรรจุตรรกะของแอปพลิเคชัน (Business Logic) ทั้งหมด เช่น กฎการย้ายสถานะคิวผู้ป่วย
3. **Repository Layer:** ส่วนที่ทำหน้าที่สื่อสารกับฐานข้อมูลโดยตรง
4. **Entity Model:** คลาส Java ที่เป็นตัวแทน (POJOs) ของโครงสร้างตารางข้อมูล

### Frontend (Angular: โครงสร้างแบบ Component-Based Architecture)

1. **Modular UI:** แบ่งหน้าจอเป็น Component ย่อยๆ ที่ทำงานอิสระต่อกัน (เช่น ส่วนฟอร์มเพิ่มข้อมูล และส่วนแสดงผลตาราง)
2. **Service-Oriented Data Fetching:** สร้าง Angular Service แยกออกมาเพื่อรับผิดชอบการยิง API ผ่าน `HttpClient` โดยเฉพาะ ทำให้ Component หน้าจอไม่ต้องแบกรับภาระการเชื่อมต่อข้อมูล
3. **Responsive & Adaptive Layout:** ใช้ Tailwind CSS v.4 ควบคุมเลย์เอาต์ โดยออกแบบให้หน้าจอเดสก์ท็อปแสดงผลเป็นบอร์ด Kanban แบบ 3 คอลัมน์ และปรับเป็นรูปแบบ Accordion (เปิด-ปิดทีละสถานะ) โดยอัตโนมัติเมื่อใช้งานบนหน้าจอมือถือ เพื่อประสบการณ์การใช้งานที่ลื่นไหลที่สุด

## เครื่องมือและเทคโนโลยี (Technology Stack)

**Frontend Environment:**

- Angular (TypeScript)
- RxJS (Reactive Extensions for JavaScript)
- Tailwind CSS v.4
- HTML5 / Vanilla JS (Mockup UI)

**Backend Environment:**

- Java (JDK 17+)
- Spring Boot 3.x
- Spring Web (RESTful APIs)
- Spring Data JPA
- PostgreSQL Driver

**Infrastructure & Tooling:**

- PostgreSQL
- Maven (Dependency Management)
- Node.js & npm
- Git (Version Control)

## ฟีเจอร์หลัก (Key Features)

- **Triage Registration:** ระบบลงทะเบียนด่วนสำหรับคัดกรองผู้ป่วย โดยระบุอาการและระดับความเร่งด่วน (Normal, Urgent, Emergency)
- **Dynamic Queue Board:** กระดานแสดงผลแบบ Kanban ที่อัปเดตสถานะของผู้ป่วยใน 3 ระยะ: รอรับการรักษา (Waiting), กำลังรักษา (In Treatment), และจำหน่ายกลับ (Discharged)
- **Adaptive Mobile View:** อินเทอร์เฟซที่ปรับตัวเองให้เหมาะสมกับขนาดหน้าจอ ช่วยให้เจ้าหน้าที่ใช้งานผ่านอุปกรณ์พกพาได้อย่างสะดวก
