// import React, {useState, useRef, useEffect, useTransition} from 'react';
// import {motion, useMotionValue} from 'motion/react';
//
// const DateTimePicker = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [dates, setDates] = useState([]);
//   const [hours, setHours] = useState([]);
//   const [minutes, setMinutes] = useState([]);
//   const [_, startTransition] = useTransition()
//
//   const dateListRef = useRef(null);
//   const hourListRef = useRef(null);
//   const minuteListRef = useRef(null);
//
//   const dateContainerRef = useRef(null);
//   const hourContainerRef = useRef(null);
//   const minuteContainerRef = useRef(null);
//
//   const dateDragConstraints = useMotionValue({top: 0, bottom: 0})
//   const hourDragConstraints = useMotionValue({top: 0, bottom: 0})
//   const minuteDragConstraints = useMotionValue({top: 0, bottom: 0})
//
//   // Генерация дат, часов и минут
//   useEffect(() => {
//     // Генерация дат (на 5 лет вперед и назад)
//     const generateDates = () => {
//       const today = new Date();
//       const datesArray = [];
//
//       for (let i = -180; i <= 180; i++) {
//         const date = new Date(today);
//         date.setDate(date.getDate() + i);
//         datesArray.push(date);
//       }
//
//       return datesArray;
//     };
//
//     // Генерация часов (0-23)
//     const generateHours = () => {
//       const hoursArray = [];
//       for (let i = 0; i < 24; i++) {
//         hoursArray.push(i);
//       }
//       return hoursArray;
//     };
//
//     // Генерация минут (0-59)
//     const generateMinutes = () => {
//       const minutesArray = [];
//       for (let i = 0; i < 60; i++) {
//         minutesArray.push(i);
//       }
//       return minutesArray;
//     };
//
//     setDates(generateDates());
//     setHours(generateHours());
//     setMinutes(generateMinutes());
//   }, []);
//
//   // Обновление ограничений перетаскивания
//   useEffect(() => {
//     // Для дат
//     if (dateListRef.current && dateContainerRef.current) {
//       const listHeight = dateListRef.current.scrollHeight;
//       const containerHeight = dateContainerRef.current.clientHeight;
//       console.log(listHeight, containerHeight)
//
//       dateDragConstraints.set({
//         top: -(listHeight - containerHeight) / 2,
//         bottom: (listHeight - containerHeight) / 2
//       })
//     }
//
//     // Для часов
//     if (hourListRef.current && hourContainerRef.current) {
//       const listHeight = hourListRef.current.scrollHeight;
//       const containerHeight = hourContainerRef.current.clientHeight;
//
//       // hourDragConstraints.set({
//       //   top: -(listHeight - containerHeight) / 2,
//       //   bottom: (listHeight - containerHeight) / 2
//       // })
//     }
//
//     // Для минут
//     if (minuteListRef.current && minuteContainerRef.current) {
//       const listHeight = minuteListRef.current.scrollHeight;
//       const containerHeight = minuteContainerRef.current.clientHeight;
//
//       // minuteDragConstraints.set({
//       //   top: -(listHeight - containerHeight) / 2,
//       //   bottom: (listHeight - containerHeight) / 2
//       // })
//
//     }
//   }, [dates, hours, minutes]);
//
//   // Обработчики перетаскивания
//   const handleDateDragEnd = (_, info) => {
//     console.log('here')
//     const itemHeight = 40;
//     const offset = info.offset.y;
//     const itemsToMove = Math.round(offset / itemHeight);
//
//     const newDate = new Date(selectedDate);
//     const currentDateIndex = dates.findIndex(
//       date =>
//         date.getDate() === selectedDate.getDate() &&
//         date.getMonth() === selectedDate.getMonth() &&
//         date.getFullYear() === selectedDate.getFullYear()
//     );
//
//     if (currentDateIndex !== -1) {
//       const newIndex = currentDateIndex - itemsToMove;
//       if (newIndex >= 0 && newIndex < dates.length) {
//         const targetDate = new Date(dates[newIndex]);
//         newDate.setFullYear(targetDate.getFullYear());
//         newDate.setMonth(targetDate.getMonth());
//         newDate.setDate(targetDate.getDate());
//         setSelectedDate(newDate);
//       }
//     }
//
//     snapToClosestDate(dateListRef, dates, selectedDate, setSelectedDate, 'date');
//   };
//
//   const handleHourDragEnd = (_, info) => {
//     const itemHeight = 40;
//     const offset = info.offset.y;
//     const itemsToMove = Math.round(offset / itemHeight);
//
//     const newDate = new Date(selectedDate);
//     const currentHour = selectedDate.getHours();
//     const newHour = (currentHour - itemsToMove + 24) % 24;
//
//     newDate.setHours(newHour);
//     setSelectedDate(newDate);
//
//     snapToClosestHour(hourListRef, hours, selectedDate, setSelectedDate);
//   };
//
//   const handleMinuteDragEnd = (_, info) => {
//     const itemHeight = 40;
//     const offset = info.offset.y;
//     const itemsToMove = Math.round(offset / itemHeight);
//
//     const newDate = new Date(selectedDate);
//     const currentMinute = selectedDate.getMinutes();
//     const newMinute = (currentMinute - itemsToMove + 60) % 60;
//
//     newDate.setMinutes(newMinute);
//     setSelectedDate(newDate);
//
//     snapToClosestMinute(minuteListRef, minutes, selectedDate, setSelectedDate);
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
//   const snapToClosestHour = (listRef, items, currentDate, setDate) => {
//     const itemHeight = 40;
//
//     if (listRef.current) {
//       const currentY = parseFloat(listRef.current.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
//       const closestIndex = Math.round(currentY / itemHeight);
//       const snapY = closestIndex * itemHeight;
//
//       // Анимируем к ближайшему часу
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
//       // Обновляем выбранный час
//       const currentHour = currentDate.getHours();
//       const targetHour = (currentHour - closestIndex + 24) % 24;
//
//       const newDate = new Date(currentDate);
//       newDate.setHours(targetHour);
//       setDate(newDate);
//     }
//   };
//
//   const snapToClosestMinute = (listRef, items, currentDate, setDate) => {
//     const itemHeight = 40;
//
//     if (listRef.current) {
//       const currentY = parseFloat(listRef.current.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
//       const closestIndex = Math.round(currentY / itemHeight);
//       const snapY = closestIndex * itemHeight;
//
//       // Анимируем к ближайшей минуте
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
//       // Обновляем выбранную минуту
//       const currentMinute = currentDate.getMinutes();
//       const targetMinute = (currentMinute - closestIndex + 60) % 60;
//
//       const newDate = new Date(currentDate);
//       newDate.setMinutes(targetMinute);
//       setDate(newDate);
//     }
//   };
//
//   // Форматирование даты
//   const formatDate = (date) => {
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
//   // Определение, является ли час выбранным
//   const isSelectedHour = (hour) => {
//     return hour === selectedDate.getHours();
//   };
//
//   // Определение, является ли минута выбранной
//   const isSelectedMinute = (minute) => {
//     return minute === selectedDate.getMinutes();
//   };
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
//   return (
//     <div className="flex justify-center space-x-2 p-4 bg-white rounded-lg shadow-md">
//       {/* Выбор даты */}
//       <div
//         ref={dateContainerRef}
//         className="relative w-48 h-[200px] overflow-hidden flex flex-col items-center justify-center border-r border-gray-200"
//       >
//         <div
//           className="absolute w-full h-[40px] bg-blue-100/50 z-10 pointer-events-none top-1/2 -translate-y-1/2"></div>
//         <motion.div
//           ref={dateListRef}
//           drag="y"
//           dragConstraints={dateDragConstraints.get()}
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
//       {/* Выбор часов */}
//       <div
//         ref={hourContainerRef}
//         className="relative w-16 h-[200px] overflow-hidden flex flex-col items-center justify-center"
//       >
//         <div
//           className="absolute w-full h-[40px] bg-blue-100/50 z-10 pointer-events-none top-1/2 -translate-y-1/2"></div>
//         <motion.div
//           ref={hourListRef}
//           drag="y"
//           dragConstraints={hourDragConstraints.get()}
//           onDragEnd={handleHourDragEnd}
//           initial={{y: 0}}
//           animate={{y: 0}}
//           transition={{type: 'spring', stiffness: 300, damping: 30}}
//           className="flex flex-col items-center cursor-grab"
//         >
//           {hours.map((hour, index) => (
//             <motion.div
//               key={`hour-${index}`}
//               initial={{opacity: 0.5, scale: 0.9}}
//               whileInView={{opacity: 1, scale: 1}}
//               transition={{duration: 0.2}}
//               className={`h-[40px] flex items-center justify-center text-xl w-full px-2 select-none
//                 ${isSelectedHour(hour)
//                 ? 'font-bold text-blue-600'
//                 : 'font-normal text-gray-700'}`}
//             >
//               {formatTimeUnit(hour)}
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//
//       {/* Выбор минут */}
//       <div
//         ref={minuteContainerRef}
//         className="relative w-16 h-[200px] overflow-hidden flex flex-col items-center justify-center"
//       >
//         <div
//           className="absolute w-full h-[40px] bg-blue-100/50 z-10 pointer-events-none top-1/2 -translate-y-1/2"></div>
//         <motion.div
//           ref={minuteListRef}
//           drag="y"
//           dragConstraints={minuteDragConstraints.get()}
//           onDragEnd={handleMinuteDragEnd}
//           initial={{y: 0}}
//           animate={{y: 0}}
//           transition={{type: 'spring', stiffness: 300, damping: 30}}
//           className="flex flex-col items-center cursor-grab"
//         >
//           {minutes.map((minute, index) => (
//             <motion.div
//               key={`minute-${index}`}
//               initial={{opacity: 0.5, scale: 0.9}}
//               whileInView={{opacity: 1, scale: 1}}
//               transition={{duration: 0.2}}
//               className={`h-[40px] flex items-center justify-center text-xl w-full px-2 select-none
//                 ${isSelectedMinute(minute)
//                 ? 'font-bold text-blue-600'
//                 : 'font-normal text-gray-700'}`}
//             >
//               {formatTimeUnit(minute)}
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
