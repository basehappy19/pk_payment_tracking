import { Status } from "@/app/(user)/(students)/fee/page";
import { CheckFeeStudent } from "@/app/functions/fees/CheckFee";
import puppeteer from "puppeteer";

export const GET = async () => {
  try {
    const status: Status = await CheckFeeStudent({ index: undefined });
    
    const getStatusColor = (payStatus: string) => {
      switch (payStatus) {
        case 'done':
          return 'text-green-700';
        case 'paying':
          return 'text-orange-700';
        default:
          return 'text-red-700';
      }
    };

    const getStatusText = (payStatus: string) => {
      switch (payStatus) {
        case 'done':
          return 'ชำระครบเรียบร้อย';
        case 'paying':
          return 'อยู่ระหว่างชำระ';
        default:
          return 'ยังไม่ชำระ';
      }
    };

    const htmlContent = `
      <html>
        <head>
          <meta name="description" content="ตรวจสอบสถานะการชำระค่าบำรุงการศึกษา">
          <meta name="keywords" content="ตรวจสอบการชำระ, ค่าเทอม, โรงเรียน">
          <meta name="author" content="โรงเรียนภูเขียว">
          
          <meta name="apple-mobile-web-app-title" content="ตรวจสอบสถานะการชำระค่าบำรุงการศึกษา">
          
          <meta property="og:title" content="ตรวจสอบสถานะการชำระค่าบำรุงการศึกษา">
          <meta property="og:description" content="ตรวจสอบสถานะการชำระค่าบำรุงการศึกษาสำหรับนักเรียน">

          <title>ใบรายงานสถานะการชำระเงิน - ${status.name}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @font-face {
              font-family: 'Sarabun';
              src: url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');
            }
            
            body {
              font-family: 'Sarabun', sans-serif;
              position: relative;
              padding: 40px;
              background: white;
            }

            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 72px;
              opacity: 0.04;
              pointer-events: none;
              z-index: 1;
              white-space: nowrap;
              color: #000;
            }

            .header-logo {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }

            .official-border {
              border: 2px solid #1f2937;
              border-radius: 8px;
              padding: 24px;
              margin-top: 24px;
              position: relative;
            }

            table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              margin-top: 24px;
            }

            th, td {
              border: 1px solid #e5e7eb;
              padding: 12px;
              text-align: left;
            }

            th {
              background-color: #f9fafb;
              font-weight: 600;
            }

            tr:nth-child(even) {
              background-color: #f9fafb;
            }

            .serial-number {
              position: absolute;
              top: 16px;
              right: 16px;
              font-size: 12px;
              color: #6b7280;
            }

            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #6b7280;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="watermark">เอกสารยืนยันการชำระเงิน</div>
          
          <div class="text-center">
            <img src="${process.env.NEXT_PUBLIC_BASE_URL + "/" + "logo_pk.png"}" class="header-logo mx-auto" />
            <h1 class="text-2xl font-bold mb-2">ใบรายงานสถานะการชำระเงินค่าบำรุงการศึกษา</h1>
            <p class="text-gray-600 mb-6">โรงเรียนภูเขียว</p>
          </div>

          <div class="official-border">
            <div class="serial-number">เลขที่เอกสาร: DOC-${Date.now().toString().slice(-6)}</div>
            
            <div class="mb-6">
              <h2 class="text-lg font-semibold mb-4">ข้อมูลนักเรียน</h2>
              <div class="grid grid-cols-2 grid-rows-2 gap-4">
                <div>
                    <p class="text-gray-600">ชื่อ-นามสกุล</p>
                    <p class="font-semibold">${status.name}</p>
                </div>
                <div>
                    <p class="text-gray-600">รหัสนักเรียน</p>
                    <p class="font-semibold">${status.sid}</p>
                </div>
                <div>
                  <p class="text-gray-600">ชั้นเรียน</p>
                  <p class="font-semibold">ม.${status.studentInClassroom.classroom.level.name}/${status.studentInClassroom.classroom.room.name}</p>
                </div>
                <div>
                  <p class="text-gray-600">เลขที่</p>
                  <p class="font-semibold">${status.studentInClassroom.no}</p>
                </div>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th class="w-1/3">ภาคเรียน/ปีการศึกษา</th>
                  <th class="w-1/3">จำนวนเงิน (บาท)</th>
                  <th class="w-1/3">สถานะการชำระ</th>
                </tr>
              </thead>
              <tbody>
                ${status.studentInClassrooms.map(
                  (studentInClassroom) => `
                    <tr>
                      <td>${studentInClassroom.classroom.education_term.name}/${studentInClassroom.classroom.education_year.name}</td>
                      <td>${studentInClassroom.total_fee_amount.toLocaleString('th-TH')}</td>
                      <td class="${getStatusColor(studentInClassroom.pay_status)} font-semibold">
                        ${getStatusText(studentInClassroom.pay_status)}
                      </td>
                    </tr>
                  `
                ).join("")}
              </tbody>
            </table>

            <div class="mt-8 text-sm text-gray-500" id="timestamp"></div>
          </div>

          <div class="footer">
            <p>เอกสารฉบับนี้ออกโดยระบบอิเล็กทรอนิกส์</p>
            <p>สามารถตรวจสอบความถูกต้องได้ที่ เว็บไซต์ receipt.phukhieo.ac.th</p>
          </div>

          <script>
            const options = { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit', 
              timeZone: 'Asia/Bangkok' 
            };
            const now = new Date().toLocaleString('th-TH', options);
            document.getElementById('timestamp').innerText = "ออกเอกสาร ณ วันที่ " + now;
          </script>
        </body>
      </html>
    `;    

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="fee-status-report.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(JSON.stringify({ error: "Error generating PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};