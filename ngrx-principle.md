# Tài liệu NgRx cho Angular v19

## 1. Tổng quan kiến trúc NgRx

NgRx là framework state management cho Angular dựa trên Redux, áp dụng nguyên tắc luồng dữ liệu một chiều và state bất biến.

### Thành phần chính:

- **Store**: Lưu trữ state của ứng dụng dưới dạng đối tượng JS bất biến
- **Actions**: Mô tả các sự kiện xảy ra trong ứng dụng
- **Reducers**: Hàm pure function xử lý state cũ và action, trả về state mới
- **Selectors**: Truy xuất và tính toán dữ liệu từ state
- **Effects**: Xử lý side effects (API calls, navigation, etc.)
- **Component Store**: Quản lý state cục bộ cho components
- **Router Store**: Đồng bộ trạng thái router với store

### Ưu điểm:

- Quản lý state tập trung, dễ debug
- Luồng dữ liệu có thể dự đoán
- Tính bất biến ngăn chặn bugs
- Time-travel debugging
- Developer tools mạnh mẽ
- Khả năng mở rộng cao
- Tái sử dụng logic

### Nhược điểm:

- Nhiều boilerplate code (lặp code)
- Cần tìm hiểu kỹ và hiểu sâu sắc
- Phức tạp cho ứng dụng nhỏ
- Yêu cầu xử lý memory cẩn thận tránh memory leak

## 2. Chuẩn tổ chức thư mục & cấu trúc file

### Cấu trúc thư mục theo feature:

```
src/
├── app/
│   ├── core/                           # Core module
│   │   ├── auth/                       # Authentication
│   │   │   ├── state/                  # Auth state management
│   │   ├── services/
│   │   └── core.module.ts
│   ├── shared/                         # Shared module
│   ├── store/                          # Root store configuration
│   │   ├── app.state.ts                # AppState interface
│   │   ├── root-store.module.ts        # Root store module
│   │   ├── router/                     # Router store
│   │   ├── global/                     # Global state
│   │   └── index.ts                    # Public API
│   ├── features/                       # Feature modules
│   │   ├── feature-a/                  # Feature module A
│   │   │   ├── components/             # Presentational components
│   │   │   ├── containers/             # Smart components
│   │   │   ├── models/                 # Feature-specific models
│   │   │   ├── services/               # Feature-specific services
│
│   ├── store/ # Global/globalized state (NGRX)
│   │ └── [feature-name]/
│   │   │   │   ├── feature.actions.ts
│   │   │   │   ├── feature.effects.ts
│   │   │   │   ├── feature.reducer.ts
│   │   │   │   └── feature.selectors.ts
│   ├── app.component.ts
```

## 3. Quy ước đặt tên & phân loại action

### Pattern đặt tên action:

`[Source] Event Description`

- **Source**: Nguồn phát sinh action (feature hoặc component)
- **Event Description**: Mô tả hành động

### Phân loại actions:

#### UI-triggered actions:

- Phát sinh từ tương tác người dùng
- Source là tên component hoặc feature
- Ví dụ: `[Product List] Filter Products`

#### API-triggered actions:

- Phát sinh từ API calls
- Thường có hậu tố Success/Failure
- Ví dụ: `[Products API] Load Products Success`

#### Internal actions:

- Phát sinh từ effects hoặc reducers
- Ví dụ: `[Products] Initialize State`

### Quy ước cho API actions:

- **Request**: `[Source] Verb Noun` - Ví dụ: `[Products] Load Products`
- **Success**: `[Source API] Verb Noun Success` - Ví dụ: `[Products API] Load Products Success`
- **Failure**: `[Source API] Verb Noun Failure` - Ví dụ: `[Products API] Load Products Failure`

## 4. Xây dựng reusable selectors

### Nguyên tắc viết selectors:

- **Tính mô-đun hóa**: Chia nhỏ selectors thành các hàm đơn giản
- **Tính tổng hợp**: Xây dựng selectors phức tạp từ selectors đơn giản
- **Tính tái sử dụng**: Thiết kế để sử dụng lại trong nhiều components
- **Tính mở rộng**: Cho phép tham số hóa selectors

### Memoization và performance:

- Selectors tự động memoize kết quả
- Tránh tạo selectors mới trong components
- Sử dụng `createSelector` để tận dụng memoization
- Xem xét kỹ việc truyền tham số

### Selector composition pattern:

- Kết hợp nhiều selectors đơn giản tạo selectors phức tạp
- Giảm thiểu lặp code
- Tận dụng memoization để tối ưu hiệu suất

## 5. Effects Best Practices

### Phân loại effects theo loại side-effect:

- **API Effects**: Gọi API, trả về success/failure actions
- **Navigation Effects**: Xử lý điều hướng
- **Notification Effects**: Hiển thị thông báo
- **Storage Effects**: Lưu trữ local/session storage

### Sử dụng RxJS operators phù hợp:

- **switchMap**: Hủy request cũ khi có request mới (dùng trong tìm kiếm, filtering)
- **mergeMap**: Xử lý đồng thời nhiều requests (thao tác độc lập)
- **concatMap**: Xử lý tuần tự các requests (đảm bảo thứ tự)
- **exhaustMap**: Bỏ qua requests mới khi request hiện tại đang xử lý (login, form submit)

