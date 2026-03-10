Câu 1: Selector có độ ưu tiên cao nhất trong CSS là inline-style
Câu 2: #main sẽ thắng vì specificity của id cao hơn những cái còn lại
Câu 3: Nếu thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, thì style="color: pink" được ưu tiên hơn vì là inline-style có độ ưu tiên cao nhất
Câu 4: theme.css có thể override style từ base.css là vì theme.css được link tới sau nên nó override base.css. Điều kiện là Thứ tự load file CSS, thứ tự xuất hiện trong cùng file và Specificity 
Câu 5: hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau là Vì cái nào có specificity cao hơn thì nó ưu tiên cái đó
Câu 6:
<!-- <p id="subtitle" style="color: red;" class="highlight">Don hang 004</p> -->
đầu tiên nó có color pink trong base.css nhưng sau đó bị override bởi .hightlight trong base.css rồi sau đó có id là subtitle có màu aquamarine vì là id nên có specificity cao hơn tag và class nên nó được ưu tiên sau đó viết inline-style có màu đỏ vào element nên được ưu tiên nhất và hiển thị màu đỏ cuối cùng


