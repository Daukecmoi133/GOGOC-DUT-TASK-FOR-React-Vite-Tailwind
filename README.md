# NEXA DIGITAL — Creative Tech & Digital Agency

> Website landing page cao cấp dành cho Digital Agency giả lập chuyên cung cấp giải pháp thiết kế UI/UX, phát triển sản phẩm số (Web & Mobile MVP) và tích hợp AI/Dữ liệu cho startup và doanh nghiệp.
## Link demo: https://daukecmoi133.github.io/GOGOC-DUT-TASK-FOR-React-Vite-Tailwind/
---

## 📋 TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

* **Doanh nghiệp giả lập:** NEXA DIGITAL (Digital / Software Agency)
* **Khách hàng mục tiêu:** Startup Founders, Small & Medium Businesses (SME), Marketing Managers & Enterprises
* **Mục tiêu kinh doanh:**
  * **Brand Awareness:** Xây dựng nhận diện thương hiệu công nghệ hiện đại, sáng tạo, táo bạo.
  * **Service Presentation:** Giới thiệu năng lực chuyên môn và danh mục giải pháp cốt lõi.
  * **Portfolio Showcase:** Trình bày các dự án và sản phẩm tiêu biểu (Case Studies).
  * **Lead Generation:** Thu hút khách hàng tiềm năng gửi yêu cầu tư vấn và báo giá chi tiết.
* **Định vị thương hiệu:** *Sáng tạo — Táo bạo — Hiện đại — Chuyên nghiệp*.

---

## 🚀 TÍNH NĂNG KỸ THUẬT CỐT LÕI (CORE IMPLEMENTATIONS)

### 1. Scroll Event + Cleanup (`navbar.js` / `Navbar.jsx`)
* **Cơ chế chuyển đổi giao diện:** Navbar tự động đổi sang nền kính mờ (`backdrop-filter: blur(12px)`), viền mỏng và co hẹp chiều cao thanh điều hướng khi cuộn trang `scrollY > 50px`.
* **Tối ưu hiệu năng:** 
  * Sử dụng sự kiện cuộn với cờ `{ passive: true }` kết hợp kiểm soát chu kỳ vẽ màn hình (`requestAnimationFrame`) giúp giữ vững tốc độ khung hình 60fps, không chặn luồng xử lý UI chính.
  * Tích hợp thanh đo tiến trình đọc trang (`Scroll Progress Bar`) biến thiên mượt mà từ 0% đến 100%.
  * Hệ thống **ScrollSpy** tự động phát hiện section đang đọc (`#about`, `#services`, `#projects`, `#faq`, `#contact`) để kích hoạt indicator sáng đèn tab tương ứng.
* **Quản lý Drawer & Dọn dẹp bộ nhớ:** 
  * Quản lý đóng/mở Mobile Drawer trượt từ cạnh phải màn hình.
  * Cung cấp cơ chế **cleanup function** (`removeEventListener`) khi component unmount hoặc cập nhật, ngăn ngừa triệt để rò rỉ bộ nhớ (memory leaks).

---

### 2. Dynamic Filter + Debounce 200ms (`services.js` / `Projects.jsx`)
* **Lọc đa chiều theo Danh mục:** Phân loại dự án/dịch vụ theo các Tab danh mục (`All`, `Web Development`, `UI/UX Design`, `AI & Data`, cùng Tab đặc biệt `❤️ Saved`).
* **Kỹ thuật Debounce 200ms:**
  * Ô tìm kiếm từ khóa thời gian thực tách biệt giữa giá trị input (gõ tức thời không giật khựng) và truy vấn lọc với thời gian hoãn 200ms (`useDebounce`).
  * Tối ưu hóa tính toán qua `useMemo` duyệt cùng lúc trên 4 trường dữ liệu: tiêu đề (`title`), phân loại (`category`), mô tả (`description`) và các thẻ kỹ thuật (`#tags`).
