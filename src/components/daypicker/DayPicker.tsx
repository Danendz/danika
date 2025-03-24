// import {useMemo, useState} from "react";
// import {format, getDate} from "date-fns";
// import DateWrapper from "@/components/daypicker/DateWrapper";
// import DateTitle from "@/components/daypicker/DateTitle";
// import DateSwiper from "@/components/daypicker/DateSwiper";
// import DateSwiperV3 from "@/components/daypicker/DateSwiperV3";

// interface Props {
//   currentDate: Date
// }
//
// const formatDate = (date: Date) => {
//   return format(date, 'eee, LLL d')
// }
//
// export default function DayPicker({currentDate}: Props) {
//   const [date, setDate] = useState(currentDate)
//
//   const dates = Array.from({ length: 31 }, (_, i) => i + 1);
//   const hours = Array.from({ length: 24 }, (_, i) => i);
//   const minutes = Array.from({ length: 60 }, (_, i) => i);
//
//   const [selectedDate, setSelectedDate] = useState(dates[0]);
//   const [selectedHour, setSelectedHour] = useState(hours[0]);
//   const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
//
//   const shownDates = useMemo(() => {
//     const dateBefore = new Date(date)
//     const dateAfter = new Date(date)
//
//     dateBefore.setDate(dateBefore.getDate() - 1)
//     dateAfter.setDate(dateAfter.getDate() + 1)
//     return [dateBefore, date, dateAfter].map((date) => {
//       return formatDate(date)
//     })
//   }, [date])
//
//   const updateDate = (date: string) => {
//   }
//   const updateHours = (hours: number) => {
//   }
//   const updateMinutes = (minutes: number) => {
//   }
//
//   // const hours = useMemo(() => {
//   //   const currentHour = date.getHours()
//   //   return [
//   //     currentHour - 1 < 0 ? 23: currentHour - 1,
//   //     currentHour,
//   //     currentHour + 1 > 23 ? 0 : currentHour + 1
//   //   ]
//   // }, [date])
//   //
//   // const minutes = useMemo(() => {
//   //   const currentMinute = date.getMinutes()
//   //   return [
//   //     currentMinute - 1 < 0 ? 59 : currentMinute - 1,
//   //     currentMinute,
//   //     currentMinute + 1 > 59 ? 0 : currentMinute + 1
//   //   ]
//   // }, [date])
//
//   return (
//     <div className="flex justify-between items-center overflow-hidden" onPointerDown={(e) => e.stopPropagation()}>
//       {/*<DateSwiperV3*/}
//       {/*  currentDate={date.getDate()}*/}
//       {/*/>*/}
//       {/*<DateSwiper items={shownDates} updateItem={updateDate} />*/}
//       {/*<DateSwiper items={hours} updateItem={updateHours} />*/}
//       {/*<DateSwiper items={minutes} updateItem={updateMinutes} />*/}
//     </div>
//   )
// }