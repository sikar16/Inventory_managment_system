import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CardList from "./CardList";
import { useGetAlldepartmentQuery } from "../services/department_service";

function Slider() {
    const {
        isError,
        isLoading,
        isSuccess,
        data: departments,
        error,
    } = useGetAlldepartmentQuery();

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={1}
                slidesPerView={10}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                pagination={{ clickable: true, el: ".swiper-pagination" }}
                onSwiper={() => { }}
                onSlideChange={() => { }}
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
                        detaile="100"
                    />
                </SwiperSlide>
                {isLoading && <SwiperSlide>Loading...</SwiperSlide>}
                {isError && <SwiperSlide>Error loading data</SwiperSlide>}
                {isSuccess && departments.map((department) => (
                    <SwiperSlide key={department.id} className="mx-6 rounded-xl ">
                        <CardList
                            name={department.name}
                            detaile={department._count?.users}
                        />
                    </SwiperSlide>
                ))}

                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </Swiper>
        </>
    );
}

export default Slider;