### Viết effect dễ test và debug:

- Mỗi effect chỉ xử lý một loại action
- Tách logic phức tạp ra services
- Luôn bắt lỗi và dispatch failure actions
- Sử dụng tap() để ghi log trong quá trình phát triển

## 6. Error handling & notification

### Xử lý lỗi toàn cục:

- Tạo actions riêng cho việc báo cáo lỗi
- Xử lý lỗi một cách nhất quán trong toàn bộ ứng dụng
- Log lỗi và hiển thị thông báo thân thiện với người dùng

### Thông báo (notifications):

- Tạo feature riêng cho notifications
- Sử dụng actions để hiển thị thông báo
- Hỗ trợ nhiều loại thông báo (success, error, info, warning)

## 7. Testing strategy

### Unit test cho reducers:

- Kiểm tra trạng thái ban đầu
- Kiểm tra từng action riêng biệt
- Kiểm tra chuỗi actions

### Unit test cho selectors:

- Kiểm tra kết quả của từng selector
- Kiểm tra selectors kết hợp
- Kiểm tra selectors có tham số

### Unit test cho effects:

- Sử dụng `provideMockActions`
- Mock API services
- Kiểm tra success và failure cases
- Sử dụng TestScheduler cho RxJS testing

### Testing components với store:

- Sử dụng `provideMockStore`
- Mock selectors
- Kiểm tra dispatch actions
- Sử dụng jasmine-marbles cho observable testing

## 8. Performance optimization

### OnPush Change Detection:

- Sử dụng cho components kết nối với store
- Tránh mutation trong components

### Sử dụng select hiệu quả:

- Chọn đúng selectors cho từng component
- Tránh select quá nhiều dữ liệu không cần thiết

### TrackBy trong ngFor:

- Sử dụng trackBy để tối ưu hiệu suất render

### Store cleanup:

- Tạo action clear state
- Cleanup khi component bị destroy
- Sử dụng metaReducers để tự động cleanup khi lazy-loaded module bị hủy

## 9. Integration with Router Store

### Track navigation state:

- Cài đặt và cấu hình Router Store
- Tạo custom serializer để lưu trữ thông tin hữu ích
- Tạo selectors để truy cập router state

### Trigger actions từ Router events:

- Dispatch actions dựa trên navigation events
- Xử lý navigation errors

### Hydrate state sau khi load lại trang:

- Khôi phục state từ URL sau khi trang được tải
- Dispatch các actions cần thiết dựa trên URL hiện tại

## 10. Boilerplate generator

### Công cụ gợi ý:

- NgRx Schematics
- Custom Schematics
- VS Code Snippets
- Nx Workspace Generator

### Tạo template cho team:

- Template cho actions
- Template cho reducers
- Template cho effects
- Template cho selectors

## Kết luận

Áp dụng các nguyên tắc sau để xây dựng ứng dụng Angular-NgRx có thể mở rộng, dễ bảo trì và hiệu quả:

1. **Tổ chức code theo feature**: Mỗi feature module có thư mục store riêng với actions, reducers, effects, selectors.
2. **Quy ước đặt tên nhất quán**: Tuân thủ mẫu `[Source] Event Description` cho actions.
3. **Selectors có thể tái sử dụng**: Xây dựng selectors theo cách có thể kết hợp và tái sử dụng.
4. **Effects tách biệt theo loại side-effect**: Phân tách effects theo API, navigation, notification, etc.
5. **Error handling toàn cục**: Xây dựng hệ thống xử lý lỗi nhất quán.
6. **Testing đầy đủ**: Unit test cho reducers, selectors, effects.
7. **Performance optimization**: Sử dụng OnPush, trackBy, cleanup state.
8. **Router Store integration**: Theo dõi navigation state và hydrate state từ URL.

## Prompt template cho tạo NgRx store

```
Tạo NgRx store cho feature [TÊN_FEATURE] trong ứng dụng Angular v19 với các yêu cầu sau:

1. Mô tả model:
[MÔ TẢ CHI TIẾT VỀ MODEL]

2. Các actions cần thiết:
- Load [ENTITIES]
- Load [ENTITY] by ID
- Create [ENTITY]
- Update [ENTITY]
- Delete [ENTITY]
- [CÁC ACTIONS KHÁC]

3. Các effects cần triển khai:
- API calls tới [API_ENDPOINT]
- Navigation sau khi [HÀNH_ĐỘNG]
- Thông báo khi [HÀNH_ĐỘNG] thành công/thất bại

4. Selectors cần thiết:
- Select all [ENTITIES]
- Select [ENTITY] by ID
- Select loading state
- Select error state
- [CÁC SELECTORS KHÁC]

Yêu cầu:
- Tuân thủ chuẩn NgRx trong tài liệu best practices
- Sử dụng EntityAdapter nếu quản lý collection
- Tổ chức code theo feature module
- Tạo đầy đủ actions, reducers, effects, selectors
- Đảm bảo type safety với TypeScript
- Quản lý loading và error states
```