* **Trợ năng & Giao diện rỗng (Empty State):**
  * Tự động hiển thị huy hiệu đếm số lượng kết quả cho từng Tab: `All (6)`, `Web (2)`,...
  * Cập nhật thông báo số lượng kết quả cho trình đọc màn hình qua thuộc tính `aria-live="polite"`.
  * Hiển thị giao diện rỗng trực quan kèm nút bấm xóa nhanh (`Reset filters`) khi không có kết quả phù hợp.

---

### 3. Overlays State + Keydown Event (`serviceModal.js`, `dom.js` / `ProjectModal.jsx`, `MobileDrawer.jsx`)
* **Quản lý Overlays State:** Điều phối tập trung trạng thái đóng/mở Modal chi tiết dịch vụ/dự án và Mobile Navigation Drawer.
* **Cơ chế Shared Scroll-Lock (`overflow: hidden`):**
  * Hook `useScrollLock` khóa cuộn đồng thời trên cả `document.documentElement` (`html`) và `document.body`, triệt tiêu hoàn toàn nguy cơ kẹt cuộn khi mở đè nhiều lớp giao diện.
  * Tự động tính toán bề rộng thanh cuộn (`window.innerWidth - clientWidth`) và bù chính xác `padding-right` vào body để chống giật layout (layout shift) trên hệ điều hành Windows.
  * Ẩn hoàn toàn thanh cuộn bên trong hộp thoại Modal (`.no-scrollbar` / `scrollbar-width: none`) trong khi vẫn đảm bảo thao tác lăn chuột và vuốt chạm mượt mà.
* **Tương tác bàn phím & Trợ năng (Accessibility):**
  * Hỗ trợ đóng nhanh bằng phím `Escape` hoặc click ra vùng Backdrop đen mờ.
  * Thiết lập bẫy tiêu điểm (**Focus Trap**) với vai trò chuẩn `role="dialog"` và `aria-modal="true"`.
  * Tự động khôi phục con trỏ tiêu điểm (**Focus Restoration**) về nút bấm ban đầu sau khi overlay đóng lại.
  * Tích hợp nút hành động trực tiếp chuyển sang mục Báo giá và điền sẵn thông tin dự án đang xem.

---

### 4. Single-Open Accordion Pattern (`faq.js` / `Faq.jsx`)
* **Nạp động dữ liệu:** Danh sách câu hỏi thường gặp được nạp động từ file dữ liệu có phân nhóm theo chủ đề (`Services`, `Process`, `Engagement`, `Pricing`).
* **Cơ chế Single-Open & Multi-expand linh hoạt:**
  * Mở duy nhất 1 câu hỏi tại một thời điểm và tự động thu gọn câu hỏi đang mở khi kích hoạt câu hỏi mới (Single-Open pattern).
  * Hỗ trợ tùy chọn bật chế độ mở đồng thời nhiều câu hỏi (Multi-expand) cùng các nút thao tác nhanh `Expand All` và `Collapse All`.
* **Hiệu ứng & Trợ năng A11y:**
  * Kỹ thuật hoạt họa chuyển đổi độ cao 100% bằng CSS Grid (`grid-template-rows: 0fr -> 1fr`) kết hợp `overflow: hidden`, triệt tiêu hoàn toàn hiện tượng giật layout khi đóng/mở.
  * Biểu tượng Chevron quay 180° mượt mà `transition-transform duration-300`.
  * Đồng bộ chính xác các thuộc tính trợ năng `aria-expanded="true/false"` và thuộc tính ẩn hiển thị cho trình đọc màn hình.

---

### 5. Form Validation + Async Loading Simulation (`contactForm.js`, `toast.js` / `Contact.jsx`, `Toast.jsx`)
* **Client-side Form Validation chặt chẽ:**
  * **Họ tên:** Bắt buộc nhập, độ dài tối thiểu từ 2 ký tự trở lên.
  * **Email:** Kiểm tra cấu trúc định dạng email chuẩn RFC (`^[^\s@]+@[^\s@]+\.[^\s@]+$`).
  * **Dịch vụ & Phạm vi:** Bắt buộc chọn dịch vụ cốt lõi, hỗ trợ chọn thẻ mức ngân sách dự kiến (`<$3k`, `$3k-$5k`, `$5k-$10k`, `$10k+`) và thời hạn bàn giao (`Timeline`).
  * **Mô tả dự án:** Bắt buộc tối thiểu 10 ký tự để đảm bảo đủ thông tin tiếp nhận.
  * Phản hồi lỗi trực quan theo thời gian thực (hiển thị viền đỏ và thông báo chi tiết khi rời trường nhập `onBlur`).
