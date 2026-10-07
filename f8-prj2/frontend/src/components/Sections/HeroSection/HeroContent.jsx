import { useEffect, useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import CSS của Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Icons từ Material UI
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { categoriesApi } from "../../../api/categoriesApi";
import styles from "./HeroSection.module.css";

// Mảng ảnh Banner mẫu (Bạn có thể thêm/thay đổi tùy ý)
const BANNERS = [
  "https://www.topcv.vn/v4/image/mb-life/banner-v3.png",
];

function HeroContent() {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    const fetchCategories = () => {
      categoriesApi.getAll()
      .then((res) => {
        const data = res?.data || res;
        setCategoryGroups(data);
      })
      .catch((err) => console.error("Lỗi lấy danh mục:", err));
    }
    fetchCategories();
  } , [])

  return (
    <div className={clsx(styles.heroContent, "container")}>
      {/* =================  (SEARCH BAR) ================= */}
      <div className={styles.heroSearch}>
        <form className={styles.formSearchJob} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.groupSearch}>
            {/* Input từ khóa */}
            <div className={clsx(styles.item, styles.itemSearch)}>
              <SearchIcon className={styles.searchIcon} />
              <input
                autoComplete="off"
                className={styles.controlUI}
                type="text"
                placeholder="Vị trí tuyển dụng, tên công ty"
              />
            </div>

            {/* Select địa điểm */}
            <div className={clsx(styles.item, styles.itemLocation)}>
              <LocationOnIcon className={styles.locationIcon} />
              <select className={styles.selectUI} defaultValue="">
                <option value="">Địa điểm</option>
                <option value="1">Hà Nội</option>
                <option value="2">Thành phố Hồ Chí Minh</option>
                <option value="3">Đà Nẵng</option>
              </select>
            </div>

            {/* Nút Tìm kiếm */}
            <div className={styles.buttonSearchWrapper}>
              <button type="submit" className={styles.buttonSearch}>
                <SearchIcon fontSize="small" />
                <span>Tìm kiếm</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ================= (MENU + BANNER) ================= */}
      <div className={styles.heroBottom}>
        {/* Menu bên trái & Flyout Submenu */}
        <div
          className={styles.menuWrapper}
          onMouseLeave={() => setActiveGroup(null)}
        >
          <ul className={styles.groupList}>
            {categoryGroups.map((group) => {
              const isActive = activeGroup?.id === group.id;
              return (
                <li
                  key={group.id}
                  className={clsx(styles.groupItem, isActive && styles.activeGroup)}
                  onMouseEnter={() => setActiveGroup(group)}
                >
                  <span className={styles.groupName}>{group.group_name}</span>
                  <ChevronRightIcon className={styles.arrowIcon} />
                </li>
              );
            })}
          </ul>

          {/* Submenu Mega Flyout (Hiện khi Hover) */}
          {activeGroup && (
            <div className={styles.flyoutPanel}>
              <div className={styles.flyoutHeader}>
                <h4 className={styles.flyoutTitle}>{activeGroup.group_name}</h4>
              </div>

              {activeGroup.categories && activeGroup.categories.length > 0 ? (
                <div className={styles.flyoutGrid}>
                  {activeGroup.categories.map((cat) => (
                    <div key={cat.id} className={styles.flyoutCard}>
                      <a href={`/viec-lam/${cat.slug}`} className={styles.catLink}>
                        {cat.name}
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyFlyout}>
                  <p>Chưa có danh mục con cho ngành nghề này.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Carousel Slide Banner bên phải */}
        <div className={styles.sliderWrapper}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, Pagination, Navigation]}
            className={styles.mySwiper}
          >
            {BANNERS.map((bannerUrl, idx) => (
              <SwiperSlide key={idx}>
                <div className={styles.slideItem}>
                  <img src={bannerUrl} alt={`Banner ${idx + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;