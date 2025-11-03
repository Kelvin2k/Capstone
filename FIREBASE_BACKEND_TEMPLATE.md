# 🚀 Firebase Backend Project Template

## Mục tiêu
Tạo một dự án backend serverless chuẩn, sử dụng các dịch vụ Google:
- **Firebase Authentication** (quản lý user)
- **Firestore Database** (NoSQL database)
- **Cloud Functions** (API backend)
- **(Tùy chọn) Firebase Hosting** (deploy frontend)

---

## 1. Chuẩn bị
- Đã cài Node.js, npm
- Đã có tài khoản Google
- Đã cài Firebase CLI:
  ```bash
  npm install -g firebase-tools
  firebase --version
  ```

---

## 2. Tạo & Cấu hình Firebase Project
1. Vào https://console.firebase.google.com/
2. "Add project" → Đặt tên → Tạo project
3. Lưu lại **Project ID** (ví dụ: `my-backend-12345`)

---

## 3. Khởi tạo Firebase trong thư mục dự án
```bash
cd <thư_mục_dự_án>
firebase init
```
- Chọn: **Firestore**, **Functions**, **Authentication**, (Hosting nếu cần)
- Chọn project vừa tạo
- Firestore: test mode (dev), chọn region gần bạn (ví dụ: asia-east1)
- Functions: JavaScript, không cần ESLint, cài dependencies luôn

---

## 4. Kích hoạt các dịch vụ trên Console
- **Authentication**: Build → Authentication → Get started → Enable Email/Password
- **Firestore**: Build → Firestore Database → Create database → Test mode → Chọn region

---

## 5. Cài đặt dependencies cho Cloud Functions
```bash
cd functions
npm install firebase-functions@latest firebase-admin@latest cors express --save
cd ..
```

---

## 6. Cấu trúc thư mục Functions chuẩn
```
functions/
  ├── index.js           // Entry point, chỉ import/export
  ├── movies/
  │     ├── getMovies.js
  │     └── getMovie.js
  ├── users/
  │     └── ...
  └── ...
```

---

## 7. Viết Cloud Function mẫu (ví dụ: getMovie)
**functions/movies/getMovie.js**
```js
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.getMovie = onRequest({ region: 'asia-east1' }, (request, response) => {
  cors(request, response, async () => {
    try {
      const movieId = request.query.id;
      if (!movieId) {
        return response.status(400).json({ success: false, message: "Movie ID is required" });
      }
      const movieDoc = await db.collection("movies").doc(movieId).get();
      if (!movieDoc.exists) {
        return response.status(404).json({ success: false, message: "Movie not found" });
      }
      response.status(200).json({ success: true, content: { id: movieDoc.id, ...movieDoc.data() } });
    } catch (error) {
      logger.error("Error fetching movie", error);
      response.status(500).json({ success: false, message: "Error fetching movie", error: error.message });
    }
  });
});
```

---

## 8. Entry point Functions (index.js)
**functions/index.js**
```js
const admin = require("firebase-admin");
admin.initializeApp();
exports.getMovie = require("./movies/getMovie").getMovie;
// Thêm các function khác tương tự
```

---

## 9. Deploy Cloud Functions & Firestore Rules
```bash
firebase deploy --only functions
firebase deploy --only firestore:rules
```

---

## 10. Seed dữ liệu Firestore (tùy chọn)
- Tạo script seed hoặc dùng file HTML seed như project mẫu
- Hoặc seed thủ công trên Firebase Console

---

## 11. Kết nối Frontend/API
- Lấy URL function sau deploy (ví dụ: https://asia-east1-<project-id>.cloudfunctions.net/getMovie)
- Gọi API từ frontend (React, Vue, v.v.) hoặc Postman

---

## 12. (Tùy chọn) Deploy Frontend lên Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

---

## 13. Một số lệnh Firebase CLI hữu ích
```bash
firebase login
firebase init
firebase deploy
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase functions:log
firebase firestore:databases:create --location=asia-east1
```

---

## 14. Lưu ý & Best Practices
- **Không commit file service-account-key.json lên Git**
- **Chia nhỏ function theo folder/module**
- **Chỉ enable test mode Firestore khi dev**
- **Đọc kỹ log khi deploy lỗi**
- **Đặt region gần user để giảm latency**
- **Tách biệt logic backend (Cloud Functions) và frontend**

---

## 15. Checklist khi làm dự án mới
- [ ] Đã tạo project Firebase
- [ ] Đã enable Authentication, Firestore
- [ ] Đã init Firebase CLI, chọn đúng project
- [ ] Đã tạo cấu trúc functions chuẩn
- [ ] Đã viết và test function mẫu
- [ ] Đã deploy functions, rules
- [ ] Đã seed dữ liệu
- [ ] Đã kết nối frontend/API
- [ ] Đã test end-to-end

---

**Chúc bạn làm backend serverless với Firebase thành công!**