* **Async Loading Simulation:**
  * Giả lập gửi dữ liệu bất đồng bộ đến máy chủ qua `setTimeout` 1.5 giây.
  * Vô hiệu hóa nút gửi (`disabled`) và hiển thị biểu tượng Spinner xoay tròn để chống hành vi gửi lặp / spam (Double-submit prevention).
* **Toast Notification System:**
  * Sau khi gửi thành công, kích hoạt Toast thông báo nổi ở góc màn hình.
  * Thanh tiến trình đếm ngược tự động đóng sau 4-5 giây kèm nút tắt thủ công `✕`.
  * Tự động làm mới dữ liệu form (`reset form`) về trạng thái ban đầu sạch sẽ.

---

### 6. State Persistence + LocalStorage API (`theme.js`, `wishlist.js`, `storage.js` / `useBookmarks.js`, `App.jsx`)
* **Đồng bộ bền vững Dark / Light Mode:**
  * Quản lý trạng thái giao diện qua `localStorage` kết hợp tự động nhận diện thiết lập hệ thống `window.matchMedia('(prefers-color-scheme: dark)')`.
  * Tích hợp mã script **Anti-FOUC (Flash of Unstyled Content)** ngay trong `<head>` của `index.html`, loại bỏ hoàn toàn hiện tượng nhấp nháy sáng/tối khi tải lại trang.
  * Lắng nghe sự kiện thay đổi theme của hệ điều hành để đồng bộ giao diện theo thời gian thực.
* **Danh sách dịch vụ / Dự án yêu thích (Wishlist / Bookmarks):**
  * Khởi tạo và lưu trữ danh sách ID các dự án được đánh dấu yêu thích vào `localStorage` (`nexa_bookmarked_projects`).
  * Nút tương tác trái tim `❤️ / 🤍` xuất hiện trên từng Card dự án và trong Modal xem chi tiết.
  * Tự động cập nhật số lượng tức thời lên huy hiệu trên thanh Navbar (`❤️ X Saved`) và Mobile Drawer.
  * Hỗ trợ đồng bộ trạng thái qua nhiều tab trình duyệt (`storage` event listener) và khôi phục nguyên vẹn trạng thái khi người dùng tải lại trang.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG (TECH STACK)

