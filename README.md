# Trang web React

Trang web này được xây dựng bằng React và Vite.

## Mô tả

Đây là một ứng dụng web được tạo bằng React, một thư viện JavaScript phổ biến để xây dựng giao diện người dùng. Vite được sử dụng làm công cụ xây dựng, cung cấp một môi trường phát triển nhanh chóng với tính năng Thay thế mô-đun nóng (HMR).

## Các tập lệnh có sẵn

Trong thư mục dự án, bạn có thể chạy:

### `npm run dev`

Chạy ứng dụng ở chế độ phát triển.\
Mở [http://localhost:5173](http://localhost:5173) để xem trong trình duyệt.

Trang sẽ tải lại nếu bạn thực hiện chỉnh sửa.\
Bạn cũng sẽ thấy bất kỳ lỗi lint nào trong bảng điều khiển.

### `npm run build`

Xây dựng ứng dụng để sản xuất vào thư mục `dist`.\
Nó gói chính xác React ở chế độ sản xuất và tối ưu hóa bản dựng để có hiệu suất tốt nhất.

### `npm run preview`

Chạy một máy chủ xem trước cục bộ của bản dựng sản xuất.

### `npm run lint`

Chạy ESLint để phân tích mã cho các vấn đề tiềm ẩn.

### `npm install firebase`
Cài đặt Firebase SDK để tích hợp Firebase vào ứng dụng React.

---

# WoodMart - Website Nội Thất Gỗ Tự Nhiên & AI Chatbot

Trang web Landing Page giới thiệu sản phẩm gỗ tự nhiên, được xây dựng trên nền tảng React/Vite (hoặc cấu trúc Single Page HTML), tích hợp trí tuệ nhân tạo để tư vấn khách hàng.

## 🌟 Các Tính Năng Mới Cập Nhật (Changelog) 30/1/2026

### 1. Giao Diện & Màu Sắc (UI/UX)
* **Color Palette:** Thay đổi hoàn toàn bảng màu sang phong cách hiện đại, tương phản cao:
    * **Màu nhấn (Accent):** **Neon Lime (`#33FF33`)** -.
    * **Màu chính (Primary):** Nâu Đất Đậm (`#5d4037`) - Tạo cảm giác mộc mạc, bền vững.
* **Logic Gradient Phức Tạp:**
    * **Hero Section (Trên cùng):** Hiệu ứng chuyển màu từ Trong suốt (0-45%) để lộ ảnh nền -> Neon Lime pha trộn -> Trắng (100%).
    * **Bottom Wrapper (Dưới cùng):** Hiệu ứng chuyển màu ngược từ Nâu Đậm (đáy) lên Trắng (đỉnh), bao bọc các phần "Why Us", "Tư Vấn", "Liên Hệ".

### 2. Cập Nhật Sản Phẩm
Mở rộng danh mục sản phẩm lên 6 loại gỗ:
* Các loại gỗ cơ bản: Thông, Sồi, Óc Chó, Lim.
* **Mới thêm:**
    * **Gỗ Bạch Đàn:** Phân khúc giá rẻ, xây dựng.
    * **Gỗ Đàn Hương:** Phân khúc cao cấp, phong thủy, mỹ nghệ.

### 3. Tích Hợp Công Nghệ
* **Google Gemini AI:** Chatbot đóng vai chuyên viên tư vấn WoodMart (Prompt kỹ thuật: tư vấn dựa trên danh sách gỗ có sẵn).
* **Firebase Firestore:** Hệ thống Backend-as-a-Service để lưu trữ đơn đăng ký tư vấn của khách hàng.

## 📌 Tóm Tắt Các Thay Đổi & Nâng Cấp 31/1/2026

### 1. Công Nghệ & Cấu Trúc
* **Chuyển đổi React:** Thay thế bản HTML cũ bằng React Component, sử dụng `Vite` làm công cụ build.
* **Thư viện mới:** Tích hợp `framer-motion` (cho hiệu ứng động) và `firebase` (lưu trữ form tư vấn).
* **Assets:** Quy hoạch lại toàn bộ hình ảnh vào thư mục chuẩn `public/images/`.

### 2. Giao Diện & Màu Sắc (Concept "Rừng Núi")
* **Bảng màu mới:** Loại bỏ màu Neon cũ, chuyển sang tông màu trầm ấm và tự nhiên hơn:
    * **Primary:** Nâu Đen (`#352F2D`) - Dùng cho chữ và các mảng nền đậm.
    * **Accent:** Xanh Rừng (`#2D6A4F`) - Dùng cho nút bấm, icon, đường viền.
    * **Base:** Trắng Sữa (`#FDFBF9`) - Dùng làm nền trang dịu mắt.
* **Fix UI:**
    * Khôi phục nút "Liên hệ" trong thẻ sản phẩm về đúng dạng Button (viên thuốc).
    * Loại bỏ biểu tượng mặc định (tia sét) của Vite trên tab trình duyệt.

### 3. Hiệu Ứng Động (Animations)
* **Reveal On Scroll:** Các khối nội dung tự động "trồi lên" mượt mà khi người dùng cuộn trang.
* **Chatbot Shake:** Nút Chatbot ở góc màn hình có hiệu ứng "rung lắc" định kỳ để thu hút sự chú ý.
* **Active Menu:** Menu điều hướng tự động sáng đèn (active) khi cuộn đến khu vực tương ứng.

### 4. Nâng Cấp Chatbot
* **Giao diện:** Header Chatbot được làm mới với **Gradient Xanh** tươi mát (`#2D6A4F` -> `#3da57a`).
* **Thông tin:** Thêm dòng chức danh "Chăm sóc khách hàng" dưới tên Bot để tăng độ chuyên nghiệp.

## ✨ Cập Nhật Giao Diện & Trải Nghiệm 01/02/2026

### 1. Giao Diện (UI/UX) - Tropical Modernism
* **Phong cách mới:** Chuyển đổi sang "Nhiệt đới hiện đại" (Tropical Modernism) với không gian thoáng, bo góc lớn (`border-radius: 30px`).
* **Glassmorphism:** Áp dụng hiệu ứng kính mờ cho Header và Hero Card.
* **Layout:** Sử dụng **Bento Grid** cho phần About và **Floating Cards** (Thẻ nổi) cho phần Sản phẩm.
* **Typography:** Chuyển sang font không chân (Sans-serif) **Manrope** hiện đại.

### 2. Hệ Thống Màu Sắc & Hình Ảnh
* **Quy tắc 3 màu chủ đạo (Strict 3-Color):**
    * **Xanh Rừng (`#115e59`):** Màu chính (Primary).
    * **Nâu Cacao (`#3E2723`):** Dùng cho văn bản (Text) thay vì màu đen.
    * **Trắng Sữa (`#F9FAFB`):** Màu nền (Background).
* **Background:** Khôi phục ảnh nền rừng (`background.jpg`) kết hợp lớp phủ gradient trắng mờ.

### 3. Nội Dung & Bản Địa Hóa
* **Việt hóa:** Chuyển ngữ toàn bộ giao diện (Menu, Buttons, Placeholders) sang tiếng Việt.
* **Chatbot:** Cập nhật System Prompt để AI trả lời khách hàng bằng tiếng Việt thân thiện, ngắn gọn.

## 🌧️ Cập Nhật Lần 2 (Chiều 01/02/2026) - Tropical Monsoon & Motion

### 1. Nâng Cấp Giao Diện: Concept "Nhiệt Đới Ẩm Gió Mùa"
Chuyển đổi UI từ tĩnh sang trạng thái "Sống động" và "Ướt át" đặc trưng của khí hậu nhiệt đới:
* **Wet Glass Effect:** Tăng độ mờ và trong suốt cho các thẻ (Card) để tạo cảm giác kính đọng sương/hơi nước.
* **Atmosphere:** Thêm các lớp phủ (layer) sương mù (`tropical-mist`) và họa tiết lá cây trôi nổi (`floating-leaf`).
* **Organic Shapes:** Sử dụng các đường bo cong tự nhiên, không đồng đều (Blobs) thay vì các khối hộp cứng nhắc.

### 2. Tích Hợp Animation (Framer Motion)
Thay thế hiệu ứng cuộn thủ công bằng thư viện chuyên nghiệp `framer-motion`:
* **Floating Physics:** Hiệu ứng lá rơi và trôi lơ lửng ngẫu nhiên vô tận.
* **Parallax Scroll:** Các lớp nền và chữ di chuyển với tốc độ khác nhau khi cuộn trang tạo chiều sâu 3D.
* **Staggered Reveal:** Các danh sách (Sản phẩm, Lý do chọn) xuất hiện lần lượt theo thứ tự thay vì hiện cùng lúc.

### 3. Sửa Lỗi & Tinh Chỉnh Layout
* **Product Grid:** Cố định lưới hiển thị sản phẩm thành **3 cột** (Hàng 3-3) trên giao diện Desktop để đảm bảo thẩm mỹ cho 6 sản phẩm.
* **Chatbot Recovery:** Khôi phục và đảm bảo UI Chatbot hiển thị rõ ràng, không bị chìm dưới các lớp hiệu ứng kính mờ, có animation rung nhẹ mời gọi.

### 4. Cài Đặt Mới
Yêu cầu cài đặt thêm thư viện:
```bash
npm install framer-motion