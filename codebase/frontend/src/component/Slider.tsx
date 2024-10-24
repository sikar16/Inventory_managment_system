import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardList from "./CardList";
import { useGetAllDepartmentQuery } from "../services/department_service";

interface SliderProps {
  usersByDepartment: Record<number, number>;
}

const Slider: React.FC<SliderProps> = ({ usersByDepartment }) => {
  const {
    isError,
    isLoading,
    isSuccess,
    data: departments,
  } = useGetAllDepartmentQuery("all department");

  return (
    <>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={1}
        slidesPerView={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 2,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 2,
          },
        }}
      >
        <SwiperSlide className="gap-1 mx-2 rounded-xl">
          <CardList
            name="All users"
            detaile={Object.values(usersByDepartment).reduce(
              (acc, count) => acc + count,
              0
            )} // Sum of all users
          />
        </SwiperSlide>
        {isLoading && <SwiperSlide>Loading...</SwiperSlide>}
        {isError && <SwiperSlide>Error loading data</SwiperSlide>}
        {isSuccess &&
          departments.map((department) => (
            <SwiperSlide key={department.id} className="mx-6 rounded-xl ">
              <CardList
                name={department.name}
                detaile={usersByDepartment[department.id] || 0} // Get the count for each department or 0 if none
              />
            </SwiperSlide>
          ))}

        {/* <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div> */}
      </Swiper>
    </>
  );
};

export default Slider;