* **Framework & Library:** [React 19](https://react.dev/) — Tận dụng tối đa modern React hooks (`useState`, `useEffect`, `useMemo`).
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — Cấu hình màu sắc, typography và utility classes tối tân.
* **Bundler & Tooling:** [Vite 8](https://vite.dev/) — Tốc độ khởi động siêu tốc và HMR tức thì.
* **Linter & Code Quality:** [Oxlint](https://oxc.rs/) — Trình linter hiệu năng cao, đảm bảo 0 lỗi và 0 cảnh báo.
* **Web Fonts:** *Space Grotesk* (Display / Headings) & *Inter* (Body typography).

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT STRUCTURE)

```plaintext
nexa-digital/
├── index.html                   # HTML template với script chống FOUC
├── package.json                 # Cấu hình dự án & dependencies
├── vite.config.js               # Cấu hình Vite & Tailwind v4
└── src/
    ├── main.jsx                 # Điểm khởi chạy React root
    ├── App.jsx                  # Điều phối trạng thái Theme, Bookmarks, Toast & Sections
    ├── index.css                # CSS variables, Tailwind imports, utility .no-scrollbar
    ├── assets/                  # Hình ảnh và vector icons
    ├── hooks/                   # Custom Hooks tái sử dụng
    │   ├── useDebounce.js       # Hook trì hoãn tìm kiếm (Debounce 200ms)
    │   ├── useScrollLock.js     # Hook khóa/ẩn thanh cuộn & chống giật layout
    │   ├── useScrollSpy.js      # Hook theo dõi vị trí cuộn & thanh tiến trình
    │   └── useBookmarks.js      # Hook quản lý Wishlist lưu trữ qua LocalStorage
    ├── components/              # Các UI Components độc lập
    │   ├── Navbar.jsx           # Navbar cuộn kính mờ, ScrollSpy & huy hiệu Wishlist
    │   ├── MobileDrawer.jsx     # Navigation Drawer trượt từ cạnh phải (A11y + Esc)
    │   ├── ProjectCard.jsx      # Thẻ dự án kèm nút Bookmark & hover effect
    │   ├── ProjectModal.jsx     # Modal chi tiết, ẩn scrollbar, CTA báo giá
    │   ├── Toast.jsx            # Thông báo nổi đếm ngược thời gian tự đóng
    │   └── Footer.jsx           # Chân trang thông tin & liên kết điều hướng
    ├── sections/                # Các phân đoạn trang chính
    │   ├── Hero.jsx             # Giới thiệu & Headline thương hiệu
    │   ├── About.jsx            # Tuyên ngôn sứ mệnh & định vị agency
    │   ├── Services.jsx         # 3 trụ cột dịch vụ chính
    │   ├── Projects.jsx         # Bộ lọc danh mục, ô tìm kiếm debounce & lưới dự án
    │   ├── Faq.jsx              # Accordion hỏi đáp CSS Grid 0fr->1fr
    │   └── Contact.jsx          # Form liên hệ, chọn ngân sách, validation & loading
    └── data/                    # Mock data giả lập
        ├── projects.js          # Dữ liệu danh sách dự án tiêu biểu
        ├── services.js          # Dữ liệu dịch vụ & giải pháp
        └── faqs.js              # Dữ liệu câu hỏi & câu trả lời theo chủ đề
```

---

## ⚡ HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN (GETTING STARTED)

### 1. Yêu cầu môi trường
* [Node.js](https://nodejs.org/) phiên bản `18.0.0` trở lên.
* Trình quản lý gói `npm` hoặc `pnpm`.

### 2. Các bước cài đặt & khởi chạy

1. **Di chuyển vào thư mục dự án:**
   ```bash
   cd nexa-digital
   ```

2. **Cài đặt các gói phụ thuộc:**
   ```bash
   npm install
   ```

3. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại địa chỉ: `http://localhost:5173`

4. **Kiểm tra mã nguồn với linter:**
   ```bash
   npm run lint
   ```

5. **Đóng gói sản phẩm (Production Build):**
   ```bash
   npm run build
   ```

---

## 🎯 TIÊU CHUẨN TIẾP CẬN & TRẢI NGHIỆM NGƯỜI DÙNG (A11Y & UX STANDARDS)

* **Trợ năng (Accessibility - WCAG):**
  * Tất cả các trường nhập liệu đều có `label` tường minh và thông báo lỗi rõ ràng.
  * Tích hợp đầy đủ thuộc tính ARIA: `aria-expanded`, `aria-modal`, `aria-labelledby`, `aria-live="polite"`.
  * Hỗ trợ điều hướng bằng bàn phím hoàn chỉnh (`Tab`, `Shift+Tab`, `Space`, `Enter` và phím `Escape` để thoát).
* **Tối ưu trải nghiệm mắt nhìn:**
  * Chuyển đổi mượt mà giữa chế độ Dark và Light Mode không gây chói hoặc nhấp nháy.
  * Khóa cuộn trang thông minh không làm mất thanh cuộn tạo ra khoảng giật trắng mép phải màn hình.
  * Ẩn thanh cuộn dọc bên trong modal giúp tổng thể giao diện luôn gọn gàng và tinh tế.

---

© 2026 **NEXA DIGITAL**. Thiết kế với sự sáng tạo — Xây dựng bằng công nghệ hiện đại.
