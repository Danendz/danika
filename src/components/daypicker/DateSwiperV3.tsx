// import React, {useState, useRef, useEffect} from 'react';
// import {motion, PanInfo, useMotionValue} from 'motion/react';
//
// const DateTimePicker = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [dates, setDates] = useState([]);
//
//   const generateDates = () => {
//     const today = new Date(selectedDate);
//     const datesArray = [];
//
//     for (let i = -180; i <= 180; i++) {
//       const date = new Date(today);
//       date.setDate(date.getDate() + i);
//       datesArray.push(date);
//     }
//
//     return datesArray;
//   };
//
//   const dateListRef = useRef(null);
//
//   const dateContainerRef = useRef(null);
//
//   const dateDragConstraints = useMotionValue({top: 0, bottom: 0})
//
//   // Генерация дат, часов и минут
//   useEffect(() => {
//     // Генерация дат (на 5 лет вперед и назад)
//
//     setDates(generateDates());
//   }, []);
//
//   // Обновление ограничений перетаскивания
//   useEffect(() => {
//     // Для дат
//     if (dateListRef.current && dateContainerRef.current) {
//       const listHeight = dateListRef.current.scrollHeight;
//       const containerHeight = dateContainerRef.current.clientHeight;
//
//       dateDragConstraints.set({
//         top: -(listHeight - containerHeight) / 2,
//         bottom: (listHeight - containerHeight) / 2
//       })
//     }
//   }, [dates]);
//
//   // Обработчики перетаскивания
//   const handleDateDragEnd = (_, info: PanInfo) => {
//     const itemHeight = 40;
//     const offset = info.offset.y;
//     const itemsToMove = Math.round(offset / itemHeight);
//
//     // const newDate = new Date(selectedDate);
//     // const currentDateIndex = dates.findIndex(
//     //   date =>
//     //     date.getDate() === selectedDate.getDate() &&
//     //     date.getMonth() === selectedDate.getMonth() &&
//     //     date.getFullYear() === selectedDate.getFullYear()
//     // );
//     //
//     // if (currentDateIndex !== -1) {
//     //   const newIndex = currentDateIndex - itemsToMove;
//     //   if (newIndex >= 0 && newIndex < dates.length) {
//     //     const targetDate = new Date(dates[newIndex]);
//     //     newDate.setFullYear(targetDate.getFullYear());
//     //     newDate.setMonth(targetDate.getMonth());
//     //     newDate.setDate(targetDate.getDate());
//     //     setSelectedDate(newDate);
//     //   }
//     // }
//
//     // snapToClosestDate(dateListRef, dates, selectedDate, setSelectedDate, 'date');
//   };
//
//   // Функции привязки к ближайшему значению
//   const snapToClosestDate = (listRef, items, currentDate, setDate, type) => {
//     const itemHeight = 40;
//
//     if (listRef.current) {
//       const currentY = parseFloat(listRef.current.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
//       const closestIndex = Math.round(currentY / itemHeight);
//       const snapY = closestIndex * itemHeight;
//
//       // Анимируем к ближайшей дате
//       listRef.current.style.transition = 'transform 0.3s ease-out';
//       listRef.current.style.transform = `translateY(${snapY}px)`;
//
//       // Сбрасываем transition после анимации
//       setTimeout(() => {
//         if (listRef.current) {
//           listRef.current.style.transition = '';
//         }
//       }, 300);
//
//       // Обновляем выбранную дату
//       const currentIndex = items.findIndex(
//         date =>
//           date.getDate() === currentDate.getDate() &&
//           date.getMonth() === currentDate.getMonth() &&
//           date.getFullYear() === currentDate.getFullYear()
//       );
//
//       const targetIndex = currentIndex - closestIndex;
//       if (targetIndex >= 0 && targetIndex < items.length) {
//         const newDate = new Date(currentDate);
//         const targetDate = new Date(items[targetIndex]);
//         newDate.setFullYear(targetDate.getFullYear());
//         newDate.setMonth(targetDate.getMonth());
//         newDate.setDate(targetDate.getDate());
//         setDate(newDate);
//       }
//     }
//   };
//
//   // Форматирование даты
//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('ru-RU', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });
//   };
//
//   // Форматирование часов и минут с ведущим нулем
//   const formatTimeUnit = (unit) => {
//     return unit.toString().padStart(2, '0');
//   };
//
//   // Определение, является ли дата выбранной
//   const isSelectedDate = (date) => {
//     return (
//       date.getDate() === selectedDate.getDate() &&
//       date.getMonth() === selectedDate.getMonth() &&
//       date.getFullYear() === selectedDate.getFullYear()
//     );
//   };
//
//
//   // Обработчики для бесконечной прокрутки
//   const addMoreDates = (position) => {
//     const newDates = [...dates];
//     const lastDate = new Date(newDates[newDates.length - 1]);
//     const firstDate = new Date(newDates[0]);
//
//     if (position === 'bottom') {
//       for (let i = 1; i <= 365; i++) {
//         const date = new Date(lastDate);
//         date.setDate(date.getDate() + i);
//         newDates.push(date);
//       }
//     } else {
//       for (let i = 1; i <= 365; i++) {
//         const date = new Date(firstDate);
//         date.setDate(date.getDate() - i);
//         newDates.unshift(date);
//       }
//     }
//
//     setDates(newDates);
//   };
//
//   const [lastY, setLastY] = useState(0)
//   const handleDragStart = () => {
//     setLastY(0)
//   }
//
//   const handleDateDrag = (_, info: PanInfo) => {
//     const y = info.offset.y
//     const absY = Math.abs(y)
//     if((y + lastY) < -20) {
//       console.log(Math.round((y + lastY) / -30))
//       setSelectedDate(() => dates[dates.length - Math.round((y + lastY) / -30)])
//       // setDates((prevState) => {
//       //   const lastItem = prevState[prevState.length - 1]
//       //   const nextDays = []
//       //
//       //   for (let i = 0; i <= 1; i++) {
//       //     const nextDay = new Date(lastItem)
//       //     nextDay.setDate(nextDay.getDate() + i)
//       //     nextDays.push(nextDay)
//       //   }
//       //
//       //   const withoutFirstArr = prevState.slice(prevState.length - 4)
//       //
//       //   return [...withoutFirstArr, ...nextDays]
//       // })
//     }
//     // if (y < 0 && Math.round(y / -40)) {
//     //   setSelectedDate(() => dates[dates.length - 1])
//     //   setDates(generateDates())
//     //   lastY = info.offset.y
//     // }
//   }
//
//   return (
//     <div className="flex justify-center space-x-2 p-4 bg-white rounded-lg shadow-md">
//       {/* Выбор даты */}
//       <div
//         ref={dateContainerRef}
//         className="relative w-48 h-[100px] overflow-hidden flex flex-col items-center justify-center border-r border-gray-200"
//       >
//         <div
//           className="absolute w-full h-[40px] bg-blue-100/50 z-10 pointer-events-none top-1/2 -translate-y-1/2"></div>
//         <motion.div
//           ref={dateListRef}
//           drag="y"
//           dragSnapToOrigin={true}
//           whileDrag={{scale: 0.9}}
//           onDragStart={handleDragStart}
//           onDrag={handleDateDrag}
//           onDragEnd={handleDateDragEnd}
//           initial={{y: 0}}
//           animate={{y: 0}}
//           transition={{type: 'spring', stiffness: 300, damping: 30}}
//           className="flex flex-col items-center cursor-grab"
//         >
//           {dates.map((date, index) => (
//             <motion.div
//               key={`date-${index}`}
//               initial={{opacity: 0.5, scale: 0.9}}
//               whileInView={{opacity: 1, scale: 1}}
//               transition={{duration: 0.2}}
//               className={`h-[40px] flex items-center justify-center text-base w-full px-2 select-none
//                 ${isSelectedDate(date)
//                 ? 'font-bold text-blue-600'
//                 : 'font-normal text-gray-700'}`}
//             >
//               {formatDate(date)}
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//
//       {/* Отображение выбранной даты и времени */}
//       <div className="mt-4 text-center absolute bottom-2 left-0 right-0">
//         <p className="text-sm text-gray-500">Выбрано:</p>
//         <p className="text-lg font-semibold text-blue-600">
//           {formatDate(selectedDate)} {formatTimeUnit(selectedDate.getHours())}:{formatTimeUnit(selectedDate.getMinutes())}
//         </p>
//       </div>
//     </div>
//   );
// };
//
// export default DateTimePicker;
